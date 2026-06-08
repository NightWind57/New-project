import OpenAI from "openai";

const bannedPhrases = [
  "闭眼入",
  "绝绝子",
  "YYDS",
  "宝子",
  "姐妹们",
  "太香了",
  "神器",
  "无脑入",
  "直接封神",
  "性价比天花板",
  "不买后悔",
  "冲就完了",
  "狠狠爱了",
  "谁懂啊"
];

const exaggeratedPhrases = [
  "完全不发热",
  "一点都不烫",
  "秒充",
  "永远不伤电池",
  "彻底保护电池",
  "官方原装级别",
  "苹果官方同款",
  "充电不伤电池"
];

const sellingPointKeywords = {
  "快充": ["快充", "充得很快", "速度很快", "补电很快", "充电速度"],
  "低温": ["低温", "发热", "不热", "温度", "烫"],
  "颜值": ["颜值", "好看", "颜色", "外观", "桌面", "耐看"],
  "对比杂牌": ["杂牌", "便宜头", "不放心", "靠谱"],
  "对比旧充电器": ["旧充电器", "旧头", "以前那个", "之前那个"]
};

const sceneConflicts = {
  "办公室用": ["床头", "家里", "客厅", "睡前", "朋友推荐", "朋友说", "刷到", "种草", "回购", "又买", "再买", "刚换手机", "新手机"],
  "家里用": ["办公室", "公司", "工位", "上班", "午休", "朋友推荐", "朋友说", "刷到", "种草", "回购", "又买", "再买", "刚换手机", "新手机"],
  "朋友推荐购买": ["刷到", "种草", "看评价", "网上推荐", "回购", "又买", "再买"],
  "网络种草购买": ["朋友推荐", "朋友说", "朋友用了", "回购", "又买", "再买"],
  "回购": ["第一次买", "朋友推荐", "刷到", "种草"],
  "刚换手机": ["给家里人", "回购", "又买", "再买", "朋友推荐", "刷到", "种草"]
};

export const handler = async event => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Only POST requests are allowed." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return jsonResponse(500, { error: "Missing OPENAI_API_KEY" });
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body." });
  }

  const request = {
    sellingPoints: cleanList(payload.sellingPoints).slice(0, 8),
    useScenes: cleanList(payload.useScenes).slice(0, 8),
    creativityLevel: normalizeCreativity(payload.creativityLevel),
    useMaterialStyle: Boolean(payload.useMaterialStyle),
    materials: cleanMaterials(payload.materials).slice(0, 30),
    editFeedbackHistory: cleanEditFeedback(payload.editFeedbackHistory).slice(0, 20)
  };

  if (!request.sellingPoints.length || !request.useScenes.length) {
    return jsonResponse(400, { error: "sellingPoints and useScenes are required." });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: buildInstructions(),
      input: buildPrompt(request),
      temperature: temperatureFor(request.creativityLevel),
      max_output_tokens: 2400
    });

    const parsedCopies = parseCopies(response.output_text);
    const copies = filterCopies(parsedCopies, request).slice(0, 10).map(content => ({ content }));

    return jsonResponse(200, { copies });
  } catch (error) {
    console.error("generate-copy OpenAI failed:", {
      name: error?.name,
      message: error?.message,
      status: error?.status
    });
    return jsonResponse(500, { error: "OpenAI generation failed" });
  }
};

function buildInstructions() {
  return [
    "你是电商运营买家秀文案生成助手，只生成中文真实用户评价风格文案。",
    "只输出合法 JSON，不要 Markdown，不要解释，不要编号。",
    "JSON 格式必须是 {\"copies\":[{\"content\":\"...\"}]}。",
    "copies 尽量正好 10 条，每个 content 是字符串。",
    "每条文案像真实用户评价，不像广告、官方介绍或推广图文案。",
    "每条只围绕用户选择中的 1-2 个卖点，且只使用用户选择中的 1 个主要场景。",
    "不要出现任何未选择的卖点或未选择的场景。",
    "不要堆参数，不要泛泛写充电快、温度低、颜值高、很好用。",
    "要写清楚为什么买、在哪里用、和之前有什么区别、用完什么感受中的至少两个。",
    "素材库和编辑反馈只能学习语气、节奏、购买理由和细节密度，不能复制原句，也不能只替换几个词。",
    `禁止出现广告词：${bannedPhrases.join("、")}。`,
    `禁止夸张承诺：${exaggeratedPhrases.join("、")}。`
  ].join("\n");
}

function buildPrompt(request) {
  return JSON.stringify({
    task: "生成苹果充电器买家秀文案",
    outputFormat: {
      copies: [{ content: "文案内容" }]
    },
    count: 10,
    selectedSellingPoints: request.sellingPoints,
    selectedUseScenes: request.useScenes,
    strictRules: [
      "最高优先级：严格遵守 selectedSellingPoints 和 selectedUseScenes。",
      "如果只选择低温，只能围绕温度稳定、发热感更轻等体验，不要写快充、颜值、套装。",
      "如果只选择办公室用，只能写办公室、公司、工位、上班、午休等场景，不要写家里、床头、朋友推荐、网络种草、回购。",
      "如果选择朋友推荐购买，必须体现朋友推荐，不能写网络种草。",
      "如果选择网络种草购买，必须体现刷到推荐、看评价、被种草，不能写朋友推荐。",
      "如果选择回购，必须体现之前买过、用过、又买一个、再买一个。",
      "如果选择刚换手机，必须体现刚换手机、新手机、不想继续用旧头等逻辑。"
    ],
    creativityLevel: request.creativityLevel,
    creativityRules: creativityRulesFor(request.creativityLevel),
    materialStyleMode: request.useMaterialStyle,
    materialStyleSamples: request.useMaterialStyle ? request.materials.map(item => item.content) : [],
    editFeedbackSamples: request.editFeedbackHistory,
    qualityRules: [
      "同一批 10 条不要雷同，开头、结尾、购买动机和句子节奏要变化。",
      "文案长度要有变化，稳定偏短中，标准中等，发散可以更有细节但仍是真实评价。",
      "不要直接复制素材库或编辑反馈原文。"
    ]
  });
}

function creativityRulesFor(level) {
  if (level === "stable") {
    return ["保守", "普通真实评价", "句式简单", "少转折", "字数短到中等", "可信优先"];
  }
  if (level === "wild") {
    return ["场景细节更多", "购买动机更多样", "允许轻微故事感", "句式变化更大", "不能变成广告"];
  }
  return ["真实自然", "有购买原因", "有使用场景", "有具体体验", "适合日常批量生成"];
}

function temperatureFor(level) {
  if (level === "stable") return 0.55;
  if (level === "wild") return 0.9;
  return 0.72;
}

function parseCopies(text) {
  const parsed = safeJsonParse(text) || safeJsonParse(extractJson(text));
  const rawCopies = Array.isArray(parsed?.copies) ? parsed.copies : [];
  return rawCopies
    .map(item => typeof item === "string" ? item : item?.content)
    .map(item => String(item || "").trim())
    .filter(Boolean);
}

function filterCopies(copies, request) {
  const seen = new Set();
  return copies.filter(content => {
    const normalized = normalizeText(content);
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    if (containsBlockedPhrase(content)) return false;
    if (isTooSimilarToMaterials(content, request.materials)) return false;
    if (hasUnselectedSellingPoint(content, request.sellingPoints)) return false;
    if (hasUnselectedScene(content, request.useScenes)) return false;
    if (!satisfiesRequiredScene(content, request.useScenes)) return false;
    return true;
  });
}

function containsBlockedPhrase(text) {
  return [...bannedPhrases, ...exaggeratedPhrases].some(phrase => text.includes(phrase));
}

function hasUnselectedSellingPoint(text, selectedPoints) {
  return Object.entries(sellingPointKeywords).some(([point, keywords]) => {
    if (selectedPoints.includes(point)) return false;
    return keywords.some(keyword => text.includes(keyword));
  });
}

function hasUnselectedScene(text, selectedScenes) {
  return Object.entries(sceneConflicts).some(([scene, conflicts]) => {
    if (selectedScenes.includes(scene)) return false;
    return conflicts.some(keyword => text.includes(keyword));
  });
}

function satisfiesRequiredScene(text, selectedScenes) {
  if (selectedScenes.includes("朋友推荐购买") && /朋友|推荐/.test(text)) return true;
  if (selectedScenes.includes("网络种草购买") && /刷到|种草|评价|网上|推荐/.test(text)) return true;
  if (selectedScenes.includes("回购") && /回购|又买|再买|之前买过|买过/.test(text)) return true;
  if (selectedScenes.includes("刚换手机") && /刚换|新手机|旧头|旧充电器/.test(text)) return true;
  return selectedScenes.some(scene => {
    if (scene === "办公室用") return /办公室|公司|工位|上班|午休/.test(text);
    if (scene === "家里用") return /家里|床头|客厅|晚上|睡前/.test(text);
    return text.includes(scene);
  });
}

function isTooSimilarToMaterials(text, materials) {
  return materials.some(item => {
    const material = String(item.content || "");
    if (!material) return false;
    const source = normalizeText(text);
    const target = normalizeText(material);
    if (!source || !target) return false;
    if (source.slice(0, 12) === target.slice(0, 12)) return true;
    if (hasLongCommonSubstring(source, target, 8)) return true;
    return calculateTextSimilarity(source, target) > 0.5;
  });
}

function calculateTextSimilarity(a, b) {
  const aTokens = textNgrams(a, 3);
  const bTokens = textNgrams(b, 3);
  if (!aTokens.length || !bTokens.length) return 0;
  const bSet = new Set(bTokens);
  const overlap = aTokens.filter(token => bSet.has(token)).length;
  return overlap / Math.min(aTokens.length, bTokens.length);
}

function textNgrams(text, size) {
  const normalized = normalizeText(text);
  const result = [];
  for (let index = 0; index <= normalized.length - size; index += 1) {
    result.push(normalized.slice(index, index + size));
  }
  return result;
}

function hasLongCommonSubstring(source, target, minLength) {
  if (source.length < minLength || target.length < minLength) return false;
  for (let index = 0; index <= source.length - minLength; index += 1) {
    if (target.includes(source.slice(index, index + minLength))) return true;
  }
  return false;
}

function extractJson(text) {
  const match = String(text || "").match(/\{[\s\S]*\}/);
  return match ? match[0] : "";
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function normalizeCreativity(value) {
  const raw = String(value || "standard");
  if (raw === "稳定" || raw === "stable") return "stable";
  if (raw === "发散" || raw === "wild") return "wild";
  return "standard";
}

function cleanList(value) {
  return Array.isArray(value)
    ? value.map(item => String(item || "").trim()).filter(Boolean)
    : [];
}

function cleanMaterials(value) {
  return Array.isArray(value)
    ? value.map(item => ({ content: String(item?.content || "").trim() })).filter(item => item.content)
    : [];
}

function cleanEditFeedback(value) {
  return Array.isArray(value)
    ? value.map(item => ({
      originalText: String(item?.originalText || "").slice(0, 180),
      editedText: String(item?.editedText || "").slice(0, 180),
      selectedSellingPoints: cleanList(item?.selectedSellingPoints).slice(0, 6),
      selectedUseScenes: cleanList(item?.selectedUseScenes).slice(0, 6),
      creativityLevel: String(item?.creativityLevel || "")
    })).filter(item => item.originalText || item.editedText)
    : [];
}

function normalizeText(text) {
  return String(text || "").replace(/[，。！？、\s,.!?;；：“”"'\-—（）()【】\[\]]/g, "");
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  };
}

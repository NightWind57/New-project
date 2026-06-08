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

const adLikePhrases = [
  "官方介绍",
  "产品卖点",
  "强烈推荐",
  "赶紧下单",
  "值得拥有",
  "入手不亏",
  "效果惊艳",
  "体验拉满",
  "高端大气",
  "旗舰级",
  "爆款",
  "必备好物"
];

const sellingPointKeywords = {
  "快充": ["快充", "快充速度", "充得很快", "速度很快", "补电很快", "充电速度"],
  "低温": ["低温", "发热", "不热", "温度", "烫"],
  "颜值": ["颜值", "好看", "颜色", "外观", "桌面", "耐看"],
  "对比杂牌": ["杂牌", "便宜头", "不放心", "靠谱"],
  "对比旧充电器": ["旧充电器", "旧头", "以前那个", "之前那个"]
};

const sellingPointRules = {
  "快充": {
    allow: ["补电快", "临时充电方便", "出门前补电", "午休补电", "比旧充电器快"],
    forbid: ["低温", "颜值", "杂牌", "旧充电器"]
  },
  "低温": {
    allow: ["温度比较稳", "没那么容易热", "边用边充没那么夸张", "用着安心"],
    forbid: ["快充速度", "颜值", "杂牌", "旧充电器"]
  },
  "颜值": {
    allow: ["颜色", "桌面搭配", "外观质感", "放在桌面好看", "放在床头好看"],
    forbid: ["快充", "低温", "杂牌", "旧充电器"]
  },
  "对比杂牌": {
    allow: ["之前用杂牌不放心", "便宜头发热", "换成靠谱品牌更踏实"],
    forbid: ["旧充电器", "颜值", "快充", "低温"]
  },
  "对比旧充电器": {
    allow: ["之前旧头用了很久", "旧头充得慢", "旧头容易热", "换后体验更好"],
    forbid: ["杂牌", "颜值", "快充", "低温"]
  }
};

const sceneConflicts = {
  "办公室用": ["床头", "家里", "客厅", "睡前", "朋友推荐", "朋友说", "刷到", "种草", "回购", "又买", "再买", "刚换手机", "新手机"],
  "家里用": ["办公室", "公司", "工位", "上班", "午休", "朋友推荐", "朋友说", "刷到", "种草", "回购", "又买", "再买", "刚换手机", "新手机"],
  "朋友推荐购买": ["刷到", "种草", "看评价", "网上推荐", "回购", "又买", "再买"],
  "网络种草购买": ["朋友推荐", "朋友说", "朋友用了", "回购", "又买", "再买"],
  "回购": ["第一次买", "朋友推荐", "刷到", "种草"],
  "刚换手机": ["给家里人", "回购", "又买", "再买", "朋友推荐", "刷到", "种草"]
};

const sceneKeywords = {
  "刚换手机": ["刚换手机", "新手机", "旧充电头", "旧头"],
  "办公室用": ["办公室", "公司", "工位", "上班", "午休"],
  "家里用": ["家里", "床头", "客厅", "晚上", "睡前"],
  "朋友推荐购买": ["朋友推荐", "朋友用过", "朋友说", "听朋友"],
  "网络种草购买": ["刷到", "种草", "看评价", "网上看到", "看博主"],
  "回购": ["回购", "又买", "再买", "之前买过", "买过一个"]
};

const sceneRules = {
  "刚换手机": {
    must: ["刚换手机", "新手机", "不想继续用旧充电头", "配件也想换稳一点"],
    forbid: ["办公室", "家里", "朋友推荐", "网络种草", "回购"]
  },
  "办公室用": {
    must: ["办公室", "公司", "工位", "上班", "午休", "放工位备用"],
    forbid: ["床头", "家里", "晚上睡前", "朋友推荐", "网络种草", "回购"]
  },
  "家里用": {
    must: ["家里", "床头", "客厅", "晚上", "睡前", "家里备用"],
    forbid: ["办公室", "工位", "公司", "朋友推荐", "网络种草", "回购"]
  },
  "朋友推荐购买": {
    must: ["朋友推荐", "朋友用过", "听朋友说不错"],
    forbid: ["网络种草", "刷到推荐", "看博主"]
  },
  "网络种草购买": {
    must: ["刷到推荐", "看评价", "被种草", "网上看到"],
    forbid: ["朋友推荐"]
  },
  "回购": {
    must: ["之前买过", "用过一个", "又买一个", "再买一个", "回购"],
    forbid: ["第一次购买"]
  }
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
    const copies = await generateValidatedCopies(client, request);
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

async function generateValidatedCopies(client, request) {
  const accepted = [];
  const rejectionSummary = {};
  for (let attempt = 0; attempt < 3 && accepted.length < 10; attempt += 1) {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: buildInstructions(),
      input: buildPrompt(request, { attempt, acceptedCount: accepted.length, rejectionSummary }),
      temperature: temperatureFor(request.creativityLevel, attempt),
      max_output_tokens: 2800
    });
    const parsedCopies = parseCopies(response.output_text);
    const { accepted: nextAccepted, rejected } = filterCopies(parsedCopies, request, accepted);
    nextAccepted.forEach(item => accepted.push(item));
    rejected.forEach(reason => {
      rejectionSummary[reason] = (rejectionSummary[reason] || 0) + 1;
    });
  }
  return accepted.slice(0, 10);
}

function buildInstructions() {
  return [
    "你是电商买家秀文案专家，不是广告文案专家。",
    "你只生成中文真实用户评价风格文案。",
    "只输出合法 JSON，不要 Markdown，不要解释，不要编号。",
    "JSON 格式必须是 {\"copies\":[{\"content\":\"...\",\"usedSellingPoints\":[\"实际使用的卖点\"],\"usedScene\":\"实际使用的场景\",\"styleSource\":\"material_style / default_style / edit_feedback\",\"qualityNote\":\"简短说明为什么这样写\"}]}。",
    "copies 尽量正好 10 条，每个 content 是字符串。",
    "每条文案像真实用户评价，不像广告、官方介绍或推广图文案。",
    "每条文案必须包含购买原因、使用场景、使用后的真实体验三者中的至少两个。",
    "每条只围绕用户选择中的 1-2 个卖点，且只使用用户选择中的 1 个主要场景。",
    "不要出现任何未选择的卖点或未选择的场景。",
    "不要写成官方介绍，不要写成推广图文案，不要堆参数，不要使用夸张词。",
    "不要堆参数，不要泛泛写充电快、温度低、颜值高、很好用。",
    "要写清楚为什么买、在哪里用、和之前有什么区别、用完什么感受中的至少两个。",
    "素材库和编辑反馈只能学习语气、节奏、购买理由和细节密度，不能复制原句，也不能只替换几个词。",
    `禁止出现广告词：${bannedPhrases.join("、")}。`,
    `禁止夸张承诺：${exaggeratedPhrases.join("、")}。`
  ].join("\n");
}

function buildPrompt(request, retry = {}) {
  return JSON.stringify({
    task: "生成苹果充电器买家秀文案",
    outputFormat: {
      copies: [{
        content: "文案内容",
        usedSellingPoints: ["实际使用的卖点"],
        usedScene: "实际使用的场景",
        styleSource: "material_style / default_style / edit_feedback",
        qualityNote: "简短说明为什么这样写"
      }]
    },
    count: 10,
    selectedSellingPoints: request.sellingPoints,
    selectedUseScenes: request.useScenes,
    allowedSellingPointRules: pickRules(sellingPointRules, request.sellingPoints),
    forbiddenSellingPoints: forbiddenRules(sellingPointRules, request.sellingPoints),
    requiredSceneRules: pickRules(sceneRules, request.useScenes),
    forbiddenScenes: forbiddenRules(sceneRules, request.useScenes),
    strictRules: [
      "最高优先级：严格遵守 selectedSellingPoints 和 selectedUseScenes。",
      "用户选择什么卖点，就只能写什么卖点。如果只选择一个卖点，10 条都必须围绕这个卖点，不要为了丰富而引入其他未选择卖点。",
      "用户选择什么场景，就只能写什么场景。每条文案只使用 selectedUseScenes 里的一个主要场景。",
      "如果只选择低温，只能围绕温度稳定、发热感更轻等体验，不要写快充、颜值、套装。",
      "如果只选择办公室用，只能写办公室、公司、工位、上班、午休等场景，不要写家里、床头、朋友推荐、网络种草、回购。",
      "如果选择朋友推荐购买，必须体现朋友推荐，不能写网络种草。",
      "如果选择网络种草购买，必须体现刷到推荐、看评价、被种草，不能写朋友推荐。",
      "如果选择回购，必须体现之前买过、用过、又买一个、再买一个。",
      "如果选择刚换手机，必须体现刚换手机、新手机、不想继续用旧头等逻辑。"
    ],
    creativityLevel: request.creativityLevel,
    creativityRules: creativityRulesFor(request.creativityLevel),
    targetLength: lengthRuleFor(request.creativityLevel),
    materialStyleMode: request.useMaterialStyle,
    materialStyleSamples: request.useMaterialStyle ? request.materials.map(item => item.content) : [],
    materialStyleRules: request.useMaterialStyle && request.materials.length ? [
      "这些素材是用户认可的优秀案例。",
      "只能学习语气、真实感、说话节奏、细节密度、购买原因表达、使用体验表达。",
      "不能复制素材原句，不能改几个词就输出，不能使用素材库原文开头，不能使用素材库中连续 8 个字以上的片段。"
    ] : [],
    editFeedbackSamples: request.editFeedbackHistory,
    editFeedbackRules: request.editFeedbackHistory.length ? [
      "编辑反馈是用户过去把生成文案改成最终文案的样本。",
      "学习用户修改后的表达倾向、常删内容、常加表达、长短偏好和场景细节偏好。",
      "不要复制 originalText，也不要复制 editedText 原文。"
    ] : [],
    retryContext: retry.attempt ? {
      attempt: retry.attempt + 1,
      acceptedCount: retry.acceptedCount,
      rejectedReasons: retry.rejectionSummary,
      instruction: "上一轮有文案被后端过滤。请更严格遵守卖点、场景、长度、禁用词和素材库相似度规则。"
    } : null,
    qualityRules: [
      "同一批 10 条不要雷同，开头、结尾、购买动机和句子节奏要变化。",
      "文案长度要有变化，稳定偏短中，标准中等，发散可以更有细节但仍是真实评价。",
      "稳定：40-70 字左右，句子更短，表达更保守，更像普通用户评价，少转折，少故事感。",
      "标准：60-100 字左右，有购买原因、使用场景、具体体验，句式有变化。",
      "发散：80-130 字左右，允许更强故事感和更具体细节，但仍像真实买家秀，不能像广告。",
      "不要直接复制素材库或编辑反馈原文。"
    ]
  });
}

function pickRules(ruleMap, selected) {
  return Object.fromEntries(selected.map(key => [key, ruleMap[key]]).filter(([, value]) => value));
}

function forbiddenRules(ruleMap, selected) {
  return Object.fromEntries(Object.entries(ruleMap).filter(([key]) => !selected.includes(key)));
}

function creativityRulesFor(level) {
  if (level === "stable") {
    return ["更保守", "普通真实评价", "句式简单", "少转折", "少故事感", "40-70 字左右", "可信优先"];
  }
  if (level === "wild") {
    return ["仍然像真实买家秀", "场景细节更多", "购买动机更多样", "允许轻微故事感", "个人感受更强", "80-130 字左右", "不能变成广告"];
  }
  return ["真实自然", "有购买原因", "有使用场景", "有具体体验", "句式有一定变化", "60-100 字左右", "适合日常批量生成"];
}

function lengthRuleFor(level) {
  if (level === "stable") return "每条 40-70 字左右";
  if (level === "wild") return "每条 80-130 字左右";
  return "每条 60-100 字左右";
}

function temperatureFor(level, attempt = 0) {
  const retryReduction = attempt * 0.06;
  if (level === "stable") return 0.55;
  if (level === "wild") return Math.max(0.76, 0.9 - retryReduction);
  return Math.max(0.62, 0.72 - retryReduction);
}

function parseCopies(text) {
  const parsed = safeJsonParse(text) || safeJsonParse(extractJson(text));
  const rawCopies = Array.isArray(parsed?.copies) ? parsed.copies : [];
  return rawCopies
    .map(item => normalizeCopyItem(item))
    .filter(item => item.content);
}

function normalizeCopyItem(item) {
  if (typeof item === "string") {
    return {
      content: item.trim(),
      usedSellingPoints: [],
      usedScene: "",
      styleSource: "default_style",
      qualityNote: ""
    };
  }
  return {
    content: String(item?.content || "").trim(),
    usedSellingPoints: cleanList(item?.usedSellingPoints).slice(0, 2),
    usedScene: String(item?.usedScene || "").trim(),
    styleSource: normalizeStyleSource(item?.styleSource),
    qualityNote: String(item?.qualityNote || "").trim().slice(0, 120)
  };
}

function normalizeStyleSource(value) {
  const source = String(value || "");
  if (source === "material_style" || source === "edit_feedback") return source;
  return "default_style";
}

function filterCopies(copies, request, existing = []) {
  const seen = new Set(existing.map(item => normalizeText(item.content)));
  const accepted = [];
  const rejected = [];
  copies.forEach(item => {
    const reason = getRejectionReason(item, request, seen);
    if (reason) {
      rejected.push(reason);
      return;
    }
    seen.add(normalizeText(item.content));
    accepted.push({
      content: item.content,
      usedSellingPoints: normalizeUsedSellingPoints(item, request),
      usedScene: normalizeUsedScene(item, request),
      styleSource: item.styleSource || inferStyleSource(request),
      qualityNote: item.qualityNote || "包含用户选择的卖点和场景，并按真实买家秀口吻表达。"
    });
  });
  return { accepted, rejected };
}

function getRejectionReason(item, request, seen) {
  const content = String(item.content || "").trim();
  const normalized = normalizeText(content);
  if (!normalized || seen.has(normalized)) return "duplicate_or_empty";
  if (normalized.length < 28) return "too_short";
  if (containsBlockedPhrase(content)) return "blocked_phrase";
  if (isAdLike(content)) return "ad_like";
  if (isTooSimilarToMaterials(content, request.materials)) return "material_similarity";
  if (hasUnselectedSellingPoint(content, request.sellingPoints)) return "unselected_selling_point";
  if (hasSelectedSellingPointConflict(content, request.sellingPoints)) return "selected_selling_point_conflict";
  if (hasUnselectedScene(content, request.useScenes)) return "unselected_scene";
  if (hasSelectedSceneConflict(content, request.useScenes)) return "selected_scene_conflict";
  if (!satisfiesRequiredScene(content, request.useScenes)) return "missing_required_scene";
  if (!satisfiesSelectedSellingPoint(content, request.sellingPoints)) return "missing_selected_selling_point";
  if (!hasBuyerShowElements(content)) return "weak_buyer_show_elements";
  return "";
}

function containsBlockedPhrase(text) {
  return [...bannedPhrases, ...exaggeratedPhrases].some(phrase => text.includes(phrase));
}

function isAdLike(text) {
  return adLikePhrases.some(phrase => text.includes(phrase)) || /[！!]{2,}|立即|马上购买|全网|销量|爆卖|优惠/.test(text);
}

function hasUnselectedSellingPoint(text, selectedPoints) {
  return Object.entries(sellingPointKeywords).some(([point, keywords]) => {
    if (selectedPoints.includes(point)) return false;
    return keywords.some(keyword => text.includes(keyword));
  });
}

function hasSelectedSellingPointConflict(text, selectedPoints) {
  return selectedPoints.some(point => {
    const forbidden = sellingPointRules[point]?.forbid || [];
    return forbidden.some(keyword => text.includes(keyword) && !isKeywordAllowedBySelectedPoint(keyword, selectedPoints));
  });
}

function isKeywordAllowedBySelectedPoint(keyword, selectedPoints) {
  return selectedPoints.some(point => {
    if (keyword === point) return true;
    return (sellingPointKeywords[point] || []).some(allowedKeyword => allowedKeyword.includes(keyword) || keyword.includes(allowedKeyword));
  });
}

function hasUnselectedScene(text, selectedScenes) {
  return Object.entries(sceneKeywords).some(([scene, keywords]) => {
    if (selectedScenes.includes(scene)) return false;
    return keywords.some(keyword => text.includes(keyword));
  });
}

function hasSelectedSceneConflict(text, selectedScenes) {
  return selectedScenes.some(scene => {
    const conflicts = sceneConflicts[scene] || [];
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

function satisfiesSelectedSellingPoint(text, selectedPoints) {
  return selectedPoints.some(point => {
    const keywords = sellingPointKeywords[point] || [point];
    return keywords.some(keyword => text.includes(keyword));
  });
}

function hasBuyerShowElements(text) {
  const hasReason = /因为|主要|之前|本来|刚换|朋友|刷到|看评价|回购|不想|担心|缺一个|买来/.test(text);
  const hasScene = /办公室|公司|工位|上班|午休|家里|床头|客厅|晚上|睡前|朋友|刷到|评价|回购|新手机/.test(text);
  const hasExperience = /用|充|温度|发热|颜色|外观|舒服|安心|省心|踏实|方便|顺手|补电|不放心|稳/.test(text);
  return [hasReason, hasScene, hasExperience].filter(Boolean).length >= 2;
}

function normalizeUsedSellingPoints(item, request) {
  const fromModel = cleanList(item.usedSellingPoints).filter(point => request.sellingPoints.includes(point));
  if (fromModel.length) return fromModel.slice(0, 2);
  return request.sellingPoints.filter(point => (sellingPointKeywords[point] || [point]).some(keyword => item.content.includes(keyword))).slice(0, 2);
}

function normalizeUsedScene(item, request) {
  if (request.useScenes.includes(item.usedScene)) return item.usedScene;
  return request.useScenes.find(scene => satisfiesRequiredScene(item.content, [scene])) || request.useScenes[0] || "";
}

function inferStyleSource(request) {
  if (request.editFeedbackHistory.length) return "edit_feedback";
  if (request.useMaterialStyle && request.materials.length) return "material_style";
  return "default_style";
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

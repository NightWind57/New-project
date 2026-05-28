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
  "完全不发热",
  "一点都不烫",
  "秒充",
  "永远不伤电池",
  "官方原装级别"
];

export const handler = async event => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Only POST requests are allowed." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return jsonResponse(500, { error: "Missing OPENAI_API_KEY environment variable." });
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const sellingPoints = cleanList(payload.sellingPoints);
    const useScenes = cleanList(payload.useScenes);
    const creativityLevel = String(payload.creativityLevel || "standard");
    const useMaterialStyle = Boolean(payload.useMaterialStyle);
    const materials = cleanMaterials(payload.materials);
    const editFeedbackHistory = cleanEditFeedback(payload.editFeedbackHistory);

    if (!sellingPoints.length || !useScenes.length) {
      return jsonResponse(400, { error: "sellingPoints and useScenes are required." });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: buildInstructions(),
      input: buildPrompt({ sellingPoints, useScenes, creativityLevel, useMaterialStyle, materials, editFeedbackHistory }),
      temperature: creativityLevel === "wild" ? 0.95 : creativityLevel === "stable" ? 0.55 : 0.75,
      max_output_tokens: 1800
    });

    const copies = parseCopies(response.output_text);
    if (copies.length !== 10) {
      throw new Error("OpenAI response did not contain 10 valid copies.");
    }

    return jsonResponse(200, { copies });
  } catch (error) {
    console.error("generate-copy failed:", error.message);
    return jsonResponse(500, { error: "Failed to generate buyer-show copy." });
  }
};

function buildInstructions() {
  return [
    "你是电商运营买家秀文案生成助手，只生成中文真实用户评价风格文案。",
    "必须只返回 JSON，格式为 {\"copies\":[\"文案1\",\"文案2\"]}，copies 必须正好 10 条。",
    "不要输出解释、Markdown、编号或额外字段。",
    "每条文案像普通用户买家秀，不像广告口号。",
    "每条只突出 1-2 个卖点，并包含具体使用场景。",
    "不要直接复制素材库原句，只学习说话方式、语气、场景表达习惯、句子节奏和细节密度。",
    `禁止出现这些词：${bannedPhrases.join("、")}。`,
    "不要做夸张承诺，不要说完全不发热、一点都不烫、秒充、永远不伤电池、官方原装级别。",
    "同一批 10 条要有明显差异，开头、结尾、场景叙事结构都要变化。"
  ].join("\n");
}

function buildPrompt({ sellingPoints, useScenes, creativityLevel, useMaterialStyle, materials, editFeedbackHistory }) {
  const styleInstruction = useMaterialStyle && materials.length
    ? "参考素材库的说话方式、语气、场景表达和句子长短节奏，但不能复用素材库原句，也不能只替换几个词。"
    : "不参考素材库，使用自然真实的买家秀表达。";

  return JSON.stringify({
    task: "生成 10 条苹果充电器买家秀文案",
    sellingPoints,
    useScenes,
    creativityLevel,
    styleInstruction,
    styleReferences: materials.map(item => item.content),
    editFeedbackHistory,
    outputRules: [
      "返回 JSON：{\"copies\":[\"...共10条...\"]}",
      "每条 35-120 个中文字符，长度要有变化",
      "必须有具体场景，例如办公室、家里、刚换手机、朋友推荐、网络种草、回购等",
      "不要雷同，不要连续使用相同开头",
      "不要直接复制 styleReferences 中连续 8 个字以上的片段",
      "不要使用广告化词语或夸张承诺"
    ]
  });
}

function parseCopies(text) {
  const parsed = safeJsonParse(text) || safeJsonParse(extractJson(text));
  const copies = Array.isArray(parsed?.copies) ? parsed.copies : [];
  return uniqueList(copies)
    .map(item => String(item || "").trim())
    .filter(item => item && !bannedPhrases.some(phrase => item.includes(phrase)))
    .slice(0, 10);
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

function cleanList(value) {
  return Array.isArray(value)
    ? value.map(item => String(item || "").trim()).filter(Boolean).slice(0, 20)
    : [];
}

function cleanMaterials(value) {
  return Array.isArray(value)
    ? value.map(item => ({ content: String(item?.content || "").trim() })).filter(item => item.content).slice(0, 30)
    : [];
}

function cleanEditFeedback(value) {
  return Array.isArray(value)
    ? value.map(item => ({
      originalText: String(item?.originalText || "").slice(0, 180),
      editedText: String(item?.editedText || "").slice(0, 180),
      creativityLevel: String(item?.creativityLevel || "")
    })).filter(item => item.originalText || item.editedText).slice(0, 30)
    : [];
}

function uniqueList(list) {
  const seen = new Set();
  return list.filter(item => {
    const value = String(item || "").trim();
    if (!value || seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body)
  };
}

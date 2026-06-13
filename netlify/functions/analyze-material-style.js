const STYLE_KEYS = {
  purchaseTrigger: "",
  narrativeStructure: "",
  tone: "",
  lengthType: "",
  detailDensity: "",
  openingType: "",
  endingType: "",
  sellingPointExpression: "",
  sceneSpecificity: "",
  contrastType: "",
  adIntensity: "",
  storyLevel: "",
  styleSummary: ""
};

export const handler = async event => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Only POST requests are allowed." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return jsonResponse(500, { error: "Missing GEMINI_API_KEY" });
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body." });
  }

  const content = String(payload.content || "").trim();
  if (!content) {
    return jsonResponse(400, { error: "content is required." });
  }

  try {
    const styleAnalysis = await analyzeWithGemini(content);
    return jsonResponse(200, { styleAnalysis });
  } catch (error) {
    console.error("analyze-material-style failed:", {
      name: error?.name,
      message: error?.message,
      status: error?.status
    });
    return jsonResponse(500, { error: "Material style analysis failed" });
  }
};

async function analyzeWithGemini(content) {
  const model = process.env.GEMINI_ANALYSIS_MODEL || "gemini-2.5-flash-lite";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${buildSystemPrompt()}\n\n待分析素材：\n${JSON.stringify({ content })}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 900,
        responseMimeType: "application/json"
      }
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.error?.message || `Gemini returned ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const text = extractResponseText(data);
  const parsed = safeJsonParse(text) || safeJsonParse(extractJson(text));
  return normalizeStyleAnalysis(parsed?.styleAnalysis || parsed);
}

function buildSystemPrompt() {
  return [
    "你是电商买家秀素材风格分析器。",
    "你的任务是分析素材文案的风格特征，不是总结内容，不是改写文案，不要生成新文案。",
    "只返回严格 JSON，不要 Markdown，不要解释。",
    "返回格式必须是 {\"styleAnalysis\":{...}}。",
    "字段只能使用指定枚举或短语，styleSummary 不超过 80 个中文字。",
    "purchaseTrigger 可选：原装损坏/换新手机/办公室备用/家里备用/朋友推荐/网络种草/回购/对比旧充电器/对比杂牌/其他。",
    "tone 可选：克制自然/轻松口语/故事感/偏广告/其他。",
    "lengthType 可选：短/中/长。",
    "detailDensity 可选：低/中/高。",
    "openingType 可选：购买原因/使用场景/对比/到货/直接体验/推荐来源/回购/其他。",
    "endingType 可选：安心/省心/推荐/对比总结/继续回购/无明确结尾/其他。",
    "sellingPointExpression 可选：直接描述/间接体验/对比体现/混合。",
    "sceneSpecificity 可选：模糊/一般/具体。",
    "contrastType 可选：无/原装/杂牌/旧充电器/其他。",
    "adIntensity 可选：低/中/高。",
    "storyLevel 可选：无/轻度/明显。"
  ].join("\n");
}

function extractResponseText(data) {
  if (typeof data?.output_text === "string") return data.output_text;
  const geminiText = (data?.candidates || [])
    .flatMap(candidate => candidate?.content?.parts || [])
    .map(part => part?.text || "")
    .join("")
    .trim();
  if (geminiText) return geminiText;

  return (data?.output || [])
    .flatMap(item => item?.content || [])
    .map(part => part?.text || "")
    .join("")
    .trim();
}

function normalizeStyleAnalysis(value = {}) {
  const result = {};
  Object.keys(STYLE_KEYS).forEach(key => {
    result[key] = String(value?.[key] || "").trim().slice(0, key === "styleSummary" ? 80 : 60);
  });
  return result;
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

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  };
}

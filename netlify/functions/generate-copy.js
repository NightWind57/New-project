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

  if (!process.env.GEMINI_API_KEY) {
    return jsonResponse(500, { error: "Missing GEMINI_API_KEY" });
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
    selectedPurchaseReasons: cleanList(payload.selectedPurchaseReasons).slice(0, 8),
    creativityLevel: normalizeCreativity(payload.creativityLevel),
    useMaterialStyle: Boolean(payload.useMaterialStyle),
    styleProfile: cleanStyleProfile(payload.styleProfile),
    manualPreferences: cleanManualPreferences(payload.manualPreferences),
    effectiveStylePreferences: cleanEffectiveStylePreferences(payload.effectiveStylePreferences),
    representativeMaterials: cleanRepresentativeMaterials(payload.representativeMaterials).slice(0, 5),
    materialsForSimilarity: cleanMaterials(payload.materialsForSimilarity || payload.materials).slice(0, 100),
    recentGeneratedFingerprints: cleanRecentFingerprints(payload.recentGeneratedFingerprints).slice(0, 100),
    editFeedbackHistory: cleanEditFeedback(payload.editFeedbackHistory).slice(0, 20)
  };

  if (!request.sellingPoints.length || !request.useScenes.length) {
    return jsonResponse(400, { error: "sellingPoints and useScenes are required." });
  }

  try {
    const copies = await generateValidatedCopies(request);
    return jsonResponse(200, { copies });
  } catch (error) {
    console.error("generate-copy Gemini failed:", {
      name: error?.name,
      message: error?.message,
      status: error?.status
    });
    return jsonResponse(500, { error: "Gemini generation failed" });
  }
};

async function generateValidatedCopies(request) {
  const accepted = [];
  const rejectionSummary = {};
  const usedPlanIds = new Set();
  const usedPlanSignatures = new Set();
  for (let attempt = 0; attempt < 3 && accepted.length < 10; attempt += 1) {
    const planText = await requestGeminiText(request, { mode: "plans", attempt, acceptedCount: accepted.length, rejectionSummary, usedPlanSignatures: [...usedPlanSignatures] });
    const writingPlans = prepareWritingPlans(parsePlans(planText), request, usedPlanSignatures);
    writingPlans.forEach(plan => usedPlanSignatures.add(getPlanSignature(plan)));
    const responseText = await requestGeminiText(request, { mode: "copies", attempt, acceptedCount: accepted.length, rejectionSummary, writingPlans });
    const parsedCopies = parseCopies(responseText);
    const { accepted: nextAccepted, rejected, usedPlans } = filterCopies(parsedCopies, request, accepted, usedPlanIds);
    nextAccepted.forEach(item => accepted.push(item));
    usedPlans.forEach(planId => usedPlanIds.add(planId));
    rejected.forEach(reason => {
      rejectionSummary[reason] = (rejectionSummary[reason] || 0) + 1;
    });
  }
  return accepted.slice(0, 10);
}

async function requestGeminiText(request, retry) {
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: buildInstructions() }]
      },
      contents: [{
        role: "user",
        parts: [{ text: retry.mode === "plans" ? buildPlanPrompt(request, retry) : buildPrompt(request, retry) }]
      }],
      generationConfig: {
        temperature: temperatureFor(request.creativityLevel, retry.attempt),
        maxOutputTokens: retry.mode === "plans" ? 1800 : 3200,
        responseMimeType: "application/json"
      }
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || `Gemini returned ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  const text = data?.candidates?.[0]?.content?.parts
    ?.map(part => part?.text || "")
    .join("")
    .trim();

  if (!text) {
    throw new Error("Gemini response did not contain text");
  }

  return text;
}

function buildInstructions() {
  return [
    "你是电商买家秀文案专家，不是广告文案专家。",
    "你只生成中文真实用户评价风格文案。",
    "只输出合法 JSON，不要 Markdown，不要解释，不要编号。",
    "规划阶段只输出 {\"plans\":[...]}；正文阶段只输出 {\"copies\":[...]}。",
    "正文 JSON 格式必须是 {\"copies\":[{\"planId\":1,\"content\":\"...\",\"usedSellingPoints\":[\"实际使用的卖点\"],\"usedScene\":\"实际使用的场景\",\"styleSource\":\"material_style / default_style / edit_feedback\",\"qualityNote\":\"简短说明为什么这样写\"}]}。",
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

function buildPlanPrompt(request, retry = {}) {
  return JSON.stringify({
    task: "先规划 10 条不同买家秀文案的 writingPlans，不要生成正文",
    outputFormat: {
      plans: [{
        id: 1,
        narrativeStructure: "",
        openingType: "",
        detailAnchor: "",
        sellingPointExpression: "",
        endingType: "",
        targetLength: "",
        storyLevel: ""
      }]
    },
    count: 10,
    contentHardConstraints: buildContentHardConstraints(request),
    creativityLevel: request.creativityLevel,
    creativityRules: planCreativityRulesFor(request.creativityLevel),
    userStyleProfile: request.useMaterialStyle ? request.styleProfile : null,
    effectiveStylePreferences: request.useMaterialStyle ? request.effectiveStylePreferences : null,
    recentGeneratedFingerprints: request.recentGeneratedFingerprints,
    excludedPlanSignatures: retry.usedPlanSignatures || [],
    planRules: [
      "10 个 plan 必须全部遵守当前 selectedSellingPoints、selectedUseScenes、selectedPurchaseReasons。",
      "不能为多样化编造用户未选择的卖点、场景、购买事实。",
      "至少 5 种 narrativeStructure。",
      "至少 4 种 openingType。",
      "至少 5 个不同 detailAnchor。",
      "同一 endingType 最多 3 次。",
      "同一 narrativeStructure 最多 3 次。",
      "detailAnchor 不能重复。",
      "如果 effectiveStylePreferences 存在，规划时优先参考其中的开头、结构、长度、细节密度、故事感和不喜欢的风格。",
      "effectiveStylePreferences 只决定怎么写，不能改变 selectedSellingPoints、selectedUseScenes、selectedPurchaseReasons。",
      "customInstructions 只作为风格约束；如果与内容硬约束、禁用词、真实性规则冲突，以系统规则为准。",
      "避免 recentGeneratedFingerprints 中高频 opening 和 structureSignature。",
      "只输出 plans JSON，不要正文。"
    ]
  });
}

function buildPrompt(request, retry = {}) {
  const useProfile = request.useMaterialStyle && request.styleProfile && request.styleProfile.materialCount > 0;
  const representativeMaterials = request.useMaterialStyle ? request.representativeMaterials : [];
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
    writingPlans: retry.writingPlans || [],
    contentHardConstraints: buildContentHardConstraints(request),
    contentRules: [
      "最高优先级：严格遵守 selectedSellingPoints 和 selectedUseScenes。",
      "用户选择的卖点、使用场景、购买原因决定写什么。",
      "用户风格画像只决定怎么写，不能改变内容限制。",
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
    styleMode: request.useMaterialStyle ? "use_user_style_profile" : "default_real_buyer_show_style",
    userStyleProfile: useProfile ? request.styleProfile : null,
    manualPreferences: request.useMaterialStyle ? request.manualPreferences : null,
    effectiveStylePreferences: request.useMaterialStyle ? request.effectiveStylePreferences : null,
    userStyleRules: request.useMaterialStyle ? [
      "effectiveStylePreferences 是用户已经确认的最终文案风格偏好，优先级高于自动分析画像。",
      "如果 userStyleProfile 存在，主要学习其中的 tonePreferences、preferredStructures、preferredOpeningTypes、preferredEndingTypes、preferredDetailDensity、preferredLengthType、preferredSellingPointExpression、preferredSceneSpecificity、preferredStoryLevel、avoidStyles。",
      "用户风格画像只影响语气、结构、开头、结尾、细节密度、长度、卖点表达方式和故事感。",
      "人工偏好可以修正自动画像；人工偏好为空时才参考自动画像。",
      "不要把风格画像里的 purchaseTrigger 或 contrastType 当作必须内容；只有当它不违反 selectedSellingPoints 和 selectedUseScenes 时才可借鉴表达方式。",
      "不能引用 styleProfile 中没有的具体内容，不能引入未选择的卖点、场景或购买事实。",
      "customInstructions 只作为风格约束，不得绕过内容硬约束，不得要求虚假、违法、夸张承诺；与系统禁用规则冲突时，以系统规则为准。"
    ] : [
      "不使用用户风格画像，使用默认真实买家秀风格。",
      "仍然严格遵守 selectedSellingPoints、selectedUseScenes 和 selectedPurchaseReasons。"
    ],
    representativeMaterials,
    representativeMaterialRules: request.useMaterialStyle && representativeMaterials.length ? [
      "representativeMaterials 是少量代表案例，只用于理解风格，不是内容来源。",
      "只学习语气、节奏、结构、细节密度、购买原因表达、使用体验表达。",
      "禁止复制代表素材原句，禁止使用相同开头，禁止只替换几个词。",
      "禁止复用代表素材中的具体购买事实、具体场景事实、具体产品词。",
      "不得使用代表素材中连续 8 个字以上的片段。"
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
      "先在内部规划 10 条不同文案，再输出 JSON。",
      "必须严格根据 writingPlans 逐条生成正文，每条 copy 带对应 planId。",
      "一个 writingPlan 只能使用一次，不要复用同一 plan。",
      "10 条至少使用 5 种叙事结构。",
      "至少使用 4 种不同开头方式。",
      "同一结尾方式最多出现 3 次。",
      "不同文案必须有不同购买细节。",
      "不能为追求多样性引入未选择卖点或场景。",
      "同一批 10 条不要雷同，开头、结尾、购买动机和句子节奏要变化。",
      "文案长度要有变化，稳定偏短中，标准中等，发散可以更有细节但仍是真实评价。",
      "稳定：40-70 字左右，句子更短，表达更保守，更像普通用户评价，少转折，少故事感。",
      "标准：60-100 字左右，有购买原因、使用场景、具体体验，句式有变化。",
      "发散：80-130 字左右，允许更强故事感和更具体细节，但仍像真实买家秀，不能像广告。",
      "不要直接复制素材库或编辑反馈原文。"
    ]
  });
}

function buildContentHardConstraints(request) {
  return {
    selectedSellingPoints: request.sellingPoints,
    selectedUseScenes: request.useScenes,
    selectedPurchaseReasons: request.selectedPurchaseReasons,
    allowedSellingPointRules: pickRules(sellingPointRules, request.sellingPoints),
    forbiddenSellingPoints: forbiddenRules(sellingPointRules, request.sellingPoints),
    requiredSceneRules: pickRules(sceneRules, request.useScenes),
    forbiddenScenes: forbiddenRules(sceneRules, request.useScenes)
  };
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

function planCreativityRulesFor(level) {
  if (level === "stable") {
    return ["结构变化适中", "detailAnchor 更日常", "targetLength 偏短中", "storyLevel 低", "可信自然优先"];
  }
  if (level === "wild") {
    return ["结构变化最大", "细节切入角度更多", "允许轻度故事感", "targetLength 中长", "不得脱离所选条件", "不得写成广告文案"];
  }
  return ["结构和开头变化明显", "购买原因、场景、体验完整", "targetLength 中等", "storyLevel 低到中"];
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

function parsePlans(text) {
  const parsed = safeJsonParse(text) || safeJsonParse(extractJson(text));
  const rawPlans = Array.isArray(parsed?.plans) ? parsed.plans : [];
  return rawPlans.map(normalizePlan).filter(plan => plan.detailAnchor);
}

function normalizePlan(plan, index = 0) {
  return {
    id: Number(plan?.id) || index + 1,
    narrativeStructure: String(plan?.narrativeStructure || "").trim().slice(0, 60),
    openingType: String(plan?.openingType || "").trim().slice(0, 40),
    detailAnchor: String(plan?.detailAnchor || "").trim().slice(0, 80),
    sellingPointExpression: String(plan?.sellingPointExpression || "").trim().slice(0, 40),
    endingType: String(plan?.endingType || "").trim().slice(0, 40),
    targetLength: String(plan?.targetLength || "").trim().slice(0, 20),
    storyLevel: String(plan?.storyLevel || "").trim().slice(0, 20)
  };
}

function prepareWritingPlans(modelPlans, request, usedPlanSignatures) {
  const combined = [...modelPlans, ...createFallbackPlans(request)];
  const selected = validateBatchDiversity(combined, request, usedPlanSignatures);
  if (selected.length < 10) {
    const relaxed = fillMissingPlans(selected, createFallbackPlans(request), usedPlanSignatures);
    return relaxed.slice(0, 10).map((plan, index) => ({ ...plan, id: index + 1 }));
  }
  return selected.slice(0, 10).map((plan, index) => ({ ...plan, id: index + 1 }));
}

function validateBatchDiversity(plans, request, usedPlanSignatures = new Set()) {
  const result = [];
  const detailAnchors = new Set();
  const structureCounts = {};
  const endingCounts = {};
  const recentOpenings = getRecentFrequency(request.recentGeneratedFingerprints, "normalizedOpening");
  const recentStructures = getRecentFrequency(request.recentGeneratedFingerprints, "structureSignature");
  plans.map(normalizePlan).forEach(plan => {
    if (!plan.detailAnchor || result.length >= 10) return;
    const signature = getPlanSignature(plan);
    if (usedPlanSignatures.has(signature)) return;
    if (detailAnchors.has(normalizeText(plan.detailAnchor))) return;
    if ((structureCounts[plan.narrativeStructure] || 0) >= 3) return;
    if ((endingCounts[plan.endingType] || 0) >= 3) return;
    if (isPlanTooCloseToRecent(plan, recentOpenings, recentStructures)) return;
    detailAnchors.add(normalizeText(plan.detailAnchor));
    structureCounts[plan.narrativeStructure] = (structureCounts[plan.narrativeStructure] || 0) + 1;
    endingCounts[plan.endingType] = (endingCounts[plan.endingType] || 0) + 1;
    result.push(plan);
  });
  if (detectStructureRepetition(result)) {
    return result.filter((plan, index, list) => list.findIndex(item => getPlanSignature(item) === getPlanSignature(plan)) === index);
  }
  return result;
}

function createFallbackPlans(request) {
  const structures = [
    "购买原因-使用体验-总体感受",
    "使用场景-遇到问题-解决感受",
    "旧体验-换后变化-评价",
    "下单原因-到手体验-日常反馈",
    "使用位置-细节体验-结尾感受",
    "担心点-实际使用-安心结尾"
  ];
  const openings = ["购买原因", "使用场景", "对比", "直接体验", "到手", "日常习惯"];
  const endings = ["安心", "省心", "日常够用", "对比总结", "无明确结尾"];
  const expressions = ["间接体验", "对比体现", "直接描述", "混合"];
  const anchors = detailAnchorsForRequest(request);
  return Array.from({ length: 16 }, (_, index) => normalizePlan({
    id: index + 1,
    narrativeStructure: structures[index % structures.length],
    openingType: openings[index % openings.length],
    detailAnchor: anchors[index % anchors.length] || `日常细节${index + 1}`,
    sellingPointExpression: expressions[index % expressions.length],
    endingType: endings[index % endings.length],
    targetLength: targetLengthForPlan(request.creativityLevel, index),
    storyLevel: request.creativityLevel === "wild" ? (index % 3 === 0 ? "中" : "轻度") : request.creativityLevel === "stable" ? "低" : (index % 2 ? "低" : "中")
  }, index));
}

function fillMissingPlans(selected, fallbackPlans, usedPlanSignatures) {
  const result = [...selected];
  const detailAnchors = new Set(result.map(plan => normalizeText(plan.detailAnchor)));
  const structureCounts = result.reduce((bucket, plan) => {
    bucket[plan.narrativeStructure] = (bucket[plan.narrativeStructure] || 0) + 1;
    return bucket;
  }, {});
  const endingCounts = result.reduce((bucket, plan) => {
    bucket[plan.endingType] = (bucket[plan.endingType] || 0) + 1;
    return bucket;
  }, {});
  fallbackPlans.forEach(plan => {
    if (result.length >= 10) return;
    const signature = getPlanSignature(plan);
    if (usedPlanSignatures.has(signature)) return;
    if (detailAnchors.has(normalizeText(plan.detailAnchor))) return;
    if ((structureCounts[plan.narrativeStructure] || 0) >= 3) return;
    if ((endingCounts[plan.endingType] || 0) >= 3) return;
    result.push(plan);
    detailAnchors.add(normalizeText(plan.detailAnchor));
    structureCounts[plan.narrativeStructure] = (structureCounts[plan.narrativeStructure] || 0) + 1;
    endingCounts[plan.endingType] = (endingCounts[plan.endingType] || 0) + 1;
  });
  return result;
}

function detailAnchorsForRequest(request) {
  const sceneAnchors = {
    "刚换手机": ["新手机刚到手", "旧头继续用不放心", "配件也想换稳一点", "给新手机日常充电", "不想再凑合旧充电头"],
    "办公室用": ["工位固定备用", "午休前后补电", "上班时不用来回带", "公司桌面随手充", "办公室缺固定充电器"],
    "家里用": ["床头固定使用", "晚上睡前充电", "客厅随手补电", "家里多备一个", "不用每天拔来拔去"],
    "朋友推荐购买": ["朋友用过后推荐", "听朋友说体验稳定", "跟着朋友买来试", "朋友反馈比较省心", "朋友先买过"],
    "网络种草购买": ["刷到评价后下单", "看评价时留意体验", "网上看到推荐", "被真实反馈种草", "对比几条评价后买"],
    "回购": ["之前买过一个", "又买一个固定位置用", "用顺手后再买", "家里办公室各一个", "第二个备用"]
  };
  const pointAnchors = {
    "快充": ["临时补电", "出门前补一会儿", "午休补电", "不用等太久", "日常补电够用"],
    "低温": ["温度比较稳", "边用边充发热没那么明显", "晚上充电更放心", "摸起来不难受", "比旧头温度稳"],
    "颜值": ["颜色耐看", "桌面不突兀", "外观质感", "床头摆着协调", "和桌面搭配"],
    "对比杂牌": ["之前杂牌不放心", "便宜头发热明显", "换靠谱点更踏实", "每天用不想太省", "给手机用不想凑合"],
    "对比旧充电器": ["旧头用了很久", "旧头充得慢", "旧头容易热", "换后体验舒服", "之前那个跟不上"]
  };
  return uniqueList([
    ...request.useScenes.flatMap(scene => sceneAnchors[scene] || [scene]),
    ...request.sellingPoints.flatMap(point => pointAnchors[point] || [point])
  ]);
}

function targetLengthForPlan(level, index) {
  if (level === "stable") return index % 3 === 0 ? "短" : "中";
  if (level === "wild") return index % 3 === 0 ? "长" : "中长";
  return index % 4 === 0 ? "短中" : "中";
}

function getPlanSignature(plan) {
  return [plan.narrativeStructure, plan.openingType, plan.detailAnchor, plan.endingType].map(normalizeText).join("|");
}

function getRecentFrequency(items, key) {
  return (items || []).reduce((bucket, item) => {
    const value = String(item?.[key] || "").trim();
    if (value) bucket[value] = (bucket[value] || 0) + 1;
    return bucket;
  }, {});
}

function isPlanTooCloseToRecent(plan, recentOpenings, recentStructures) {
  const opening = normalizeText(plan.openingType).slice(0, 24);
  const structure = normalizeText(plan.narrativeStructure);
  return Object.entries(recentOpenings).some(([value, count]) => count >= 3 && calculateOpeningSimilarity(opening, value) > 0.8)
    || Object.entries(recentStructures).some(([value, count]) => count >= 4 && calculateTextSimilarity(structure, value) > 0.55);
}

function detectStructureRepetition(plans) {
  const counts = plans.reduce((bucket, plan) => {
    bucket[plan.narrativeStructure] = (bucket[plan.narrativeStructure] || 0) + 1;
    return bucket;
  }, {});
  return Object.values(counts).some(count => count > 3);
}

function normalizeCopyItem(item) {
  if (typeof item === "string") {
    return {
      planId: 0,
      content: item.trim(),
      usedSellingPoints: [],
      usedScene: "",
      styleSource: "default_style",
      qualityNote: ""
    };
  }
  return {
    planId: Number(item?.planId) || 0,
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

function filterCopies(copies, request, existing = [], usedPlanIds = new Set()) {
  const seen = new Set(existing.map(item => normalizeText(item.content)));
  const acceptedContents = existing.map(item => item.content);
  const accepted = [];
  const rejected = [];
  const usedPlans = new Set();
  copies.forEach(item => {
    if (!item.planId) {
      rejected.push("missing_plan_id");
      return;
    }
    if (item.planId && (usedPlanIds.has(item.planId) || usedPlans.has(item.planId))) {
      rejected.push("reused_plan");
      return;
    }
    const reason = getRejectionReason(item, request, seen, acceptedContents);
    if (reason) {
      rejected.push(reason);
      if (item.planId) usedPlans.add(item.planId);
      return;
    }
    seen.add(normalizeText(item.content));
    acceptedContents.push(item.content);
    if (item.planId) usedPlans.add(item.planId);
    accepted.push({
      planId: item.planId,
      content: item.content,
      usedSellingPoints: normalizeUsedSellingPoints(item, request),
      usedScene: normalizeUsedScene(item, request),
      styleSource: item.styleSource || inferStyleSource(request),
      qualityNote: item.qualityNote || "包含用户选择的卖点和场景，并按真实买家秀口吻表达。"
    });
  });
  return { accepted, rejected, usedPlans: [...usedPlans] };
}

function getRejectionReason(item, request, seen, acceptedContents = []) {
  const content = String(item.content || "").trim();
  const normalized = normalizeText(content);
  if (!normalized || seen.has(normalized)) return "duplicate_or_empty";
  if (normalized.length < 28) return "too_short";
  if (containsBlockedPhrase(content)) return "blocked_phrase";
  if (isAdLike(content)) return "ad_like";
  if (isTooSimilarToMaterials(content, getSimilarityMaterials(request))) return "material_similarity";
  if (isTooSimilarToAny(content, acceptedContents)) return "batch_similarity";
  if (isTooSimilarToRecentFingerprint(content, request.recentGeneratedFingerprints)) return "recent_similarity";
  if (detectCoreSentenceRepetition(content, acceptedContents)) return "core_sentence_repetition";
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
  if (request.useMaterialStyle && (request.representativeMaterials.length || request.styleProfile)) return "material_style";
  return "default_style";
}

function getSimilarityMaterials(request) {
  const materials = [
    ...(request.representativeMaterials || []),
    ...(request.materialsForSimilarity || [])
  ];
  const seen = new Set();
  return materials.filter(item => {
    const content = String(item.content || "").trim();
    if (!content || seen.has(content)) return false;
    seen.add(content);
    return true;
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

function isTooSimilarToAny(text, existingTexts) {
  return existingTexts.some(existing => {
    const source = normalizeText(text);
    const target = normalizeText(existing);
    if (!source || !target) return false;
    if (source.slice(0, 10) === target.slice(0, 10)) return true;
    if (hasLongCommonSubstring(source, target, 12)) return true;
    return calculateTextSimilarity(source, target) > 0.42;
  });
}

function isTooSimilarToRecentFingerprint(text, fingerprints) {
  const opening = normalizeOpening(text);
  const structureSignature = detectStructureSignature(text);
  const semanticKeywords = extractSemanticKeywords(text);
  return (fingerprints || []).some(item => {
    if (calculateOpeningSimilarity(opening, item.normalizedOpening) > 0.86) return true;
    if (item.structureSignature && structureSignature && item.structureSignature === structureSignature) {
      const overlap = semanticKeywords.filter(keyword => (item.semanticKeywords || []).includes(keyword)).length;
      return overlap >= Math.min(3, semanticKeywords.length);
    }
    return false;
  });
}

function detectCoreSentenceRepetition(text, existingTexts) {
  const core = getCoreSentence(text);
  if (!core) return false;
  return existingTexts.some(existing => {
    const other = getCoreSentence(existing);
    if (!other) return false;
    if (core === other) return true;
    return calculateTextSimilarity(core, other) > 0.68;
  });
}

function getCoreSentence(text) {
  return String(text || "")
    .split(/[。！？]/)
    .map(sentence => normalizeText(sentence))
    .filter(sentence => sentence.length >= 8)
    .sort((a, b) => b.length - a.length)[0] || "";
}

function normalizeOpening(text) {
  const opening = String(text || "").split(/[。！？]/).map(item => item.trim()).filter(Boolean)[0] || "";
  return normalizeText(opening).slice(0, 24);
}

function detectStructureSignature(text) {
  const hasReason = /主要|因为|之前|本来|刚换|朋友|刷到|回购|不想|缺/.test(text);
  const hasScene = /办公室|工位|家里|床头|新手机|朋友|刷到|回购|中午|晚上/.test(text);
  const hasCompare = /之前|以前|旧|比|换/.test(text);
  const hasExperience = /温度|发热|补电|颜色|顺手|省心|安心|踏实|方便|舒服/.test(text);
  const hasEnding = /目前|整体|对我来说|日常|至少|后面/.test(text);
  return [
    hasReason ? "reason" : "",
    hasScene ? "scene" : "",
    hasCompare ? "compare" : "",
    hasExperience ? "experience" : "",
    hasEnding ? "ending" : ""
  ].filter(Boolean).join("-");
}

function extractSemanticKeywords(text) {
  const keywords = ["办公室", "工位", "家里", "床头", "新手机", "旧头", "杂牌", "朋友", "刷到", "回购", "温度", "发热", "补电", "颜色", "省心", "安心", "踏实", "顺手"];
  return keywords.filter(keyword => String(text || "").includes(keyword));
}

function calculateOpeningSimilarity(a, b) {
  const source = normalizeText(a);
  const target = normalizeText(b);
  if (!source || !target) return 0;
  if (source === target) return 1;
  if (source.startsWith(target) || target.startsWith(source)) return 0.9;
  return calculateTextSimilarity(source, target);
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

function cleanRepresentativeMaterials(value) {
  return Array.isArray(value)
    ? value.map(item => ({
      content: String(item?.content || "").trim().slice(0, 220),
      source: ["edited", "manual", "generated"].includes(item?.source) ? item.source : "",
      styleAnalysis: cleanStyleAnalysis(item?.styleAnalysis)
    })).filter(item => item.content)
    : [];
}

function cleanRecentFingerprints(value) {
  return Array.isArray(value)
    ? value.map(item => ({
      normalizedOpening: String(item?.normalizedOpening || "").slice(0, 32),
      structureSignature: String(item?.structureSignature || "").slice(0, 80),
      semanticKeywords: cleanList(item?.semanticKeywords).slice(0, 8),
      createdAt: String(item?.createdAt || "")
    })).filter(item => item.normalizedOpening || item.structureSignature || item.semanticKeywords.length)
    : [];
}

function cleanStyleProfile(value) {
  if (!value || typeof value !== "object") return null;
  return {
    version: Number(value.version) || 1,
    materialCount: Number(value.materialCount) || 0,
    tonePreferences: cleanNumericMap(value.tonePreferences),
    preferredStructures: cleanList(value.preferredStructures).slice(0, 5),
    preferredOpeningTypes: cleanList(value.preferredOpeningTypes).slice(0, 5),
    preferredEndingTypes: cleanList(value.preferredEndingTypes).slice(0, 5),
    preferredDetailDensity: String(value.preferredDetailDensity || "").slice(0, 20),
    preferredLengthType: String(value.preferredLengthType || "").slice(0, 20),
    preferredSellingPointExpression: String(value.preferredSellingPointExpression || "").slice(0, 40),
    preferredSceneSpecificity: String(value.preferredSceneSpecificity || "").slice(0, 20),
    preferredContrastTypes: cleanList(value.preferredContrastTypes).slice(0, 5),
    preferredPurchaseTriggers: cleanList(value.preferredPurchaseTriggers).slice(0, 5),
    preferredStoryLevel: String(value.preferredStoryLevel || "").slice(0, 20),
    avoidStyles: cleanList(value.avoidStyles).slice(0, 8),
    profileSummary: String(value.profileSummary || "").slice(0, 160)
  };
}

function cleanManualPreferences(value) {
  if (!value || typeof value !== "object") return null;
  return {
    version: Number(value.version) || 1,
    tone: cleanList(value.tone).slice(0, 8),
    preferredStructures: cleanList(value.preferredStructures).slice(0, 8),
    preferredOpeningTypes: cleanList(value.preferredOpeningTypes).slice(0, 8),
    preferredEndingTypes: cleanList(value.preferredEndingTypes).slice(0, 8),
    preferredLengthType: String(value.preferredLengthType || "").slice(0, 30),
    preferredDetailDensity: String(value.preferredDetailDensity || "").slice(0, 30),
    preferredSellingPointExpression: String(value.preferredSellingPointExpression || "").slice(0, 50),
    preferredSceneSpecificity: String(value.preferredSceneSpecificity || "").slice(0, 30),
    preferredStoryLevel: String(value.preferredStoryLevel || "").slice(0, 30),
    avoidStyles: cleanList(value.avoidStyles).slice(0, 12),
    customInstructions: sanitizeCustomInstructions(value.customInstructions)
  };
}

function cleanEffectiveStylePreferences(value) {
  if (!value || typeof value !== "object") return null;
  return {
    tone: cleanList(value.tone).slice(0, 8),
    preferredStructures: cleanList(value.preferredStructures).slice(0, 8),
    preferredOpeningTypes: cleanList(value.preferredOpeningTypes).slice(0, 8),
    preferredEndingTypes: cleanList(value.preferredEndingTypes).slice(0, 8),
    preferredLengthType: String(value.preferredLengthType || "").slice(0, 30),
    preferredDetailDensity: String(value.preferredDetailDensity || "").slice(0, 30),
    preferredSellingPointExpression: String(value.preferredSellingPointExpression || "").slice(0, 50),
    preferredSceneSpecificity: String(value.preferredSceneSpecificity || "").slice(0, 30),
    preferredStoryLevel: String(value.preferredStoryLevel || "").slice(0, 30),
    avoidStyles: cleanList(value.avoidStyles).slice(0, 12),
    customInstructions: sanitizeCustomInstructions(value.customInstructions),
    sourceMap: value.sourceMap && typeof value.sourceMap === "object" ? Object.fromEntries(
      Object.entries(value.sourceMap).map(([key, source]) => [String(key).slice(0, 40), String(source).slice(0, 20)])
    ) : {}
  };
}

function sanitizeCustomInstructions(value) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .slice(0, 500);
}

function cleanStyleAnalysis(value = {}) {
  return {
    purchaseTrigger: String(value?.purchaseTrigger || "").slice(0, 40),
    narrativeStructure: String(value?.narrativeStructure || "").slice(0, 60),
    tone: String(value?.tone || "").slice(0, 40),
    lengthType: String(value?.lengthType || "").slice(0, 20),
    detailDensity: String(value?.detailDensity || "").slice(0, 20),
    openingType: String(value?.openingType || "").slice(0, 40),
    endingType: String(value?.endingType || "").slice(0, 40),
    sellingPointExpression: String(value?.sellingPointExpression || "").slice(0, 40),
    sceneSpecificity: String(value?.sceneSpecificity || "").slice(0, 20),
    contrastType: String(value?.contrastType || "").slice(0, 40),
    adIntensity: String(value?.adIntensity || "").slice(0, 20),
    storyLevel: String(value?.storyLevel || "").slice(0, 20)
  };
}

function cleanNumericMap(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, count]) => [String(key).slice(0, 40), Number(count) || 0])
      .filter(([key, count]) => key && count > 0)
      .slice(0, 12)
  );
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

function uniqueList(list) {
  return [...new Set((list || []).filter(Boolean))];
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

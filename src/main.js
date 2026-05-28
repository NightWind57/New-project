const OLD_LIBRARY_KEY = "chargerBuyerShowCopyLibrary.v1";
    const OLD_REFERENCE_KEY = "buyerShowReferenceTexts";
    const MATERIAL_KEY = "buyerShowMaterials";
    const CUSTOM_POINTS_KEY = "customSellingPoints";
    const CUSTOM_SCENES_KEY = "customUseScenes";
    const SELLING_OPTIONS_KEY = "sellingPointOptions";
    const SCENE_OPTIONS_KEY = "useSceneOptions";
    const HISTORY_KEY = "generationHistory";
    const EDIT_FEEDBACK_KEY = "editFeedbackHistory";

    const BASE_POINTS = ["快充", "低温", "颜值", "对比杂牌", "对比旧充电器"];
    const BASE_SCENES = ["刚换手机", "办公室用", "家里用", "朋友推荐购买", "网络种草购买", "回购"];
    const CUSTOM_OPTION = "自定义";

    const POINT_LINES = {
      "快充": [
        "临时补电挺方便", "不用一直等着手机充电", "中午插上，下午用就安心很多",
        "速度比之前旧头快不少", "日常通勤前补电够用了", "不是那种让人等很久的感觉"
      ],
      "低温": [
        "温度控制比之前那个稳", "没有以前那个那么容易热", "边回消息边充，发热感没那么明显",
        "摸起来不会让人有明显不舒服的热感", "晚上充电时会更放心一点", "对我来说，温度稳比单纯快更重要"
      ],
      "颜值": [
        "颜色比图片里更耐看", "放在桌面上不突兀", "粉色不是那种很廉价的粉",
        "白色看起来干净，放哪都比较搭", "灰色质感比想象中好", "和桌面其他东西放在一起挺协调"
      ],
      "对比杂牌": [
        "之前便宜头用着总有点不放心", "给新手机用，还是不想太凑合", "杂牌头充电时发热比较明显",
        "换个靠谱点的牌子，用着心里踏实些", "这类每天都要用的东西，还是别太省"
      ],
      "对比旧充电器": [
        "旧头用了很久，确实有点跟不上", "之前那个充得慢，还容易热", "换完之后才发现体验差距还挺明显",
        "以前觉得充电器都差不多，用了之后才觉得不是", "旧充电器继续放家里备用，这个放办公室刚好"
      ]
    };

    const SCENE_LINES = {
      "刚换手机": [
        "刚换了新手机，顺手把充电器也换了", "新手机不想再用之前那个旧充电头",
        "手机刚换新的，配件也想换个稳一点的"
      ],
      "办公室用": [
        "买来放办公室备用", "办公室一直缺一个固定充电器", "放在工位左手边刚好"
      ],
      "家里用": [
        "晚上放床头用，不用每天拔来拔去", "家里只有一个充电头，每次拿来拿去挺麻烦",
        "家里多备一个，随手就能充"
      ],
      "朋友推荐购买": [
        "朋友用了之后说还行，我才跟着买的", "是朋友推荐的，用了几天感觉确实可以",
        "本来没太在意，朋友说这个温度控制不错才买的"
      ],
      "网络种草购买": [
        "之前刷到别人推荐才注意到这个", "看了几条评价，感觉这个比较符合我的需求",
        "被种草之后买来试试"
      ],
      "回购": [
        "之前买过一个，用着顺手，所以又买了", "家里有一个，这次买来放办公室",
        "用了一段时间觉得不错，又买了一个备用"
      ]
    };

    const MODULES = {
      reasons: [
        "之前那个用了挺久，感觉也该换了", "主要是不想再用杂牌头给手机充电",
        "手机刚换新的，配件也想换个稳一点的", "办公室一直缺一个固定充电器",
        "家里只有一个充电头，每次拿来拿去挺麻烦", "之前充电时温度有点明显，所以想换个低温一点的",
        "看了几条评价，感觉这个比较符合我的需求", "朋友用了之后说还行，我才跟着买的",
        "之前买过一个，用着顺手，所以又买了"
      ],
      sceneDetails: [
        "放在工位左手边刚好", "平时中午吃饭前插上，回来能补不少电",
        "晚上放床头用，不用每天拔来拔去", "手机放桌边充，线长也够用",
        "早上出门前临时充一会儿，也能缓一下电量焦虑", "包里放一个也不占地方",
        "家里一个、办公室一个，用起来省事很多", "给家里人用的话，还是这种省心一点"
      ],
      endings: [
        "目前用下来挺省心", "日常用完全够了", "整体比之前舒服不少",
        "给苹果手机用着也放心", "后面应该还会继续回购", "不算特别便宜，但用着踏实",
        "至少不会一直担心发烫", "每天都要用的东西，稳一点更重要",
        "对我来说这个体验已经够用了", "买套装确实省了不少事"
      ]
    };

    const bannedMarketingPhrases = [
      "闭眼入", "绝绝子", "YYDS", "神器", "宝子", "姐妹们", "太香了",
      "冲就完了", "无脑入", "直接封神", "性价比天花板", "必买", "不买后悔",
      "狠狠爱了", "谁懂啊", "狠狠爱住"
    ];

    const exaggeratedPhrases = [
      "完全不发热", "一点都不烫", "秒充", "永远不伤电池", "彻底保护电池",
      "官方原装级别", "苹果同款"
    ];

    const preferredPhraseCandidates = [
      "用着更安心", "温度比较稳", "放办公室刚好", "到手直接能用",
      "比之前那个舒服很多", "不算特别便宜，但用着放心", "日常用完全够了",
      "用着比较踏实", "省得来回带", "给苹果手机用着也放心"
    ];

    const state = {
      pointOptions: [],
      sceneOptions: [],
      materials: [],
      generated: [],
      history: [],
      editFeedbackHistory: []
    };

    const els = {
      sellingPointOptions: document.getElementById("sellingPointOptions"),
      sceneOptions: document.getElementById("sceneOptions"),
      customSellingPointRow: document.getElementById("customSellingPointRow"),
      customSellingPointInput: document.getElementById("customSellingPointInput"),
      addSellingPointBtn: document.getElementById("addSellingPointBtn"),
      customSceneRow: document.getElementById("customSceneRow"),
      customSceneInput: document.getElementById("customSceneInput"),
      addSceneBtn: document.getElementById("addSceneBtn"),
      creativityLevel: document.getElementById("creativityLevel"),
      useMaterials: document.getElementById("useMaterials"),
      generateBtn: document.getElementById("generateBtn"),
      resultList: document.getElementById("resultList"),
      openMaterialModalBtn: document.getElementById("openMaterialModalBtn"),
      clearMaterialsBtn: document.getElementById("clearMaterialsBtn"),
      materialList: document.getElementById("materialList"),
      materialModal: document.getElementById("materialModal"),
      closeMaterialModalBtn: document.getElementById("closeMaterialModalBtn"),
      cancelMaterialBtn: document.getElementById("cancelMaterialBtn"),
      materialInput: document.getElementById("materialInput"),
      saveMaterialBtn: document.getElementById("saveMaterialBtn"),
      toast: document.getElementById("toast")
    };

    function init() {
      state.pointOptions = loadOptionList(SELLING_OPTIONS_KEY, BASE_POINTS, CUSTOM_POINTS_KEY);
      state.sceneOptions = loadOptionList(SCENE_OPTIONS_KEY, BASE_SCENES, CUSTOM_SCENES_KEY);
      state.materials = loadMaterials();
      state.history = loadArray(HISTORY_KEY);
      state.editFeedbackHistory = loadArray(EDIT_FEEDBACK_KEY);
      saveArray(SELLING_OPTIONS_KEY, state.pointOptions);
      saveArray(SCENE_OPTIONS_KEY, state.sceneOptions);
      saveMaterials();
      renderOptionGroups();
      renderMaterials();
      bindEvents();
    }

    function bindEvents() {
      els.generateBtn.addEventListener("click", generateBatch);
      els.addSellingPointBtn.addEventListener("click", addCustomPoint);
      els.addSceneBtn.addEventListener("click", addCustomScene);
      els.openMaterialModalBtn.addEventListener("click", openMaterialModal);
      els.closeMaterialModalBtn.addEventListener("click", closeMaterialModal);
      els.cancelMaterialBtn.addEventListener("click", closeMaterialModal);
      els.saveMaterialBtn.addEventListener("click", saveMaterialFromModal);
      els.clearMaterialsBtn.addEventListener("click", clearMaterials);
      els.materialModal.addEventListener("click", event => {
        if (event.target === els.materialModal) closeMaterialModal();
      });
    }

    function renderOptionGroups() {
      renderCheckboxes(els.sellingPointOptions, "point", [...state.pointOptions, CUSTOM_OPTION], () => {
        els.customSellingPointRow.classList.toggle("show", isChecked("point", CUSTOM_OPTION));
      }, deletePointOption);
      renderCheckboxes(els.sceneOptions, "scene", [...state.sceneOptions, CUSTOM_OPTION], () => {
        els.customSceneRow.classList.toggle("show", isChecked("scene", CUSTOM_OPTION));
      }, deleteSceneOption);
    }

    function renderCheckboxes(container, name, options, onChange, onDelete) {
      const selected = getCheckedValues(name);
      container.innerHTML = "";
      options.forEach(option => {
        const label = document.createElement("label");
        label.className = "option-pill";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = name;
        input.value = option;
        input.checked = selected.includes(option);
        input.addEventListener("change", onChange);
        label.append(input, document.createTextNode(option));
        if (option !== CUSTOM_OPTION) {
          const del = document.createElement("button");
          del.type = "button";
          del.className = "option-delete";
          del.textContent = "×";
          del.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            onDelete(option);
          });
          label.appendChild(del);
        }
        container.appendChild(label);
      });
    }

    function addCustomPoint() {
      const value = els.customSellingPointInput.value.trim();
      if (!value || value === CUSTOM_OPTION) return showToast("请输入自定义卖点");
      if (state.pointOptions.includes(value)) return showToast("这个卖点已经存在");
      state.pointOptions.push(value);
      saveArray(SELLING_OPTIONS_KEY, state.pointOptions);
      els.customSellingPointInput.value = "";
      renderOptionGroups();
      setChecked("point", value, true);
      setChecked("point", CUSTOM_OPTION, true);
      showToast("自定义卖点已添加");
    }

    function addCustomScene() {
      const value = els.customSceneInput.value.trim();
      if (!value || value === CUSTOM_OPTION) return showToast("请输入自定义场景");
      if (state.sceneOptions.includes(value)) return showToast("这个场景已经存在");
      state.sceneOptions.push(value);
      saveArray(SCENE_OPTIONS_KEY, state.sceneOptions);
      els.customSceneInput.value = "";
      renderOptionGroups();
      setChecked("scene", value, true);
      setChecked("scene", CUSTOM_OPTION, true);
      showToast("自定义场景已添加");
    }

    function deletePointOption(option) {
      if (!confirm("确定删除这个卖点吗？")) return;
      state.pointOptions = state.pointOptions.filter(item => item !== option);
      saveArray(SELLING_OPTIONS_KEY, state.pointOptions);
      renderOptionGroups();
      showToast("卖点已删除");
    }

    function deleteSceneOption(option) {
      if (!confirm("确定删除这个使用场景吗？")) return;
      state.sceneOptions = state.sceneOptions.filter(item => item !== option);
      saveArray(SCENE_OPTIONS_KEY, state.sceneOptions);
      renderOptionGroups();
      showToast("使用场景已删除");
    }

    async function generateBatch() {
      const points = getCheckedValues("point").filter(value => value !== CUSTOM_OPTION);
      const scenes = getCheckedValues("scene").filter(value => value !== CUSTOM_OPTION);
      const creativity = els.creativityLevel.value;
      if (!points.length) return showToast("请至少选择一个卖点");
      if (!scenes.length) return showToast("请至少选择一个使用场景");

      setGeneratingState(true);
      try {
        const copies = await requestAiCopies(points, scenes, creativity);
        state.generated = copies.map((content, index) => createAiGeneratedItem(content, points, scenes, creativity, index));
        rememberHistory(state.generated.map(item => item.content));
        renderGenerated();
        showToast(`AI 已生成 ${state.generated.length} 条文案`);
      } catch (error) {
        generateLocalBatch(points, scenes, creativity);
        showToast("AI生成失败，已使用本地生成器生成");
      } finally {
        setGeneratingState(false);
      }
    }

    async function requestAiCopies(points, scenes, creativity) {
      const response = await fetch("/.netlify/functions/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellingPoints: points,
          useScenes: scenes,
          creativityLevel: creativity,
          useMaterialStyle: els.useMaterials.checked,
          materials: els.useMaterials.checked ? state.materials.map(({ content, createdAt }) => ({ content, createdAt })).slice(0, 50) : [],
          editFeedbackHistory: state.editFeedbackHistory.slice(0, 100)
        })
      });
      if (!response.ok) throw new Error("AI request failed");
      const data = await response.json();
      const copies = Array.isArray(data.copies) ? data.copies.map(item => String(item || "").trim()).filter(Boolean) : [];
      if (copies.length !== 10) throw new Error("AI response must contain 10 copies");
      return copies;
    }

    function createAiGeneratedItem(content, points, scenes, creativity, index) {
      const point = detectSelectedValue(content, points) || points[index % points.length] || "";
      const scene = detectSelectedValue(content, scenes) || scenes[index % scenes.length] || "";
      return {
        id: createId(),
        content,
        point,
        scene,
        lengthType: getLengthType(content),
        structureKey: "AI",
        openerKey: normalizeKey(content),
        endingKey: normalizeKey(content.split("。").filter(Boolean).pop() || content),
        selectedSellingPoints: [...points],
        selectedUseScenes: [...scenes],
        creativityLevel: creativity,
        editing: false,
        draft: "",
        originalText: ""
      };
    }

    function detectSelectedValue(text, options) {
      return options.find(option => text.includes(option) || relatedKeywords(option).some(keyword => text.includes(keyword))) || "";
    }

    function relatedKeywords(option) {
      const map = {
        "快充": ["补电", "速度", "充得"],
        "低温": ["温度", "发热", "烫"],
        "颜值": ["颜色", "桌面", "好看"],
        "对比杂牌": ["杂牌", "便宜头", "靠谱"],
        "对比旧充电器": ["旧头", "旧充电器", "之前那个"],
        "刚换手机": ["新手机", "刚换"],
        "办公室用": ["办公室", "工位"],
        "家里用": ["家里", "床头"],
        "朋友推荐购买": ["朋友", "推荐"],
        "网络种草购买": ["种草", "刷到", "评价"],
        "回购": ["回购", "又买", "之前买过"]
      };
      return map[option] || [option];
    }

    function setGeneratingState(isGenerating) {
      els.generateBtn.disabled = isGenerating;
      els.generateBtn.textContent = isGenerating ? "生成中..." : "生成文案";
    }

    function generateLocalBatch(points, scenes, creativity) {
      const materialPool = els.useMaterials.checked ? state.materials : [];
      const styleProfile = analyzeMaterialStyle(pickMany(materialPool, 5));
      const editPreference = analyzeEditFeedback();
      const generated = [];
      const stats = createBatchStats();
      let attempts = 0;
      while (generated.length < 10 && attempts < 260) {
        attempts += 1;
        const relaxed = attempts > 180;
        const item = createGeneratedItem(points, scenes, creativity, { styleProfile, editPreference, stats });
        if (
          validateGeneratedCopy(item.content, item) &&
          passesBatchRules(item, stats, relaxed) &&
          !isTooSimilarToAny(item.content, generated.map(existing => existing.content)) &&
          !isTooSimilarToAny(item.content, state.history) &&
          !isTooSimilarToMaterials(item.content, materialPool)
        ) {
          generated.push(item);
          rememberBatchItem(stats, item);
        }
      }
      while (generated.length < 10 && attempts < 420) {
        attempts += 1;
        const item = createGeneratedItem(points, scenes, creativity, { styleProfile, editPreference, stats });
        if (
          validateGeneratedCopy(item.content, item) &&
          !isTooSimilarToAny(item.content, generated.map(existing => existing.content)) &&
          !isTooSimilarToMaterials(item.content, materialPool)
        ) {
          generated.push(item);
          rememberBatchItem(stats, item);
        }
      }
      let fallbackAttempts = 0;
      while (generated.length < 10 && fallbackAttempts < 160) {
        fallbackAttempts += 1;
        const item = createGeneratedItem(points, scenes, creativity, { styleProfile, editPreference, stats });
        if (
          validateGeneratedCopy(item.content, item) &&
          !generated.some(existing => existing.content === item.content) &&
          !isTooSimilarToMaterials(item.content, materialPool)
        ) {
          generated.push(item);
          rememberBatchItem(stats, item);
        }
      }
      let hardFallbackAttempts = 0;
      while (generated.length < 10 && hardFallbackAttempts < 240) {
        hardFallbackAttempts += 1;
        const item = createGeneratedItem(points, scenes, creativity, { styleProfile, editPreference, stats });
        item.content = `${item.content.replace(/。$/, "")}，目前用下来还算顺手。`;
        if (!generated.some(existing => existing.content === item.content) && !isTooSimilarToMaterials(item.content, materialPool)) {
          generated.push(item);
          rememberBatchItem(stats, item);
        }
      }
      state.generated = generated.slice(0, 10);
      rememberHistory(state.generated.map(item => item.content));
      renderGenerated();
      showToast(`已生成 ${state.generated.length} 条文案`);
    }

    function createGeneratedItem(points, scenes, creativity, context) {
      const point = pickNextOption(points, context.stats.pointSequence);
      const secondPoint = shouldUseSecondPoint(points, creativity) ? pick(points.filter(item => item !== point)) : "";
      const scene = pickNextOption(scenes, context.stats.sceneSequence);
      const lengthType = pickLengthType(creativity, context.editPreference, context.styleProfile);
      const structureKey = pickStructureKey(scene, point, context.styleProfile, context.stats);
      const result = buildNarrativeCopy({ point, secondPoint, scene, creativity, lengthType, structureKey, ...context });
      return {
        id: createId(),
        content: result.content,
        point,
        scene,
        lengthType: getLengthType(result.content),
        structureKey,
        openerKey: result.openerKey,
        endingKey: result.endingKey,
        selectedSellingPoints: [...points],
        selectedUseScenes: [...scenes],
        creativityLevel: creativity,
        editing: false,
        draft: "",
        originalText: ""
      };
    }

    function buildNarrativeCopy(context) {
      const parts = {
        reason: pickReason(context),
        scene: pickSceneDetail(context),
        problem: pickProblem(context),
        point: pickPointLine(context.point, context),
        second: context.secondPoint && context.lengthType !== "短" ? pickPointLine(context.secondPoint, context) : "",
        ending: pickEnding(context)
      };
      maybeApplyEditPreference(parts, context);
      const structures = {
        A: ["reason", "scene", "point", "second", "ending"],
        B: ["scene", "problem", "point", "ending"],
        C: ["problem", "point", "second", "ending"],
        D: ["reason", "scene", "point", "ending"],
        E: ["reason", "scene", "point", "ending"],
        F: ["reason", "problem", "point", "ending"]
      };
      const order = structures[context.structureKey] || structures.A;
      const maxParts = context.lengthType === "短" ? 3 : context.lengthType === "中" ? 4 : 5;
      const chosen = order.filter(key => parts[key]).slice(0, maxParts);
      const content = sanitizeCopy(trimToLength(compactText(chosen.map(key => parts[key])), context.lengthType), context.editPreference);
      return { content, openerKey: normalizeKey(chosen[0] ? parts[chosen[0]] : ""), endingKey: normalizeKey(parts.ending) };
    }

    function analyzeMaterialStyle(materials) {
      const contents = materials.map(item => String(item.content || "")).filter(Boolean);
      const joined = contents.join("。");
      const avgLength = contents.length ? contents.reduce((sum, text) => sum + text.length, 0) / contents.length : 70;
      const count = pattern => contents.filter(text => pattern.test(text)).length;
      const profile = {
        toneTypes: [],
        rhythm: avgLength < 50 ? "short" : avgLength > 95 ? "long" : "medium",
        reasonFirst: count(/主要是|之前|怕|不想|旧|杂牌/) >= count(/买来放|放在|办公室|床头/),
        oldProblemFirst: count(/之前.*(现在|换|之后)|旧.*换|比之前/) > 0,
        recommendationFirst: count(/朋友|推荐|种草|评价/) > 0,
        detailDensity: "medium",
        preferredOpenings: [],
        preferredEndings: []
      };
      if (/回购|又买|之前买过/.test(joined)) profile.toneTypes.push("回购分享型");
      if (/旧|之前|比之前|杂牌|换/.test(joined)) profile.toneTypes.push("对比体验型");
      if (/朋友|推荐/.test(joined)) profile.toneTypes.push("朋友推荐型");
      if (/种草|刷到|评价/.test(joined)) profile.toneTypes.push("网络种草型");
      if (/新手机|刚换/.test(joined)) profile.toneTypes.push("新机换购型");
      if (/办公室|工位/.test(joined)) profile.toneTypes.push("办公备用型");
      if (/家里|床头/.test(joined)) profile.toneTypes.push("家用备用型");
      if (!profile.toneTypes.length) profile.toneTypes.push("真实评价型");
      const detailHits = count(/到手|昨天|今天|办公室|工位|床头|桌面|颜色|中午|晚上|出门|线长|包里/);
      profile.detailDensity = detailHits >= Math.max(2, contents.length * 0.6) ? "high" : detailHits ? "medium" : "low";
      profile.preferredOpenings = contents.map(text => text.split("。").filter(Boolean)[0]).filter(Boolean).map(classifyOpening);
      profile.preferredEndings = contents.map(text => text.split("。").filter(Boolean).pop()).filter(Boolean).map(normalizeKey);
      return profile;
    }

    function analyzeEditFeedback() {
      const feedback = loadArray(EDIT_FEEDBACK_KEY).slice(0, 100);
      const avoidCounts = {};
      const preferredCounts = {};
      let shorter = 0;
      let longer = 0;
      let addedDetail = 0;
      let removedDetail = 0;
      feedback.forEach(item => {
        const original = String(item.originalText || item.before || "");
        const edited = String(item.editedText || item.after || "");
        [...bannedMarketingPhrases, ...exaggeratedPhrases, "真的", "非常", "特别"].forEach(phrase => {
          if (original.includes(phrase) && !edited.includes(phrase)) avoidCounts[phrase] = (avoidCounts[phrase] || 0) + 1;
        });
        preferredPhraseCandidates.forEach(phrase => {
          if (edited.includes(phrase)) preferredCounts[phrase] = (preferredCounts[phrase] || 0) + 1;
        });
        if (edited.length < original.length * 0.85) shorter += 1;
        if (edited.length > original.length * 1.15) longer += 1;
        if (hasConcreteDetail(edited) && !hasConcreteDetail(original)) addedDetail += 1;
        if (hasConcreteDetail(original) && !hasConcreteDetail(edited)) removedDetail += 1;
      });
      return {
        avoidPhrases: uniqueList([...bannedMarketingPhrases, ...exaggeratedPhrases, ...Object.keys(avoidCounts)]),
        preferredPhrases: Object.entries(preferredCounts).sort((a, b) => b[1] - a[1]).map(([phrase]) => phrase).slice(0, 8),
        lengthBias: shorter > longer + 1 ? "shorter" : longer > shorter + 1 ? "longer" : "neutral",
        detailBias: addedDetail > removedDetail + 1 ? "moreDetail" : removedDetail > addedDetail + 1 ? "lessDetail" : "neutral",
        toneBias: Object.values(avoidCounts).reduce((sum, count) => sum + count, 0) >= 2 ? "lessExaggerated" : "neutral"
      };
    }

    function createBatchStats() {
      return {
        structureCounts: {},
        openerCounts: {},
        endingCounts: {},
        pointSequence: [],
        sceneSequence: []
      };
    }

    function passesBatchRules(item, stats, relaxed) {
      if (relaxed) return true;
      if ((stats.openerCounts[item.openerKey] || 0) >= 2) return false;
      if ((stats.endingCounts[item.endingKey] || 0) >= 2) return false;
      if (lastRepeated(stats.pointSequence, item.point, 2)) return false;
      if (lastRepeated(stats.sceneSequence, item.scene, 2)) return false;
      return true;
    }

    function rememberBatchItem(stats, item) {
      stats.structureCounts[item.structureKey] = (stats.structureCounts[item.structureKey] || 0) + 1;
      stats.openerCounts[item.openerKey] = (stats.openerCounts[item.openerKey] || 0) + 1;
      stats.endingCounts[item.endingKey] = (stats.endingCounts[item.endingKey] || 0) + 1;
      stats.pointSequence.push(item.point);
      stats.sceneSequence.push(item.scene);
    }

    function pickStructureKey(scene, point, styleProfile, stats) {
      const preferred = [];
      if (scene === "回购" || styleProfile.toneTypes.includes("回购分享型")) preferred.push("E");
      if (scene === "朋友推荐购买" || scene === "网络种草购买" || styleProfile.recommendationFirst) preferred.push("D");
      if (scene === "刚换手机" || styleProfile.toneTypes.includes("新机换购型")) preferred.push("F");
      if (/对比/.test(point) || styleProfile.oldProblemFirst) preferred.push("C");
      if (scene === "办公室用" || scene === "家里用") preferred.push("B");
      const all = uniqueList([...preferred, "A", "B", "C", "D", "E", "F"]);
      const underused = all.filter(key => (stats.structureCounts[key] || 0) < 2);
      return pick(underused.length ? underused : all);
    }

    function pickNextOption(options, sequence) {
      if (options.length <= 1) return options[0] || "";
      const candidates = options.filter(option => !lastRepeated(sequence, option, 2));
      return pick(candidates.length ? candidates : options);
    }

    function lastRepeated(sequence, value, maxCount) {
      if (!value || sequence.length < maxCount) return false;
      return sequence.slice(-maxCount).every(item => item === value);
    }

    function shouldUseSecondPoint(points, creativity) {
      if (points.length < 2) return false;
      return Math.random() < (creativity === "wild" ? 0.56 : creativity === "stable" ? 0.24 : 0.38);
    }

    function validateGeneratedCopy(text, context) {
      if (!text || text.length < 20) return false;
      if ([...bannedMarketingPhrases, ...exaggeratedPhrases].some(phrase => text.includes(phrase))) return false;
      const sentences = text.split("。").map(item => item.trim()).filter(Boolean);
      if (new Set(sentences).size !== sentences.length) return false;
      if (hasRepeatedCore(text, ["温度", "发热", "烫"], 3)) return false;
      if (hasRepeatedCore(text, ["快", "补电", "充电速度"], 3)) return false;
      if (context.scene === "办公室用" && /床头|睡前/.test(text)) return false;
      if (context.scene === "家里用" && /工位|办公室/.test(text)) return false;
      if (context.scene === "刚换手机" && /给家里人买/.test(text)) return false;
      if (context.scene === "朋友推荐购买" && /种草|刷到/.test(text)) return false;
      if (context.scene === "网络种草购买" && /朋友推荐|朋友说/.test(text)) return false;
      if (context.scene === "回购" && !/回购|又买|之前买过|家里有一个/.test(text)) return false;
      if (context.point === "对比旧充电器" && !/旧|之前|以前|换/.test(text)) return false;
      if (context.point === "对比杂牌" && !/杂牌|便宜头|不放心|靠谱/.test(text)) return false;
      if (context.point === "低温" && /完全不发热|一点都不烫/.test(text)) return false;
      if (/搜索转化率|点击率|投放|广告口号/.test(text)) return false;
      const hasReason = /主要|之前|本来|因为|不想|怕|朋友|评价|回购|刚换/.test(text);
      const hasScene = /办公室|工位|家里|床头|出门|中午|晚上|桌面|包里|新手机/.test(text) || context.scene;
      const hasExperience = /用|充|温度|发热|舒服|安心|省心|踏实|方便|顺手/.test(text);
      return Boolean(hasReason && hasScene && hasExperience);
    }

    function renderGenerated() {
      els.resultList.innerHTML = "";
      if (!state.generated.length) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "选择卖点和场景后，点击“生成文案”。";
        els.resultList.appendChild(empty);
        return;
      }
      state.generated.forEach(item => els.resultList.appendChild(createGeneratedCard(item)));
    }

    function createGeneratedCard(item) {
      const card = document.createElement("article");
      card.className = "copy-card";
      const body = item.editing ? document.createElement("textarea") : document.createElement("div");
      if (item.editing) {
        body.className = "copy-editor";
        body.value = item.draft;
      } else {
        body.className = "copy-body";
        body.textContent = item.content;
      }
      const meta = document.createElement("div");
      meta.className = "meta-row";
      meta.append(createChip(item.point), createChip(item.scene), createChip(item.lengthType));
      const actions = document.createElement("div");
      actions.className = "card-actions";
      if (item.editing) {
        actions.append(
          createButton("保存修改", "btn small primary", () => saveGeneratedEdit(item, card)),
          createButton("取消编辑", "btn small ghost", () => cancelGeneratedEdit(item))
        );
      } else {
        actions.append(
          createButton("编辑", "btn small ghost", () => startGeneratedEdit(item)),
          createButton("复制", "btn small primary", () => copyText(item.content)),
          createButton("添加到素材库", "btn small ghost", () => addGeneratedToMaterials(item))
        );
      }
      card.append(body, meta, actions);
      return card;
    }

    function startGeneratedEdit(item) {
      item.editing = true;
      item.draft = item.content;
      item.originalText = item.content;
      renderGenerated();
    }

    function saveGeneratedEdit(item, card) {
      const value = card.querySelector(".copy-editor").value.trim();
      if (!value) return showToast("请填写文案内容");
      recordEditFeedback(item, value);
      item.content = value;
      item.lengthType = getLengthType(value);
      item.editing = false;
      item.draft = "";
      item.originalText = "";
      renderGenerated();
      showToast("修改已保存");
    }

    function cancelGeneratedEdit(item) {
      item.editing = false;
      item.draft = "";
      item.originalText = "";
      renderGenerated();
    }

    function addGeneratedToMaterials(item) {
      addMaterial(item.content);
    }

    function openMaterialModal() {
      els.materialInput.value = "";
      els.materialModal.classList.add("open");
      setTimeout(() => els.materialInput.focus(), 0);
    }

    function closeMaterialModal() {
      els.materialModal.classList.remove("open");
      els.materialInput.value = "";
    }

    function saveMaterialFromModal() {
      const content = els.materialInput.value.trim();
      if (!content) return showToast("请输入素材文案");
      if (addMaterial(content)) closeMaterialModal();
    }

    function addMaterial(content) {
      const finalContent = String(content || "").trim();
      if (!finalContent) return false;
      if (state.materials.some(item => item.content === finalContent)) {
        showToast("素材库中已存在");
        return false;
      }
      state.materials.unshift({ id: createId(), content: finalContent, createdAt: new Date().toISOString(), editing: false, draft: "" });
      saveMaterials();
      renderMaterials();
      showToast("已添加到素材库");
      return true;
    }

    function renderMaterials() {
      els.materialList.innerHTML = "";
      if (!state.materials.length) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "还没有素材，点击“添加素材”保存买家秀文案。";
        els.materialList.appendChild(empty);
        return;
      }
      state.materials.forEach(item => els.materialList.appendChild(createMaterialCard(item)));
    }

    function createMaterialCard(item) {
      const card = document.createElement("article");
      card.className = "copy-card";
      const body = item.editing ? document.createElement("textarea") : document.createElement("div");
      if (item.editing) {
        body.className = "copy-editor";
        body.value = item.draft;
      } else {
        body.className = "copy-body";
        body.textContent = item.content;
      }
      const meta = document.createElement("div");
      meta.className = "meta-row";
      meta.append(createChip(formatDate(item.createdAt)));
      const actions = document.createElement("div");
      actions.className = "card-actions";
      if (item.editing) {
        actions.append(
          createButton("保存修改", "btn small primary", () => saveMaterialEdit(item, card)),
          createButton("取消编辑", "btn small ghost", () => cancelMaterialEdit(item))
        );
      } else {
        actions.append(
          createButton("复制", "btn small primary", () => copyText(item.content)),
          createButton("编辑", "btn small ghost", () => startMaterialEdit(item)),
          createButton("删除", "btn small danger", () => deleteMaterial(item.id))
        );
      }
      card.append(body, meta, actions);
      return card;
    }

    function startMaterialEdit(item) {
      item.editing = true;
      item.draft = item.content;
      renderMaterials();
    }

    function saveMaterialEdit(item, card) {
      const value = card.querySelector(".copy-editor").value.trim();
      if (!value) return showToast("请填写素材文案");
      if (state.materials.some(existing => existing.id !== item.id && existing.content === value)) {
        showToast("素材库中已存在");
        return;
      }
      item.content = value;
      item.editing = false;
      item.draft = "";
      saveMaterials();
      renderMaterials();
      showToast("素材已更新");
    }

    function recordEditFeedback(item, editedText) {
      const originalText = item.originalText || item.content;
      if (!originalText || originalText === editedText) return;
      state.editFeedbackHistory.unshift({
        originalText,
        editedText,
        selectedSellingPoints: item.selectedSellingPoints || [item.point].filter(Boolean),
        selectedUseScenes: item.selectedUseScenes || [item.scene].filter(Boolean),
        creativityLevel: item.creativityLevel || els.creativityLevel.value,
        createdAt: new Date().toISOString()
      });
      state.editFeedbackHistory = state.editFeedbackHistory.slice(0, 100);
      saveArray(EDIT_FEEDBACK_KEY, state.editFeedbackHistory);
    }

    function cancelMaterialEdit(item) {
      item.editing = false;
      item.draft = "";
      renderMaterials();
    }

    function deleteMaterial(id) {
      state.materials = state.materials.filter(item => item.id !== id);
      saveMaterials();
      renderMaterials();
      showToast("素材已删除");
    }

    function clearMaterials() {
      if (!state.materials.length) return;
      if (!confirm("确定清空全部素材吗？")) return;
      state.materials = [];
      saveMaterials();
      renderMaterials();
      showToast("素材库已清空");
    }

    function loadMaterials() {
      const current = loadArray(MATERIAL_KEY).map(normalizeMaterial).filter(Boolean);
      if (current.length) return sortMaterials(current);
      const oldReferences = loadArray(OLD_REFERENCE_KEY).map(normalizeMaterial).filter(Boolean);
      if (oldReferences.length) return sortMaterials(dedupeMaterials(oldReferences));
      const oldItems = loadArray(OLD_LIBRARY_KEY).map(normalizeMaterial).filter(Boolean);
      return sortMaterials(dedupeMaterials(oldItems));
    }

    function normalizeMaterial(item) {
      if (!item || !item.content) return null;
      return {
        id: typeof item.id === "string" ? item.id : createId(),
        content: String(item.content),
        createdAt: item.createdAt || new Date().toISOString(),
        editing: false,
        draft: ""
      };
    }

    function saveMaterials() {
      saveArray(MATERIAL_KEY, state.materials.map(({ id, content, createdAt }) => ({ id, content, createdAt })));
    }

    function dedupeMaterials(items) {
      const seen = new Set();
      return items.filter(item => {
        if (seen.has(item.content)) return false;
        seen.add(item.content);
        return true;
      });
    }

    function sortMaterials(items) {
      return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    function pickReason(context) {
      const sceneReasons = {
        "刚换手机": ["刚换了新手机，就不太想继续用之前那个旧头了", "手机刚换新的，配件也想换个稳一点的"],
        "办公室用": ["办公室一直缺一个固定充电器", "主要是不想每天把充电器带来带去"],
        "家里用": ["家里只有一个充电头，每次拿来拿去挺麻烦", "床头想多放一个，晚上用起来方便点"],
        "朋友推荐购买": ["朋友用了之后说还行，我才跟着买的", "朋友推荐之后看了下，感觉挺符合日常需求"],
        "网络种草购买": ["看了几条评价，感觉这个比较符合我的需求", "之前刷到别人推荐才注意到这个"],
        "回购": ["之前买过一个，用着顺手，所以又买了", "家里有一个，这次又回购放到另一个地方"]
      };
      const pointReasons = [];
      if (context.point === "低温") pointReasons.push("之前充电时温度有点明显，所以想换个低温一点的");
      if (context.point === "对比杂牌") pointReasons.push("主要是不想再用杂牌头给手机充电");
      if (context.point === "对比旧充电器") pointReasons.push("之前那个用了挺久，感觉也该换了");
      if (context.point === "快充") pointReasons.push("平时经常临时补电，所以想换个速度稳一点的");
      if (context.point === "颜值") pointReasons.push("放桌面上的东西还是想选个看着顺眼的");
      const pool = [...(sceneReasons[context.scene] || customSceneLines(context.scene)), ...pointReasons, ...MODULES.reasons];
      if (context.styleProfile.reasonFirst) pool.push("主要是日常用得频繁，想选个省心一点的");
      return pickSmart(pool, context);
    }

    function pickSceneDetail(context) {
      const sceneDetails = {
        "刚换手机": ["新手机到手之后用了几天", "给新手机用，还是想稳一点", "手机刚换新，充电头也不想继续凑合"],
        "办公室用": ["放在工位左手边刚好", "平时中午吃饭前插上，回来能补不少电", "放办公室固定用，省得来回带"],
        "家里用": ["晚上放床头用，不用每天拔来拔去", "手机放桌边充，线长也够用", "家里多备一个，随手就能充"],
        "朋友推荐购买": ["到手之后用了几天", "跟着朋友买回来试了下", "用了几天感觉和朋友说的差不多"],
        "网络种草购买": ["到手之后先放桌边试了几天", "买回来用了几天，日常场景还挺合适", "看评价时比较在意温度，到手后也特意试了下"],
        "回购": ["这次主要放办公室用", "家里一个、办公室一个，用起来省事很多", "第二个打算固定放床头或者工位"]
      };
      const pool = [...(sceneDetails[context.scene] || customSceneLines(context.scene)), ...MODULES.sceneDetails];
      if (context.styleProfile.detailDensity === "high" || context.editPreference.detailBias === "moreDetail") {
        pool.push("早上出门前临时充一会儿，也能缓一下电量焦虑", "包里放一个也不占地方");
      }
      return pickSmart(pool, context);
    }

    function pickProblem(context) {
      const pools = {
        "低温": ["原来那个充一会儿温度就有点明显", "之前边回消息边充会觉得手机有点热"],
        "快充": ["以前临时补电总要等很久", "旧头速度慢，出门前充一会儿不太够"],
        "颜值": ["普通白头放桌上没什么问题，但总觉得有点乱", "之前的线和头不是一套，看着不太清爽"],
        "对比杂牌": ["之前便宜头用着总有点不放心", "杂牌头充电时发热比较明显"],
        "对比旧充电器": ["旧头用了很久，确实有点跟不上", "之前那个充得慢，还容易热"]
      };
      return pickSmart(pools[context.point] || ["之前用着总有点不顺手", "原来的充电器继续凑合也能用，但体验一般"], context);
    }

    function pickPointLine(point, context) {
      if (POINT_LINES[point]) return pickSmart(POINT_LINES[point], context);
      return pickSmart([
        `主要是看中${point}这一点，日常用起来还挺顺手`,
        `${point}这点没有写得很夸张，但实际用着比较符合预期`,
        `对我来说${point}比较重要，这个用下来还算稳`,
        `买之前就是冲着${point}来的，日常用没有违和感`
      ], context);
    }

    function customSceneLines(scene) {
      return [
        `${scene}的时候用着比较顺手`,
        `买来主要就是为了${scene}`,
        `${scene}这个场景下还挺实用`
      ];
    }

    function pickEnding(context) {
      const pool = [...MODULES.endings];
      if (context.scene === "回购") pool.push("后面应该还会继续回购");
      if (context.point === "低温") pool.push("至少不会一直担心发烫");
      if (context.creativity === "wild") pool.push("这种小配件每天都用，顺手其实挺重要", "换完之后才觉得固定位置多备一个很省事");
      if (context.editPreference.preferredPhrases.length && Math.random() < 0.28) {
        pool.push(...context.editPreference.preferredPhrases);
      }
      return pickSmart(context.creativity === "stable" ? pool.slice(0, 8) : pool, context);
    }

    function pickLengthType(creativity, editPreference, styleProfile) {
      if (editPreference.lengthBias === "shorter") return pick(["短", "短", "中", "中"]);
      if (editPreference.lengthBias === "longer") return pick(["中", "长", "长"]);
      const stylePool = styleProfile.rhythm === "short" ? ["短", "短", "中"] :
        styleProfile.rhythm === "long" ? ["中", "长", "长"] : [];
      const pool = stylePool.length ? stylePool :
        creativity === "stable" ? ["短", "中", "中", "中"] :
          creativity === "wild" ? ["短", "中", "长", "长"] : ["短", "中", "中", "长"];
      return pick(pool);
    }

    function trimToLength(text, type) {
      const max = type === "短" ? 46 : type === "中" ? 88 : 138;
      if (text.length <= max) return text;
      const sentences = text.split(/(?<=。)/).filter(Boolean);
      let result = "";
      for (const sentence of sentences) {
        if ((result + sentence).length > max) break;
        result += sentence;
      }
      return result || `${text.slice(0, max - 1)}。`;
    }

    function compactText(parts) {
      return parts.filter(Boolean).map(part => {
        const text = String(part).trim();
        return /[。！？]$/.test(text) ? text : `${text}。`;
      }).join("").replace(/。。+/g, "。");
    }

    function isTooSimilarToAny(text, list) {
      return list.some(item => isTooSimilar(text, item));
    }

    function isTooSimilar(a, b) {
      if (!a || !b) return false;
      if (a === b) return true;
      if (a.slice(0, 15) === b.slice(0, 15)) return true;
      const aSentences = a.split("。").filter(Boolean);
      const bSentences = b.split("。").filter(Boolean);
      if (aSentences.some(sentence => sentence.length > 10 && bSentences.includes(sentence))) return true;
      return calculateTextSimilarity(a, b) > 0.58;
    }

    function tokenPairs(text) {
      return text.replace(/[，。！？、\s]/g, "").match(/.{1,2}/g) || [];
    }

    function calculateTextSimilarity(a, b) {
      const aTokens = textNgrams(a, 2);
      const bTokens = textNgrams(b, 2);
      if (!aTokens.length || !bTokens.length) return 0;
      const bSet = new Set(bTokens);
      const overlap = aTokens.filter(token => bSet.has(token)).length;
      const union = new Set([...aTokens, ...bTokens]).size;
      const containment = overlap / Math.min(aTokens.length, bTokens.length);
      const jaccard = overlap / Math.max(union, 1);
      return Math.max(containment, jaccard);
    }

    function isTooSimilarToMaterials(text, materials) {
      return materials.some(item => {
        const material = String(item.content || "");
        if (!material) return false;
        if (text.slice(0, 12) === material.slice(0, 12)) return true;
        if (hasSharedRun(text, material, 8)) return true;
        return calculateTextSimilarity(text, material) > 0.6;
      });
    }

    function regenerateIfTooSimilar(text) {
      return isTooSimilarToMaterials(text, state.materials);
    }

    function textNgrams(text, size) {
      const normalized = String(text || "").replace(/[，。！？、\s]/g, "");
      const result = [];
      for (let index = 0; index <= normalized.length - size; index += 1) {
        result.push(normalized.slice(index, index + size));
      }
      return result;
    }

    function hasSharedRun(a, b, length) {
      const source = String(a || "").replace(/[，。！？、\s]/g, "");
      const target = String(b || "").replace(/[，。！？、\s]/g, "");
      if (source.length < length || target.length < length) return false;
      for (let index = 0; index <= source.length - length; index += 1) {
        if (target.includes(source.slice(index, index + length))) return true;
      }
      return false;
    }

    function pickSmart(list, context = {}) {
      const avoid = [...bannedMarketingPhrases, ...exaggeratedPhrases, ...(context.editPreference?.avoidPhrases || [])];
      const filtered = list.filter(item => item && !avoid.some(phrase => String(item).includes(phrase)));
      return pick(filtered.length ? filtered : list);
    }

    function sanitizeCopy(text, editPreference = {}) {
      let next = String(text || "");
      [...bannedMarketingPhrases, ...exaggeratedPhrases, ...(editPreference.avoidPhrases || [])].forEach(phrase => {
        next = next.replaceAll(phrase, "");
      });
      return next.replace(/，，+/g, "，").replace(/。。+/g, "。").replace(/，。/g, "。").trim();
    }

    function maybeApplyEditPreference(parts, context) {
      if (context.editPreference.preferredPhrases.length && Math.random() < 0.25) {
        parts.ending = pickSmart([...context.editPreference.preferredPhrases, parts.ending], context);
      }
      if (context.editPreference.detailBias === "moreDetail" && context.lengthType !== "短") {
        parts.scene = pickSmart([...MODULES.sceneDetails, parts.scene], context);
      }
    }

    function hasConcreteDetail(text) {
      return /办公室|工位|床头|中午|晚上|出门|回消息|到手|线长|家里|朋友|新手机|桌面|包里/.test(text);
    }

    function hasRepeatedCore(text, words, limit) {
      const count = words.reduce((sum, word) => sum + (String(text).match(new RegExp(word, "g")) || []).length, 0);
      return count >= limit;
    }

    function classifyOpening(text) {
      if (/之前/.test(text)) return "oldProblem";
      if (/本来/.test(text)) return "expectation";
      if (/买来放/.test(text)) return "scene";
      if (/主要是/.test(text)) return "reason";
      if (/用了几天|到手/.test(text)) return "afterUse";
      if (/朋友/.test(text)) return "friend";
      if (/种草|刷到|评价/.test(text)) return "seed";
      return "daily";
    }

    function normalizeKey(text) {
      return String(text || "").slice(0, 18);
    }

    function pickMany(list, count) {
      const copy = [...(list || [])];
      const result = [];
      while (copy.length && result.length < count) {
        result.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
      }
      return result;
    }

    function rememberHistory(contents) {
      state.history = [...contents, ...state.history].slice(0, 100);
      saveArray(HISTORY_KEY, state.history);
    }

    function clearHistory() {
      state.history = [];
      saveArray(HISTORY_KEY, state.history);
      showToast("历史已清空");
    }

    async function copyText(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      showToast("已复制");
    }

    function getCheckedValues(name) {
      return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(input => input.value);
    }

    function isChecked(name, value) {
      return getCheckedValues(name).includes(value);
    }

    function setChecked(name, value, checked) {
      const input = document.querySelector(`input[name="${name}"][value="${cssEscape(value)}"]`);
      if (input) input.checked = checked;
    }

    function cssEscape(value) {
      return String(value).replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    }

    function createButton(text, className, onClick) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = className;
      button.textContent = text;
      button.addEventListener("click", onClick);
      return button;
    }

    function createChip(text, extraClass = "") {
      const chip = document.createElement("span");
      chip.className = `chip ${extraClass}`;
      chip.textContent = text;
      return chip;
    }

    function createId() {
      return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }

    function getLengthType(text) {
      const length = String(text || "").length;
      if (length <= 46) return "短";
      if (length <= 88) return "中";
      return "长";
    }

    function pick(list) {
      if (!list || !list.length) return "";
      return list[Math.floor(Math.random() * list.length)];
    }

    function loadArray(key) {
      try {
        const parsed = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    }

    function saveArray(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }

    function loadOptionList(key, defaults, oldCustomKey) {
      const saved = loadArray(key).filter(Boolean);
      const oldCustom = loadArray(oldCustomKey).filter(Boolean);
      return uniqueList([...(saved.length ? saved : defaults), ...oldCustom]);
    }

    function uniqueList(list) {
      const seen = new Set();
      return list.filter(item => {
        const value = String(item || "").trim();
        if (!value || value === CUSTOM_OPTION || seen.has(value)) return false;
        seen.add(value);
        return true;
      });
    }

    function formatDate(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }

    function showToast(message) {
      els.toast.textContent = message;
      els.toast.classList.add("show");
      clearTimeout(showToast.timer);
      showToast.timer = setTimeout(() => els.toast.classList.remove("show"), 1600);
    }

    init();

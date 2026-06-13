const OLD_LIBRARY_KEY = "chargerBuyerShowCopyLibrary.v1";
    const OLD_REFERENCE_KEY = "buyerShowReferenceTexts";
    const MATERIAL_KEY = "buyerShowMaterials";
    const CUSTOM_POINTS_KEY = "customSellingPoints";
    const CUSTOM_SCENES_KEY = "customUseScenes";
    const SELLING_OPTIONS_KEY = "sellingPointOptions";
    const SCENE_OPTIONS_KEY = "useSceneOptions";
    const HISTORY_KEY = "generationHistory";
    const EDIT_FEEDBACK_KEY = "editFeedbackHistory";
    const STYLE_PROFILE_KEY = "buyerShowStyleProfile";
    const MANUAL_PREFERENCES_KEY = "buyerShowManualPreferences";
    const RECENT_FINGERPRINTS_KEY = "recentGeneratedFingerprints";
    const MATERIAL_ANALYSIS_VERSION = 1;
    const STYLE_PROFILE_VERSION = 1;

    const BASE_POINTS = ["快充", "低温", "颜值", "对比杂牌", "对比旧充电器"];
    const BASE_SCENES = ["刚换手机", "办公室用", "家里用", "朋友推荐购买", "网络种草购买", "回购"];
    const CUSTOM_OPTION = "自定义";

    const POINT_LINES = {
      "快充": [
        "临时补电挺方便", "不用一直等着手机充电", "午休前插上，下午用会踏实些",
        "速度比之前旧头快不少", "上班间隙补电够用了", "不是那种让人等很久的感觉",
        "开会前临时充一会儿也能缓一下", "电脑旁边顺手插上，补电效率还可以"
      ],
      "低温": [
        "温度控制比之前那个稳", "没有以前那个那么容易热", "边回消息边充，发热感没那么明显",
        "摸起来不会让人有明显不舒服的热感", "长时间插着也不会让人太担心", "对我来说，温度稳比单纯快更重要",
        "办公时边用边充，热感比原来轻一些", "温度表现比较克制，用着会安心点"
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
        "买来放办公室备用", "工位上正好缺一个固定充电器", "放在工位左手边刚好",
        "主要是上班时不想再临时找充电头", "公司里固定放一个会省事很多",
        "平时在办公室用手机比较频繁，想备一个稳定点的"
      ],
      "家里用": [
        "晚上放床头用，不用每天拔来拔去", "家里只有一个充电头，每次拿来拿去挺麻烦",
        "家里多备一个，随手就能充"
      ],
      "朋友推荐购买": [
        "朋友之前买过，说日常用着比较稳", "听朋友说这个用起来还算省心",
        "本来没太在意，是朋友用过之后推荐的", "身边朋友先买了一个，我才跟着看了下",
        "不是自己刷到的，主要是朋友实际用过才推荐"
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
        "看了几条评价，感觉这个比较符合我的需求", "朋友用过之后反馈还可以，我才认真看了下",
        "之前买过一个，用着顺手，所以又买了", "主要是每天都要用，想换个稳定一点的",
        "本来只是想多备一个，后来觉得固定位置放着确实方便", "旧的还能用，但体验已经有点跟不上"
      ],
      sceneDetails: [
        "放在工位上刚好", "午休前插上，回来电量能缓不少",
        "晚上放床头用，不用每天拔来拔去", "手机放桌边充，线长也够用",
        "早上出门前临时充一会儿，也能缓一下电量焦虑", "包里放一个也不占地方",
        "家里一个、办公室一个，用起来省事很多", "给家里人用的话，还是这种省心一点",
        "放在桌面上不占地方，随手插上就能用", "出门前补一会儿电，心里会踏实些"
      ],
      endings: [
        "目前用下来挺省心", "日常用完全够了", "整体比之前舒服不少",
        "给苹果手机用着也放心", "不算特别便宜，但用着踏实",
        "至少不会一直担心发烫", "每天都要用的东西，稳一点更重要",
        "对我来说这个体验已经够用了", "买套装确实省了不少事",
        "小东西不算复杂，但用顺手之后确实省事", "目前没有什么需要吐槽的地方"
      ]
    };

    const bannedMarketingPhrases = [
      "闭眼入", "绝绝子", "YYDS", "神器", "宝子", "姐妹们", "太香了",
      "冲就完了", "无脑入", "直接封神", "性价比天花板", "必买", "不买后悔",
      "狠狠爱了", "谁懂啊", "狠狠爱住"
    ];

    const exaggeratedPhrases = [
      "完全不发热", "一点都不烫", "秒充", "永远不伤电池", "彻底保护电池",
      "官方原装级别", "苹果官方同款", "苹果同款"
    ];

    const STRUCTURE_LABELS = {
      A: "购买原因->使用体验->总体感受",
      B: "使用场景->问题->产品解决",
      C: "对比旧款->换后变化->评价",
      D: "推荐种草来源->下单原因->使用感受",
      E: "回购->新使用位置->复购理由",
      F: "刚换手机->不想将就->使用安心"
    };

    const preferredPhraseCandidates = [
      "用着更安心", "温度比较稳", "放办公室刚好", "到手直接能用",
      "比之前那个舒服很多", "不算特别便宜，但用着放心", "日常用完全够了",
      "目前用下来挺省心", "给苹果手机用着也放心", "没有以前那个那么容易热",
      "用着比较踏实", "省得来回带", "还挺", "比较", "对我来说", "没那么夸张"
    ];

    const weakGenericPhrases = ["真的", "特别", "非常", "很快", "很好看", "很不错", "超", "巨", "太", "绝"];

    const concreteDetailKeywords = [
      "办公室", "工位", "床头", "家里", "回购", "刚换手机", "旧充电器", "杂牌",
      "朋友推荐", "到手", "用了几天", "中午", "出门前", "放包里", "桌面", "新手机"
    ];

    const EMPTY_MATERIAL_STYLE_ANALYSIS = {
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

    const EMPTY_MANUAL_PREFERENCES = {
      version: 1,
      updatedAt: "",
      tone: [],
      preferredStructures: [],
      preferredOpeningTypes: [],
      preferredEndingTypes: [],
      preferredLengthType: "",
      preferredDetailDensity: "",
      preferredSellingPointExpression: "",
      preferredSceneSpecificity: "",
      preferredStoryLevel: "",
      avoidStyles: [],
      customInstructions: ""
    };

    const PREFERENCE_OPTIONS = {
      tone: ["克制自然", "轻松口语", "真实生活感", "简洁直接", "轻度故事感", "理性客观"],
      length: ["短", "中等", "长", "跟随创意强度"],
      detailDensity: ["低", "中", "高", "自动判断"],
      sellingPointExpression: ["直接描述", "间接体验表达", "通过对比体现", "混合使用"],
      sceneSpecificity: ["一般", "具体", "非常具体"],
      storyLevel: ["不要故事感", "轻度故事感", "明显故事感"],
      openingTypes: ["购买原因", "使用场景", "到货经历", "旧款对比", "直接体验", "回购原因", "换新机背景"],
      endingTypes: ["安心感", "省心感", "日常够用", "对比总结", "回购意愿", "无明显总结"],
      avoidStyles: ["广告化口号", "空泛夸张", "网络热词", "官方介绍感", "参数堆叠", "强推销感", "句式重复", "场景过度编造", "情绪过度用力"]
    };

    const state = {
      pointOptions: [],
      sceneOptions: [],
      materials: [],
      generated: [],
      history: [],
      editFeedbackHistory: [],
      styleProfile: null,
      manualPreferences: null,
      effectiveStylePreferences: null,
      preferenceEditing: false
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
      openPreferencePanelBtn: document.getElementById("openPreferencePanelBtn"),
      preferenceModal: document.getElementById("preferenceModal"),
      closePreferenceModalBtn: document.getElementById("closePreferenceModalBtn"),
      preferenceStatusText: document.getElementById("preferenceStatusText"),
      preferenceView: document.getElementById("preferenceView"),
      editPreferenceBtn: document.getElementById("editPreferenceBtn"),
      rebuildStyleProfileBtn: document.getElementById("rebuildStyleProfileBtn"),
      resetManualPreferenceBtn: document.getElementById("resetManualPreferenceBtn"),
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
      state.materials = migrateBuyerShowMaterials();
      state.history = loadArray(HISTORY_KEY);
      state.editFeedbackHistory = loadEditFeedbackHistory();
      state.styleProfile = loadStyleProfile();
      state.manualPreferences = loadManualPreferences();
      state.effectiveStylePreferences = mergeStylePreferences(state.styleProfile, state.manualPreferences);
      saveArray(SELLING_OPTIONS_KEY, state.pointOptions);
      saveArray(SCENE_OPTIONS_KEY, state.sceneOptions);
      saveArray(EDIT_FEEDBACK_KEY, state.editFeedbackHistory);
      saveMaterials();
      refreshStyleProfileIfNeeded();
      renderOptionGroups();
      renderMaterials();
      bindEvents();
    }

    function bindEvents() {
      els.generateBtn.addEventListener("click", generateBatch);
      els.addSellingPointBtn.addEventListener("click", addCustomPoint);
      els.addSceneBtn.addEventListener("click", addCustomScene);
      els.openMaterialModalBtn.addEventListener("click", openMaterialModal);
      els.openPreferencePanelBtn.addEventListener("click", openPreferencePanel);
      els.closePreferenceModalBtn.addEventListener("click", closePreferencePanel);
      els.editPreferenceBtn.addEventListener("click", handlePreferenceEditAction);
      els.rebuildStyleProfileBtn.addEventListener("click", rebuildStyleProfileFromMaterials);
      els.resetManualPreferenceBtn.addEventListener("click", resetManualPreferences);
      els.closeMaterialModalBtn.addEventListener("click", closeMaterialModal);
      els.cancelMaterialBtn.addEventListener("click", closeMaterialModal);
      els.saveMaterialBtn.addEventListener("click", saveMaterialFromModal);
      els.clearMaterialsBtn.addEventListener("click", clearMaterials);
      els.materialModal.addEventListener("click", event => {
        if (event.target === els.materialModal) closeMaterialModal();
      });
      els.preferenceModal.addEventListener("click", event => {
        if (event.target === els.preferenceModal) closePreferencePanel();
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
        const copies = await requestFunctionCopies(points, scenes, creativity);
        const remoteItems = copies.slice(0, 10).map((content, index) => createFunctionGeneratedItem(content, points, scenes, creativity, index));
        const localTopUps = remoteItems.length < 10
          ? generateDiverseCopies(10 - remoteItems.length, { points, scenes, creativity, useMaterials: els.useMaterials.checked })
          : [];
        state.generated = [...remoteItems, ...localTopUps].slice(0, 10);
        rememberHistory(state.generated.map(item => item.content));
        rememberGeneratedFingerprints(remoteItems.map(item => item.content));
        renderGenerated();
        showToast(remoteItems.length < 10 ? "AI 返回不足 10 条，已使用本地生成器补足" : `已生成 ${state.generated.length} 条文案`);
      } catch (error) {
        console.warn("generate-copy function unavailable:", error.message);
        generateLocalBatch(points, scenes, creativity, { message: "AI 生成失败，已使用本地生成器兜底" });
      } finally {
        setGeneratingState(false);
      }
    }

    function setGeneratingState(isGenerating) {
      els.generateBtn.disabled = isGenerating;
      els.generateBtn.textContent = isGenerating ? "正在生成中..." : "生成文案";
    }

    async function requestFunctionCopies(points, scenes, creativity) {
      const useMaterialStyle = Boolean(els.useMaterials.checked);
      const representativeMaterials = useMaterialStyle ? selectRepresentativeMaterials(state.materials, 5) : [];
      syncEffectiveStylePreferences();
      const response = await fetch("/.netlify/functions/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellingPoints: points,
          useScenes: scenes,
          creativityLevel: creativity,
          useMaterialStyle,
          styleProfile: useMaterialStyle ? state.styleProfile : null,
          manualPreferences: useMaterialStyle ? state.manualPreferences : createEmptyManualPreferences(),
          effectiveStylePreferences: useMaterialStyle ? state.effectiveStylePreferences : null,
          representativeMaterials,
          materialsForSimilarity: state.materials
            .map(({ content }) => ({ content }))
            .slice(0, 100),
          recentGeneratedFingerprints: loadRecentGeneratedFingerprints(),
          editFeedbackHistory: loadEditFeedbackHistory().slice(0, 20)
        })
      });
      if (!response.ok) throw new Error(`Function returned ${response.status}`);
      const data = await response.json();
      const copies = Array.isArray(data?.copies)
        ? data.copies.map(item => typeof item === "string" ? item : item?.content).map(item => String(item || "").trim()).filter(Boolean)
        : [];
      if (!Array.isArray(data?.copies)) throw new Error("Function response must contain copies array");
      return copies.slice(0, 10);
    }

    function selectRepresentativeMaterials(materials, count = 5) {
      const completed = materials
        .map(normalizeMaterial)
        .filter(item => item.analysisStatus === "completed" && item.content)
        .sort((a, b) => getRepresentativeScore(b) - getRepresentativeScore(a));
      const selected = [];
      const usedStructures = new Set();
      const usedOpenings = new Set();
      const usedTriggers = new Set();

      completed.forEach(item => {
        if (selected.length >= count) return;
        const style = normalizeMaterialStyleAnalysis(item.styleAnalysis);
        const hasNewStyleSignal = !usedStructures.has(style.narrativeStructure)
          || !usedOpenings.has(style.openingType)
          || !usedTriggers.has(style.purchaseTrigger);
        if (!hasNewStyleSignal && selected.length >= Math.max(2, Math.floor(count / 2))) return;
        if (selected.some(existing => isTooSimilarText(item.content, existing.content, 0.48))) return;
        selected.push(createRepresentativeMaterialPayload(item));
        if (style.narrativeStructure) usedStructures.add(style.narrativeStructure);
        if (style.openingType) usedOpenings.add(style.openingType);
        if (style.purchaseTrigger) usedTriggers.add(style.purchaseTrigger);
      });

      if (selected.length < count) {
        completed.forEach(item => {
          if (selected.length >= count) return;
          if (selected.some(existing => existing.content === item.content || isTooSimilarText(item.content, existing.content, 0.58))) return;
          selected.push(createRepresentativeMaterialPayload(item));
        });
      }

      return selected.slice(0, count);
    }

    function openPreferencePanel() {
      state.preferenceEditing = false;
      syncEffectiveStylePreferences();
      renderPreferencePanel();
      els.preferenceModal.classList.add("open");
    }

    function closePreferencePanel() {
      els.preferenceModal.classList.remove("open");
      state.preferenceEditing = false;
    }

    function startPreferenceEdit() {
      state.preferenceEditing = true;
      renderPreferencePanel();
    }

    function handlePreferenceEditAction() {
      if (state.preferenceEditing) {
        savePreferenceEdit();
      } else {
        startPreferenceEdit();
      }
    }

    function renderPreferencePanel() {
      syncEffectiveStylePreferences();
      const completedCount = getCompletedMaterialCount();
      els.preferenceStatusText.textContent = `${getProfileStatusLabel(completedCount)} · 当前画像基于 ${completedCount} 条优秀素材生成`;
      els.editPreferenceBtn.textContent = state.preferenceEditing ? "保存偏好" : "编辑偏好";
      els.preferenceView.innerHTML = "";
      els.preferenceView.appendChild(state.preferenceEditing ? createPreferenceEditView() : createPreferenceReadView());
    }

    function createPreferenceReadView() {
      const wrapper = document.createElement("div");
      const completedCount = getCompletedMaterialCount();
      if (!completedCount) {
        wrapper.appendChild(createPreferenceMessage("暂无可分析的优秀案例，请先将满意的文案加入素材库。"));
        appendPreferenceDebug(wrapper);
        return wrapper;
      }
      if (completedCount < 3) {
        wrapper.appendChild(createPreferenceMessage("当前优秀案例较少，风格画像还不稳定。建议继续将真正满意的文案加入素材库。"));
      }

      const summary = document.createElement("div");
      summary.className = "preference-summary";
      summary.textContent = state.effectiveStylePreferences.profileSummary || state.styleProfile?.profileSummary || "偏好仍不明显，继续积累素材后会更稳定。";
      wrapper.appendChild(summary);

      const grid = document.createElement("div");
      grid.className = "preference-grid";
      grid.append(
        createPreferenceSection("偏好语气", getToneDisplayLabels(state.styleProfile?.tonePreferences, state.manualPreferences?.tone).slice(0, 3), "自动画像与人工设置合并展示。"),
        createPreferenceSection("偏好叙事结构", state.effectiveStylePreferences.preferredStructures, "", true),
        createPreferenceSection("偏好开头方式", state.effectiveStylePreferences.preferredOpeningTypes),
        createPreferenceSection("偏好结尾方式", state.effectiveStylePreferences.preferredEndingTypes),
        createPreferenceSection("长度与细节", [
          state.effectiveStylePreferences.preferredLengthType ? `长度：${state.effectiveStylePreferences.preferredLengthType}` : "",
          state.effectiveStylePreferences.preferredDetailDensity ? `细节：${state.effectiveStylePreferences.preferredDetailDensity}` : ""
        ].filter(Boolean), detailDensityExplanation(state.effectiveStylePreferences.preferredDetailDensity)),
        createPreferenceSection("卖点表达", [state.effectiveStylePreferences.preferredSellingPointExpression].filter(Boolean), sellingPointExpressionExplanation(state.effectiveStylePreferences.preferredSellingPointExpression)),
        createPreferenceSection("场景具体程度", [state.effectiveStylePreferences.preferredSceneSpecificity].filter(Boolean)),
        createPreferenceSection("故事感", [state.effectiveStylePreferences.preferredStoryLevel].filter(Boolean)),
        createPreferenceSection("不喜欢的风格", state.effectiveStylePreferences.avoidStyles, "", true)
      );
      wrapper.appendChild(grid);
      if (state.effectiveStylePreferences.customInstructions) {
        wrapper.appendChild(createPreferenceSection("补充要求", [state.effectiveStylePreferences.customInstructions], "", true));
      }
      appendPreferenceDebug(wrapper);
      return wrapper;
    }

    function createPreferenceEditView() {
      const form = document.createElement("div");
      form.className = "preference-edit-grid";
      const prefs = normalizeManualPreferences(state.manualPreferences);
      form.append(
        createPreferenceChoiceField("语气偏好", "tone", PREFERENCE_OPTIONS.tone, prefs.tone, true),
        createPreferenceChoiceField("长度偏好", "preferredLengthType", PREFERENCE_OPTIONS.length, prefs.preferredLengthType, false),
        createPreferenceChoiceField("细节密度", "preferredDetailDensity", PREFERENCE_OPTIONS.detailDensity, prefs.preferredDetailDensity, false),
        createPreferenceChoiceField("卖点表达方式", "preferredSellingPointExpression", PREFERENCE_OPTIONS.sellingPointExpression, prefs.preferredSellingPointExpression, false),
        createPreferenceChoiceField("场景具体程度", "preferredSceneSpecificity", PREFERENCE_OPTIONS.sceneSpecificity, prefs.preferredSceneSpecificity, false),
        createPreferenceChoiceField("故事感", "preferredStoryLevel", PREFERENCE_OPTIONS.storyLevel, prefs.preferredStoryLevel, false),
        createPreferenceChoiceField("喜欢的开头方式", "preferredOpeningTypes", PREFERENCE_OPTIONS.openingTypes, prefs.preferredOpeningTypes, true),
        createPreferenceChoiceField("喜欢的结尾方式", "preferredEndingTypes", PREFERENCE_OPTIONS.endingTypes, prefs.preferredEndingTypes, true),
        createPreferenceChoiceField("不喜欢的风格", "avoidStyles", PREFERENCE_OPTIONS.avoidStyles, prefs.avoidStyles, true),
        createCustomInstructionField(prefs.customInstructions)
      );
      return form;
    }

    function createPreferenceChoiceField(title, name, options, selectedValue, multiple) {
      const field = document.createElement("div");
      field.className = "field";
      const label = document.createElement("span");
      label.className = "field-title";
      label.textContent = title;
      const choices = document.createElement("div");
      choices.className = "preference-choice-grid";
      const selected = new Set(Array.isArray(selectedValue) ? selectedValue : [selectedValue].filter(Boolean));
      options.forEach(option => {
        const pill = document.createElement("label");
        pill.className = "option-pill";
        const input = document.createElement("input");
        input.type = multiple ? "checkbox" : "radio";
        input.name = `preference-${name}`;
        input.value = option;
        input.checked = selected.has(option);
        pill.append(input, document.createTextNode(option));
        choices.appendChild(pill);
      });
      field.append(label, choices);
      return field;
    }

    function createCustomInstructionField(value) {
      const field = document.createElement("div");
      field.className = "field";
      const label = document.createElement("label");
      label.setAttribute("for", "manualPreferenceCustomInstructions");
      label.textContent = "补充你的文案偏好";
      const textarea = document.createElement("textarea");
      textarea.id = "manualPreferenceCustomInstructions";
      textarea.maxLength = 500;
      textarea.placeholder = "例如：不要每条都写回购；少用“真的”“非常”；卖点要通过体验体现。";
      textarea.value = value || "";
      field.append(label, textarea);
      return field;
    }

    function savePreferenceEdit() {
      const next = normalizeManualPreferences({
        tone: getPreferenceInputs("tone", true),
        preferredStructures: state.manualPreferences?.preferredStructures || [],
        preferredOpeningTypes: getPreferenceInputs("preferredOpeningTypes", true),
        preferredEndingTypes: getPreferenceInputs("preferredEndingTypes", true),
        preferredLengthType: getPreferenceInputs("preferredLengthType")[0] || "",
        preferredDetailDensity: getPreferenceInputs("preferredDetailDensity")[0] || "",
        preferredSellingPointExpression: getPreferenceInputs("preferredSellingPointExpression")[0] || "",
        preferredSceneSpecificity: getPreferenceInputs("preferredSceneSpecificity")[0] || "",
        preferredStoryLevel: getPreferenceInputs("preferredStoryLevel")[0] || "",
        avoidStyles: getPreferenceInputs("avoidStyles", true),
        customInstructions: document.getElementById("manualPreferenceCustomInstructions")?.value.trim().slice(0, 500) || "",
        updatedAt: new Date().toISOString()
      });
      state.manualPreferences = next;
      saveManualPreferences();
      state.preferenceEditing = false;
      syncEffectiveStylePreferences();
      renderPreferencePanel();
      showToast("文案偏好已保存");
    }

    function getPreferenceInputs(name) {
      return Array.from(document.querySelectorAll(`input[name="preference-${name}"]:checked`)).map(input => input.value);
    }

    function resetManualPreferences() {
      if (!confirm("确定清除人工设置，恢复系统自动学习结果吗？")) return;
      state.manualPreferences = createEmptyManualPreferences();
      saveManualPreferences();
      syncEffectiveStylePreferences();
      renderPreferencePanel();
      showToast("已恢复自动判断");
    }

    function rebuildStyleProfileFromMaterials() {
      refreshStyleProfile();
      syncEffectiveStylePreferences();
      renderPreferencePanel();
      showToast("风格画像已根据当前素材库重新生成。");
    }

    function createPreferenceMessage(text) {
      const message = document.createElement("div");
      message.className = "empty";
      message.textContent = text;
      return message;
    }

    function createPreferenceSection(title, values, note = "", full = false) {
      const section = document.createElement("section");
      section.className = `preference-section${full ? " full" : ""}`;
      const heading = document.createElement("h3");
      heading.textContent = title;
      const list = document.createElement("ul");
      list.className = "preference-list";
      const cleanValues = uniqueList((values || []).filter(Boolean));
      if (cleanValues.length) {
        cleanValues.slice(0, 5).forEach(value => {
          const item = document.createElement("li");
          item.className = "chip";
          item.textContent = value;
          list.appendChild(item);
        });
      } else {
        const empty = document.createElement("li");
        empty.className = "chip";
        empty.textContent = "自动判断";
        list.appendChild(empty);
      }
      section.append(heading, list);
      if (note) {
        const p = document.createElement("p");
        p.className = "preference-note";
        p.textContent = note;
        section.appendChild(p);
      }
      return section;
    }

    function appendPreferenceDebug(wrapper) {
      if (!isDevMode()) return;
      const debug = document.createElement("pre");
      debug.className = "preference-debug";
      debug.textContent = JSON.stringify({
        buyerShowStyleProfile: state.styleProfile,
        buyerShowManualPreferences: state.manualPreferences,
        effectiveStylePreferences: state.effectiveStylePreferences,
        sourceMap: state.effectiveStylePreferences?.sourceMap
      }, null, 2);
      wrapper.appendChild(debug);
    }

    function getRepresentativeScore(item) {
      const sourceScore = { edited: 30, manual: 20, generated: 10 }[item.source] || 10;
      const style = normalizeMaterialStyleAnalysis(item.styleAnalysis);
      const styleScore = ["narrativeStructure", "openingType", "purchaseTrigger", "tone", "endingType"]
        .reduce((sum, key) => sum + (style[key] ? 3 : 0), 0);
      const createdAt = new Date(item.createdAt).getTime();
      const recentScore = Number.isFinite(createdAt) ? Math.max(0, 10 - ((Date.now() - createdAt) / (30 * 24 * 60 * 60 * 1000))) : 0;
      return sourceScore + styleScore + recentScore;
    }

    function createRepresentativeMaterialPayload(item) {
      const style = normalizeMaterialStyleAnalysis(item.styleAnalysis);
      return {
        content: item.content,
        source: item.source,
        styleAnalysis: {
          purchaseTrigger: style.purchaseTrigger,
          narrativeStructure: style.narrativeStructure,
          tone: style.tone,
          lengthType: style.lengthType,
          detailDensity: style.detailDensity,
          openingType: style.openingType,
          endingType: style.endingType,
          sellingPointExpression: style.sellingPointExpression,
          sceneSpecificity: style.sceneSpecificity,
          contrastType: style.contrastType,
          adIntensity: style.adIntensity,
          storyLevel: style.storyLevel
        }
      };
    }

    function isTooSimilarText(textA, textB, threshold = 0.5) {
      const source = normalizeText(textA);
      const target = normalizeText(textB);
      if (!source || !target) return false;
      if (source.slice(0, 12) === target.slice(0, 12)) return true;
      if (hasLongCommonSubstring(source, target, 8)) return true;
      return calculateTextSimilarity(source, target) > threshold;
    }

    function generateLocalBatch(points, scenes, creativity, options = {}) {
      const generated = generateDiverseCopies(10, { points, scenes, creativity, useMaterials: els.useMaterials.checked });
      state.generated = generated.slice(0, 10);
      rememberHistory(state.generated.map(item => item.content));
      renderGenerated();
      showToast(options.message || `已生成 ${state.generated.length} 条文案`);
    }

    function createFunctionGeneratedItem(content, points, scenes, creativity, index) {
      const point = points[index % points.length] || "";
      const scene = scenes[index % scenes.length] || "";
      return {
        id: createId(),
        content,
        point,
        secondPoint: "",
        scene,
        lengthType: getLengthType(content),
        structureKey: "function",
        openerKey: classifyOpening(content.split("。").filter(Boolean)[0] || content),
        endingKey: normalizeKey(content.split("。").filter(Boolean).pop() || content),
        selectedSellingPoints: [...points],
        selectedUseScenes: [...scenes],
        creativityLevel: creativity,
        useMaterialStyle: Boolean(els.useMaterials.checked),
        editing: false,
        draft: "",
        originalText: content
      };
    }

    function generateDiverseCopies(count, options) {
      const points = options.points || [];
      const scenes = options.scenes || [];
      const creativity = options.creativity || "standard";
      const materialPool = els.useMaterials.checked ? state.materials : [];
      const styleProfile = options.useMaterials ? analyzeMaterialStyle(pickMany(materialPool, 5)) : createDefaultStyleProfile();
      const editPreference = analyzeEditFeedback();
      const generated = [];
      const stats = createBatchStats();
      let attempts = 0;
      while (generated.length < count && attempts < 360) {
        attempts += 1;
        const relaxed = attempts > 180;
        const item = createGeneratedItem(points, scenes, creativity, { styleProfile, editPreference, stats, materialPool, useMaterialStyle: options.useMaterials });
        if (
          validateGeneratedCopy(item.content, [item.point, item.secondPoint].filter(Boolean), [item.scene], item) &&
          passesBatchRules(item, stats, relaxed) &&
          !isTooSimilarToAny(item.content, generated.map(existing => existing.content)) &&
          !isTooSimilarToAny(item.content, state.history) &&
          !isTooSimilarToMaterials(item.content, materialPool)
        ) {
          generated.push(item);
          rememberBatchItem(stats, item);
        }
      }
      while ((generated.length < count || isBatchTooRepetitive(generated, count)) && attempts < 620) {
        attempts += 1;
        const localStats = isBatchTooRepetitive(generated, count) ? createStatsFromBatch(generated) : stats;
        const item = createGeneratedItem(points, scenes, creativity, { styleProfile, editPreference, stats: localStats, materialPool, useMaterialStyle: options.useMaterials });
        if (
          validateGeneratedCopy(item.content, [item.point, item.secondPoint].filter(Boolean), [item.scene], item) &&
          passesBatchRules(item, localStats, attempts > 520) &&
          !isTooSimilarToAny(item.content, generated.map(existing => existing.content)) &&
          !isTooSimilarToMaterials(item.content, materialPool)
        ) {
          generated.push(item);
          rememberBatchItem(stats, item);
          trackBatchDiversity(generated, stats);
        }
        if (generated.length > count) generated.splice(findMostRepetitiveIndex(generated), 1);
      }
      let fallbackAttempts = 0;
      const fallbackStyleProfile = createDefaultStyleProfile();
      while (generated.length < count && fallbackAttempts < 240) {
        fallbackAttempts += 1;
        const item = createGeneratedItem(points, scenes, creativity, { styleProfile: fallbackStyleProfile, editPreference, stats, materialPool: [], useMaterialStyle: false });
        if (
          validateGeneratedCopy(item.content, [item.point, item.secondPoint].filter(Boolean), [item.scene], item) &&
          !generated.some(existing => existing.content === item.content) &&
          !isTooSimilarToAny(item.content, generated.map(existing => existing.content)) &&
          !isTooSimilarToMaterials(item.content, materialPool)
        ) {
          generated.push(item);
          rememberBatchItem(stats, item);
        }
      }
      let hardFallbackAttempts = 0;
      while (generated.length < count && hardFallbackAttempts < 240) {
        hardFallbackAttempts += 1;
        const item = createGeneratedItem(points, scenes, creativity, { styleProfile: fallbackStyleProfile, editPreference, stats, materialPool: [], useMaterialStyle: false });
        item.content = sanitizeCopy(`${item.content.replace(/。$/, "")}，${pick(MODULES.endings)}。`, editPreference);
        if (
          !generated.some(existing => existing.content === item.content) &&
          validateGeneratedCopy(item.content, [item.point, item.secondPoint].filter(Boolean), [item.scene], item) &&
          !isTooSimilarToMaterials(item.content, materialPool)
        ) {
          generated.push(item);
          rememberBatchItem(stats, item);
        }
      }
      return generated.slice(0, count);
    }

    function createGeneratedItem(points, scenes, creativity, context) {
      const point = pickNextOption(points, context.stats.pointSequence);
      const secondPoint = shouldUseSecondPoint(points, creativity) ? pick(points.filter(item => item !== point)) : "";
      const scene = pickNextOption(scenes, context.stats.sceneSequence);
      const lengthType = pickLengthType(creativity, context.editPreference, context.styleProfile);
      const structureKey = pickStructureKey(scene, point, context.styleProfile, context.stats);
      const generatorFn = () => buildNarrativeCopy({ point, secondPoint, scene, creativity, lengthType, structureKey, ...context }).content;
      const content = regenerateIfTooSimilar(generatorFn(), context.materialPool || [], generatorFn);
      const result = { content, openerKey: classifyOpening(content.split("。").filter(Boolean)[0] || content), endingKey: normalizeKey(content.split("。").filter(Boolean).pop() || content) };
      return {
        id: createId(),
        content: result.content,
        point,
        secondPoint,
        scene,
        lengthType: getLengthType(result.content),
        structureKey,
        openerKey: result.openerKey,
        endingKey: result.endingKey,
        selectedSellingPoints: [...points],
        selectedUseScenes: [...scenes],
        creativityLevel: creativity,
        useMaterialStyle: Boolean(context.useMaterialStyle),
        editing: false,
        draft: "",
        originalText: result.content
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
      const maxParts = context.editPreference.detailBias === "lessDetail" ? 3 : context.lengthType === "短" ? 3 : context.lengthType === "中" ? 4 : 5;
      const chosen = order.filter(key => parts[key]).slice(0, maxParts);
      const content = applyEditPreferences(sanitizeCopy(trimToLength(compactText(chosen.map(key => parts[key])), context.lengthType), context.editPreference), context.editPreference, context);
      return { content, openerKey: normalizeKey(chosen[0] ? parts[chosen[0]] : ""), endingKey: normalizeKey(parts.ending) };
    }

    function analyzeMaterialStyle(materials) {
      const contents = materials.map(item => String(item.content || "").trim()).filter(Boolean);
      if (!contents.length) return createDefaultStyleProfile();

      const joined = contents.join("。");
      const avgLength = contents.reduce((sum, text) => sum + normalizeText(text).length, 0) / contents.length;
      const count = pattern => contents.filter(text => pattern.test(text)).length;
      const commonPatterns = uniqueList([
        count(/之前.+现在|之前.+换|以前.+现在/) ? "之前现在" : "",
        count(/本来.+没想到/) ? "本来没想到" : "",
        count(/买来放|放在|放到/) ? "买来放" : "",
        count(/主要是/) ? "主要是" : "",
        count(/用了几天|用了一段时间/) ? "用了几天" : "",
        count(/到手之后|到手后/) ? "到手之后" : "",
        count(/比之前|比以前/) ? "比之前" : "",
        count(/整体|目前用下来/) ? "整体目前" : "",
        count(/朋友推荐|朋友说/) ? "朋友推荐" : "",
        count(/刷到|种草|评价/) ? "网络种草" : ""
      ]);
      const preferredDetails = uniqueList([
        count(/物流|到货|快递/) ? "物流到货细节" : "",
        count(/为什么买|主要是|不想|怕|刚换/) ? "购买原因" : "",
        count(/办公室|工位/) ? "办公室" : "",
        count(/床头|家里|桌边/) ? "床头家里" : "",
        count(/桌面|颜色|粉色|白色|灰色/) ? "桌面颜色" : "",
        count(/旧|之前|杂牌|以前/) ? "旧充电器" : "",
        count(/回购|又买|之前买过/) ? "回购理由" : "",
        count(/电池健康|电池/) ? "担心电池健康" : "",
        count(/温度|发热|烫/) ? "温度稳" : ""
      ]);
      const toneScores = {
        "回购分享型": count(/回购|又买|之前买过|第二个/),
        "对比体验型": count(/之前|以前|旧|杂牌|换|比之前/),
        "朋友推荐型": count(/朋友|推荐/),
        "网络种草型": count(/种草|刷到|评价/),
        "新机换购型": count(/新手机|刚换/),
        "办公备用型": count(/办公室|工位/),
        "家用备用型": count(/家里|床头/),
        "真实评价型": contents.length
      };
      const toneTypes = Object.entries(toneScores)
        .filter(([, score]) => score > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([tone]) => tone)
        .slice(0, 3);

      const structurePreference = inferStructurePreference(commonPatterns, toneTypes);
      return {
        toneType: toneTypes[0] || "真实评价型",
        toneTypes: toneTypes.length ? toneTypes : ["真实评价型"],
        structurePreference,
        sentenceLength: avgLength < 48 ? "short" : avgLength > 96 ? "long" : "medium",
        rhythm: avgLength < 48 ? "short" : avgLength > 96 ? "long" : "medium",
        detailDensity: preferredDetails.length >= 4 ? "high" : preferredDetails.length >= 2 ? "medium" : "low",
        commonPatterns,
        preferredDetails,
        reasonFirst: commonPatterns.includes("主要是") || commonPatterns.includes("之前现在"),
        oldProblemFirst: commonPatterns.includes("之前现在") || commonPatterns.includes("比之前"),
        recommendationFirst: commonPatterns.includes("朋友推荐") || commonPatterns.includes("网络种草"),
        preferredOpenings: contents.map(text => text.split("。").filter(Boolean)[0]).filter(Boolean).map(classifyOpening),
        preferredEndings: contents.map(text => text.split("。").filter(Boolean).pop()).filter(Boolean).map(normalizeKey)
      };
    }

    function createDefaultStyleProfile() {
      return {
        toneType: "真实评价型",
        toneTypes: ["真实评价型"],
        structurePreference: ["购买原因->使用体验->总体感受"],
        sentenceLength: "medium",
        rhythm: "medium",
        detailDensity: "medium",
        commonPatterns: [],
        preferredDetails: [],
        reasonFirst: true,
        oldProblemFirst: false,
        recommendationFirst: false,
        preferredOpenings: [],
        preferredEndings: []
      };
    }

    function createNeutralEditPreference() {
      return {
        avoidPhrases: [...bannedMarketingPhrases, ...exaggeratedPhrases],
        preferredPhrases: [],
        lengthBias: "neutral",
        detailBias: "neutral",
        toneBias: "neutral",
        sceneBias: [],
        commonUserAdditions: [],
        commonUserRemovals: [],
        preferredUsageCounts: {}
      };
    }

    function loadEditFeedbackHistory() {
      return loadArray(EDIT_FEEDBACK_KEY)
        .map(normalizeEditFeedback)
        .filter(Boolean)
        .slice(0, 100);
    }

    function normalizeEditFeedback(item) {
      if (!item || !item.originalText || !item.editedText) return null;
      return {
        id: typeof item.id === "string" ? item.id : createId(),
        originalText: String(item.originalText),
        editedText: String(item.editedText),
        selectedSellingPoints: Array.isArray(item.selectedSellingPoints) ? item.selectedSellingPoints.filter(Boolean) : [],
        selectedUseScenes: Array.isArray(item.selectedUseScenes) ? item.selectedUseScenes.filter(Boolean) : [],
        creativityLevel: item.creativityLevel || "standard",
        useMaterialStyle: Boolean(item.useMaterialStyle),
        createdAt: item.createdAt || new Date().toISOString()
      };
    }

    function getAvoidPhrasesFromFeedback(history) {
      const counts = {};
      const defaults = [...bannedMarketingPhrases, ...exaggeratedPhrases];
      history.forEach(item => {
        const original = String(item.originalText || "");
        const edited = String(item.editedText || "");
        [...defaults, ...weakGenericPhrases].forEach(phrase => {
          if (original.includes(phrase) && !edited.includes(phrase)) {
            counts[phrase] = (counts[phrase] || 0) + 1;
          }
        });
        extractRemovedPhrases(original, edited).forEach(phrase => {
          counts[phrase] = (counts[phrase] || 0) + 1;
        });
      });
      const learned = Object.entries(counts)
        .filter(([phrase, count]) => phrase.length >= 2 && (count >= 2 || [...defaults, ...weakGenericPhrases].includes(phrase)))
        .sort((a, b) => b[1] - a[1])
        .map(([phrase]) => phrase)
        .slice(0, 30);
      return uniqueList([...defaults, ...learned]);
    }

    function getPreferredPhrasesFromFeedback(history) {
      const counts = {};
      history.forEach(item => {
        const original = String(item.originalText || "");
        const edited = String(item.editedText || "");
        preferredPhraseCandidates.forEach(phrase => {
          if (edited.includes(phrase) && !original.includes(phrase)) {
            counts[phrase] = (counts[phrase] || 0) + 1;
          }
        });
        extractAddedPhrases(original, edited).forEach(phrase => {
          counts[phrase] = (counts[phrase] || 0) + 1;
        });
      });
      return Object.entries(counts)
        .filter(([phrase, count]) => phrase.length >= 4 && count >= 1 && ![...bannedMarketingPhrases, ...exaggeratedPhrases].some(banned => phrase.includes(banned)))
        .sort((a, b) => b[1] - a[1])
        .map(([phrase]) => phrase)
        .slice(0, 12);
    }

    function extractCommonDiffPhrases(history, type) {
      const counts = {};
      history.forEach(item => {
        const original = String(item.originalText || "");
        const edited = String(item.editedText || "");
        const phrases = type === "added" ? extractAddedPhrases(original, edited) : extractRemovedPhrases(original, edited);
        phrases.forEach(phrase => {
          counts[phrase] = (counts[phrase] || 0) + 1;
        });
      });
      return Object.entries(counts)
        .filter(([phrase, count]) => phrase.length >= 4 && count >= 1)
        .sort((a, b) => b[1] - a[1])
        .map(([phrase]) => phrase);
    }

    function extractAddedPhrases(original, edited) {
      return extractCandidatePhrases(edited).filter(phrase => !original.includes(phrase));
    }

    function extractRemovedPhrases(original, edited) {
      return extractCandidatePhrases(original).filter(phrase => !edited.includes(phrase));
    }

    function extractCandidatePhrases(text) {
      const candidates = String(text || "")
        .split(/[，。！？、；;\n]/)
        .map(phrase => phrase.trim())
        .filter(phrase => phrase.length >= 4 && phrase.length <= 18);
      const keywordHits = preferredPhraseCandidates.filter(phrase => text.includes(phrase));
      return uniqueList([...candidates, ...keywordHits]).filter(phrase => !/^\d+$/.test(phrase));
    }

    function extractDetailKeywords(text) {
      return concreteDetailKeywords.filter(keyword => String(text || "").includes(keyword));
    }

    function inferStructurePreference(commonPatterns, toneTypes) {
      const preferences = [];
      if (toneTypes.includes("回购分享型")) preferences.push(STRUCTURE_LABELS.E);
      if (toneTypes.includes("对比体验型") || commonPatterns.includes("之前现在") || commonPatterns.includes("比之前")) preferences.push(STRUCTURE_LABELS.C);
      if (toneTypes.includes("朋友推荐型") || toneTypes.includes("网络种草型")) preferences.push(STRUCTURE_LABELS.D);
      if (toneTypes.includes("新机换购型")) preferences.push(STRUCTURE_LABELS.F);
      if (commonPatterns.includes("买来放")) preferences.push(STRUCTURE_LABELS.B);
      preferences.push(STRUCTURE_LABELS.A);
      return uniqueList(preferences);
    }

    function analyzeEditFeedback() {
      const feedback = loadEditFeedbackHistory().slice(0, 100);
      const recent = feedback.slice(0, 20);
      const avoidPhrases = getAvoidPhrasesFromFeedback(feedback);
      const preferredPhrases = getPreferredPhrasesFromFeedback(feedback);
      let shorter = 0;
      let longer = 0;
      let addedDetail = 0;
      let removedDetail = 0;
      const sceneCounts = {};
      recent.forEach(item => {
        const original = String(item.originalText || "");
        const edited = String(item.editedText || "");
        if (!original || !edited) return;
        if (normalizeText(edited).length < normalizeText(original).length * 0.85) shorter += 1;
        if (normalizeText(edited).length > normalizeText(original).length * 1.15) longer += 1;
        const originalDetails = extractDetailKeywords(original);
        const editedDetails = extractDetailKeywords(edited);
        if (editedDetails.some(keyword => !originalDetails.includes(keyword))) addedDetail += 1;
        if (originalDetails.some(keyword => !editedDetails.includes(keyword))) removedDetail += 1;
        editedDetails.forEach(keyword => {
          sceneCounts[keyword] = (sceneCounts[keyword] || 0) + 1;
        });
      });
      const commonUserAdditions = extractCommonDiffPhrases(feedback, "added").slice(0, 12);
      const commonUserRemovals = extractCommonDiffPhrases(feedback, "removed").slice(0, 12);
      const toneBias = avoidPhrases.some(phrase => [...bannedMarketingPhrases, ...exaggeratedPhrases, ...weakGenericPhrases].includes(phrase))
        ? "lessExaggerated"
        : "neutral";
      return {
        avoidPhrases,
        preferredPhrases,
        lengthBias: shorter > longer + 1 ? "shorter" : longer > shorter + 1 ? "longer" : "neutral",
        detailBias: addedDetail > removedDetail + 1 ? "moreDetail" : removedDetail > addedDetail + 1 ? "lessDetail" : "neutral",
        toneBias,
        sceneBias: Object.entries(sceneCounts).sort((a, b) => b[1] - a[1]).map(([keyword]) => keyword).slice(0, 8),
        commonUserAdditions,
        commonUserRemovals,
        preferredUsageCounts: {}
      };
    }

    function createBatchStats() {
      return {
        structureCounts: {},
        openerCounts: {},
        endingCounts: {},
        phraseCounts: {},
        pointSequence: [],
        sceneSequence: []
      };
    }

    function createStatsFromBatch(batch) {
      const stats = createBatchStats();
      batch.forEach(item => rememberBatchItem(stats, item));
      return stats;
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
      rememberPhraseCounts(stats, item.content);
      stats.pointSequence.push(item.point);
      stats.sceneSequence.push(item.scene);
    }

    function trackBatchDiversity(batch, stats = createBatchStats()) {
      stats.structureCounts = countBy(batch, "structureKey");
      stats.openerCounts = countBy(batch, "openerKey");
      stats.endingCounts = countBy(batch, "endingKey");
      stats.phraseCounts = {};
      batch.forEach(item => rememberPhraseCounts(stats, item.content));
      stats.pointSequence = batch.map(item => item.point);
      stats.sceneSequence = batch.map(item => item.scene);
      return {
        structureCount: Object.keys(stats.structureCounts).length,
        openerCount: Object.keys(stats.openerCounts).length,
        maxOpeningReuse: Math.max(0, ...Object.values(stats.openerCounts)),
        maxEndingReuse: Math.max(0, ...Object.values(stats.endingCounts))
      };
    }

    function isBatchTooRepetitive(batch, targetCount = 10) {
      if (batch.length < Math.min(6, targetCount)) return false;
      const diversity = trackBatchDiversity(batch);
      const enoughStructures = batch.length >= targetCount ? diversity.structureCount >= Math.min(5, targetCount) : diversity.structureCount >= 3;
      return !enoughStructures || diversity.openerCount < 3 || diversity.maxOpeningReuse > 2 || diversity.maxEndingReuse > 2;
    }

    function findMostRepetitiveIndex(batch) {
      const openerCounts = countBy(batch, "openerKey");
      const endingCounts = countBy(batch, "endingKey");
      let worstIndex = batch.length - 1;
      let worstScore = -1;
      batch.forEach((item, index) => {
        const score = (openerCounts[item.openerKey] || 0) + (endingCounts[item.endingKey] || 0) + (countBy(batch, "structureKey")[item.structureKey] || 0);
        if (score > worstScore) {
          worstScore = score;
          worstIndex = index;
        }
      });
      return worstIndex;
    }

    function countBy(list, key) {
      return list.reduce((counts, item) => {
        const value = item[key] || "";
        if (value) counts[value] = (counts[value] || 0) + 1;
        return counts;
      }, {});
    }

    function rememberPhraseCounts(stats, text) {
      String(text || "")
        .split(/[，。！？]/)
        .map(item => normalizeText(item))
        .filter(item => item.length >= 8)
        .forEach(item => {
          stats.phraseCounts[item] = (stats.phraseCounts[item] || 0) + 1;
        });
    }

    function pickStructureKey(scene, point, styleProfile, stats) {
      const preferred = [];
      if (scene === "回购" || styleProfile.toneTypes.includes("回购分享型")) preferred.push("E");
      if (scene === "朋友推荐购买" || scene === "网络种草购买" || styleProfile.recommendationFirst) preferred.push("D");
      if (scene === "刚换手机" || styleProfile.toneTypes.includes("新机换购型")) preferred.push("F");
      if (/对比/.test(point) || styleProfile.oldProblemFirst) preferred.push("C");
      if (scene === "办公室用" || scene === "家里用") preferred.push("B");
      const styleKeys = (styleProfile.structurePreference || []).map(label => {
        return Object.entries(STRUCTURE_LABELS).find(([, value]) => value === label)?.[0] || "";
      }).filter(Boolean);
      const all = uniqueList([...preferred, ...styleKeys, "A", "B", "C", "D", "E", "F"]);
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

    function validateGeneratedCopy(text, selectedSellingPoints = [], selectedUseScenes = [], context = {}) {
      if (!text || text.length < 20) return false;
      if ([...bannedMarketingPhrases, ...exaggeratedPhrases, ...(context.editPreference?.avoidPhrases || [])].some(phrase => text.includes(phrase))) return false;
      const sentences = text.split("。").map(item => item.trim()).filter(Boolean);
      if (new Set(sentences).size !== sentences.length) return false;
      if (hasObviousStitching(text)) return false;
      if (hasUnselectedSellingPoint(text, selectedSellingPoints, selectedUseScenes)) return false;
      if (hasUnselectedScene(text, selectedUseScenes)) return false;
      if (!hasRequiredSceneSignal(text, selectedUseScenes)) return false;
      if (hasRepeatedCore(text, ["温度", "发热", "烫"], 3)) return false;
      if (hasRepeatedCore(text, ["快", "补电", "充电速度"], 3)) return false;
      if (selectedUseScenes.includes("办公室用") && /床头|睡前|家里|客厅|晚上放/.test(text)) return false;
      if (selectedUseScenes.includes("家里用") && /工位|办公室|放办公室|公司|上班|午休/.test(text)) return false;
      if (selectedUseScenes.includes("刚换手机") && /给家里人买|办公室|工位|公司|上班|午休|中午|出门前|包里|床头|家里|客厅|睡前|朋友推荐|朋友说|刷到|种草|回购|又买/.test(text)) return false;
      if (selectedUseScenes.includes("朋友推荐购买") && /种草|刷到/.test(text)) return false;
      if (selectedUseScenes.includes("网络种草购买") && /朋友推荐|朋友说|朋友用了/.test(text)) return false;
      if (selectedUseScenes.includes("回购") && !/回购|又买|之前买过|家里有一个|第二个/.test(text)) return false;
      if (!selectedUseScenes.includes("回购") && /回购|又买|之前买过/.test(text)) return false;
      if (selectedSellingPoints.includes("对比旧充电器") && !/旧|之前|以前|换|比之前/.test(text)) return false;
      if (selectedSellingPoints.includes("对比杂牌") && !/杂牌|便宜头|不放心|靠谱|不想太凑合/.test(text)) return false;
      if (selectedSellingPoints.includes("低温") && /完全不发热|一点都不烫|永远不伤电池/.test(text)) return false;
      if (/搜索转化率|点击率|投放|广告口号/.test(text)) return false;
      const hasReason = /主要|之前|本来|因为|不想|怕|朋友|评价|回购|刚换/.test(text);
      const hasScene = /办公室|工位|家里|床头|出门|中午|晚上|桌面|包里|新手机|朋友|评价/.test(text) || selectedUseScenes.some(scene => text.includes(scene));
      const hasExperience = /用|充|温度|发热|舒服|安心|省心|踏实|方便|顺手/.test(text);
      const elementCount = [hasReason, hasScene, hasExperience].filter(Boolean).length;
      return elementCount >= 2;
    }

    function hasUnselectedSellingPoint(text, selectedSellingPoints = [], selectedUseScenes = []) {
      const selected = new Set(selectedSellingPoints);
      const hasNewPhoneScene = selectedUseScenes.includes("刚换手机");
      const rules = [
        ["快充", /快充|补电快|速度快|速度比|充得快|充电速度|临时补电|补电挺方便|不用一直等着手机充电/],
        ["低温", /低温|温度|发热|发烫|热感|烫|没那么容易热|温度稳/],
        ["颜值", /颜值|颜色|外观|好看|耐看|质感|桌面搭配|放在桌面/],
        ["对比杂牌", /杂牌|便宜头|便宜充电头|不放心|靠谱点的牌子|别太省/],
        ["对比旧充电器", /旧充电器|旧头|旧款|以前那个|之前那个|用了很久|换完之后|比之前/]
      ];

      return rules.some(([point, pattern]) => {
        if (selected.has(point)) return false;
        if (point === "对比旧充电器" && hasNewPhoneScene && /旧头|旧充电头|之前那个旧头|不想继续用之前/.test(text)) return false;
        return pattern.test(text);
      });
    }

    function hasUnselectedScene(text, selectedUseScenes = []) {
      const selected = new Set(selectedUseScenes);
      const sceneRules = [
        ["办公室用", /办公室|公司|工位|上班|午休|放工位/],
        ["家里用", /家里|床头|客厅|睡前|晚上放|家里备用/],
        ["朋友推荐购买", /朋友推荐|朋友说|朋友用了|跟着朋友/],
        ["网络种草购买", /刷到|种草|看评价|网上看到|别人推荐/],
        ["回购", /回购|又买|再买|第二个|之前买过/]
      ];
      return sceneRules.some(([scene, pattern]) => !selected.has(scene) && pattern.test(text));
    }

    function hasRequiredSceneSignal(text, selectedUseScenes = []) {
      if (selectedUseScenes.includes("刚换手机") && !/刚换|新手机|手机刚换|旧头|旧充电头|配件/.test(text)) return false;
      if (selectedUseScenes.includes("办公室用") && !/办公室|公司|工位|上班|午休|放工位/.test(text)) return false;
      if (selectedUseScenes.includes("家里用") && !/家里|床头|客厅|睡前|晚上|家里备用/.test(text)) return false;
      if (selectedUseScenes.includes("朋友推荐购买") && !/朋友推荐|朋友说|朋友用了|跟着朋友/.test(text)) return false;
      if (selectedUseScenes.includes("网络种草购买") && !/刷到|种草|看评价|网上看到|别人推荐/.test(text)) return false;
      if (selectedUseScenes.includes("回购") && !/回购|又买|再买|第二个|之前买过/.test(text)) return false;
      return true;
    }

    function hasObviousStitching(text) {
      if (/，，|。。|，。|。着|主要是主要是/.test(text)) return true;
      const clauses = text.split(/[，。]/).map(item => item.trim()).filter(Boolean);
      if (clauses.some((clause, index) => index > 0 && clause === clauses[index - 1])) return true;
      return clauses.some(clause => clause.length < 3 && /用|买|充/.test(clause));
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
      if (!item.originalText) item.originalText = item.content;
      renderGenerated();
    }

    function saveGeneratedEdit(item, card) {
      const value = card.querySelector(".copy-editor").value.trim();
      if (!value) return showToast("请填写文案内容");
      recordEditFeedback(item.originalText || item.content, value, item);
      item.content = value;
      item.lengthType = getLengthType(value);
      item.editing = false;
      item.draft = "";
      renderGenerated();
      showToast("修改已保存");
    }

    function cancelGeneratedEdit(item) {
      item.editing = false;
      item.draft = "";
      renderGenerated();
    }

    function addGeneratedToMaterials(item) {
      addMaterial(item.content, {
        source: item.originalText && item.originalText !== item.content ? "edited" : "generated",
        selectedSellingPoints: item.selectedSellingPoints || [item.point, item.secondPoint].filter(Boolean),
        selectedUseScenes: item.selectedUseScenes || [item.scene].filter(Boolean)
      });
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
      if (addMaterial(content, {
        source: "manual",
        selectedSellingPoints: getCheckedValues("point").filter(value => value !== CUSTOM_OPTION),
        selectedUseScenes: getCheckedValues("scene").filter(value => value !== CUSTOM_OPTION)
      })) closeMaterialModal();
    }

    function addMaterial(content, options = {}) {
      const finalContent = String(content || "").trim();
      if (!finalContent) return false;
      if (state.materials.some(item => item.content === finalContent)) {
        showToast("素材库中已存在");
        return false;
      }
      const material = createMaterialRecord(finalContent, options);
      state.materials.unshift(material);
      saveMaterials();
      renderMaterials();
      analyzeMaterialStyleAsync(material.id);
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
      item.source = "edited";
      item.analysisStatus = "pending";
      item.styleAnalysis = createEmptyMaterialStyleAnalysis();
      item.analysisVersion = MATERIAL_ANALYSIS_VERSION;
      item.editing = false;
      item.draft = "";
      saveMaterials();
      renderMaterials();
      analyzeMaterialStyleAsync(item.id);
      showToast("素材已更新");
    }

    function recordEditFeedback(originalText, editedText, context = {}) {
      const original = String(originalText || "").trim();
      const edited = String(editedText || "").trim();
      if (!original || !edited || original === edited) return;
      state.editFeedbackHistory.unshift({
        id: createId(),
        originalText: original,
        editedText: edited,
        selectedSellingPoints: context.selectedSellingPoints || [context.point, context.secondPoint].filter(Boolean),
        selectedUseScenes: context.selectedUseScenes || [context.scene].filter(Boolean),
        creativityLevel: context.creativityLevel || els.creativityLevel.value,
        useMaterialStyle: Boolean(context.useMaterialStyle ?? els.useMaterials.checked),
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
      refreshStyleProfile();
      renderMaterials();
      showToast("素材已删除");
    }

    function clearMaterials() {
      if (!state.materials.length) return;
      if (!confirm("确定清空全部素材吗？")) return;
      state.materials = [];
      saveMaterials();
      refreshStyleProfile();
      renderMaterials();
      showToast("素材库已清空");
    }

    function migrateBuyerShowMaterials() {
      const materials = loadMaterials();
      saveMaterialsList(materials);
      return materials;
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
        source: normalizeMaterialSource(item.source),
        selectedSellingPoints: Array.isArray(item.selectedSellingPoints) ? item.selectedSellingPoints.filter(Boolean) : [],
        selectedUseScenes: Array.isArray(item.selectedUseScenes) ? item.selectedUseScenes.filter(Boolean) : [],
        selectedPurchaseReasons: Array.isArray(item.selectedPurchaseReasons) ? item.selectedPurchaseReasons.filter(Boolean) : [],
        styleAnalysis: normalizeMaterialStyleAnalysis(item.styleAnalysis),
        analysisStatus: normalizeAnalysisStatus(item.analysisStatus, item.styleAnalysis),
        analysisVersion: Number(item.analysisVersion) || MATERIAL_ANALYSIS_VERSION,
        editing: false,
        draft: ""
      };
    }

    function saveMaterials() {
      saveMaterialsList(state.materials);
    }

    function saveMaterialsList(materials) {
      saveArray(MATERIAL_KEY, materials.map(serializeMaterial));
    }

    function serializeMaterial(item) {
      const normalized = normalizeMaterial(item);
      return {
        id: normalized.id,
        content: normalized.content,
        createdAt: normalized.createdAt,
        source: normalized.source,
        selectedSellingPoints: normalized.selectedSellingPoints,
        selectedUseScenes: normalized.selectedUseScenes,
        selectedPurchaseReasons: normalized.selectedPurchaseReasons,
        styleAnalysis: normalized.styleAnalysis,
        analysisStatus: normalized.analysisStatus,
        analysisVersion: normalized.analysisVersion
      };
    }

    function createMaterialRecord(content, options = {}) {
      return normalizeMaterial({
        id: createId(),
        content,
        createdAt: new Date().toISOString(),
        source: options.source || "manual",
        selectedSellingPoints: options.selectedSellingPoints || [],
        selectedUseScenes: options.selectedUseScenes || [],
        selectedPurchaseReasons: options.selectedPurchaseReasons || [],
        styleAnalysis: createEmptyMaterialStyleAnalysis(),
        analysisStatus: "pending",
        analysisVersion: MATERIAL_ANALYSIS_VERSION
      });
    }

    function createEmptyMaterialStyleAnalysis() {
      return { ...EMPTY_MATERIAL_STYLE_ANALYSIS };
    }

    function normalizeMaterialSource(source) {
      return ["manual", "generated", "edited"].includes(source) ? source : "manual";
    }

    function normalizeAnalysisStatus(status, styleAnalysis) {
      if (["pending", "completed", "failed"].includes(status)) return status;
      return styleAnalysis && Object.values(styleAnalysis).some(Boolean) ? "completed" : "pending";
    }

    function normalizeMaterialStyleAnalysis(styleAnalysis = {}) {
      return Object.fromEntries(
        Object.keys(EMPTY_MATERIAL_STYLE_ANALYSIS).map(key => [key, String(styleAnalysis?.[key] || "")])
      );
    }

    async function analyzeMaterialStyleAsync(materialId) {
      const material = state.materials.find(item => item.id === materialId);
      if (!material) return;
      const content = material.content;
      try {
        const response = await fetch("/.netlify/functions/analyze-material-style", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content })
        });
        if (!response.ok) throw new Error(`analyze-material-style returned ${response.status}`);
        const data = await response.json();
        const target = state.materials.find(item => item.id === materialId);
        if (!target || target.content !== content) return;
        target.styleAnalysis = normalizeMaterialStyleAnalysis(data?.styleAnalysis);
        target.analysisStatus = "completed";
        target.analysisVersion = MATERIAL_ANALYSIS_VERSION;
        saveMaterials();
        refreshStyleProfile();
      } catch (error) {
        console.warn("material style analysis failed:", error.message);
        const target = state.materials.find(item => item.id === materialId);
        if (!target || target.content !== content) return;
        target.analysisStatus = "failed";
        target.analysisVersion = MATERIAL_ANALYSIS_VERSION;
        saveMaterials();
      }
    }

    function loadStyleProfile() {
      try {
        const parsed = JSON.parse(localStorage.getItem(STYLE_PROFILE_KEY) || "null");
        return parsed && parsed.version === STYLE_PROFILE_VERSION ? parsed : null;
      } catch {
        return null;
      }
    }

    function refreshStyleProfileIfNeeded() {
      if (!state.styleProfile || state.styleProfile.version !== STYLE_PROFILE_VERSION) {
        refreshStyleProfile();
      }
    }

    function refreshStyleProfile() {
      state.styleProfile = buildStyleProfile(state.materials);
      saveArray(STYLE_PROFILE_KEY, state.styleProfile);
      syncEffectiveStylePreferences();
      if (isDevMode()) {
        console.log("buyerShowStyleProfile", state.styleProfile);
      }
    }

    function loadManualPreferences() {
      try {
        const parsed = JSON.parse(localStorage.getItem(MANUAL_PREFERENCES_KEY) || "null");
        const normalized = normalizeManualPreferences(parsed || {});
        saveArray(MANUAL_PREFERENCES_KEY, normalized);
        return normalized;
      } catch {
        return createEmptyManualPreferences();
      }
    }

    function saveManualPreferences() {
      saveArray(MANUAL_PREFERENCES_KEY, normalizeManualPreferences(state.manualPreferences));
    }

    function createEmptyManualPreferences() {
      return { ...EMPTY_MANUAL_PREFERENCES, tone: [], preferredStructures: [], preferredOpeningTypes: [], preferredEndingTypes: [], avoidStyles: [] };
    }

    function normalizeManualPreferences(value = {}) {
      return {
        ...createEmptyManualPreferences(),
        version: 1,
        updatedAt: String(value.updatedAt || ""),
        tone: Array.isArray(value.tone) ? uniqueList(value.tone.map(String).filter(Boolean)) : [],
        preferredStructures: Array.isArray(value.preferredStructures) ? uniqueList(value.preferredStructures.map(String).filter(Boolean)) : [],
        preferredOpeningTypes: Array.isArray(value.preferredOpeningTypes) ? uniqueList(value.preferredOpeningTypes.map(String).filter(Boolean)) : [],
        preferredEndingTypes: Array.isArray(value.preferredEndingTypes) ? uniqueList(value.preferredEndingTypes.map(String).filter(Boolean)) : [],
        preferredLengthType: String(value.preferredLengthType || ""),
        preferredDetailDensity: String(value.preferredDetailDensity || ""),
        preferredSellingPointExpression: String(value.preferredSellingPointExpression || ""),
        preferredSceneSpecificity: String(value.preferredSceneSpecificity || ""),
        preferredStoryLevel: String(value.preferredStoryLevel || ""),
        avoidStyles: Array.isArray(value.avoidStyles) ? uniqueList(value.avoidStyles.map(String).filter(Boolean)) : [],
        customInstructions: String(value.customInstructions || "").slice(0, 500)
      };
    }

    function syncEffectiveStylePreferences() {
      state.manualPreferences = normalizeManualPreferences(state.manualPreferences);
      state.effectiveStylePreferences = mergeStylePreferences(state.styleProfile, state.manualPreferences);
    }

    function mergeStylePreferences(styleProfile, manualPreferences) {
      const profile = styleProfile || buildStyleProfile([]);
      const manual = normalizeManualPreferences(manualPreferences);
      const automaticTone = getTopToneValues(profile.tonePreferences, 3);
      const sourceMap = {};
      const chooseArray = (field, autoValue = []) => {
        const manualValue = manual[field] || [];
        const hasManual = Array.isArray(manualValue) && manualValue.length > 0;
        sourceMap[field] = hasManual ? "manual" : "automatic";
        return hasManual ? manualValue : autoValue;
      };
      const chooseValue = (field, autoValue = "") => {
        const manualValue = manual[field] || "";
        const hasManual = Boolean(manualValue);
        sourceMap[field] = hasManual ? "manual" : "automatic";
        return hasManual ? manualValue : autoValue;
      };
      const avoidStyles = uniqueList([...(profile.avoidStyles || []), ...(manual.avoidStyles || [])]);
      sourceMap.avoidStyles = manual.avoidStyles.length ? "manual+automatic" : "automatic";
      sourceMap.customInstructions = manual.customInstructions ? "manual" : "none";
      return {
        tone: chooseArray("tone", automaticTone),
        preferredStructures: chooseArray("preferredStructures", profile.preferredStructures || []),
        preferredOpeningTypes: chooseArray("preferredOpeningTypes", profile.preferredOpeningTypes || []),
        preferredEndingTypes: chooseArray("preferredEndingTypes", profile.preferredEndingTypes || []),
        preferredLengthType: chooseValue("preferredLengthType", profile.preferredLengthType || ""),
        preferredDetailDensity: chooseValue("preferredDetailDensity", profile.preferredDetailDensity || ""),
        preferredSellingPointExpression: chooseValue("preferredSellingPointExpression", profile.preferredSellingPointExpression || ""),
        preferredSceneSpecificity: chooseValue("preferredSceneSpecificity", profile.preferredSceneSpecificity || ""),
        preferredStoryLevel: chooseValue("preferredStoryLevel", profile.preferredStoryLevel || ""),
        avoidStyles,
        customInstructions: manual.customInstructions,
        profileSummary: buildEffectiveProfileSummary(profile, manual, sourceMap),
        sourceMap
      };
    }

    function buildEffectiveProfileSummary(profile, manual, sourceMap) {
      if (manual.customInstructions || Object.values(sourceMap).some(value => String(value).includes("manual"))) {
        return "已结合人工偏好修正系统自动画像，生成时会优先遵守人工确认的表达方式。";
      }
      return profile?.profileSummary || "暂无稳定画像，继续积累满意素材后会更准确。";
    }

    function getCompletedMaterialCount() {
      return state.materials.filter(item => item.analysisStatus === "completed").length;
    }

    function getProfileStatusLabel(count) {
      if (count < 3) return "样本不足";
      if (count < 10) return "初步画像";
      return "稳定画像";
    }

    function getTopToneLabels(tonePreferences = {}, limit = 3) {
      const entries = Object.entries(tonePreferences).sort((a, b) => b[1] - a[1]).slice(0, limit);
      const total = Object.values(tonePreferences).reduce((sum, value) => sum + Number(value || 0), 0);
      return entries.map(([tone, value]) => total ? `${tone} ${Math.round((Number(value) / total) * 100)}%` : tone);
    }

    function getTopToneValues(tonePreferences = {}, limit = 3) {
      return Object.entries(tonePreferences)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([tone]) => tone);
    }

    function getToneDisplayLabels(tonePreferences = {}, manualTone = []) {
      return uniqueList([...(manualTone || []), ...getTopToneLabels(tonePreferences, 3)]);
    }

    function detailDensityExplanation(value) {
      if (value === "低") return "低：表达更直接，细节较少";
      if (value === "中") return "中：包含基本购买原因和体验";
      if (value === "高") return "高：包含具体场景、时间、对比和使用感受";
      return "";
    }

    function sellingPointExpressionExplanation(value) {
      if (/间接/.test(value)) return "当前偏好：通过真实使用变化间接体现卖点，而不是直接堆卖点词。";
      if (/对比/.test(value)) return "当前偏好：通过前后对比体现卖点。";
      if (/直接/.test(value)) return "当前偏好：更直接地表达核心体验。";
      return "";
    }

    function buildStyleProfile(materials) {
      const completedMaterials = materials
        .map(normalizeMaterial)
        .filter(item => item.analysisStatus === "completed");

      const profileLevel = getStyleProfileLevel(completedMaterials.length);
      const stats = {
        tone: {},
        narrativeStructure: {},
        openingType: {},
        endingType: {},
        detailDensity: {},
        lengthType: {},
        sellingPointExpression: {},
        sceneSpecificity: {},
        contrastType: {},
        purchaseTrigger: {},
        storyLevel: {},
        adIntensity: {}
      };

      completedMaterials.forEach(item => {
        const weight = getMaterialStyleWeight(item);
        const style = normalizeMaterialStyleAnalysis(item.styleAnalysis);
        addWeightedCount(stats.tone, style.tone, weight);
        addWeightedCount(stats.narrativeStructure, style.narrativeStructure, weight);
        addWeightedCount(stats.openingType, style.openingType, weight);
        addWeightedCount(stats.endingType, style.endingType, weight);
        addWeightedCount(stats.detailDensity, style.detailDensity, weight);
        addWeightedCount(stats.lengthType, style.lengthType, weight);
        addWeightedCount(stats.sellingPointExpression, style.sellingPointExpression, weight);
        addWeightedCount(stats.sceneSpecificity, style.sceneSpecificity, weight);
        addWeightedCount(stats.contrastType, style.contrastType, weight);
        addWeightedCount(stats.purchaseTrigger, style.purchaseTrigger, weight);
        addWeightedCount(stats.storyLevel, style.storyLevel, weight);
        addWeightedCount(stats.adIntensity, style.adIntensity, weight);
      });

      const profile = {
        version: STYLE_PROFILE_VERSION,
        updatedAt: new Date().toISOString(),
        materialCount: completedMaterials.length,
        tonePreferences: stats.tone,
        preferredStructures: pickTopValues(stats.narrativeStructure, profileLevel),
        preferredOpeningTypes: pickTopValues(stats.openingType, profileLevel),
        preferredEndingTypes: pickTopValues(stats.endingType, profileLevel),
        preferredDetailDensity: pickPrimaryValue(stats.detailDensity, profileLevel),
        preferredLengthType: pickPrimaryValue(stats.lengthType, profileLevel),
        preferredSellingPointExpression: pickPrimaryValue(stats.sellingPointExpression, profileLevel),
        preferredSceneSpecificity: pickPrimaryValue(stats.sceneSpecificity, profileLevel),
        preferredContrastTypes: pickTopValues(stats.contrastType, profileLevel).filter(value => value !== "无"),
        preferredPurchaseTriggers: pickTopValues(stats.purchaseTrigger, profileLevel),
        preferredStoryLevel: pickPrimaryValue(stats.storyLevel, profileLevel),
        avoidStyles: buildAvoidStyles(stats, profileLevel),
        profileSummary: ""
      };
      profile.profileSummary = buildProfileSummary(profile, profileLevel);
      return profile;
    }

    function getStyleProfileLevel(count) {
      if (count < 3) return "weak";
      if (count < 10) return "initial";
      return "stable";
    }

    function getMaterialStyleWeight(item) {
      const sourceWeights = { edited: 1.4, manual: 1.2, generated: 1 };
      let weight = sourceWeights[item.source] || 1;
      const createdAt = new Date(item.createdAt).getTime();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      if (Number.isFinite(createdAt) && Date.now() - createdAt <= thirtyDays) {
        weight *= 1.15;
      }
      return weight;
    }

    function addWeightedCount(bucket, value, weight) {
      const key = String(value || "").trim();
      if (!key || key === "其他") return;
      bucket[key] = Number((bucket[key] || 0) + weight).toFixed(3) * 1;
    }

    function pickTopValues(bucket, profileLevel) {
      const entries = Object.entries(bucket).sort((a, b) => b[1] - a[1]);
      if (!entries.length) return [];
      const total = entries.reduce((sum, [, value]) => sum + value, 0);
      const threshold = profileLevel === "weak" ? 0.55 : profileLevel === "initial" ? 0.34 : 0.24;
      return entries
        .filter(([, value], index) => index === 0 || value / total >= threshold)
        .slice(0, profileLevel === "stable" ? 3 : 2)
        .map(([key]) => key);
    }

    function pickPrimaryValue(bucket, profileLevel) {
      const entries = Object.entries(bucket).sort((a, b) => b[1] - a[1]);
      if (!entries.length) return "";
      const total = entries.reduce((sum, [, value]) => sum + value, 0);
      const ratio = entries[0][1] / total;
      const threshold = profileLevel === "weak" ? 0.7 : profileLevel === "initial" ? 0.45 : 0.34;
      return ratio >= threshold ? entries[0][0] : "";
    }

    function buildAvoidStyles(stats, profileLevel) {
      if (profileLevel === "weak") return [];
      const avoid = [];
      const adHigh = stats.adIntensity["高"] || 0;
      const adTotal = Object.values(stats.adIntensity).reduce((sum, value) => sum + value, 0);
      if (adTotal && adHigh / adTotal <= 0.15) avoid.push("高广告感");
      if ((stats.tone["偏广告"] || 0) === 0) avoid.push("广告口号式语气");
      return [...new Set(avoid)];
    }

    function buildProfileSummary(profile, profileLevel) {
      if (!profile.materialCount) return "暂无已完成分析的素材，尚未形成用户风格画像。";
      const certainty = profileLevel === "weak" ? "当前素材较少，只能形成弱画像：" : profileLevel === "initial" ? "当前形成初步画像：" : "当前形成稳定画像：";
      const parts = [];
      if (profile.preferredLengthType) parts.push(`偏好${profile.preferredLengthType}等长度`);
      if (profile.preferredDetailDensity) parts.push(`细节密度偏${profile.preferredDetailDensity}`);
      if (profile.preferredSceneSpecificity) parts.push(`场景表达${profile.preferredSceneSpecificity}`);
      if (profile.preferredSellingPointExpression) parts.push(`卖点多用${profile.preferredSellingPointExpression}`);
      if (profile.preferredStoryLevel) parts.push(`故事感为${profile.preferredStoryLevel}`);
      if (profile.preferredOpeningTypes.length) parts.push(`常用${profile.preferredOpeningTypes.join("、")}开头`);
      if (profile.preferredEndingTypes.length) parts.push(`结尾偏${profile.preferredEndingTypes.join("、")}`);
      if (profile.avoidStyles.length) parts.push(`应避免${profile.avoidStyles.join("、")}`);
      return `${certainty}${parts.length ? parts.join("，") : "偏好仍不明显，继续积累素材后会更稳定。"}。`;
    }

    function isDevMode() {
      return location.hostname === "localhost" || location.hostname === "127.0.0.1";
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
        "办公室用": [
          "工位上正好缺一个固定充电器",
          "主要是不想每天把充电器带来带去",
          "上班时手机用得多，想在公司固定备一个",
          "之前总是借同事的充电头，用起来不太方便",
          "办公室里有个固定充电位置会省心很多",
          "平时开会和回消息比较多，电量掉得也快"
        ],
        "家里用": ["家里只有一个充电头，每次拿来拿去挺麻烦", "床头想多放一个，晚上用起来方便点"],
        "朋友推荐购买": [
          "朋友之前买过，说日常用着比较稳",
          "听朋友说这个温度控制还可以，才认真看了一下",
          "朋友用过后反馈还行，我才跟着买来试试",
          "朋友推荐之后看了下，感觉挺符合日常需求",
          "身边朋友先用过，我买的时候会放心一点"
        ],
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
      if (context.editPreference.detailBias === "moreDetail") {
        pool.push("到手之后先试了几天，主要还是看日常用起来稳不稳");
      }
      if (context.editPreference.toneBias === "lessExaggerated") {
        pool.push("对我来说，日常用着稳定比说得多好听更重要");
      }
      return pickSmart(pool, context);
    }

    function pickSceneDetail(context) {
      const sceneDetails = {
        "刚换手机": ["新手机到手之后用了几天", "给新手机用，还是想稳一点", "手机刚换新，充电头也不想继续凑合"],
        "办公室用": [
          "放在工位左手边刚好",
          "午休前插上，回来电量能缓不少",
          "放办公室固定用，省得来回带",
          "电脑旁边留着一个位置，随手就能插",
          "上午用到一半电量低了，直接在工位补一下",
          "不用每次从包里翻充电头，确实方便点"
        ],
        "家里用": ["晚上放床头用，不用每天拔来拔去", "手机放桌边充，线长也够用", "家里多备一个，随手就能充"],
        "朋友推荐购买": [
          "到手后先按平时习惯用了几天",
          "跟着朋友买回来试了下",
          "用了几天，整体和朋友反馈差不多",
          "朋友说主要是温度稳，我自己也特意留意了",
          "不是冲着参数买的，主要看朋友实际用过",
          "边回消息边充时，也没有明显不舒服的热感"
        ],
        "网络种草购买": ["到手之后先放桌边试了几天", "买回来用了几天，日常场景还挺合适", "看评价时比较在意温度，到手后也特意试了下"],
        "回购": ["这次主要放办公室用", "家里一个、办公室一个，用起来省事很多", "第二个打算固定放床头或者工位"]
      };
      const hasStrictScene = Boolean(sceneDetails[context.scene]);
      const pool = [...(sceneDetails[context.scene] || customSceneLines(context.scene))];
      if (!hasStrictScene) {
        pool.push(...MODULES.sceneDetails);
      }
      if (!hasStrictScene && (context.styleProfile.detailDensity === "high" || context.editPreference.detailBias === "moreDetail")) {
        pool.push("早上出门前临时充一会儿，也能缓一下电量焦虑", "包里放一个也不占地方");
      }
      if (context.editPreference.detailBias === "lessDetail") {
        return pickSmart(sceneDetails[context.scene] || customSceneLines(context.scene), context);
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
      if (context.editPreference.toneBias === "lessExaggerated") {
        pool.push("目前用下来挺省心", "对我来说这个体验已经够用了", "日常用完全够了");
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
      const aClauses = splitComparableClauses(a);
      const bClauses = splitComparableClauses(b);
      const repeatedClauses = aClauses.filter(clause => bClauses.includes(clause));
      if (repeatedClauses.some(clause => clause.length >= 12)) return true;
      if (repeatedClauses.filter(clause => clause.length >= 7).length >= 2) return true;
      return calculateTextSimilarity(a, b) > 0.52;
    }

    function splitComparableClauses(text) {
      return String(text || "")
        .split(/[，。！？、；;]/)
        .map(item => normalizeText(item))
        .filter(item => item.length >= 6);
    }

    function calculateTextSimilarity(a, b) {
      const aTokens = textNgrams(a, 3);
      const bTokens = textNgrams(b, 3);
      if (!aTokens.length || !bTokens.length) return 0;
      const bSet = new Set(bTokens);
      const overlap = aTokens.filter(token => bSet.has(token)).length;
      const union = new Set([...aTokens, ...bTokens]).size;
      const containment = overlap / Math.min(aTokens.length, bTokens.length);
      const jaccard = overlap / Math.max(union, 1);
      const charOverlap = calculateCharacterOverlap(a, b);
      return Math.max(containment, jaccard, charOverlap * 0.82);
    }

    function isTooSimilarToMaterials(text, materials) {
      return materials.some(item => {
        const material = String(item.content || "");
        if (!material) return false;
        const normalizedText = normalizeText(text);
        const normalizedMaterial = normalizeText(material);
        if (!normalizedText || !normalizedMaterial) return false;
        if (normalizedText.slice(0, 12) === normalizedMaterial.slice(0, 12)) return true;
        if (hasLongCommonSubstring(text, material, 8)) return true;
        if (calculateTextSimilarity(text, material) > 0.48) return true;
        return calculateMaterialContainment(text, material) > 0.6;
      });
    }

    function regenerateIfTooSimilar(text, materials, generatorFn) {
      let next = text;
      let attempts = 0;
      while (isTooSimilarToMaterials(next, materials) && attempts < 20) {
        attempts += 1;
        next = generatorFn();
      }
      if (isTooSimilarToMaterials(next, materials)) {
        return generatorFn({ ignoreMaterials: true });
      }
      return next;
    }

    function textNgrams(text, size) {
      const normalized = String(text || "").replace(/[，。！？、\s]/g, "");
      const result = [];
      for (let index = 0; index <= normalized.length - size; index += 1) {
        result.push(normalized.slice(index, index + size));
      }
      return result;
    }

    function hasLongCommonSubstring(a, b, minLength) {
      const source = String(a || "").replace(/[，。！？、\s]/g, "");
      const target = String(b || "").replace(/[，。！？、\s]/g, "");
      if (source.length < minLength || target.length < minLength) return false;
      for (let index = 0; index <= source.length - minLength; index += 1) {
        if (target.includes(source.slice(index, index + minLength))) return true;
      }
      return false;
    }

    function calculateMaterialContainment(text, material) {
      const source = normalizeText(text);
      const target = normalizeText(material);
      if (!source || !target) return 0;
      let matched = 0;
      for (let index = 0; index < source.length; index += 1) {
        if (target.includes(source[index])) matched += 1;
      }
      return matched / Math.max(source.length, 1);
    }

    function calculateCharacterOverlap(a, b) {
      const source = normalizeText(a);
      const target = normalizeText(b);
      if (!source || !target) return 0;
      const targetCounts = {};
      for (const char of target) targetCounts[char] = (targetCounts[char] || 0) + 1;
      let overlap = 0;
      for (const char of source) {
        if (targetCounts[char] > 0) {
          overlap += 1;
          targetCounts[char] -= 1;
        }
      }
      return overlap / Math.min(source.length, target.length);
    }

    function normalizeText(text) {
      return String(text || "").replace(/[，。！？、\s,.!?;；：“”"'\-—（）()【】\[\]]/g, "");
    }

    function pickSmart(list, context = {}) {
      const avoid = [...bannedMarketingPhrases, ...exaggeratedPhrases, ...(context.editPreference?.avoidPhrases || [])];
      const filtered = list.filter(item => item && !avoid.some(phrase => String(item).includes(phrase)) && !hasContextConflict(String(item), context));
      const phraseCounts = context.stats?.phraseCounts || {};
      const fresh = filtered.filter(item => !phraseCounts[normalizeText(item)]);
      const selected = pick(fresh.length ? fresh : filtered.length ? filtered : list);
      if (context.stats && selected) {
        rememberPhraseCounts(context.stats, selected);
      }
      return selected;
    }

    function applyEditPreferences(text, preference = createNeutralEditPreference(), context = {}) {
      let next = String(text || "");
      const avoid = uniqueList([...bannedMarketingPhrases, ...exaggeratedPhrases, ...(preference.avoidPhrases || [])]);
      avoid.forEach(phrase => {
        if (phrase) next = next.replaceAll(phrase, "");
      });
      if (preference.toneBias === "lessExaggerated") {
        next = next
          .replaceAll("超级", "比较")
          .replaceAll("特别", "比较")
          .replaceAll("非常", "比较")
          .replaceAll("真的", "")
          .replaceAll("很快", "补电挺方便")
          .replaceAll("很好看", "比较耐看")
          .replaceAll("很不错", "还挺顺手");
      }
      if (preference.detailBias === "moreDetail" && context.lengthType !== "短" && Math.random() < 0.24) {
        const detail = pickSmart(detailPhrasesForContext(context), context);
        if (detail && !next.includes(detail)) next = appendSentence(next, detail);
      }
      if (preference.preferredPhrases?.length && Math.random() < 0.26) {
        const phrase = pick(getAvailablePreferredPhrases(preference).filter(item => !next.includes(item)));
        if (phrase && !hasContextConflict(phrase, context)) {
          next = appendSentence(next, phrase);
          preference.preferredUsageCounts[phrase] = (preference.preferredUsageCounts[phrase] || 0) + 1;
        }
      }
      if (preference.lengthBias === "shorter") {
        next = trimToLength(next, "中");
      }
      return sanitizeCopy(next, preference);
    }

    function getAvailablePreferredPhrases(preference) {
      const counts = preference.preferredUsageCounts || {};
      return (preference.preferredPhrases || []).filter(phrase => (counts[phrase] || 0) < 2);
    }

    function detailPhrasesForContext(context = {}) {
      const sceneDetails = {
        "办公室用": [
          "放在工位上刚好",
          "午休前补电这个场景挺实用",
          "放办公室固定用更省事",
          "电脑旁边随手能插",
          "不用每天从包里拿来拿去"
        ],
        "家里用": ["晚上放床头用比较顺手", "家里多备一个不用来回拔", "手机放桌边充也方便"],
        "刚换手机": ["刚换新手机会更在意充电稳定", "给新手机用着会安心一点"],
        "回购": ["这次多买一个就是为了固定位置用", "之前用着顺手才会再买"],
        "朋友推荐购买": ["跟着朋友买回来试了几天", "朋友说好用我才认真看了下"],
        "网络种草购买": ["看评价时主要留意温度和速度", "到手之后先试了日常补电"]
      };
      return sceneDetails[context.scene] || MODULES.sceneDetails;
    }

    function appendSentence(text, phrase) {
      const clean = String(phrase || "").trim();
      if (!clean) return text;
      const base = String(text || "").replace(/[，。]*$/, "");
      return `${base}。${/[。！？]$/.test(clean) ? clean : `${clean}。`}`;
    }

    function hasContextConflict(text, context = {}) {
      const scene = context.scene || "";
      if (scene === "办公室用" && /床头|睡前|家里|客厅|晚上放|朋友推荐|朋友说|刷到|种草|回购|又买|刚换|新手机/.test(text)) return true;
      if (scene === "家里用" && /工位|办公室|放办公室|公司|上班|午休|朋友推荐|朋友说|刷到|种草|回购|又买|刚换|新手机/.test(text)) return true;
      if (scene === "朋友推荐购买" && /种草|刷到/.test(text)) return true;
      if (scene === "网络种草购买" && /朋友推荐|朋友说|朋友用了/.test(text)) return true;
      if (scene === "刚换手机" && /给家里人|办公室|工位|公司|上班|午休|中午|出门前|包里|家里|床头|客厅|睡前|朋友推荐|朋友说|朋友用了|刷到|种草|回购|又买|再买|第二个/.test(text)) return true;
      return false;
    }

    function sanitizeCopy(text, editPreference = {}) {
      let next = String(text || "");
      [...bannedMarketingPhrases, ...exaggeratedPhrases, ...(editPreference.avoidPhrases || [])].forEach(phrase => {
        next = next.replaceAll(phrase, "");
      });
      return next.replace(/，，+/g, "，").replace(/。。+/g, "。").replace(/，。/g, "。").trim();
    }

    function maybeApplyEditPreference(parts, context) {
      if (context.editPreference.detailBias === "moreDetail" && context.lengthType !== "短") {
        parts.scene = pickSmart([...detailPhrasesForContext(context), parts.scene], context);
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

    function loadRecentGeneratedFingerprints() {
      return loadArray(RECENT_FINGERPRINTS_KEY)
        .map(normalizeGeneratedFingerprint)
        .filter(Boolean)
        .slice(0, 100);
    }

    function rememberGeneratedFingerprints(contents) {
      const fingerprints = contents.map(createGeneratedFingerprint).filter(Boolean);
      if (!fingerprints.length) return;
      saveArray(RECENT_FINGERPRINTS_KEY, [...fingerprints, ...loadRecentGeneratedFingerprints()].slice(0, 100));
    }

    function createGeneratedFingerprint(text) {
      const normalized = normalizeText(text);
      if (!normalized) return null;
      const sentences = String(text || "").split(/[。！？]/).map(item => item.trim()).filter(Boolean);
      return {
        normalizedOpening: normalizeText(sentences[0] || normalized.slice(0, 24)).slice(0, 24),
        structureSignature: detectLocalStructureSignature(text),
        semanticKeywords: extractLocalSemanticKeywords(text).slice(0, 8),
        createdAt: new Date().toISOString()
      };
    }

    function normalizeGeneratedFingerprint(item) {
      if (!item || typeof item !== "object") return null;
      return {
        normalizedOpening: String(item.normalizedOpening || "").slice(0, 32),
        structureSignature: String(item.structureSignature || "").slice(0, 60),
        semanticKeywords: Array.isArray(item.semanticKeywords) ? item.semanticKeywords.map(value => String(value || "").trim()).filter(Boolean).slice(0, 8) : [],
        createdAt: item.createdAt || new Date().toISOString()
      };
    }

    function detectLocalStructureSignature(text) {
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

    function extractLocalSemanticKeywords(text) {
      const keywords = ["办公室", "工位", "家里", "床头", "新手机", "旧头", "杂牌", "朋友", "刷到", "回购", "温度", "发热", "补电", "颜色", "省心", "安心", "踏实", "顺手"];
      return keywords.filter(keyword => String(text || "").includes(keyword));
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

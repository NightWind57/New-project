const OLD_LIBRARY_KEY = "chargerBuyerShowCopyLibrary.v1";
    const OLD_REFERENCE_KEY = "buyerShowReferenceTexts";
    const MATERIAL_KEY = "buyerShowMaterials";
    const CUSTOM_POINTS_KEY = "customSellingPoints";
    const CUSTOM_SCENES_KEY = "customUseScenes";
    const SELLING_OPTIONS_KEY = "sellingPointOptions";
    const SCENE_OPTIONS_KEY = "useSceneOptions";
    const HISTORY_KEY = "generationHistory";

    const BASE_POINTS = ["快充", "低温", "颜值", "对比杂牌", "对比旧充电器"];
    const BASE_SCENES = ["刚换手机", "办公室用", "家里用", "朋友推荐购买", "网络种草购买", "回购"];
    const CUSTOM_OPTION = "自定义";

    const POINT_LINES = {
      "快充": ["出门前插一会儿就能补不少电", "中午吃饭前插上，回来电量明显多了", "平时临时补电挺方便", "不用一直等着手机充电", "充电速度比之前旧头快不少"],
      "低温": ["充的时候温度比较稳", "不像之前那个一会儿就烫", "边回消息边充也没那么热", "手摸着不会有明显发烫感", "晚上放床头充更安心"],
      "颜值": ["颜色比图片里更耐看", "放桌面不突兀", "粉色不是廉价粉", "白色很干净", "灰色有质感", "和桌面其他东西挺搭"],
      "对比杂牌": ["杂牌头用着总有点不放心", "之前便宜头充电发热明显", "给新手机用，还是不想太将就", "还是选个靠谱点的牌子安心", "比之前那个杂牌头用着踏实很多"],
      "对比旧充电器": ["之前那个充得慢还容易热", "旧头用了很久，感觉也该换了", "换了之后体验明显舒服一点", "以前总觉得充电器都差不多，换了才发现区别挺明显", "之前旧充电器放家里，现在这个放办公室刚好"]
    };

    const SCENE_LINES = {
      "刚换手机": ["刚换了新手机，顺手把充电器也换了", "新手机不想再用之前那个旧充电头", "手机都换新了，充电器也想配个稳一点的"],
      "办公室用": ["买来放办公室备用", "不想每天把家里的充电器带来带去", "放工位上用刚好，不占地方"],
      "家里用": ["放在床头用挺方便", "家里多备一个，随手就能充", "晚上睡前充电用着比较安心"],
      "朋友推荐购买": ["朋友之前买过说还不错，我就跟着入了", "是朋友推荐的，用了几天感觉确实可以", "本来没太在意，朋友说这个温度控制不错才买的"],
      "网络种草购买": ["之前刷到别人推荐才注意到这个", "看了好几条评价，最后还是入了", "被种草之后买来试试，没想到还挺实用"],
      "回购": ["之前买过一个，这次又回购", "家里有一个，这次买来放办公室", "用了一段时间觉得不错，又买了一个备用"]
    };

    const MODULES = {
      openers: ["昨天下单今天到，先试了一下", "用了几天再来写感受", "本来只是想买个备用的", "之前一直觉得充电器差不多", "这次挑的时候主要看日常用起来稳不稳"],
      reasons: ["旧充电器用了挺久，确实该换了", "新手机不想随便用杂牌头", "家里和办公室来回带太麻烦", "主要是不想充电时手机一直发热", "看评价里说日常用比较稳才买的"],
      sceneDetails: ["早上出门前插一会儿会比较安心", "中午吃饭前插上，回来刚好能继续用", "晚上放床头用，不用到处找线", "放在工位上不占地方，临时补电方便", "平时边回消息边充也比较顺手"],
      details: ["白色看着干净", "灰色比较耐看", "体积比想象中小", "插在排插上不会挡旁边", "包装到手没什么问题", "线和头放一起看着也清爽"],
      endings: ["总体来说挺省心", "日常用完全够了", "比之前那个舒服很多", "给新手机用着也放心", "不算特别便宜，但用着安心", "目前用下来没什么小毛病"]
    };

    const state = {
      pointOptions: [],
      sceneOptions: [],
      materials: [],
      generated: [],
      history: []
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

    function generateBatch() {
      const points = getCheckedValues("point").filter(value => value !== CUSTOM_OPTION);
      const scenes = getCheckedValues("scene").filter(value => value !== CUSTOM_OPTION);
      const creativity = els.creativityLevel.value;
      if (!points.length) return showToast("请至少选择一个卖点");
      if (!scenes.length) return showToast("请至少选择一个使用场景");

      const materialPool = els.useMaterials.checked ? state.materials : [];
      const generated = [];
      let attempts = 0;
      while (generated.length < 10 && attempts < 120) {
        attempts += 1;
        const item = createGeneratedItem(points, scenes, creativity, materialPool);
        if (!isTooSimilarToAny(item.content, generated.map(existing => existing.content)) && !isTooSimilarToAny(item.content, state.history)) {
          generated.push(item);
        }
      }
      while (generated.length < 10 && attempts < 240) {
        attempts += 1;
        const item = createGeneratedItem(points, scenes, creativity, materialPool);
        if (!isTooSimilarToAny(item.content, generated.map(existing => existing.content))) {
          generated.push(item);
        }
      }
      while (generated.length < 10) {
        const item = createGeneratedItem(points, scenes, creativity, materialPool);
        if (!generated.some(existing => existing.content === item.content)) {
          generated.push(item);
        } else {
          item.content = `${item.content.replace(/。$/, "")}，整体还是挺顺手的。`;
          generated.push(item);
        }
      }
      state.generated = generated.slice(0, 10);
      rememberHistory(state.generated.map(item => item.content));
      renderGenerated();
      showToast(`已生成 ${state.generated.length} 条文案`);
    }

    function createGeneratedItem(points, scenes, creativity, materialPool) {
      const point = pick(points);
      const secondPoint = Math.random() > 0.55 ? pick(points.filter(item => item !== point)) : "";
      const scene = pick(scenes);
      const lengthType = pickLengthType(creativity);
      const useMaterial = materialPool.length && Math.random() < 0.42;
      const content = useMaterial
        ? buildFromMaterial(pick(materialPool), { point, secondPoint, scene, creativity, lengthType })
        : buildFromModules({ point, secondPoint, scene, creativity, lengthType });
      return { id: createId(), content, point, scene, lengthType, editing: false, draft: "" };
    }

    function buildFromModules({ point, secondPoint, scene, creativity, lengthType }) {
      const parts = {
        opener: pick([...(SCENE_LINES[scene] || customSceneLines(scene)), ...MODULES.openers]),
        reason: pickReason(point, creativity),
        scene: pick([...(SCENE_LINES[scene] || customSceneLines(scene)), ...MODULES.sceneDetails]),
        point: pickPointLine(point),
        second: secondPoint && lengthType !== "短" ? pickPointLine(secondPoint) : "",
        detail: pickDetail(point, creativity),
        ending: pickEnding(creativity)
      };
      const layouts = {
        "短": [["scene", "point"], ["opener", "ending"], ["reason", "point"]],
        "中": [["opener", "point", "ending"], ["reason", "scene", "point", "ending"], ["scene", "point", "detail"]],
        "长": [["opener", "reason", "scene", "point", "detail", "ending"], ["reason", "scene", "point", "second", "detail", "ending"], ["opener", "scene", "point", "second", "ending"]]
      };
      return trimToLength(compactText(pick(layouts[lengthType]).map(key => parts[key])), lengthType);
    }

    function buildFromMaterial(material, context) {
      const structure = extractStructure(material.content);
      const parts = {
        opener: pick([pick(SCENE_LINES[context.scene] || customSceneLines(context.scene)), pick(MODULES.openers)]),
        reason: pick([reasonFromTag(structure.reasonTag), pickReason(context.point, context.creativity)]),
        scene: pick(SCENE_LINES[context.scene] || customSceneLines(context.scene)),
        point: pickPointLine(context.point),
        second: context.secondPoint && context.lengthType !== "短" ? pickPointLine(context.secondPoint) : "",
        detail: pickDetail(context.point, context.creativity),
        ending: pickEnding(context.creativity)
      };
      const order = structure.order.length >= 3 ? structure.order : ["opener", "reason", "scene", "point", "ending"];
      if (!order.includes("point")) order.splice(Math.min(2, order.length), 0, "point");
      const chosen = order.filter(key => parts[key]).slice(0, context.lengthType === "短" ? 3 : context.lengthType === "中" ? 5 : 7);
      return trimToLength(compactText(chosen.map(key => parts[key])), context.lengthType);
    }

    function extractStructure(text) {
      const sentences = String(text || "").split(/(?<=。)/).map(item => item.trim()).filter(Boolean);
      const reasonSentence = sentences.find(item => /怕|不想|旧|杂牌|推荐|种草|回购|换/.test(item)) || "";
      const reasonTag = /杂牌|不放心/.test(reasonSentence) ? "brand" :
        /推荐|朋友/.test(reasonSentence) ? "friend" :
        /种草|评价/.test(reasonSentence) ? "seed" :
        /回购|又买/.test(reasonSentence) ? "repurchase" : "normal";
      const order = sentences.map(sentence => {
        if (/刚换|之前|买来|朋友|种草|回购/.test(sentence)) return "opener";
        if (/怕|不想|旧|杂牌|推荐|评价/.test(sentence)) return "reason";
        if (/办公室|家里|床头|出门|中午|晚上|工位/.test(sentence)) return "scene";
        if (/充|温度|烫|颜色|桌面|杂牌|旧头/.test(sentence)) return "point";
        return "ending";
      });
      return { reasonTag, order };
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
      renderGenerated();
    }

    function saveGeneratedEdit(item, card) {
      const value = card.querySelector(".copy-editor").value.trim();
      if (!value) return showToast("请填写文案内容");
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

    function cancelMaterialEdit(item) {
      item.editing = false;
      item.draft = "";
      renderMaterials();
    }

    function deleteMaterial(id) {
      if (!confirm("确定删除这条素材吗？")) return;
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

    function pickPointLine(point) {
      if (POINT_LINES[point]) return pick(POINT_LINES[point]);
      return pick([
        `主要是看中${point}这一点，日常用起来还挺顺手`,
        `用了几天，${point}这方面比我预期自然一些`,
        `买之前就是冲着${point}来的，实际用着没有违和感`,
        `对我来说${point}比较重要，这个用下来还算稳`
      ]);
    }

    function customSceneLines(scene) {
      return [
        `${scene}的时候用着比较顺手`,
        `买来主要就是为了${scene}`,
        `${scene}这个场景下还挺实用`
      ];
    }

    function pickReason(point, creativity) {
      const pool = [...MODULES.reasons];
      if (point === "对比杂牌") pool.push("之前用杂牌头有点不放心");
      if (point === "对比旧充电器") pool.push("旧充电器充一会儿就热，确实该换了");
      if (point === "低温") pool.push("晚上床头充电还是想温度稳一点");
      if (creativity === "wild") pool.push("本来没抱太大期待，结果日常用还挺频繁");
      return pick(pool);
    }

    function pickDetail(point, creativity) {
      const pool = [...MODULES.details];
      if (point === "颜值") pool.push("颜色放桌面上不突兀", "粉色不是廉价粉");
      if (creativity === "wild") pool.push("这种小配件每天都会用，顺手就很重要");
      return pick(pool);
    }

    function pickEnding(creativity) {
      const pool = [...MODULES.endings];
      if (creativity === "stable") return pick(pool.slice(0, 6));
      if (creativity === "wild") pool.push("算是被种草之后比较满意的一次", "小东西换了之后体验还挺明显");
      return pick(pool);
    }

    function reasonFromTag(tag) {
      const map = {
        brand: "之前用杂牌头有点不放心，这次想换个稳一点的",
        friend: "朋友说日常用挺稳，我才跟着买来试试",
        seed: "看了几条评价之后才决定入手",
        repurchase: "之前用过觉得还可以，这次才又买一个",
        normal: "旧充电器用了挺久，换新的会踏实些"
      };
      return map[tag] || map.normal;
    }

    function pickLengthType(creativity) {
      const pool = creativity === "stable" ? ["短", "中", "中", "中", "长"] :
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
      const aTokens = tokenPairs(a);
      const bTokens = tokenPairs(b);
      const overlap = aTokens.filter(token => bTokens.includes(token)).length;
      return overlap / Math.max(aTokens.length, 1) > 0.72;
    }

    function tokenPairs(text) {
      return text.replace(/[，。！？、\s]/g, "").match(/.{1,2}/g) || [];
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

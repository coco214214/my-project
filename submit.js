// pages/api/submit.js

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "25mb", // allow music uploads
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      artistName,
      artistEmail,
      dealType,
      fileName,
      fileBase64,
    } = req.body;

    if (!artistName || !artistEmail || !dealType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // RESTdb endpoint
    const url = "https://submissions-2d17.restdb.io/rest/submissions";

    // Build payload
    const payload = {
      artistName,
      artistEmail,
      dealType,
      fileName,
      fileBase64, // store Base64 or convert later
      submittedAt: new Date().toISOString(),
    };

    // Server-side API key (NEVER expose on frontend)
    const apiKey = process.env.RESTDB_API_KEY;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({
        error: "RESTdb submission failed",
        details: errorText,
      });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, submission: data });

  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}

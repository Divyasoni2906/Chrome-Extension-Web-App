const GEMINI_API_KEY = "YOUR _API_KEY"

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "summarize") {
    const url = msg.url

    // Get context (title/description) from the site
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        const title = html.match(/<title>(.*?)<\/title>/i)?.[1] || url
        const description = html.match(
          /<meta name="description" content="(.*?)"/i
        )?.[1] || ""

        const context = `${title}\n${description}`.trim()
        const prompt = `Give a simple, neutral one-line description of this website based only on the context:\n"${context}"\n
Rules:
- Do not add the words "lead tracking" or anything extra.
- Just describe what the website is (e.g., "Video sharing platform").`

        // Call Gemini API
        return fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
            GEMINI_API_KEY,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        )
      })
      .then((res) => res.json())
      .then((data) => {
        sendResponse({
          summary:
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Summary unavailable",
        })
      })
      .catch((err) => {
        console.error("Gemini fetch error:", err)
        sendResponse({ summary: "Summary unavailable" })
      })

    return true // keep channel open for async response
  }
})

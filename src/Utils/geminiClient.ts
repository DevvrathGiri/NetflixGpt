// src/Utils/geminiClient.ts
import { GEMINI_API_KEY } from "./constants";

export const callGemini = async (query: string) => {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=" +
      GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Suggest movies based on this query:
"${query}"
Return ONLY movie names as a comma-separated list.`,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};

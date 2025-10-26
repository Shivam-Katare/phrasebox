const { GoogleGenerativeAI } = require("@google/generative-ai");
const { default: toast } = require("react-hot-toast");

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  toast.error('Gemini API key is missing. Please add it to your environment variables.'); 
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 1000,
  },
});

async function generateMicrocopyWithGemini(purpose, context, tone) {
  const prompt = `
    You are a UX writing assistant specializing in creating concise, context-aware microcopy. Based on the details below, generate exactly three distinct microcopy suggestions. Each suggestion must be presented as a separate line, without any additional text or formatting.
    Details:
    Purpose: ${purpose}
    Tone: ${tone}
    Context: ${context}
    Output Format:
    [First suggestion]
    [Second suggestion]
    [Third suggestion]
    Generate only and exactly 3 suggestions.
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim().split("\n");
  } catch (error) {
    toast.error("Error generating microcopy. Please try again.");
    throw new Error("Failed to generate microcopy");
  }
}

module.exports = { generateMicrocopyWithGemini };
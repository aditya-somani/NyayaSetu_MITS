import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY =await process.env.GOOGLE_API_KEY;
console.log(API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);

const priorityPrompt = (details) => `
You are an assistant responsible for categorizing citizen complaints about government services.

Assign a priority:
- Priority 1 (Low): Minor inconvenience.
- Priority 2 (Medium): Noticeable disruption.
- Priority 3 (High): Urgent issues affecting safety, health, or critical services.

Instructions:
- Read the complaint carefully.
- Decide the appropriate priority (1, 2, or 3).
- Output the priority number and a short reason.

Example:
Complaint: "There has been no water supply in my area for the past 24 hours."

Output:
{ priority3 : High }

Here are the details you have access to: ${details}
`;

export async function allocatePriority(details) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-1.5-pro"
    const result = await model.generateContent(priorityPrompt(details));
    const text = result.response.text();

    const match = text.match(/priority\s*:\s*(\d)/i);
    const priority = match ? parseInt(match[1]) : null;

    return {
      priority,
      reason: text.replace(/.*priority\s*:\s*\d/i, "").trim(),
      rawOutput: text
    };
  } catch (err) {
    console.error("Error allocating priority:", err.message);
    return { error: err.message };
  }
}



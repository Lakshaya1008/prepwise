import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // Optional: edge runtime for fast startup

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { job, company, level } = await req.json();

    const prompt = `Generate the first interview question for a candidate applying to ${job} at ${company} (${level} level). Keep it under 30 words.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/^\n+/, "");

    return NextResponse.json({
      messages: [
        {
          role: "assistant",
          content: text,
        },
      ],
    });
  } catch (err) {
    console.error("Vapi generation error:", err);
    return NextResponse.json({ error: "Failed to generate question" }, { status: 500 });
  }
}

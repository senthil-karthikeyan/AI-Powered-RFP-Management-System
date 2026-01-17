import { env } from "@/env";
import { openaiText } from "@tanstack/ai-openai";

export const openaiTextModel = openaiText("gpt-4o-mini", {
  apiKey: env.OPENAI_API_KEY,
});

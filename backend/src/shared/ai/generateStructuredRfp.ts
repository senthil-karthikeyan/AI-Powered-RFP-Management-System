import { chat } from "@tanstack/ai";
import { openaiTextModel, RfpSchema } from "./utils";

export const generateStructuredRfp = async (input: string) => {
  return chat({
    adapter: openaiTextModel,
    messages: [{ role: "user", content: input }],
    systemPrompts: ["Convert the procurement request into structured JSON."],
    outputSchema: RfpSchema,
    stream: false,
  });
};

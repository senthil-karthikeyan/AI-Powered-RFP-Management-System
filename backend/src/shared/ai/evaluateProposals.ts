import { chat } from "@tanstack/ai";
import { openaiTextModel } from "./utils";
import { ProposalEvaluationSchema } from "./utils/schema";

export const evaluateProposals = async (input: {
  rfp: {
    title: string;
    structuredContent: any;
  };
  proposals: Array<{
    id: string;
    vendorId: string;
    structuredContent: any;
  }>;
}) => {
  return chat({
    adapter: openaiTextModel,
    systemPrompts: [
      "You are a procurement expert.",
      "Evaluate vendor proposals objectively.",
      "Score proposals using clear criteria.",
      "Always return structured JSON only.",
    ],
    messages: [
      {
        role: "user",
        content: JSON.stringify(input),
      },
    ],
    outputSchema: ProposalEvaluationSchema,
    stream: false,
  });
};

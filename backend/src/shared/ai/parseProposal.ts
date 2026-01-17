import { chat } from "@tanstack/ai";
import { openaiTextModel, ProposalSchema } from "./utils";

export const parseVendorProposal = async (emailText: string) => {
  return chat({
    adapter: openaiTextModel,
    messages: [{ role: "user", content: emailText }],
    systemPrompts: ["Extract proposal details from the vendor email."],
    outputSchema: ProposalSchema,
    stream: false,
  });
};

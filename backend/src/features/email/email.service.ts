import { prisma } from "@/shared/lib";
import { parseVendorProposal } from "@/shared/ai";

export const handleInboundEmail = async (payload: {
  from: string;
  text: string;
  custom_args: {
    rfpId: string;
    vendorId: string;
  };
}) => {
  const { custom_args } = payload;

  if (!custom_args?.rfpId || !custom_args?.vendorId) return;

  const { rfpId, vendorId } = custom_args;

  const structuredProposal = await parseVendorProposal(payload.text);

  // 2. Persist proposal
  return prisma.proposal.create({
    data: {
      rfpId,
      vendorId,
      rawContent: payload.text,
      structuredContent: structuredProposal,
    },
  });
};

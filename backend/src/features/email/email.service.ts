import { prisma } from "@/shared/lib";
import { parseVendorProposal } from "@/shared/ai";

export const handleInboundEmail = async ({
  text,
  rfpId,
  vendorId,
}: {
  text: string;
  rfpId: string;
  vendorId: string;
}) => {
  if (!rfpId || !vendorId) return;

  const structuredProposal = await parseVendorProposal(text);

  // 2. Persist proposal
  return prisma.proposal.create({
    data: {
      rfpId,
      vendorId,
      rawContent: text,
      structuredContent: structuredProposal,
    },
  });
};

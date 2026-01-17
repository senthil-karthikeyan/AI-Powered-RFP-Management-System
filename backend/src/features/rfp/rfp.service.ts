import { prisma, sendRfpEmail } from "@/shared/lib";
import { evaluateProposals, generateStructuredRfp } from "@/shared/ai";

export const createRfp = async (rawInput: string) => {
  const { title = "", ...structured } = await generateStructuredRfp(rawInput);

  return prisma.rFP.create({
    data: {
      title,
      rawContent: rawInput,
      structuredContent: structured,
    },
  });
};

export const listRfps = () =>
  prisma.rFP.findMany({
    include: {
      vendors: { include: { vendor: true } },
      proposals: { include: { vendor: true } },
      proposalEvaluations: true,
    },
  });

export const getRfp = (id: string) =>
  prisma.rFP.findUnique({
    where: { id },
    include: {
      vendors: { include: { vendor: true } },
      proposals: { include: { vendor: true } },
      proposalEvaluations: true,
    },
  });

export const sendRfp = async (rfpId: string, vendorIds: string[]) => {
  for (const vendorId of vendorIds) {
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) continue;

    // Check if already sent
    const existing = await prisma.rFPVendor.findUnique({
      where: {
        rfpId_vendorId: {
          rfpId,
          vendorId,
        },
      },
    });

    if (existing) continue;

    await prisma.rFPVendor.create({
      data: { rfpId, vendorId, sentAt: new Date() },
    });

    const rfp = await prisma.rFP.findUnique({
      where: { id: rfpId },
    });

    console.log({ sending: rfp, vendor });

    await sendRfpEmail({
      to: vendor.email,
      rfp,
      vendorId,
    });
  }

  return { message: "RFP sent to vendors" };
};

export const evaluateRfpProposals = async (rfpId: string) => {
  const rfp = await prisma.rFP.findUnique({
    where: { id: rfpId },
    include: {
      proposals: true,
    },
  });

  if (!rfp) return null;
  if (rfp.proposals.length < 2) return null;

  // Check cache
  const existing = await prisma.proposalEvaluation.findUnique({
    where: { rfpId },
  });

  if (existing) return existing;

  const evaluation = await evaluateProposals({
    rfp: {
      title: rfp.title,
      structuredContent: rfp.structuredContent,
    },
    proposals: rfp.proposals.map((p) => ({
      id: p.id,
      vendorId: p.vendorId,
      structuredContent: p.structuredContent,
    })),
  });

  return prisma.proposalEvaluation.upsert({
    where: { rfpId },
    update: {
      summary: evaluation as any,
      recommendedId: evaluation.recommendedProposalId,
    },
    create: {
      rfpId,
      summary: evaluation as any,
      recommendedId: evaluation.recommendedProposalId,
    },
  });
};

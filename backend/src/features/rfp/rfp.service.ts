import { prisma } from "../../shared/lib";
import { generateStructuredRfp } from "@/shared/ai";
import { sendRfpEmail } from "@/shared/lib";

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

export const listRfps = () => prisma.rFP.findMany();

export const getRfp = (id: string) => prisma.rFP.findUnique({ where: { id } });

export const sendRfp = async (rfpId: string, vendorIds: string[]) => {
  for (const vendorId of vendorIds) {
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) continue;

    await prisma.rFPVendor.create({
      data: { rfpId, vendorId, sentAt: new Date() },
    });

    const rfp = await prisma.rFP.findUnique({
      where: { id: rfpId },
    });

    await sendRfpEmail({
      to: vendor.email,
      rfp: rfp
        ? {
            id: rfp.id,
            title: rfp.title,
            structuredContent: rfp.structuredContent,
          }
        : null,
      vendorId,
    });
  }

  return { message: "RFP sent to vendors" };
};

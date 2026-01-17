import { prisma } from "@/shared/lib";

export const createVendor = (data: { name: string; email: string }) =>
  prisma.vendor.create({ data });

export const listVendors = () => prisma.vendor.findMany();

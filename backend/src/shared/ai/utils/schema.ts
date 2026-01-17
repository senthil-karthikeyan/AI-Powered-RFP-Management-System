import { z } from "zod";

const MoneySchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default("USD"),
});

export const RfpSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      specs: z.string().optional(),
    })
  ),
  budget: MoneySchema.optional(),
  deliveryDays: z.number().optional(),
  paymentTerms: z.string().optional(),
  title: z.string().optional(),
});

export const ProposalSchema = z.object({
  price: MoneySchema.optional(),
  deliveryDays: z.number().optional(),
  warranty: z.string().optional(),
  notes: z.string().optional(),
});

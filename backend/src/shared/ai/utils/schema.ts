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

export const ProposalEvaluationSchema = z.object({
  criteria: z.array(
    z.object({
      name: z.string(),
      weight: z.number(),
    })
  ),

  scores: z.array(
    z.object({
      proposalId: z.string(),
      vendorId: z.string(),
      totalScore: z.number(), // 0–100
      breakdown: z.record(z.string(), z.number()),
      pros: z.array(z.string()),
      cons: z.array(z.string()),
    })
  ),

  recommendedProposalId: z.string(),
  reasoning: z.string(),
});

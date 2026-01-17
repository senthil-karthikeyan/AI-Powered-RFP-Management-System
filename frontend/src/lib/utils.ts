import { Proposal } from "@/features/rfp/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (amount?: number) => {
  if (amount === undefined || amount === null) return "N/A"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export const getProposalSummary = (proposal: Proposal) => {
  return {
    price: formatPrice(proposal.structuredContent?.price?.amount),
    delivery: proposal.structuredContent.deliveryDays || "N/A",
    warranty: proposal.structuredContent.warranty || "N/A",
    notes: proposal.structuredContent.notes || "",
  }
}

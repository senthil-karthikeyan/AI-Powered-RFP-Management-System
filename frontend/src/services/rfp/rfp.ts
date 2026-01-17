import { api } from "../api"
import { ProposalEvaluation, Rfp } from "../../features/rfp/types"

export const createRfp = async (rawInput: string): Promise<Rfp> => {
  return api.post("/rfps", { rawInput })
}

export const getRfps = async (): Promise<Rfp[]> => {
  return api.get("/rfps")
}

export const getRfpById = async (id: string): Promise<Rfp> => {
  return api.get(`/rfps/${id}`)
}

export const sendRfp = async (
  rfpId: string,
  vendorIds: string[],
): Promise<void> => {
  return api.post(`/rfps/${rfpId}/send`, { vendorIds })
}
export const evaluateRfp = async (
  rfpId: string,
): Promise<ProposalEvaluation> => {
  return api.post(`/rfps/${rfpId}/evaluate`)
}

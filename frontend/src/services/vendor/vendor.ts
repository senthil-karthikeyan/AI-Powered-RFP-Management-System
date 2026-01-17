import { api } from "../api"
import { Vendor } from "../../features/vendor/types"

export const createVendor = async (
  name: string,
  email: string,
): Promise<Vendor> => {
  return api.post("/vendors", { name, email })
}

export const getVendors = async (): Promise<Vendor[]> => {
  return api.get("/vendors")
}

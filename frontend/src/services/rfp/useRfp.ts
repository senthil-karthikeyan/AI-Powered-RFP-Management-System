import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createRfp, getRfps, getRfpById, sendRfp, evaluateRfp } from "./rfp"

const useRfps = () => {
  const queryClient = useQueryClient()

  const useGetRfps = () =>
    useQuery({
      queryKey: ["rfps"],
      queryFn: getRfps,
    })

  const useGetRfp = (id: string) =>
    useQuery({
      queryKey: ["rfps", id],
      queryFn: () => getRfpById(id),
      enabled: !!id,
    })

  const useCreateRfp = () =>
    useMutation({
      mutationFn: createRfp,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rfps"] })
      },
    })

  const useSendRfp = () =>
    useMutation({
      mutationFn: ({
        rfpId,
        vendorIds,
      }: {
        rfpId: string
        vendorIds: string[]
      }) => sendRfp(rfpId, vendorIds),
    })

  const useEvaluateRfp = () =>
    useMutation({
      mutationFn: (rfpId: string) => evaluateRfp(rfpId),
      onSuccess: (_, rfpId) => {
        queryClient.invalidateQueries({
          queryKey: ["rfps", rfpId],
        })
      },
    })

  return {
    useGetRfps,
    useGetRfp,
    useCreateRfp,
    useSendRfp,
    useEvaluateRfp,
  }
}

export default useRfps

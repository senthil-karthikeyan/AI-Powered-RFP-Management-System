import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getVendors, createVendor } from "./vendor"

const useVendors = () => {
  const queryClient = useQueryClient()

  const useGetVendors = () =>
    useQuery({
      queryKey: ["vendors"],
      queryFn: getVendors,
    })

  const useCreateVendor = () =>
    useMutation({
      mutationFn: ({ name, email }: { name: string; email: string }) =>
        createVendor(name, email),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["vendors"] })
      },
    })

  return {
    useGetVendors,
    useCreateVendor,
  }
}

export default useVendors

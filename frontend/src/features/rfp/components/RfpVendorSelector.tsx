import { useState } from "react"
import { useVendors, useRfps } from "@/services"
import { Button, Label } from "@/components/ui"
import { Rfp } from "../types"
import { toast } from "sonner"
import { CheckCircle2 } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

interface RfpVendorSelectorProps {
  rfp: Rfp
}

export const RfpVendorSelector = ({ rfp }: RfpVendorSelectorProps) => {
  const { useGetVendors } = useVendors()
  const { data: vendors, isLoading } = useGetVendors()
  const { useSendRfp } = useRfps()
  const sendRfp = useSendRfp()
  const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([])

  const queryClient = useQueryClient()

  if (isLoading) return <div>Loading vendors...</div>
  if (!vendors || vendors.length === 0)
    return <div>No vendors found. PRO TIP: Create some vendors first!</div>

  // Create a set of sent vendor IDs for O(1) lookup
  const sentVendorIds = new Set(rfp.vendors?.map((v) => v?.vendor?.id) || [])

  const handleToggle = (vendorId: string) => {
    setSelectedVendorIds((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId],
    )
  }

  const handleSend = () => {
    if (selectedVendorIds.length === 0) return
    sendRfp.mutate(
      { rfpId: rfp.id, vendorIds: selectedVendorIds },
      {
        onSuccess: () => {
          toast.success("RFP sent to selected vendors!")
          setSelectedVendorIds([])
          queryClient.invalidateQueries({ queryKey: ["rfps", rfp.id] })
        },
        onError: (error) => {
          toast.error(`Error sending RFP: ${error.message}`)
        },
      },
    )
  }

  return (
    <div className="space-y-4 border p-4 rounded-md">
      <h3 className="text-lg font-medium">Invitation Status</h3>
      <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
        {vendors.map((vendor) => {
          const isSent = sentVendorIds.has(vendor.id)
          return (
            <div
              key={vendor.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-100"
            >
              <div className="flex items-center space-x-3">
                {!isSent && (
                  <input
                    type="checkbox"
                    id={`vendor-${vendor.id}`}
                    checked={selectedVendorIds.includes(vendor.id)}
                    onChange={() => handleToggle(vendor.id)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                )}
                <div className="flex flex-col">
                  <Label
                    htmlFor={`vendor-${vendor.id}`}
                    className={
                      isSent ? "text-gray-500 cursor-default" : "cursor-pointer"
                    }
                  >
                    {vendor.name}
                  </Label>
                  <span className="text-xs text-gray-400">{vendor.email}</span>
                </div>
              </div>
              {isSent && (
                <div className="flex items-center text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Sent
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex items-center space-x-2 pt-2 border-t">
        <Button
          onClick={handleSend}
          disabled={sendRfp.isPending || selectedVendorIds.length === 0}
          className="w-full"
        >
          {sendRfp.isPending
            ? "Sending..."
            : selectedVendorIds.length > 0
              ? `Send to ${selectedVendorIds.length} Vendors`
              : "Select Vendors"}
        </Button>
      </div>
    </div>
  )
}

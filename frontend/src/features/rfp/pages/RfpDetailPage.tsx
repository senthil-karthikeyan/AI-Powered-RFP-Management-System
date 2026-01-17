import { useRfps } from "@/services"
import {
  RfpVendorSelector,
  ProposalComparison,
  RfpStructuredView,
  ProposalEvaluation,
} from "../components"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui"

interface RfpDetailPageProps {
  rfpId: string
}

export const RfpDetailPage = ({ rfpId }: RfpDetailPageProps) => {
  const { useGetRfp } = useRfps()
  const { data: rfp, isLoading, error } = useGetRfp(rfpId)

  if (isLoading) return <div className="p-8 ml-8">Loading RFP details...</div>
  if (error || !rfp)
    return <div className="p-8 ml-8 text-red-500">Error loading RFP.</div>

  return (
    <div className="p-8 space-y-8 container mx-auto">
      <Link to="/rfps" className="inline-block mb-4">
        <Button variant="ghost" size="sm">
          ← Back to List
        </Button>
      </Link>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{rfp.title || "Untitled RFP"}</h1>
        <div className="bg-gray-50 p-4 rounded-md border text-gray-700">
          <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">
            Original Request
          </h3>
          <p>{rfp.rawContent}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Structured Requirements</h2>
        <RfpStructuredView content={rfp.structuredContent} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Vendor Proposals</h2>
          <ProposalComparison rfp={rfp} />

          <ProposalEvaluation rfp={rfp} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-4">
            <RfpVendorSelector rfp={rfp} />
          </div>
        </div>
      </div>
    </div>
  )
}

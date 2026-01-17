import { getProposalSummary } from "@/lib/utils"
import { Rfp } from "../types"

interface ProposalComparisonProps {
  rfp: Rfp
}

export const ProposalComparison = ({ rfp }: ProposalComparisonProps) => {
  if (!rfp.proposals || rfp.proposals.length === 0) {
    return (
      <div className="p-4 border rounded-md text-gray-500 bg-gray-50">
        No proposals received yet. Vendors will reply via email.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border rounded-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vendor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delivery
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Warranty
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rfp.proposals.map((proposal) => {
            const summary = getProposalSummary(proposal)
            return (
              <tr key={proposal.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {proposal.vendor?.name || "Unknown Vendor"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {summary.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {summary.delivery}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {summary.warranty}
                </td>
                <td
                  className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate"
                  title={summary.notes}
                >
                  {summary.notes}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

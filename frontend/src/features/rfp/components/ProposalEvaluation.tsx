import { Button } from "@/components/ui"
import { Rfp } from "../types"
import { useRfps } from "@/services"

export const ProposalEvaluation = ({ rfp }: { rfp: Rfp }) => {
  const { useEvaluateRfp } = useRfps()
  const { mutate: evaluate, isPending } = useEvaluateRfp()
  1
  const handleEvaluate = () => {
    evaluate(rfp.id)
  }

  // Need at least 2 proposals to compare
  if (!rfp?.proposals || rfp?.proposals?.length < 2) {
    return (
      <div className="p-4 border rounded-md text-gray-500 bg-gray-50">
        At least two vendor proposals are required for evaluation.
      </div>
    )
  }

  return (
    <div className="space-y-4 border p-4 rounded-md bg-gray-50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          AI Evaluation & Recommendation
        </h3>

        <Button onClick={handleEvaluate} disabled={isPending}>
          {isPending ? "Evaluating..." : "Evaluate Vendors"}
        </Button>
      </div>

      {rfp?.proposalEvaluation && (
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            {rfp?.proposalEvaluation?.summary?.overview}
          </p>

          <div className="grid gap-3">
            {rfp?.proposalEvaluation?.summary?.reasoning?.map((r) => (
              <div
                key={r.vendorId}
                className={`p-3 rounded-md border ${
                  r.vendorId === rfp?.proposalEvaluation?.recommendedId
                    ? "border-green-500 bg-green-50"
                    : "bg-white"
                }`}
              >
                <div className="font-medium">Vendor: {r?.vendorId}</div>

                <div className="text-sm mt-1">
                  <strong>Pros</strong>
                  <ul className="list-disc ml-4">
                    {r?.pros?.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm mt-1">
                  <strong>Cons</strong>
                  <ul className="list-disc ml-4">
                    {r?.cons?.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

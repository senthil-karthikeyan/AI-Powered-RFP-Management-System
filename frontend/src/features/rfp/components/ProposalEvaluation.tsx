import { Button } from "@/components/ui"
import { Rfp } from "../types"
import { useRfps } from "@/services"

export const ProposalEvaluation = ({ rfp }: { rfp: Rfp }) => {
  const { useEvaluateRfp } = useRfps()
  const { mutate: evaluate, isPending } = useEvaluateRfp()

  const evaluation = rfp?.proposalEvaluations?.[0]

  const handleEvaluate = () => {
    evaluate(rfp.id)
  }

  // Need at least 2 proposals to compare
  if (!rfp?.proposals || rfp.proposals.length < 2) {
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

      {evaluation && (
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            {evaluation.summary.reasoning}
          </p>

          <div className="grid gap-3">
            {evaluation.summary.scores.map((score) => (
              <div
                key={score.vendorId}
                className={`p-3 rounded-md border ${
                  score.proposalId === evaluation.recommendedId
                    ? "border-green-500 bg-green-50"
                    : "bg-white"
                }`}
              >
                <div className="font-medium">
                  Vendor:{" "}
                  {
                    rfp.vendors?.find((v) => v.vendor.id === score.vendorId)
                      ?.vendor.name
                  }
                </div>

                <div className="text-sm mt-1">
                  <strong>Total Score:</strong> {score.totalScore}
                </div>

                <div className="text-sm mt-2">
                  <strong>Pros</strong>
                  <ul className="list-disc ml-4">
                    {score.pros.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm mt-2">
                  <strong>Cons</strong>
                  <ul className="list-disc ml-4">
                    {score.cons.map((c, i) => (
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

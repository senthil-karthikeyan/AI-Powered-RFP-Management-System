import { useRfps } from "@/services"
import { RfpCreateForm } from "../components"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui"

export const RfpListPage = () => {
  const { useGetRfps } = useRfps()
  const { data: rfps, isLoading } = useGetRfps()

  return (
    <div className="p-8 space-y-8 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">RFPs</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Creation Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Create New RFP</h2>
            <RfpCreateForm />
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Recent RFPs</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : rfps && rfps.length > 0 ? (
            <div className="grid gap-4">
              {rfps.map((rfp) => (
                <div
                  key={rfp.id}
                  className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg text-primary">
                        <Link
                          to={`/rfps/$id`}
                          params={{ id: rfp.id }}
                          className="hover:underline"
                        >
                          {rfp.title || "Untitled RFP"}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {rfp.rawContent}
                      </p>
                    </div>
                    <Link to={`/rfps/$id`} params={{ id: rfp.id }}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                    <span>
                      Created: {new Date(rfp.createdAt).toLocaleDateString()}
                    </span>
                    <span>Proposals: {rfp.proposals?.length || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">
              No RFPs found. Create one to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { createFileRoute, Link } from "@tanstack/react-router"
import { useRfps, useVendors } from "@/services"
import { Button } from "@/components/ui"

export const Route = createFileRoute("/")({
  component: Dashboard,
})

function Dashboard() {
  const { useGetRfps } = useRfps()
  const { useGetVendors } = useVendors()
  const { data: rfps } = useGetRfps()
  const { data: vendors } = useGetVendors()

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">
        AI-Powered RFP Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg border shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500">Total RFPs</p>
              <p className="text-2xl font-bold">{rfps?.length || 0}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500">Total Vendors</p>
              <p className="text-2xl font-bold">{vendors?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg border shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="flex flex-col space-y-2">
            <Link to="/rfps">
              <Button className="w-full justify-start" size="lg">
                📝 Create New RFP
              </Button>
            </Link>
            <Link to="/vendors">
              <Button
                variant="outline"
                className="w-full justify-start"
                size="lg"
              >
                🏢 Manage Vendors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

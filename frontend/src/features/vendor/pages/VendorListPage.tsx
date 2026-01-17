import { useVendors } from "@/services"
import { VendorCreateForm } from "../components"

export const VendorListPage = () => {
  const { useGetVendors } = useVendors()
  const { data: vendors, isLoading } = useGetVendors()

  return (
    <div className="p-8 space-y-8 container mx-auto">
      <h1 className="text-3xl font-bold">Manage Vendors</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Creation Column */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Add New Vendor</h2>
            <VendorCreateForm />
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Vendor Directory</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : vendors && vendors.length > 0 ? (
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {vendor.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vendor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        Active
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-500 italic">
              No vendors found. Add one!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

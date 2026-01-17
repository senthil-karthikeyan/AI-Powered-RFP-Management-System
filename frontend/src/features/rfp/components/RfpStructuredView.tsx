import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui"

interface StructuredViewProps {
  content: Record<string, any>
}

export const RfpStructuredView = ({ content }: StructuredViewProps) => {
  if (!content) return null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(content).map(([key, value]) => {
        if (key === "items" && Array.isArray(value)) {
          return (
            <Card key={key} className="col-span-full">
              <CardHeader>
                <CardTitle>Items Needed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {value.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between border-b pb-2 last:border-0 last:pb-0"
                    >
                      <div className="space-x-3">
                        <span className="font-medium">
                          {item.name || "Item"}
                        </span>
                        <span className="font-medium">
                          {item.specs || "Spec"}
                        </span>
                      </div>
                      <span className="text-gray-500">
                        Qty: {item.quantity || 1}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        }
        // Generic Key-Value card
        return (
          <Card key={key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium uppercase text-gray-500">
                {key}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">
                {value?.amount
                  ? `${value.amount} ${value.currency}`
                  : String(value)}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

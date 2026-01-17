import { createFileRoute } from "@tanstack/react-router"
import { RfpDetailPage } from "@/features/rfp/pages"

export const Route = createFileRoute("/rfps/$id/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <RfpDetailPage rfpId={id} />
}

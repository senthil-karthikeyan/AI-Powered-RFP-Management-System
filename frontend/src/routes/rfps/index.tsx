import { createFileRoute } from "@tanstack/react-router"
import { RfpListPage } from "@/features/rfp/pages"

export const Route = createFileRoute("/rfps/")({
  component: RfpListPage,
})

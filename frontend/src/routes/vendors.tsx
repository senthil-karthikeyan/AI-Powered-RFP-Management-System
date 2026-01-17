import { createFileRoute } from "@tanstack/react-router"
import { VendorListPage } from "@/features/vendor/pages"

export const Route = createFileRoute("/vendors")({
  component: VendorListPage,
})

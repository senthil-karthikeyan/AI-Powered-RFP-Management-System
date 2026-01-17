import { Link } from "@tanstack/react-router"
import { LayoutDashboard, FileText, Users } from "lucide-react"

export const AppSidebar = () => {
  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "RFPs", href: "/rfps", icon: FileText },
    { label: "Vendors", href: "/vendors", icon: Users },
  ]

  return (
    <div className="w-64 border-r bg-gray-50/40 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          AI RFP Manager
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 [&.active]:bg-white [&.active]:shadow-sm [&.active]:text-primary"
            activeProps={{ className: "active" }}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

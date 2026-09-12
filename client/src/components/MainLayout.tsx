import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Outlet } from "react-router"
import { Button } from "./ui/button"
import { Bell } from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import Avatar from "react-avatar"
import { useLocation } from "react-router"

export default function MainLayout() {
  const location = useLocation()
  console.log(location)
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex min-h-14 items-center gap-2 border-b px-4 py-2">
          <SidebarTrigger />
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Workspace /</p>
              <p className="text-xl font-semibold first-letter:uppercase">
                {location.pathname.replace("/", "")}
              </p>
            </div>
            <div className="flex gap-1">
              <ModeToggle />
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                {/* Todo: Replace with user profile picture if available */}
                <Avatar name="Ramananda Samantaray" size="30" round={true} />
                <span className="sr-only">User</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

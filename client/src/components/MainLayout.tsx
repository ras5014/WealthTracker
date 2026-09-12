import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Outlet } from "react-router"
import { Button } from "./ui/button"
import { Bell } from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import Avatar from "react-avatar"

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex min-h-14 items-center gap-2 border-b px-4 py-2">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-1">
            <ModeToggle />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Avatar name="Ramananda Samantaray" size="30" round={true} />
              <span className="sr-only">User</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  Landmark,
  PiggyBank,
  Receipt,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  HandCoins,
} from "lucide-react"

import { NavLink } from "react-router"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types"

const navItems: NavItem[] = [
  {
    to: "/",
    label: "Overview",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/transactions",
    label: "Transactions",
    icon: Receipt,
    end: false,
  },
  {
    to: "/emis",
    label: "Loans & EMIs",
    icon: Landmark,
    end: false,
  },
  {
    to: "/investments",
    label: "Investments",
    icon: TrendingUp,
    end: false,
  },
  {
    to: "/budget",
    label: "Budget goals",
    icon: Target,
    end: false,
  },
  {
    to: "/ask-finance",
    label: "Ask Finance",
    icon: Sparkles,
    end: false,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="h-full">
      {/* Logo */}
      <SidebarHeader className="mb-6">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-accent-foreground">
            <HandCoins size={30} />
          </div>

          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-lg leading-none font-bold">WealthTracker</p>
            <p className="mt-1 text-xs tracking-[.2em] text-sidebar-foreground/50 uppercase">
              Your money, clear
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">Navigate</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      "flex h-12 w-full items-center gap-3 overflow-hidden rounded-2xl px-4 text-left text-sm font-medium text-sidebar-foreground ring-sidebar-ring outline-hidden transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2",
                      isActive &&
                        "bg-sidebar-accent text-sidebar-accent-foreground"
                    )
                  }
                >
                  <item.icon className="size-5 shrink-0" />
                  <span className="truncate group-data-[collapsible=icon]:hidden">
                    {item.label}
                  </span>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="mb-4 flex flex-col gap-4">
        <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent/60 p-4 group-data-[collapsible=icon]:hidden">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold text-sidebar-primary">
            <PiggyBank size={14} />
            Weekly note
          </p>

          <p className="text-xs leading-relaxed text-sidebar-foreground/60">
            Small checks make big plans feel close. You're doing the work.
          </p>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings2 />
              <span>Preferences</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

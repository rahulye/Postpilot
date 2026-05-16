"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Calendar, 
  Users, 
  Settings, 
  MessageSquare,
  BarChart3,
  Rocket
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Compose", icon: PlusCircle, href: "/compose" },
  { title: "Scheduled", icon: Calendar, href: "/scheduled" },
  { title: "Social Accounts", icon: Users, href: "/accounts" },
  { title: "Auto-Reply", icon: MessageSquare, href: "/auto-reply" },
  { title: "Analytics", icon: BarChart3, href: "/analytics" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href="/dashboard" className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Rocket className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight group-data-[collapsible=icon]:hidden">PostPilot</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-4 group-data-[collapsible=icon]:px-2">
            <Link href="/compose" className="w-full">
              <Button className="w-full justify-start gap-2 h-11 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
                <PlusCircle className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">New Post</span>
              </Button>
            </Link>
          </div>

          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="h-11 rounded-xl px-4"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-9 w-9 rounded-xl ring-2 ring-primary/10">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-bold">
              {user?.firstName?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-bold truncate leading-none mb-1">{user?.fullName || 'User'}</p>
            <Badge variant="outline" className="text-[10px] h-4 rounded-full px-1.5 font-bold border-primary/20 text-primary bg-primary/5">
              PRO
            </Badge>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

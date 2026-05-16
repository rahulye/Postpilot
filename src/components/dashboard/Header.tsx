"use client";

import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Bell, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  const pathname = usePathname();
  
  const getTitle = (path: string) => {
    if (path.includes("/dashboard")) return "Overview";
    if (path.includes("/compose")) return "Composer";
    if (path.includes("/accounts")) return "Social Accounts";
    if (path.includes("/scheduled")) return "Schedule";
    if (path.includes("/settings")) return "Settings";
    if (path.includes("/analytics")) return "Analytics";
    if (path.includes("/auto-reply")) return "Auto-Reply";
    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
      <SidebarTrigger className="hidden md:flex" />
      
      <div className="flex-1 flex items-center gap-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-[0.2em]">{getTitle(pathname)}</h2>
        <Badge variant="secondary" className="rounded-full px-3 py-0.5 bg-primary/10 text-primary border-none font-bold text-[10px] gap-1 animate-pulse">
          <Sparkles className="h-3 w-3" />
          PRO PLAN
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/compose" className="hidden sm:block">
          <Button size="sm" className="rounded-xl gap-2 px-4 shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            <span className="font-semibold">Compose</span>
          </Button>
        </Link>
        
        <div className="h-8 w-[1px] bg-border/50 mx-1 hidden sm:block" />
        
        <Button variant="ghost" size="icon" className="rounded-xl relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </Button>
        
        <ThemeToggle />
        
        <div className="h-8 w-[1px] bg-border/50 mx-1" />
        
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "h-9 w-9 rounded-xl ring-2 ring-primary/10 hover:ring-primary/30 transition-all"
            }
          }}
        />
      </div>
    </header>
  );
}

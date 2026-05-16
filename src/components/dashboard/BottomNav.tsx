"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Calendar, 
  Users, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Schedule", icon: Calendar, href: "/scheduled" },
  { title: "Compose", icon: PlusCircle, href: "/compose", isMain: true },
  { title: "Accounts", icon: Users, href: "/accounts" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-lg border-t border-border/50 flex items-center justify-around px-4 md:hidden pb-safe">
      {items.map((item) => {
        const isActive = pathname === item.href;
        
        if (item.isMain) {
          return (
            <Link key={item.href} href={item.href} className="relative -top-4">
              <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 text-primary-foreground transform hover:scale-110 transition-all active:scale-95">
                <item.icon className="h-7 w-7" />
              </div>
            </Link>
          );
        }

        return (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 group">
            <div className={cn(
              "p-1.5 rounded-xl transition-all",
              isActive ? "bg-primary/10 text-primary scale-110" : "text-muted-foreground group-hover:text-foreground"
            )}>
              <item.icon className="h-5 w-5" />
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-widest transition-all",
              isActive ? "text-primary opacity-100" : "text-muted-foreground opacity-70"
            )}>
              {item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/Header";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BottomNav } from "@/components/dashboard/BottomNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col bg-muted/30 dark:bg-background/95">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6 md:p-10 pb-24 md:pb-10">
            {children}
          </main>
          <BottomNav />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

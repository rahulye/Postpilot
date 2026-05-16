"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import { Rocket } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient-primary">PostPilot</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-10">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
              Docs
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" className="hidden sm:inline-flex font-semibold">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 shadow-lg shadow-primary/20">
                Get Started Free
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard">
              <Button variant="ghost" className="hidden sm:inline-flex font-semibold">
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </Show>

        </div>
      </div>
    </header>
  );
}



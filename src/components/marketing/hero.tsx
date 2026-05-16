"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PlayCircle, ArrowRight, MessageSquare, Share2 } from "lucide-react";
import { TwitterIcon, LinkedinIcon, InstagramIcon, FacebookIcon, YoutubeIcon, GithubIcon, ChromeIcon } from "./icons";

export function Hero() {
  const platforms = [
    { name: "X (Twitter)", icon: <TwitterIcon className="h-6 w-6" /> },
    { name: "LinkedIn", icon: <LinkedinIcon className="h-6 w-6" /> },
    { name: "Instagram", icon: <InstagramIcon className="h-6 w-6" /> },
    { name: "Facebook", icon: <FacebookIcon className="h-6 w-6" /> },
    { name: "YouTube", icon: <YoutubeIcon className="h-6 w-6" /> },
    { name: "Threads", icon: <MessageSquare className="h-6 w-6" /> },
    { name: "TikTok", icon: <Share2 className="h-6 w-6" /> },
    { name: "Pinterest", icon: <ChromeIcon className="h-6 w-6" /> },
    { name: "Google Business", icon: <GithubIcon className="h-6 w-6" /> },
  ];

  return (
    <div className="relative isolate overflow-hidden bg-background pt-14">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 flex flex-col items-center text-center">
        <Badge variant="outline" className="mb-6 py-1 px-4 text-sm font-medium border-primary/20 bg-primary/5 text-primary animate-pulse rounded-full">
          ✨ AI-Powered Social Media Management
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-7xl max-w-4xl leading-[1.1]">
          Automate your social presence with{" "}
          <span className="text-gradient-primary">
            AI-Driven Insights
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
          Schedule posts, generate AI captions, and auto-reply to comments across all platforms. The only copilot you need to grow your social audience while you sleep.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/sign-up">
            <Button size="lg" className="px-8 h-14 text-lg font-bold shadow-xl shadow-primary/25 rounded-full hover:scale-105 transition-transform duration-300">
              Start Growing for Free
            </Button>
          </Link>
          <Button variant="ghost" size="lg" className="gap-2 text-lg font-semibold hover:bg-primary/5 rounded-full">
            Watch Demo <PlayCircle className="h-6 w-6 text-primary" />
          </Button>
        </div>

        {/* Platform Strip */}
        <div className="mt-32 w-full overflow-hidden">
          <p className="text-center text-xs font-bold tracking-[0.2em] uppercase leading-8 text-muted-foreground/60 mb-8">
            TRUSTED BY CREATORS ON EVERY PLATFORM
          </p>
          <div className="relative flex overflow-x-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:after:from-background after:to-transparent">
            <div className="py-12 animate-marquee whitespace-nowrap flex items-center">
              {platforms.concat(platforms).map((platform, i) => (
                <div key={i} className="mx-12 flex items-center gap-3 text-muted-foreground/50 grayscale hover:grayscale-0 hover:text-primary transition-all duration-300 group cursor-default">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {platform.icon}
                  </div>
                  <span className="text-xl font-bold tracking-tight">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-400 to-primary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>
    </div>
  );
}


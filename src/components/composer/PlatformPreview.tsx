"use client";

import { useState } from "react";
import { 
  MoreHorizontal, 
  Heart, 
  MessageCircle, 
  Share2, 
  Repeat2,
  Bookmark
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  NewTwitterIcon, 
  Linkedin01Icon, 
  InstagramIcon 
} from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

interface PlatformPreviewProps {
  content: string;
  media: Array<{ url: string; type: string }>;
  selectedPlatforms: string[];
}

export function PlatformPreview({ content, media, selectedPlatforms }: PlatformPreviewProps) {
  const platformsToPreview = selectedPlatforms.length > 0 ? selectedPlatforms : ["x"];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">Live Preview</label>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      <Tabs defaultValue={platformsToPreview[0]} className="w-full">
        <TabsList className="w-full bg-muted/30 p-1 rounded-2xl border border-border/50">
          {platformsToPreview.map((p) => (
            <TabsTrigger key={p} value={p} className="flex-1 rounded-xl capitalize">
              {p}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-8 p-8 rounded-[40px] bg-card border-8 border-muted/50 shadow-2xl relative overflow-hidden min-h-[500px]">
          {/* Platform specific mockups */}
          {platformsToPreview.map((p) => (
            <TabsContent key={p} value={p}>
              {p === "x" && (
                <XPreview content={content} media={media} />
              )}
              {p === "linkedin" && (
                <LinkedInPreview content={content} media={media} />
              )}
              {p === "instagram" && (
                <InstagramPreview content={content} media={media} />
              )}
              {!["x", "linkedin", "instagram"].includes(p) && (
                <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                  <p>Preview for {p} coming soon</p>
                </div>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

function XPreview({ content, media }: { content: string; media: any[] }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500" />
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-bold">You</span>
            <span className="text-muted-foreground text-sm">@yourhandle · 1s</span>
          </div>
          <p className="mt-1 whitespace-pre-wrap leading-relaxed">{content || "What's happening?"}</p>
        </div>
      </div>
      
      {media.length > 0 && (
        <div className="relative rounded-2xl overflow-hidden border border-border/50 aspect-video ml-15">
          <Image src={media[0].url} alt="Preview" fill className="object-cover" />
        </div>
      )}

      <div className="flex justify-between text-muted-foreground mt-4 ml-15 max-w-md">
        <MessageCircle className="h-5 w-5" />
        <Repeat2 className="h-5 w-5" />
        <Heart className="h-5 w-5" />
        <BarChart3 className="h-5 w-5" />
        <Share2 className="h-5 w-5" />
      </div>
    </div>
  );
}

function LinkedInPreview({ content, media }: { content: string; media: any[] }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800" />
        <div>
          <span className="font-bold block">Your Name</span>
          <span className="text-xs text-muted-foreground">Content Creator</span>
          <span className="text-xs text-muted-foreground block">1s · 🌐</span>
        </div>
      </div>
      <p className="whitespace-pre-wrap leading-relaxed text-sm">{content || "What do you want to talk about?"}</p>
      
      {media.length > 0 && (
        <div className="relative rounded-sm overflow-hidden border border-border/50 aspect-video">
          <Image src={media[0].url} alt="Preview" fill className="object-cover" />
        </div>
      )}

      <div className="flex gap-6 text-muted-foreground pt-4 border-t border-border/50">
        <span className="flex items-center gap-2 text-xs font-semibold">Like</span>
        <span className="flex items-center gap-2 text-xs font-semibold">Comment</span>
        <span className="flex items-center gap-2 text-xs font-semibold">Repost</span>
        <span className="flex items-center gap-2 text-xs font-semibold">Send</span>
      </div>
    </div>
  );
}

function InstagramPreview({ content, media }: { content: string; media: any[] }) {
  return (
    <div className="space-y-4 -mx-8 -mt-8">
      <div className="flex items-center gap-3 p-4 border-b border-border/10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5">
           <div className="w-full h-full rounded-full bg-card" />
        </div>
        <span className="text-sm font-bold">your_username</span>
        <MoreHorizontal className="h-5 w-5 ml-auto" />
      </div>

      <div className="aspect-square bg-muted relative">
        {media.length > 0 ? (
          <Image src={media[0].url} alt="Preview" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
             <HugeiconsIcon icon={InstagramIcon} size={48} className="text-muted-foreground/30" />
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <div className="flex gap-4 mb-2">
          <Heart className="h-6 w-6" />
          <MessageCircle className="h-6 w-6" />
          <Share2 className="h-6 w-6" />
          <Bookmark className="h-6 w-6 ml-auto" />
        </div>
        <div className="text-sm">
          <span className="font-bold mr-2">your_username</span>
          <span className="whitespace-pre-wrap">{content || "Write a caption..."}</span>
        </div>
      </div>
    </div>
  );
}

function BarChart3(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}

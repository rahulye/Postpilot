"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { 
  NewTwitterIcon, 
  Linkedin01Icon, 
  InstagramIcon, 
  Facebook01Icon, 
  ThreadsIcon, 
  TiktokIcon, 
  YoutubeIcon 
} from "@hugeicons/core-free-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const platforms = [
  { id: "x", name: "X (Twitter)", icon: NewTwitterIcon, color: "hover:text-blue-400" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin01Icon, color: "hover:text-blue-600" },
  { id: "instagram", name: "Instagram", icon: InstagramIcon, color: "hover:text-pink-500" },
  { id: "facebook", name: "Facebook", icon: Facebook01Icon, color: "hover:text-blue-700" },
  { id: "threads", name: "Threads", icon: ThreadsIcon, color: "hover:text-white" },
  { id: "tiktok", name: "TikTok", icon: TiktokIcon, color: "hover:text-cyan-400" },
  { id: "youtube", name: "YouTube", icon: YoutubeIcon, color: "hover:text-red-500" },
];

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onChange: (platforms: string[]) => void;
}

export function PlatformSelector({ selectedPlatforms, onChange }: PlatformSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">Target Platforms</label>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {selectedPlatforms.length} selected
        </span>
      </div>
      <ToggleGroup 
        type="multiple" 
        value={selectedPlatforms} 
        onValueChange={onChange}
        className="justify-start gap-3 flex-wrap"
      >
        {platforms.map((platform) => (
          <Tooltip key={platform.id}>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value={platform.id}
                aria-label={`Toggle ${platform.name}`}
                className={`w-12 h-12 rounded-2xl border-2 transition-all duration-300 data-[state=on]:bg-primary/10 data-[state=on]:border-primary data-[state=on]:scale-110 shadow-sm ${platform.color}`}
              >
                <HugeiconsIcon icon={platform.icon} size={20} />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{platform.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </ToggleGroup>
    </div>
  );
}

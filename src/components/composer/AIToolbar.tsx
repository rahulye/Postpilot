"use client";

import { useState } from "react";
import { Sparkles, Hash, Wand2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateCaption, suggestHashtags } from "@/app/actions/ai";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AIToolbarProps {
  content: string;
  onUpdate: (content: string) => void;
  selectedPlatforms: string[];
}

export function AIToolbar({ content, onUpdate, selectedPlatforms }: AIToolbarProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform first");
      return;
    }
    
    setIsGenerating(true);
    const result = await generateCaption(content || "write a viral post about productivity", selectedPlatforms[0]);
    setIsGenerating(false);

    if (result.success && result.data) {
      onUpdate(result.data);
      toast.success("AI generated a new caption!");
    } else {
      toast.error(result.error || "Failed to generate caption");
    }
  };

  const handleHashtags = async () => {
    if (!content) {
      toast.error("Write some content first to get hashtag suggestions");
      return;
    }

    setIsGenerating(true);
    const result = await suggestHashtags(content);
    setIsGenerating(false);

    if (result.success && result.data) {
      onUpdate(content + "\n\n" + result.data);
      toast.success("Added trending hashtags!");
    } else {
      toast.error(result.error || "Failed to suggest hashtags");
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm">
      <div className="flex items-center gap-1 px-3 py-1 mr-2 border-r border-border/50">
        <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
        <span className="text-xs font-bold text-purple-500 uppercase tracking-tighter">AI Assistant</span>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleGenerate}
        disabled={isGenerating}
        className="gap-2 rounded-xl hover:bg-purple-500/10 hover:text-purple-500 transition-all"
      >
        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
        <span>Generate Caption</span>
      </Button>

      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleHashtags}
        disabled={isGenerating}
        className="gap-2 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 transition-all"
      >
        <Hash className="h-4 w-4" />
        <span>Suggest Hashtags</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2 rounded-xl">
            <RefreshCw className="h-4 w-4" />
            <span>Tone</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-2xl border-border/50">
          <DropdownMenuItem className="rounded-xl">Professional</DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl">Casual</DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl">Witty & Humorous</DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl">Inspirational</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

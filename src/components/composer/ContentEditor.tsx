"use client";

import { Textarea } from "@/components/ui/textarea";

interface ContentEditorProps {
  content: string;
  onChange: (content: string) => void;
  maxChars?: number;
}

export function ContentEditor({ content, onChange, maxChars = 2000 }: ContentEditorProps) {
  const charCount = content.length;
  const isOverLimit = charCount > maxChars;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">Post Content</label>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isOverLimit ? 'bg-red-500/10 text-red-500' : 'bg-muted text-muted-foreground'}`}>
          {charCount} / {maxChars}
        </span>
      </div>
      <div className="relative group">
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What's on your mind? Use the AI toolbar for help..."
          className="min-h-[200px] text-lg resize-none p-6 rounded-3xl border-border/50 bg-card/30 backdrop-blur-sm focus:bg-card focus:border-primary/50 transition-all duration-500 shadow-inner group-hover:shadow-primary/5"
        />
        <div className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-inset ring-black/5 dark:ring-white/5" />
      </div>
    </div>
  );
}

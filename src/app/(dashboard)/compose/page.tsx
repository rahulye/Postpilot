"use client";

import { useState } from "react";
import { PlatformSelector } from "@/components/composer/PlatformSelector";
import { ContentEditor } from "@/components/composer/ContentEditor";
import { AIToolbar } from "@/components/composer/AIToolbar";
import { MediaUploader } from "@/components/composer/MediaUploader";
import { PublishControls } from "@/components/composer/PublishControls";
import { PlatformPreview } from "@/components/composer/PlatformPreview";
import { createPost } from "@/app/actions/posts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function ComposePage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [media, setMedia] = useState<Array<{ id: string; url: string; type: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublish = async (scheduledAt?: Date) => {
    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }
    if (!content && media.length === 0) {
      toast.error("Post cannot be empty");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createPost({
        content,
        platforms: selectedPlatforms,
        mediaIds: media.map(m => m.id),
        scheduledAt,
      });

      if (result.success) {
        toast.success(scheduledAt ? "Post scheduled successfully!" : "Post published successfully!");
        router.push("/dashboard");
      } else {
        toast.error(result.error || "Failed to create post");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side - Editor */}
        <div className="flex-1 space-y-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Create Post</h1>
            <p className="text-muted-foreground">Draft your next viral content and distribute it across platforms.</p>
          </div>

          <div className="space-y-8 bg-card/30 backdrop-blur-md p-8 rounded-[40px] border border-border/50 shadow-xl">
            <PlatformSelector 
              selectedPlatforms={selectedPlatforms} 
              onChange={setSelectedPlatforms} 
            />
            
            <Separator className="bg-border/30" />

            <div className="space-y-4">
              <AIToolbar 
                content={content} 
                onUpdate={setContent} 
                selectedPlatforms={selectedPlatforms}
              />
              <ContentEditor 
                content={content} 
                onChange={setContent} 
                maxChars={selectedPlatforms.includes('x') ? 280 : 2000}
              />
            </div>

            <Separator className="bg-border/30" />

            <MediaUploader 
              media={media} 
              onAdd={(item) => setMedia([...media, item])}
              onRemove={(id) => setMedia(media.filter(m => m.id !== id))}
            />

            <Separator className="bg-border/30" />

            <PublishControls 
              onPublish={() => handlePublish()}
              onSchedule={(date) => handlePublish(date)}
              isSubmitting={isSubmitting}
              disabled={selectedPlatforms.length === 0}
            />
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="lg:w-[450px] space-y-6">
          <PlatformPreview 
            content={content} 
            media={media} 
            selectedPlatforms={selectedPlatforms}
          />
        </div>
      </div>
    </div>
  );
}

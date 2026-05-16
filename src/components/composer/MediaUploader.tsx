"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, X, Upload, Loader2, FileVideo, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

interface MediaUploaderProps {
  media: Array<{ id: string; url: string; type: string }>;
  onAdd: (item: { id: string; url: string; type: string }) => void;
  onRemove: (id: string) => void;
}

export function MediaUploader({ media, onAdd, onRemove }: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size too large (max 10MB)");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      onAdd({ 
        id: data.id, 
        url: data.url, 
        type: file.type.startsWith("video") ? "video" : "image" 
      });
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload media");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">Media Assets</label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {media.map((item) => (
          <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden border border-border/50 group">
            {item.type === "image" ? (
              <Image 
                src={item.url} 
                alt="Uploaded media" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Film className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={() => onRemove(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        {media.length < 4 && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="aspect-square rounded-2xl border-2 border-dashed border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 group disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Upload</span>
              </>
            )}
          </button>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
        accept="image/*,video/*"
      />
      
      <p className="text-[10px] text-muted-foreground text-center italic">
        Supported: JPG, PNG, WEBP, MP4 (Max 10MB)
      </p>
    </div>
  );
}

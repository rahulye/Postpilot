"use client";

import { useState } from "react";
import { Send, Calendar, Clock, Rocket, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface PublishControlsProps {
  onPublish: () => void;
  onSchedule: (date: Date) => void;
  isSubmitting: boolean;
  disabled?: boolean;
}

export function PublishControls({ onPublish, onSchedule, isSubmitting, disabled }: PublishControlsProps) {
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        onClick={onPublish}
        disabled={isSubmitting || disabled}
        className="flex-1 h-12 rounded-2xl gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Rocket className="h-5 w-5" />
        )}
        <span>Post Now</span>
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={isSubmitting || disabled}
            className="flex-1 h-12 rounded-2xl gap-2 border-border/50 hover:bg-muted/50 transition-all"
          >
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span>{date ? format(date, "PPP") : "Schedule"}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 rounded-3xl overflow-hidden border-border/50 shadow-2xl" align="end">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              if (newDate) onSchedule(newDate);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

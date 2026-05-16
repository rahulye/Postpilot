"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Alex Rivers",
    role: "Content Creator",
    quote: "PostPilot has completely changed how I manage my social media. The AI captions are scary good and save me hours every week.",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    quote: "The multi-platform scheduling is seamless. We've seen a 40% increase in engagement since we started using PostPilot's AI-driven insights.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Marcus Thorne",
    role: "E-commerce Owner",
    quote: "The auto-reply feature is a lifesaver. My customers get instant responses even when I'm sleeping. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    name: "Elena Rodriguez",
    role: "Influencer",
    quote: "I've tried every social media tool out there, and PostPilot is by far the most intuitive and powerful. The UI is gorgeous too.",
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Loved by creators and businesses worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of users who are growing their brands with PostPilot.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, i) => (
              <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border-border/50 bg-card/50">
                  <CardContent className="p-8 flex flex-col h-full">
                    <Quote className="h-8 w-8 text-primary/20 mb-6" />
                    <p className="text-lg leading-relaxed mb-8 flex-grow">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

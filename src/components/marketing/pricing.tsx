"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for getting started.",
    features: [
      "Up to 3 social accounts",
      "10 scheduled posts/mo",
      "Basic AI captions",
      "Standard analytics",
      "Community support",
    ],
    cta: "Start for Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: { monthly: 19, annual: 15 },
    description: "For serious creators and growing brands.",
    features: [
      "Up to 10 social accounts",
      "Unlimited scheduled posts",
      "Advanced AI features",
      "Priority AI auto-reply",
      "Detailed performance reports",
      "Priority support",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Business",
    price: { monthly: 49, annual: 39 },
    description: "Scale your agency or business.",
    features: [
      "Unlimited social accounts",
      "Team collaboration tools",
      "Custom AI models",
      "White-label reports",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 py-1 px-4 text-xs font-bold uppercase tracking-widest border-primary/20 bg-primary/5 text-primary rounded-full">
            Pricing
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Simple, <span className="text-gradient-primary">transparent</span> pricing
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Choose the plan that's right for you and start growing your social presence today.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle" className={`text-sm font-bold transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <Label htmlFor="billing-toggle" className={`text-sm font-bold transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
              Annual <span className="text-primary text-[10px] font-black bg-primary/10 px-2 py-0.5 rounded-full ml-1 uppercase">Save 20%</span>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <Card key={i} className={`relative flex flex-col transition-all duration-500 hover:-translate-y-2 ${plan.highlighted ? "border-primary shadow-2xl shadow-primary/20 scale-105 z-10 bg-card" : "border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30"}`}>
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
                  Most Popular
                </div>
              )}
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-bold tracking-tight mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pb-8">
                <div className="mb-8">
                  <span className="text-5xl font-extrabold tracking-tight">${isAnnual ? plan.price.annual : plan.price.monthly}</span>
                  <span className="text-muted-foreground font-medium ml-1">/mo</span>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <div className="mt-1 bg-primary/10 rounded-full p-0.5">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4">
                <Button 
                  className={`w-full h-12 text-base font-bold rounded-xl transition-all duration-300 ${plan.highlighted ? "bg-primary text-primary-foreground hover:scale-[1.02]" : "hover:bg-primary hover:text-primary-foreground"}`} 
                  variant={plan.highlighted ? "default" : "outline"} 
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
}


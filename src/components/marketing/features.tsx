import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sparkles, MessageSquare, LineChart, Image as ImageIcon, Users } from "lucide-react";

const features = [
  {
    title: "Smart Scheduling",
    description: "Plan and schedule your content weeks in advance with our intuitive calendar interface.",
    icon: Calendar,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "AI Caption Generator",
    description: "Generate engaging, platform-specific captions in seconds using Gemini AI.",
    icon: Sparkles,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "AI Auto-Reply",
    description: "Engage with your audience automatically. AI handles common questions and comments.",
    icon: MessageSquare,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Advanced Analytics",
    description: "Track performance across all platforms in one unified dashboard.",
    icon: LineChart,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Media Management",
    description: "Manage your assets with ease. Powered by ImageKit for lightning-fast delivery.",
    icon: ImageIcon,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    title: "Team Collaboration",
    description: "Work together seamlessly. Assign roles and manage approvals in one place.",
    icon: Users,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 py-1 px-4 text-xs font-bold uppercase tracking-widest border-primary/20 bg-primary/5 text-primary rounded-full">
            Features
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Everything you need to <span className="text-gradient-primary">scale</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful tools designed to help you create better content, engage faster, and grow your audience across all major platforms.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card key={i} className="group border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
              <CardHeader>
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-black/5`}>
                   <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -z-10" />
    </section>
  );
}


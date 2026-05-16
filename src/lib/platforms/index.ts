import { 
  NewTwitterIcon, 
  Linkedin01Icon, 
  InstagramIcon, 
  Facebook01Icon, 
  ThreadsIcon, 
  TiktokIcon, 
  YoutubeIcon,
  PinterestIcon,
  GoogleIcon,
  DiscordIcon,
  SlackIcon
} from "@hugeicons/core-free-icons";

export interface PlatformConfig {
  id: string;
  name: string;
  icon: any; // Hugeicons icon component
  color: string;
  authUrl?: string;
}

export const platformConfigs: Record<string, PlatformConfig> = {
  x: {
    id: "x",
    name: "X (Twitter)",
    icon: NewTwitterIcon,
    color: "text-blue-400",
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin01Icon,
    color: "text-blue-600",
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    icon: InstagramIcon,
    color: "text-pink-500",
  },
  facebook: {
    id: "facebook",
    name: "Facebook",
    icon: Facebook01Icon,
    color: "text-blue-700",
  },
  threads: {
    id: "threads",
    name: "Threads",
    icon: ThreadsIcon,
    color: "text-white",
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    icon: TiktokIcon,
    color: "text-cyan-400",
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    icon: YoutubeIcon,
    color: "text-red-500",
  },
  pinterest: {
    id: "pinterest",
    name: "Pinterest",
    icon: PinterestIcon,
    color: "text-red-600",
  },
  google_business: {
    id: "google_business",
    name: "Google Business",
    icon: GoogleIcon,
    color: "text-blue-500",
  },
  discord: {
    id: "discord",
    name: "Discord",
    icon: DiscordIcon,
    color: "text-indigo-500",
  },
  slack: {
    id: "slack",
    name: "Slack",
    icon: SlackIcon,
    color: "text-purple-500",
  },
};

export function getPlatformConfig(id: string): PlatformConfig | undefined {
  return platformConfigs[id];
}

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { commentReplies, posts, socialAccounts, users } from "@/lib/db/schema";
import { eq, count, desc, and, exists } from "drizzle-orm";
import { getPlatformConfig } from "@/lib/platforms";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  PlusCircle,
  Calendar,
  Users as UsersIcon,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
  if (!user) return null;

  // Fetch Stats
  const [postCount] = await db.select({ value: count() }).from(posts).where(eq(posts.userId, user.id));
  const [scheduledCount] = await db.select({ value: count() }).from(posts).where(and(eq(posts.userId, user.id), eq(posts.status, 'scheduled')));
  const [autoReplyCount] = await db.select({ value: count() }).from(commentReplies).where(
    exists(
      db.select()
        .from(posts)
        .where(and(eq(posts.id, commentReplies.postId), eq(posts.userId, user.id)))
    )
  );

  const connectedAccounts = await db
    .select()
    .from(socialAccounts)
    .where(eq(socialAccounts.userId, user.id));

  const recentPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.userId, user.id))
    .orderBy(desc(posts.createdAt))
    .limit(6);

  const stats = [
    { title: "Total Posts", value: postCount.value, icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Scheduled", value: scheduledCount.value, icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Total Reach", value: "12.4K", icon: UsersIcon, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Auto-Replies", value: autoReplyCount.value, icon: CheckCircle2, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome back, {user.name?.split(' ')[0] || 'User'}!</h1>
          <p className="text-muted-foreground text-lg">Here's what's happening with your social presence today.</p>
        </div>
        <Link href="/compose">
          <Button className="h-12 rounded-2xl px-6 gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
            <PlusCircle className="h-5 w-5" />
            <span>Create New Post</span>
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm rounded-[32px] overflow-hidden group hover:border-primary/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm rounded-[40px] p-2">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Your latest content and their current status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-muted/50 transition-all border border-transparent hover:border-border/50 group">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{post.content || "No content"}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${post.status === 'published' ? 'bg-green-500/10 text-green-500' :
                            post.status === 'scheduled' ? 'bg-purple-500/10 text-purple-500' : 'bg-muted text-muted-foreground'
                          }`}>
                          {post.status}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.scheduledAt ? new Date(post.scheduledAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlusCircle className="h-4 w-4 rotate-45" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No posts found. Start by creating one!</p>
                  <Link href="/compose">
                    <Button variant="outline" className="rounded-xl">Create Post</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Tips */}
        <div className="space-y-8">
          <Card className="border-border/50 bg-primary/5 rounded-[40px] p-2 border-primary/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="h-24 w-24" />
            </div>
            <CardHeader>
              <CardTitle className="text-primary">Pro Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Posts with at least one image get <b>2.3x more engagement</b> on average. Use our AI assistant to generate the perfect caption for your media!
              </p>
              <Button className="w-full mt-6 rounded-2xl bg-primary hover:bg-primary/90">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm rounded-[40px] p-2">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 flex-wrap">
                {connectedAccounts.map(account => {
                  const config = getPlatformConfig(account.platform);
                  if (!config) return null;
                  return (
                    <div key={account.id} className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center border border-border/50 ${config.color}`} title={config.name}>
                      <HugeiconsIcon icon={config.icon} size={20} />
                    </div>
                  );
                })}
                <Link href="/accounts">
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-dashed">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

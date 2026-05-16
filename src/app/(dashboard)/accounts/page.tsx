import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { socialAccounts, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { platformConfigs } from "@/lib/platforms";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Settings2
} from "lucide-react";
import Link from "next/link";
import { disconnectAccount } from "@/app/actions/accounts";

export default async function AccountsPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
  if (!user) return null;

  const connectedAccounts = await db
    .select()
    .from(socialAccounts)
    .where(eq(socialAccounts.userId, user.id));

  const accountsByPlatform = connectedAccounts.reduce((acc, account) => {
    acc[account.platform] = account;
    return acc;
  }, {} as Record<string, typeof connectedAccounts[0]>);

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Social Accounts</h1>
          <p className="text-muted-foreground text-lg">Connect and manage your social media presence.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(platformConfigs).map((platform) => {
          const isConnected = accountsByPlatform[platform.id];
          
          return (
            <Card key={platform.id} className={`border-border/50 bg-card/50 backdrop-blur-sm rounded-[32px] overflow-hidden group transition-all hover:border-primary/30 ${isConnected ? 'ring-2 ring-primary/10' : ''}`}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`p-4 rounded-2xl ${platform.color.replace('text', 'bg')}/10 ${platform.color}`}>
                  <HugeiconsIcon icon={platform.icon} size={32} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">{platform.name}</CardTitle>
                  <CardDescription>
                    {isConnected ? `Connected as @${isConnected.platformUsername}` : "Not connected"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isConnected 
                    ? `Your ${platform.name} account is ready for scheduling and automated replies.`
                    : `Connect your ${platform.name} account to start scheduling posts and managing interactions.`
                  }
                </p>
              </CardContent>
              <CardFooter className="pt-4 flex gap-3">
                {isConnected ? (
                  <>
                    <form action={disconnectAccount}>
                      <input type="hidden" name="accountId" value={isConnected.id} />
                      <Button variant="outline" className="rounded-xl border-red-500/20 hover:bg-red-500/10 hover:text-red-500 gap-2">
                        <XCircle className="h-4 w-4" />
                        Disconnect
                      </Button>
                    </form>
                    <Button variant="ghost" size="icon" className="rounded-xl">
                      <Settings2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Link href={`/api/oauth/${platform.id}`} className="w-full">
                    <Button className="w-full rounded-xl gap-2 shadow-lg shadow-primary/10">
                      <PlusCircle className="h-4 w-4" />
                      Connect Account
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {connectedAccounts.length === 0 && (
        <Card className="border-dashed border-2 border-border/50 bg-muted/20 rounded-[40px] p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">No Accounts Connected</h2>
            <p className="text-muted-foreground">
              You haven't connected any social media accounts yet. Connect at least one account to start using PostPilot's powerful features.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

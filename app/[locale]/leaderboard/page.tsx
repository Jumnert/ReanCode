import { Metadata } from "next";
import { prisma } from "@/config/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LeaderboardService } from "@/services/leaderboard.service";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "តារាងចំណាត់ថ្នាក់ - រៀន២កូដ",
  description: "តារាងចំណាត់ថ្នាក់សិស្សដែលបានរៀនច្រើនជាងគេ",
};

export const revalidate = 60; // Revalidate every minute

export default async function LeaderboardPage() {
  const t = await getTranslations('Leaderboard');
  const leaderboard = await LeaderboardService.getAllTime();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-3xl mx-auto border-x-2 border-primary/20 min-h-screen pb-20">
        <div className="pt-16 pb-10 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-primary/5 rounded-full mb-4">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground font-kantumruy">
            {t('title')}
          </h1>
          <p className="mt-4 text-[17px] text-muted-foreground max-w-lg mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="h-8 border-y border-border/60" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #cc785c1a 4px, #cc785c1a 5px)' }} />

        <div className="bg-background">
          {leaderboard.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">
              {t('noData')}
            </div>
          ) : (
            <div className="flex flex-col">
              {leaderboard.map((user: any, index: number) => (
                <Link
                  href={user.username ? `/${user.username}` : "#"}
                  key={user.id} 
                  className={cn(
                    "flex items-center gap-4 px-6 py-5 border-b border-primary/20 transition-colors hover:bg-muted/30",
                    index < 3 ? "bg-primary/5" : "",
                    index === leaderboard.length - 1 ? "border-b-0" : "",
                    !user.username && "pointer-events-none"
                  )}
                >
                  <div className={cn(
                    "font-bold text-xl md:text-2xl w-8 text-center shrink-0",
                    index === 0 ? "text-yellow-500" :
                    index === 1 ? "text-slate-400" :
                    index === 2 ? "text-amber-700" : "text-muted-foreground"
                  )}>
                    {index + 1}
                  </div>
                  
                  <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-primary/20 rounded-none">
                    <AvatarImage className="rounded-none" src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0 ml-2">
                    <div className="font-semibold text-lg text-foreground truncate">
                      {user.name}
                    </div>
                    {user.username && (
                      <div className="text-[15px] text-muted-foreground truncate">
                        @{user.username}
                      </div>
                    )}
                  </div>
                  
                  <div className="font-mono text-lg font-medium text-primary flex items-center gap-2 shrink-0 bg-primary/5 px-4 py-1.5 border border-primary/20">
                    <Star className="h-4 w-4" />
                    {user.points}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

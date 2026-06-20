import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Code2, Globe, Cpu, Database, Blocks, LayoutTemplate } from "lucide-react";

export const metadata: Metadata = {
  title: "ផែនទីសិក្សា - រៀន២កូដ",
  description: "ផែនទីសិក្សាបង្ហាញពីការវិវឌ្ឍន៍នៃការរៀនសរសេរកូដសម្រាប់ភាសានីមួយៗ",
};

export default async function RoadmapsPage() {
  const t = await getTranslations('Roadmaps');

  const LANGUAGES = [
    { id: "html", name: "HTML & CSS", icon: <LayoutTemplate className="size-6 text-primary" />, desc: t('htmlDesc') },
    { id: "javascript", name: "JavaScript", icon: <Globe className="size-6 text-primary" />, desc: t('jsDesc') },
    { id: "react", name: "React", icon: <Blocks className="size-6 text-primary" />, desc: t('reactDesc') },
    { id: "nextjs", name: "Next.js", icon: <Code2 className="size-6 text-primary" />, desc: t('nextjsDesc') },
    { id: "python", name: "Python", icon: <Cpu className="size-6 text-primary" />, desc: t('pythonDesc') },
    { id: "sql", name: "SQL", icon: <Database className="size-6 text-primary" />, desc: t('sqlDesc') },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-7xl mx-auto border-x-2 border-primary/20 min-h-screen pb-20">
        
        <div className="pt-20 pb-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground font-kantumruy mb-6">
            {t('title')}
          </h1>
          <p className="text-[17px] text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Pattern Separator */}
        <div 
          className="h-8 border-y border-border/60 mb-16" 
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #cc785c1a 4px, #cc785c1a 5px)' }} 
        />

        {/* Languages Directory Grid */}
        <div className="px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LANGUAGES.map((lang) => (
              <Link key={lang.id} href={`/roadmaps/${lang.id}`}>
                <div className="group flex flex-col p-6 border-2 border-primary/20 bg-surface-pearl hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer h-full">
                  <div className="mb-4 p-3 bg-white border border-primary/20 inline-flex rounded-sm w-fit group-hover:scale-110 transition-transform">
                    {lang.icon}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">{lang.name}</h3>
                  <p className="text-muted-foreground text-sm font-kantumruy">{lang.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

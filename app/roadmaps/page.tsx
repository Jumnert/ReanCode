import { Metadata } from "next";
import Link from "next/link";
import { Code2, Globe, Cpu, Database, Blocks, LayoutTemplate } from "lucide-react";

export const metadata: Metadata = {
  title: "ផែនទីសិក្សា - រៀន២កូដ",
  description: "ផែនទីសិក្សាបង្ហាញពីការវិវឌ្ឍន៍នៃការរៀនសរសេរកូដសម្រាប់ភាសានីមួយៗ",
};

const LANGUAGES = [
  { id: "html", name: "HTML & CSS", icon: <LayoutTemplate className="size-6 text-primary" />, desc: "រចនាសម្ព័ន្ធ និងការតុបតែងវេបសាយ" },
  { id: "javascript", name: "JavaScript", icon: <Globe className="size-6 text-primary" />, desc: "ភាសាសម្រាប់បង្កើតអន្តរកម្មវេបសាយ" },
  { id: "react", name: "React", icon: <Blocks className="size-6 text-primary" />, desc: "បណ្ណាល័យសម្រាប់បង្កើត UI" },
  { id: "nextjs", name: "Next.js", icon: <Code2 className="size-6 text-primary" />, desc: "Framework សម្រាប់ React" },
  { id: "python", name: "Python", icon: <Cpu className="size-6 text-primary" />, desc: "ភាសាសម្រាប់ទិន្នន័យ និង AI" },
  { id: "sql", name: "SQL", icon: <Database className="size-6 text-primary" />, desc: "ភាសាសម្រាប់គ្រប់គ្រងទិន្នន័យ" },
];

export default function RoadmapsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-7xl mx-auto border-x-2 border-primary/20 min-h-screen pb-20">
        
        {/* Header Section */}
        <div className="pt-20 pb-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground font-kantumruy mb-6">
            ជ្រើសរើសភាសាសរសេរកូដ
          </h1>
          <p className="text-[17px] text-muted-foreground max-w-2xl mx-auto">
            ស្វែងយល់ពីផែនទីសិក្សាលម្អិតសម្រាប់ភាសាសរសេរកូដនីមួយៗ។ ជ្រើសរើសភាសាខាងក្រោមដើម្បីចាប់ផ្តើម។
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

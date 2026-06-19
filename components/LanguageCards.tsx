"use client";

import Link from "next/link";

const languages = [
  {
    name: "HTML & CSS",
    nameKh: "ភាសា HTML & CSS",
    description: "រចនាសម្ព័ន្ធ និងសោភ័ណភាពគេហទំព័រ",
    path: "/learn/html",
    color: "text-orange-500",
    bgClass: "hover:bg-orange-500/5 dark:hover:bg-orange-500/2",
    iconPath: "/images/html.svg",
  },
  {
    name: "JavaScript",
    nameKh: "ភាសា JavaScript",
    description: " logic និងអន្តរកម្មលើគេហទំព័រ",
    path: "/learn/javascript",
    color: "text-amber-500",
    bgClass: "hover:bg-amber-500/5 dark:hover:bg-amber-500/2",
    iconPath: "/images/javascript.svg",
  },
  {
    name: "Python",
    nameKh: "ភាសា Python",
    description: "ភាសាកម្មវិធីសម្រាប់ AI & ទិន្នន័យ",
    path: "/learn/python",
    color: "text-blue-500",
    bgClass: "hover:bg-blue-500/5 dark:hover:bg-blue-500/2",
    iconPath: "/images/python.svg",
  },
  {
    name: "React",
    nameKh: "បណ្ណាល័យ React",
    description: "កសាង UI ទំនើប និងលឿនរហ័ស",
    path: "/learn/react",
    color: "text-sky-400",
    bgClass: "hover:bg-sky-500/5 dark:hover:bg-sky-500/2",
    iconPath: "/images/react.svg",
  },
  {
    name: "TypeScript",
    nameKh: "ភាសា TypeScript",
    description: "JavaScript ជាមួយនឹង Type សុវត្ថិភាព",
    path: "/learn/typescript",
    color: "text-blue-600",
    bgClass: "hover:bg-blue-600/5 dark:hover:bg-blue-600/2",
    iconPath: "/images/typescript.svg",
  },
  {
    name: "Vue.js",
    nameKh: "ភាសា Vue.js",
    description: "ស្ថាបត្យកម្មគេហទំព័រទំនើប",
    path: "/learn/vue",
    color: "text-emerald-500",
    bgClass: "hover:bg-emerald-500/5 dark:hover:bg-emerald-500/2",
    iconPath: "/images/vue.svg",
  },
  {
    name: "Java",
    nameKh: "ភាសា Java",
    description: "ភាសាកម្មវិធីលំដាប់ថ្នាក់សហគ្រាស",
    path: "/learn/java",
    color: "text-red-500",
    bgClass: "hover:bg-red-500/5 dark:hover:bg-red-500/2",
    iconPath: "/images/java.svg",
  },
  {
    name: "C++",
    nameKh: "ភាសា C++",
    description: "ភាសាកម្មវិធីប្រព័ន្ធ និងហ្គេមល្បឿនលឿន",
    path: "/learn/cpp",
    color: "text-blue-700",
    bgClass: "hover:bg-blue-700/5 dark:hover:bg-blue-700/2",
    iconPath: "/images/cpp.svg",
  },
  {
    name: "C Language",
    nameKh: "ភាសា C",
    description: "ភាសាកម្មវិធីគ្រឹះនៃកុំព្យូទ័រ",
    path: "/learn/c",
    color: "text-blue-800",
    bgClass: "hover:bg-blue-800/5 dark:hover:bg-blue-800/2",
    iconPath: "/images/c.svg",
  },
  {
    name: "C# (C-Sharp)",
    nameKh: "ភាសា C#",
    description: "បង្កើតកម្មវិធី Windows និងហ្គេម Unity",
    path: "/learn/csharp",
    color: "text-green-600",
    bgClass: "hover:bg-green-600/5 dark:hover:bg-green-600/2",
    iconPath: "/images/csharp.svg",
  },
  {
    name: "PHP",
    nameKh: "ភាសា PHP",
    description: "ភាសាកម្មវិធីសម្រាប់បង្កើត Backend Web",
    path: "/learn/php",
    color: "text-indigo-400",
    bgClass: "hover:bg-indigo-500/5 dark:hover:bg-indigo-500/2",
    iconPath: "/images/php.svg",
  },
  {
    name: "Ruby",
    nameKh: "ភាសា Ruby",
    description: "ភាសាកម្មវិធីងាយស្រួលយល់ និងរហ័ស",
    path: "/learn/ruby",
    color: "text-red-600",
    bgClass: "hover:bg-red-600/5 dark:hover:bg-red-600/2",
    iconPath: "/images/ruby.svg",
  },
  {
    name: "Go (Golang)",
    nameKh: "ភាសា Go",
    description: "ភាសាកម្មវិធីទំនើបសម្រាប់ Cloud & Microservices",
    path: "/learn/go",
    color: "text-cyan-500",
    bgClass: "hover:bg-cyan-500/5 dark:hover:bg-cyan-500/2",
    iconPath: "/images/go.svg",
  },
  {
    name: "Rust",
    nameKh: "ភាសា Rust",
    description: "ភាសាកម្មវិធីប្រព័ន្ធដែលមានសុវត្ថិភាពខ្ពស់",
    path: "/learn/rust",
    color: "text-amber-700",
    bgClass: "hover:bg-amber-700/5 dark:hover:bg-amber-700/2",
    iconPath: "/images/rust.svg",
  },
  {
    name: "SQL",
    nameKh: "ភាសា SQL",
    description: "ភាសាគ្រប់គ្រង និងទាញយកទិន្នន័យ",
    path: "/learn/sql",
    color: "text-zinc-800",
    bgClass: "hover:bg-zinc-800/5 dark:hover:bg-zinc-800/2",
    iconPath: "/images/sql.svg",
  },
  {
    name: "VS Code",
    nameKh: "កម្មវិធី VS Code",
    description: "កម្មវិធីសរសេរកូដពេញនិយមបំផុត",
    path: "/learn/vscode",
    color: "text-blue-500",
    bgClass: "hover:bg-blue-500/5 dark:hover:bg-blue-500/2",
    iconPath: "/images/vscode.svg",
  },
  {
    name: "MongoDB",
    nameKh: "ទិន្នន័យ MongoDB",
    description: "ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យប្រភេទ NoSQL Document",
    path: "/learn/mongodb",
    color: "text-green-500",
    bgClass: "hover:bg-green-500/5 dark:hover:bg-green-500/2",
    iconPath: "/images/mongodb.svg",
  },
  {
    name: "Docker",
    nameKh: "កម្មវិធី Docker",
    description: "ដំណើរការកម្មវិធីក្នុង Container ឯករាជ្យ",
    path: "/learn/docker",
    color: "text-blue-600",
    bgClass: "hover:bg-blue-600/5 dark:hover:bg-blue-600/2",
    iconPath: "/images/docker.svg",
  },
  {
    name: "Git & GitHub",
    nameKh: "ប្រព័ន្ធ Git",
    description: "គ្រប់គ្រងកំណែកូដ និងសហការការងារ",
    path: "/learn/git",
    color: "text-orange-600",
    bgClass: "hover:bg-orange-600/5 dark:hover:bg-orange-600/2",
    iconPath: "/images/git.svg",
  },
  {
    name: "Swift",
    nameKh: "ភាសា Swift",
    description: "អភិវឌ្ឍកម្មវិធី iOS និង macOS",
    path: "/learn/swift",
    color: "text-orange-500",
    bgClass: "hover:bg-orange-500/5 dark:hover:bg-orange-500/2",
    iconPath: "/images/swift.svg",
  },
  {
    name: "Next.js",
    nameKh: "ស្ថាបត្យកម្ម Next.js",
    description: "React Framework សម្រាប់ផលិតកម្មវិធីពេញលេញ",
    path: "/learn/nextjs",
    color: "text-black",
    bgClass: "hover:bg-zinc-100 dark:hover:bg-zinc-900/50",
    iconPath: "/images/nextjs.svg",
  },
  {
    name: "Tailwind CSS",
    nameKh: "បណ្ណាល័យ Tailwind",
    description: "រចនាគេហទំព័រយ៉ាងរហ័សជាមួយ Utility-First CSS",
    path: "/learn/tailwindcss",
    color: "text-cyan-400",
    bgClass: "hover:bg-cyan-500/5 dark:hover:bg-cyan-500/2",
    iconPath: "/images/tailwind.svg",
  },
  {
    name: "Bash & Linux",
    nameKh: "ភាសា Bash",
    description: "បញ្ជាម៉ាស៊ីនបម្រើ និងសរសេរ Command Line",
    path: "/learn/bash",
    color: "text-slate-800",
    bgClass: "hover:bg-slate-800/5 dark:hover:bg-slate-800/2",
    iconPath: "/images/bash.svg",
  },
  {
    name: "PostgreSQL",
    nameKh: "ទិន្នន័យ PostgreSQL",
    description: "ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យ SQL កម្រិតខ្ពស់",
    path: "/learn/postgresql",
    color: "text-blue-400",
    bgClass: "hover:bg-blue-400/5 dark:hover:bg-blue-400/2",
    iconPath: "/images/postgresql.svg",
  },
  {
    name: "NPM & Node",
    nameKh: "កម្មវិធី NPM",
    description: "គ្រប់គ្រងកញ្ចប់កម្មវិធី និងដំណើរការ JavaScript runtime",
    path: "/learn/npm",
    color: "text-red-500",
    bgClass: "hover:bg-red-500/5 dark:hover:bg-red-500/2",
    iconPath: "/images/npm.svg",
  },
  {
    name: "Markdown",
    nameKh: "ភាសា Markdown",
    description: "ភាសាសរសេរឯកសារ និងកំណត់ត្រាងាយស្រួល",
    path: "/learn/markdown",
    color: "text-slate-900",
    bgClass: "hover:bg-slate-900/5 dark:hover:bg-slate-900/2",
    iconPath: "/images/markdown.svg",
  },
];

export default function LanguageCards() {
  return (
    <div className="w-full bg-white dark:bg-[#272729] py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left flex flex-col gap-2">
          <span className="text-[12px] font-semibold tracking-wider uppercase text-[#7a7a7a] dark:text-zinc-400">
            មាតិកាសិក្សា
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.28px] text-[#1d1d1f] dark:text-white">
            ភាសាកម្មវិធីដែលមានផ្ដល់ជូន
          </h2>
          <p className="text-[15px] text-[#7a7a7a] dark:text-zinc-400 max-w-lg">
            ជ្រើសរើសភាសាកម្មវិធីដែលអ្នកចង់រៀន ដើម្បីបណ្តុះជំនាញបច្ចេកវិទ្យារបស់អ្នក។
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-[#e0e0e0] dark:border-zinc-800">
          {languages.map((lang) => (
            <Link href={lang.path} key={lang.name} className="block group border-r border-b border-[#e0e0e0] dark:border-zinc-800">
              <div className={`h-full p-6 bg-white dark:bg-[#1d1d1f] transition-all duration-300 flex items-center gap-5 cursor-pointer shadow-none ${lang.bgClass}`}>
                
                {/* Icon box */}
                <div className="size-16 flex items-center justify-center flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  <img src={lang.iconPath} alt={lang.name} className="w-12 h-12" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <h3 className="font-bold text-[17px] text-[#1d1d1f] dark:text-white group-hover:text-[#0066cc] dark:group-hover:text-[#2997ff] transition-colors leading-tight">
                    {lang.name}
                  </h3>
                  <span className="text-[13px] text-[#7a7a7a] dark:text-zinc-400 font-medium mt-0.5">
                    {lang.nameKh}
                  </span>
                  <p className="text-[13px] text-[#7a7a7a] dark:text-zinc-450 mt-1 leading-snug">
                    {lang.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

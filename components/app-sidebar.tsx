"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronDown, Code2, BookOpen, Layers, Type, Paintbrush, Link2, LayoutGrid, Terminal } from "lucide-react"

import {
 Sidebar,
 SidebarContent,
 SidebarGroup,
 SidebarGroupContent,
 SidebarGroupLabel,
 SidebarHeader,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem,
 SidebarMenuSub,
 SidebarMenuSubButton,
 SidebarMenuSubItem,
 SidebarRail,
} from "@/components/ui/sidebar"

const htmlChapters = [
 {
 title: "សេចក្តីផ្តើម និងមូលដ្ឋានគ្រឹះ",
 icon: BookOpen,
 items: [
 {
 title: "១. ការចាប់ផ្តើមដំបូង",
 icon: Layers,
 subItems: [
 { title: "HTML Introduction", id: "intro", label: "សេចក្តីផ្តើមអំពី HTML" },
 { title: "HTML Editors", id: "editors", label: "កម្មវិធីសរសេរកូដ" },
 ]
 },
 {
 title: "២. រចនាសម្ព័ន្ធទូទៅ",
 icon: LayoutGrid,
 subItems: [
 { title: "HTML Basic", id: "basic", label: "មូលដ្ឋានគ្រឹះ HTML" },
 { title: "HTML Elements", id: "elements", label: "ធាតុរបស់ HTML" },
 ]
 }
 ]
 },
 {
 title: "ការបង្ហាញខ្លឹមសារទំព័រ",
 icon: Type,
 items: [
 {
 title: "១. អត្ថបទ និងចំណងជើង",
 icon: Type,
 subItems: [
 { title: "HTML Headings", id: "headings", label: "ចំណងជើង HTML" },
 { title: "HTML Paragraphs", id: "paragraphs", label: "កថាខណ្ឌ HTML" },
 ]
 },
 {
 title: "២. ការរចនាបថ និងកំណត់សម្គាល់",
 icon: Paintbrush,
 subItems: [
 { title: "HTML Styles", id: "styles", label: "ស្តាយ និងរចនាបថ" },
 { title: "HTML Formatting", id: "formatting", label: "ទម្រង់អត្ថបទ" },
 { title: "HTML Comments", id: "comments", label: "កំណត់ចំណាំ (Comments)" },
 ]
 }
 ]
 },
 {
 title: "តំណភ្ជាប់ និងមាតិកាផ្សព្វផ្សាយ",
 icon: Link2,
 items: [
 {
 title: "១. រូបភាព និងតំណភ្ជាប់",
 icon: Link2,
 subItems: [
 { title: "HTML Links", id: "links", label: "តំណភ្ជាប់ HTML" },
 { title: "HTML Images", id: "images", label: "រូបភាព HTML" },
 ]
 },
 {
 title: "២. រចនាសម្ព័ន្ធមាតិកាជឿនលឿន",
 icon: LayoutGrid,
 subItems: [
 { title: "HTML Tables", id: "tables", label: "តារាង HTML" },
 { title: "HTML Lists", id: "lists", label: "បញ្ជីរាយនាម" },
 ]
 }
 ]
 },
 {
 title: "Live Compiler",
 icon: Terminal,
 items: [
 {
 title: "សាកល្បងសរសេរកូដ",
 icon: Code2,
 subItems: [
 { title: "Live Compiler", id: "compiler", label: "ចូលប្រើ Compiler" },
 ]
 }
 ]
 }
]

const javascriptChapters = [
  {
    title: "គ្រឹះនៃភាសា JavaScript",
    icon: BookOpen,
    items: [
      {
        title: "១. មូលដ្ឋានគ្រឹះដំបូង",
        icon: Layers,
        subItems: [
          { title: "JS Introduction", id: "home", label: "សេចក្តីផ្តើមអំពី JS" },
          { title: "JS Where To", id: "whereto", label: "ការដាក់បញ្ចូលកូដ JS" },
          { title: "JS Output & Debug", id: "output", label: "ការបង្ហាញលទ្ធផល & Debug" },
          { title: "JS Syntax & Comments", id: "syntax", label: "វាក្យសម្ព័ន្ធ & Comments" },
        ]
      },
      {
        title: "២. អថេរ និងប្រមាណវិធី",
        icon: LayoutGrid,
        subItems: [
          { title: "JS Variables", id: "variables", label: "អថេរក្នុង JS" },
          { title: "JS Data Types", id: "datatypes", label: "ប្រភេទអថេរ និងទិន្នន័យ" },
          { title: "JS Operators", id: "operators", label: "ប្រមាណវិធីគណនា" },
        ]
      }
    ]
  },
  {
    title: "លំហូរកូដ និងមុខងារ",
    icon: Type,
    items: [
      {
        title: "១. លក្ខខណ្ឌ និងល្បិះជុំ",
        icon: Type,
        subItems: [
          { title: "JS Conditions", id: "conditions", label: "លក្ខខណ្ឌ If...Else" },
          { title: "JS Loops", id: "loops", label: "ការប្រើប្រាស់ Loops" },
        ]
      },
      {
        title: "២. អនុគមន៍ និង Scope",
        icon: Paintbrush,
        subItems: [
          { title: "JS Functions", id: "functions", label: "អនុគមន៍ (Functions)" },
          { title: "JS Scope", id: "scope", label: "ដែនកំណត់អថេរ (Scope)" },
        ]
      }
    ]
  },
  {
    title: "រចនាសម្ព័ន្ធទិន្នន័យ",
    icon: Layers,
    items: [
      {
        title: "១. ប្រភេទទិន្នន័យផ្សំ",
        icon: LayoutGrid,
        subItems: [
          { title: "JS Strings", id: "strings", label: "ខ្សែអក្សរ (Strings)" },
          { title: "JS Numbers & Math", id: "numbers", label: "លេខ និងគណិតវិទ្យា" },
          { title: "JS Objects", id: "objects", label: "វត្ថុ (Objects)" },
          { title: "JS Arrays", id: "arrays", label: "អារ៉េ (Arrays)" },
          { title: "JS Dates", id: "dates", label: "កាលបរិច្ឆេទ (Dates)" },
        ]
      }
    ]
  },
  {
    title: "JS ជឿនលឿន & វេបសាយ",
    icon: Link2,
    items: [
      {
        title: "១. HTML DOM & ព្រឹត្តិការណ៍",
        icon: Link2,
        subItems: [
          { title: "JS HTML DOM", id: "htmldom", label: "ការគ្រប់គ្រង HTML DOM" },
          { title: "JS HTML Events", id: "events", label: "ព្រឹត្តិការណ៍ (Events)" },
        ]
      },
      {
        title: "២. Advanced JS & OOP",
        icon: LayoutGrid,
        subItems: [
          { title: "JS Classes & OOP", id: "classes", label: "Classes និង OOP" },
          { title: "JS Asynchronous", id: "async", label: "JS អសមកាល (Async)" },
          { title: "JS JSON", id: "json", label: "ទិន្នន័យ JSON" },
        ]
      }
    ]
  },
  {
    title: "Live Compiler",
    icon: Terminal,
    items: [
      {
        title: "សាកល្បងសរសេរកូដ",
        icon: Code2,
        subItems: [
          { title: "Live Compiler", id: "compiler", label: "ចូលប្រើ Compiler" },
        ]
      }
    ]
  }
]

const pythonChapters = [
  {
    title: "Python Tutorial",
    icon: BookOpen,
    items: [
      {
        title: "Basics",
        icon: Layers,
        subItems: [
          { title: "Python Home", id: "home", label: "Python Home" },
          { title: "Python Intro", id: "intro", label: "Python Intro" },
          { title: "Python Syntax", id: "syntax", label: "Python Syntax" },
          { title: "Python Comments", id: "comments", label: "Python Comments" },
          { title: "Python Variables", id: "variables", label: "Python Variables" },
          { title: "Python Data Types", id: "datatypes", label: "Python Data Types" },
          { title: "Python Numbers", id: "numbers", label: "Python Numbers" },
          { title: "Python Casting", id: "casting", label: "Python Casting" },
          { title: "Python Strings", id: "strings", label: "Python Strings" },
          { title: "Python Booleans", id: "booleans", label: "Python Booleans" },
          { title: "Python Operators", id: "operators", label: "Python Operators" },
        ]
      },
      {
        title: "Data Structures",
        icon: LayoutGrid,
        subItems: [
          { title: "Python Lists", id: "lists", label: "Python Lists" },
          { title: "Python Tuples", id: "tuples", label: "Python Tuples" },
          { title: "Python Sets", id: "sets", label: "Python Sets" },
          { title: "Python Dictionaries", id: "dictionaries", label: "Python Dictionaries" },
        ]
      },
      {
        title: "Control Flow & Functions",
        icon: Type,
        subItems: [
          { title: "Python If...Else", id: "conditions", label: "Python If...Else" },
          { title: "Python While Loops", id: "while_loops", label: "Python While Loops" },
          { title: "Python For Loops", id: "for_loops", label: "Python For Loops" },
          { title: "Python Functions", id: "functions", label: "Python Functions" },
          { title: "Python Lambda", id: "lambda", label: "Python Lambda" },
        ]
      },
      {
        title: "Advanced",
        icon: Code2,
        subItems: [
          { title: "Python Arrays", id: "arrays", label: "Python Arrays" },
          { title: "Python Classes/Objects", id: "classes", label: "Python Classes/Objects" },
          { title: "Python Inheritance", id: "inheritance", label: "Python Inheritance" },
          { title: "Python Iterators", id: "iterators", label: "Python Iterators" },
          { title: "Python Polymorphism", id: "polymorphism", label: "Python Polymorphism" },
          { title: "Python Scope", id: "scope", label: "Python Scope" },
          { title: "Python Modules", id: "modules", label: "Python Modules" },
          { title: "Python Dates", id: "dates", label: "Python Dates" },
          { title: "Python Math", id: "math", label: "Python Math" },
          { title: "Python JSON", id: "json", label: "Python JSON" },
          { title: "Python RegEx", id: "regexp", label: "Python RegEx" },
          { title: "Python PIP", id: "pip", label: "Python PIP" },
          { title: "Python Try...Except", id: "try_except", label: "Python Try...Except" },
          { title: "Python User Input", id: "user_input", label: "Python User Input" },
          { title: "Python String Formatting", id: "string_formatting", label: "Python String Formatting" },
        ]
      },
      {
        title: "File Handling",
        icon: Terminal,
        subItems: [
          { title: "Python File Handling", id: "file_handling", label: "Python File Handling" },
          { title: "Python Read Files", id: "read_files", label: "Python Read Files" },
          { title: "Python Write/Create Files", id: "write_create_files", label: "Python Write/Create Files" },
          { title: "Python Delete Files", id: "delete_files", label: "Python Delete Files" },
        ]
      }
    ]
  }
]
const sqlChapters = [
  {
    title: "គ្រឹះដំបូងនៃ SQL (SQL Basics)",
    icon: BookOpen,
    items: [
      {
        title: "១. សេចក្តីផ្តើម និងវាក្យសម្ព័ន្ធ",
        icon: Layers,
        subItems: [
          { title: "SQL Intro", id: "sql-intro", label: "សេចក្តីផ្តើមអំពី SQL" },
          { title: "SQL Syntax", id: "sql-syntax", label: "វាក្យសម្ព័ន្ធ SQL" },
          { title: "SQL Select", id: "sql-select", label: "SQL Select" },
          { title: "SQL Select Distinct", id: "sql-select-distinct", label: "SQL Select Distinct" },
        ]
      },
      {
        title: "២. ការច្រោះទិន្នន័យ (Filtering)",
        icon: LayoutGrid,
        subItems: [
          { title: "SQL Where", id: "sql-where", label: "លក្ខខណ្ឌ Where" },
          { title: "SQL Order By", id: "sql-order-by", label: "តម្រៀប Order By" },
          { title: "SQL And", id: "sql-and", label: "ប្រមាណវិធី And" },
          { title: "SQL Or", id: "sql-or", label: "ប្រមាណវិធី Or" },
          { title: "SQL Not", id: "sql-not", label: "ប្រមាណវិធី Not" },
          { title: "SQL Insert Into", id: "sql-insert-into", label: "បញ្ចូលទិន្នន័យ Insert" },
          { title: "SQL Null Values", id: "sql-null-values", label: "តម្លៃទទេ Null" },
          { title: "SQL Update", id: "sql-update", label: "កែប្រែទិន្នន័យ Update" },
          { title: "SQL Delete", id: "sql-delete", label: "លុបទិន្នន័យ Delete" },
          { title: "SQL Select Top", id: "sql-select-top", label: "កំណត់ទិន្នន័យ Select Top" },
        ]
      }
    ]
  },
  {
    title: "អនុគមន៍ និងការទាញទិន្នន័យ (Functions)",
    icon: Type,
    items: [
      {
        title: "១. អនុគមន៍ប្រមូលផ្តុំ (Aggregate)",
        icon: Type,
        subItems: [
          { title: "SQL Aggregate Functions", id: "sql-aggregate-functions", label: "អនុគមន៍ប្រមូលផ្តុំ" },
          { title: "SQL Min", id: "sql-min", label: "តម្លៃតូចបំផុត Min()" },
          { title: "SQL Max", id: "sql-max", label: "តម្លៃធំបំផុត Max()" },
          { title: "SQL Count", id: "sql-count", label: "រាប់ចំនួន Count()" },
          { title: "SQL Sum", id: "sql-sum", label: "បូកសរុប Sum()" },
          { title: "SQL Avg", id: "sql-avg", label: "មធ្យមភាគ Avg()" },
        ]
      },
      {
        title: "២. ការស្វែងរកទិន្នន័យ (Querying)",
        icon: Paintbrush,
        subItems: [
          { title: "SQL Like", id: "sql-like", label: "ស្វែងរក Like" },
          { title: "SQL Wildcards", id: "sql-wildcards", label: "សញ្ញាជំនួស Wildcards" },
          { title: "SQL In", id: "sql-in", label: "លក្ខខណ្ឌ In" },
          { title: "SQL Between", id: "sql-between", label: "លក្ខខណ្ឌ Between" },
          { title: "SQL Aliases", id: "sql-aliases", label: "ឈ្មោះជំនួស Aliases" },
        ]
      }
    ]
  },
  {
    title: "ការភ្ជាប់តារាង (SQL Joins)",
    icon: Link2,
    items: [
      {
        title: "១. ប្រភេទនៃការ Join",
        icon: Link2,
        subItems: [
          { title: "SQL Joins", id: "sql-joins", label: "សេចក្តីផ្តើមអំពី Joins" },
          { title: "SQL Inner Join", id: "sql-inner-join", label: "Inner Join" },
          { title: "SQL Left Join", id: "sql-left-join", label: "Left Join" },
          { title: "SQL Right Join", id: "sql-right-join", label: "Right Join" },
          { title: "SQL Full Join", id: "sql-full-join", label: "Full Join" },
          { title: "SQL Self Join", id: "sql-self-join", label: "Self Join" },
        ]
      }
    ]
  },
  {
    title: "ការរៀបចំទិន្នន័យកម្រិតខ្ពស់",
    icon: Layers,
    items: [
      {
        title: "១. ការច្របាច់បញ្ចូលគ្នា",
        icon: LayoutGrid,
        subItems: [
          { title: "SQL Union", id: "sql-union", label: "Union" },
          { title: "SQL Union All", id: "sql-union-all", label: "Union All" },
          { title: "SQL Group By", id: "sql-group-by", label: "Group By" },
          { title: "SQL Having", id: "sql-having", label: "Having" },
        ]
      },
      {
        title: "២. លក្ខខណ្ឌកម្រិតខ្ពស់",
        icon: Code2,
        subItems: [
          { title: "SQL Exists", id: "sql-exists", label: "Exists" },
          { title: "SQL Any", id: "sql-any", label: "Any" },
          { title: "SQL All", id: "sql-all", label: "All" },
          { title: "SQL Select Into", id: "sql-select-into", label: "Select Into" },
          { title: "SQL Insert Into Select", id: "sql-insert-into-select", label: "Insert Into Select" },
          { title: "SQL Case", id: "sql-case", label: "លក្ខខណ្ឌ Case" },
          { title: "SQL Null Functions", id: "sql-null-functions", label: "Null Functions" },
          { title: "SQL Stored Procedures", id: "sql-stored-procedures", label: "Stored Procedures" },
          { title: "SQL Comments", id: "sql-comments", label: "Comments" },
          { title: "SQL Operators", id: "sql-operators", label: "Operators" },
        ]
      }
    ]
  },
  {
    title: "ការគ្រប់គ្រង Database & Table",
    icon: LayoutGrid,
    items: [
      {
        title: "១. Database Commands",
        icon: LayoutGrid,
        subItems: [
          { title: "SQL Database", id: "sql-database", label: "SQL Database" },
          { title: "SQL Create DB", id: "sql-create-db", label: "Create DB" },
          { title: "SQL Drop DB", id: "sql-drop-db", label: "Drop DB" },
          { title: "SQL Backup DB", id: "sql-backup-db", label: "Backup DB" },
        ]
      },
      {
        title: "២. Table Commands",
        icon: Layers,
        subItems: [
          { title: "SQL Create Table", id: "sql-create-table", label: "Create Table" },
          { title: "SQL Drop Table", id: "sql-drop-table", label: "Drop Table" },
          { title: "SQL Alter Table", id: "sql-alter-table", label: "Alter Table" },
        ]
      }
    ]
  },
  {
    title: "លក្ខខណ្ឌដាក់កម្រិត & ប្រធានបទផ្សេងៗ",
    icon: Paintbrush,
    items: [
      {
        title: "១. Constraints",
        icon: Paintbrush,
        subItems: [
          { title: "SQL Constraints", id: "sql-constraints", label: "Constraints" },
          { title: "SQL Not Null", id: "sql-not-null", label: "Not Null" },
          { title: "SQL Unique", id: "sql-unique", label: "Unique" },
          { title: "SQL Primary Key", id: "sql-primary-key", label: "Primary Key" },
          { title: "SQL Foreign Key", id: "sql-foreign-key", label: "Foreign Key" },
          { title: "SQL Check", id: "sql-check", label: "Check Constraint" },
          { title: "SQL Default", id: "sql-default", label: "Default" },
          { title: "SQL Create Index", id: "sql-create-index", label: "Create Index" },
          { title: "SQL Auto Increment", id: "sql-auto-increment", label: "Auto Increment" },
        ]
      },
      {
        title: "២. ប្រធានបទផ្សេងៗ",
        icon: Code2,
        subItems: [
          { title: "SQL Dates", id: "sql-dates", label: "កាលបរិច្ឆេទ Dates" },
          { title: "SQL Views", id: "sql-views", label: "Views" },
          { title: "SQL Injection", id: "sql-injection", label: "SQL Injection" },
          { title: "SQL Parameters", id: "sql-parameters", label: "Parameters" },
          { title: "SQL Prepared Statements", id: "sql-prepared-statements", label: "Prepared Statements" },
          { title: "SQL Hosting", id: "sql-hosting", label: "Hosting" },
        ]
      }
    ]
  },
  {
    title: "ឯកសារយោង និងវិញ្ញាបនបត្រ",
    icon: Terminal,
    items: [
      {
        title: "១. Reference & Cert",
        icon: Terminal,
        subItems: [
          { title: "SQL Cert", id: "sql-cert", label: "SQL Cert" },
          { title: "SQL Certificate", id: "sql-certificate", label: "SQL Certificate" },
          { title: "SQL References", id: "sql-references", label: "SQL References" },
          { title: "SQL Data Types", id: "sql-data-types", label: "Data Types" },
          { title: "SQL Keywords", id: "sql-keywords", label: "Keywords" },
          { title: "MySQL Functions", id: "mysql-functions", label: "MySQL Functions" },
        ]
      }
    ]
  }
]

const gitChapters = [
  {
    title: "មូលដ្ឋានគ្រឹះ Git (Git Basics)",
    icon: BookOpen,
    items: [
      {
        title: "១. ការចាប់ផ្តើមដំបូង",
        icon: Layers,
        subItems: [
          { title: "Git HOME", id: "git-home", label: "Git Home" },
          { title: "Git Intro", id: "git-intro", label: "សេចក្តីផ្តើមអំពី Git" },
          { title: "Git Install", id: "git-install", label: "ដំឡើង Git" },
          { title: "Git Config", id: "git-config", label: "កំណត់រចនាសម្ព័ន្ធ Config" },
          { title: "Git Get Started", id: "git-get-started", label: "ចាប់ផ្តើមដំបូងជាមួយ Git" },
        ]
      },
      {
        title: "២. ការរៀបចំឯកសារ និង Commits",
        icon: LayoutGrid,
        subItems: [
          { title: "Git New Files", id: "git-new-files", label: "ឯកសារថ្មីក្នុង Git" },
          { title: "Git Staging", id: "git-staging", label: "តំបន់ Staging" },
          { title: "Git Commit", id: "git-commit", label: "ការ Commit កូដ" },
          { title: "Git Tagging", id: "git-tagging", label: "ការដាក់ Tag លើ Commit" },
          { title: "Git Stash", id: "git-stash", label: "ការរក្សាទុកបណ្តោះអាសន្ន Stash" },
          { title: "Git History", id: "git-history", label: "ប្រវត្តិនៃការផ្លាស់ប្តូរ History" },
          { title: "Git Help", id: "git-help", label: "ជំនួយរហ័ស Git Help" },
        ]
      },
      {
        title: "៣. មែកធាង និងការច្របាច់បញ្ចូល",
        icon: Code2,
        subItems: [
          { title: "Git Branch", id: "git-branch", label: "មែកធាង Git Branch" },
          { title: "Git Merge", id: "git-merge", label: "ការបញ្ចូលកូដ Git Merge" },
          { title: "Git Workflow", id: "git-workflow", label: "លំហូរការងារ Git Workflow" },
          { title: "Git Best Practices", id: "git-best-practices", label: "ការអនុវត្តល្អបំផុត" },
          { title: "Git Glossary", id: "git-glossary", label: "វចនានុក្រម Git Glossary" },
        ]
      }
    ]
  },
  {
    title: "Git និង GitHub (Git & GitHub)",
    icon: Type,
    items: [
      {
        title: "១. ការភ្ជាប់ទៅកាន់ GitHub",
        icon: Type,
        subItems: [
          { title: "GitHub Get Started", id: "github-get-started", label: "ចាប់ផ្តើមជាមួយ GitHub" },
          { title: "Git What is SSH?", id: "git-what-is-ssh", label: "តើអ្វីទៅជា SSH?" },
          { title: "GitHub Add SSH", id: "github-add-ssh", label: "បន្ថែមសោ SSH ទៅ GitHub" },
          { title: "GitHub Set Remote", id: "github-set-remote", label: "កំណត់ម៉ាស៊ីន Remote" },
        ]
      },
      {
        title: "២. ការធ្វើសមកាលកម្មកូដ",
        icon: Paintbrush,
        subItems: [
          { title: "GitHub Edit Code", id: "github-edit-code", label: "កែសម្រួលកូដលើ GitHub" },
          { title: "Pull from GitHub", id: "pull-from-github", label: "ទាញកូដ Pull" },
          { title: "Push to GitHub", id: "push-to-github", label: "បញ្ជូនកូដ Push" },
          { title: "GitHub Branch", id: "github-branch", label: "GitHub Branch" },
          { title: "Pull Branch from GitHub", id: "pull-branch-from-github", label: "ទាញមែកធាង Pull Branch" },
          { title: "Push Branch to GitHub", id: "push-branch-to-github", label: "បញ្ជូនមែកធាង Push Branch" },
          { title: "GitHub Flow", id: "github-flow", label: "GitHub Flow" },
          { title: "GitHub Pages", id: "github-pages", label: "បង្កើតទំព័រ GitHub Pages" },
          { title: "Git GUI Clients", id: "git-gui-clients", label: "កម្មវិធី Git GUI" },
        ]
      }
    ]
  },
  {
    title: "ការចូលរួមចំណែកកូដ (Contribute)",
    icon: Link2,
    items: [
      {
        title: "១. សហការលើ GitHub",
        icon: Link2,
        subItems: [
          { title: "GitHub Fork", id: "github-fork", label: "ការ Fork គម្រោង" },
          { title: "Git Clone from GitHub", id: "git-clone-from-github", label: "ការ Clone គម្រោង" },
          { title: "GitHub Send Pull Request", id: "github-send-pull-request", label: "ផ្ញើ Pull Request" },
        ]
      }
    ]
  },
  {
    title: "បញ្ជាត្រឡប់ក្រោយ (Git Undo)",
    icon: Layers,
    items: [
      {
        title: "១. ការត្រឡប់ក្រោយ និងកែប្រែ",
        icon: LayoutGrid,
        subItems: [
          { title: "Git Revert", id: "git-revert", label: "ត្រឡប់កូដ Git Revert" },
          { title: "Git Reset", id: "git-reset", label: "កំណត់ឡើងវិញ Git Reset" },
          { title: "Git Amend", id: "git-amend", label: "កែប្រែ Commit ចុងក្រោយ" },
          { title: "Git Rebase", id: "git-rebase", label: "ការផ្ទេរគល់ Git Rebase" },
          { title: "Git Reflog", id: "git-reflog", label: "កំណត់ហេតុប្រវត្តិ Reflog" },
          { title: "Git Recovery", id: "git-recovery", label: "ការស្ដារកូដដែលបាត់បង់" },
        ]
      }
    ]
  },
  {
    title: "ប្រធានបទកម្រិតខ្ពស់ (Git Advanced)",
    icon: LayoutGrid,
    items: [
      {
        title: "១. ការកំណត់រចនាសម្ព័ន្ធកម្រិតខ្ពស់",
        icon: LayoutGrid,
        subItems: [
          { title: "Git .gitignore", id: "git-gitignore", label: "ការដកចេញ .gitignore" },
          { title: "Git .gitattributes", id: "git-gitattributes", label: "កំណត់លក្ខណៈឯកសារ" },
          { title: "Git Large File Storage (LFS)", id: "git-lfs", label: "ផ្ទុកឯកសារធំៗ Git LFS" },
          { title: "Git Signing Commits/Tags", id: "git-signing", label: "ការចុះហត្ថលេខាឌីជីថល" },
        ]
      },
      {
        title: "២. បច្ចេកទេស និងស្វ័យប្រវត្តិកម្ម",
        icon: Layers,
        subItems: [
          { title: "Git Cherrypick & Patch", id: "git-cherrypick-patch", label: "Cherrypick & Patch" },
          { title: "Git Merge Conflicts", id: "git-merge-conflicts", label: "ដោះស្រាយជម្លោះកូដ" },
          { title: "Git CI/CD", id: "git-cicd", label: "ការរួមបញ្ចូលស្វ័យប្រវត្ត CI/CD" },
          { title: "Git Hooks", id: "git-hooks", label: "ស្គ្រីបស្វ័យប្រវត្ត Git Hooks" },
          { title: "Git Submodules", id: "git-submodules", label: "គម្រោងរង Git Submodules" },
          { title: "Git Remote Advanced", id: "git-remote-advanced", label: "ការគ្រប់គ្រង Remote កម្រិតខ្ពស់" },
        ]
      }
    ]
  },
  {
    title: "ឯកសារយោង និងវិញ្ញាបនបត្រ",
    icon: Terminal,
    items: [
      {
        title: "១. Reference & Cert",
        icon: Terminal,
        subItems: [
          { title: "Git Cert", id: "git-cert", label: "Git Cert" },
          { title: "Git Certificate", id: "git-certificate", label: "វិញ្ញាបនបត្រ Git" },
        ]
      }
    ]
  },
  {
    title: "លំហាត់ និងផែនការសិក្សា",
    icon: Code2,
    items: [
      {
        title: "១. Exercises & Plan",
        icon: Code2,
        subItems: [
          { title: "Git Exercises", id: "git-exercises", label: "លំហាត់អនុវត្ត Git" },
          { title: "Git Quiz", id: "git-quiz", label: "កម្រងសំណួរ Git Quiz" },
          { title: "Git Syllabus", id: "git-syllabus", label: "មាតិកាវគ្គសិក្សា" },
          { title: "Git Study Plan", id: "git-study-plan", label: "ផែនការសិក្សា Git" },
        ]
      }
    ]
  }
]


const reactChapters = [
  { title: "React Basics", icon: BookOpen, items: [
      { title: "១. សេចក្តីផ្តើម", icon: Layers, subItems: [
          { title: "React Intro", id: "intro", label: "អ្វីទៅជា React?" }
      ]}
  ]}
];
const vueChapters = [
  { title: "Vue Basics", icon: BookOpen, items: [
      { title: "១. សេចក្តីផ្តើម", icon: Layers, subItems: [
          { title: "Vue Intro", id: "intro", label: "អ្វីទៅជា Vue?" }
      ]}
  ]}
];
const javaChapters = [
  { title: "Java Basics", icon: BookOpen, items: [
      { title: "១. សេចក្តីផ្តើម", icon: Layers, subItems: [
          { title: "Java Intro", id: "intro", label: "អ្វីទៅជា Java?" }
      ]}
  ]}
];
const cppChapters = [
  { title: "C++ Basics", icon: BookOpen, items: [
      { title: "១. សេចក្តីផ្តើម", icon: Layers, subItems: [
          { title: "C++ Intro", id: "intro", label: "អ្វីទៅជា C++?" }
      ]}
  ]}
];
const cChapters = [
  { title: "C Basics", icon: BookOpen, items: [
      { title: "១. សេចក្តីផ្តើម", icon: Layers, subItems: [
          { title: "C Intro", id: "intro", label: "អ្វីទៅជា C?" }
      ]}
  ]}
];
const csharpChapters = [
  { title: "C# Basics", icon: BookOpen, items: [
      { title: "១. សេចក្តីផ្តើម", icon: Layers, subItems: [
          { title: "C# Intro", id: "intro", label: "អ្វីទៅជា C#?" }
      ]}
  ]}
];
const typescriptChapters = [
  { title: "TypeScript Basics", icon: BookOpen, items: [
      { title: "១. សេចក្តីផ្តើម", icon: Layers, subItems: [
          { title: "TS Intro", id: "intro", label: "អ្វីទៅជា TypeScript?" }
      ]}
  ]}
];

export function AppSidebar() {
  const pathname = usePathname()
  const isJs = pathname?.includes("/learn/javascript") ?? false
  const isPython = pathname?.includes("/learn/python") ?? false
  const isSql = pathname?.includes("/learn/sql") ?? false
  const isGit = pathname?.includes("/learn/git") ?? false

  const chapters = isPython ? pythonChapters : (isJs ? javascriptChapters : (isSql ? sqlChapters : (isGit ? gitChapters : htmlChapters)))
  const groupLabel = isPython ? "មេរៀន Python" : (isJs ? "មេរៀន JavaScript" : (isSql ? "មេរៀន SQL" : (isGit ? "មេរៀន Git" : "មេរៀន HTML")))
  const progressEndpoint = isPython ? "/api/progress/python" : (isJs ? "/api/progress/javascript" : (isSql ? "/api/progress/sql" : (isGit ? "/api/progress/git" : "/api/progress/html")))
  const [activeItem, setActiveItem] = React.useState(isSql ? "sql-intro" : (isGit ? "git-home" : "intro"))
  const [completedChapters, setCompletedChapters] = React.useState<string[]>([])

  React.useEffect(() => {
    fetch(progressEndpoint)
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data?.completed) {
          setCompletedChapters(res.data.completed);
        }
      })
      .catch(console.error);
  }, [progressEndpoint]);

  React.useEffect(() => {
    const handler = (e: any) => {
      setCompletedChapters(prev => Array.from(new Set([...prev, e.detail])));
    }
    window.addEventListener('chapterCompleted', handler);
    return () => window.removeEventListener('chapterCompleted', handler);
  }, []);

 // Collect all section IDs from the chapter data
 const allIds = React.useMemo(
 () => chapters.flatMap(c => c.items.flatMap(i => i.subItems.map(s => s.id))),
 [chapters]
 )

  // Use CustomEvents for syncing between Sidebar and Page instead of intersection observers
  React.useEffect(() => {
    const handler = (e: any) => setActiveItem(e.detail)
    window.addEventListener('chapterChangeActive', handler)
    return () => window.removeEventListener('chapterChangeActive', handler)
  }, [])

  const handleScrollTo = (id: string) => {
    setActiveItem(id)
    window.dispatchEvent(new CustomEvent('chapterChange', { detail: id }))
  }

 return (
 <Sidebar collapsible="icon">
 <SidebarContent className="py-4 gap-0">
 <SidebarGroup>
 <SidebarGroupLabel className="px-4 text-xs font-semibold tracking-wider text-sidebar-foreground/75 uppercase">
 {groupLabel}
 </SidebarGroupLabel>
 <SidebarGroupContent>
 <SidebarMenu>
 {chapters.map((chapter, cIndex) => {
 const ChapterIcon = chapter.icon || BookOpen
 return (
 <Collapsible key={cIndex} defaultOpen className="group/collapsible" asChild>
 <SidebarMenuItem>
 <CollapsibleTrigger asChild>
 <SidebarMenuButton className="font-semibold text-sidebar-foreground/90 text-sm py-2">
 <ChapterIcon className="h-4 w-4 text-primary" />
 <span>{chapter.title}</span>
 <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
 </SidebarMenuButton>
 </CollapsibleTrigger>
 <CollapsibleContent>
 <SidebarMenuSub className="mr-0 pr-0">
 {chapter.items.map((subChapter, scIndex) => {
 const SubChapterIcon = subChapter.icon || Code2
 return (
 <SidebarMenuSubItem key={scIndex} className="list-none">
 <Collapsible defaultOpen className="group/sub-collapsible" asChild>
 <div>
 <CollapsibleTrigger asChild>
 <SidebarMenuButton className="text-sm text-sidebar-foreground/80 hover:text-foreground py-1.5">
 <SubChapterIcon className="h-4 w-4 text-muted-foreground" />
 <span>{subChapter.title}</span>
 <ChevronDown className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/sub-collapsible:rotate-180" />
 </SidebarMenuButton>
 </CollapsibleTrigger>
 <CollapsibleContent>
 <SidebarMenuSub className="ml-4 border-l border-sidebar-border/60">
 {subChapter.subItems.map((item) => (
 <SidebarMenuSubItem key={item.id}>
 <SidebarMenuSubButton
 onClick={() => handleScrollTo(item.id)}
 isActive={activeItem === item.id}
 className="cursor-pointer text-sm py-1"
 >
 <div className="flex items-center justify-between w-full">
 <span>{item.label}</span>
 {completedChapters.includes(item.id) && (
 <svg className="h-3.5 w-3.5 text-green-500 ml-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
 </svg>
 )}
 </div>
 </SidebarMenuSubButton>
 </SidebarMenuSubItem>
 ))}
 </SidebarMenuSub>
 </CollapsibleContent>
 </div>
 </Collapsible>
 </SidebarMenuSubItem>
 ) })}
 </SidebarMenuSub>
 </CollapsibleContent>
 </SidebarMenuItem>
 </Collapsible>
 ) })}
 </SidebarMenu>
 </SidebarGroupContent>
 </SidebarGroup>
 </SidebarContent>
 <SidebarRail />
 </Sidebar>
 )
}

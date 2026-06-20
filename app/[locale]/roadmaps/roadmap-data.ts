export interface RoadmapStep {
  title: string;
  desc: string;
}

export interface Roadmap {
  slug: string;
  title: string;
  subtitle: string;
  steps: RoadmapStep[];
}

export const ROADMAPS: Record<string, Roadmap> = {
  html: {
    slug: "html",
    title: "HTML & CSS",
    subtitle: "ស្វែងយល់ពីរចនាសម្ព័ន្ធ និងការតុបតែងវេបសាយតាមជំហាន។",
    steps: [
      { title: "HTML Basics", desc: "Tags, elements, attributes, document structure" },
      { title: "Semantic HTML", desc: "header, nav, main, article, footer" },
      { title: "Forms & Inputs", desc: "Form controls, validation, accessibility" },
      { title: "CSS Basics", desc: "Selectors, box model, colors, units" },
      { title: "Flexbox & Grid", desc: "Modern layout systems" },
      { title: "Responsive Design", desc: "Media queries, mobile-first" },
      { title: "Transitions & Animations", desc: "Motion and polish" },
    ],
  },
  javascript: {
    slug: "javascript",
    title: "JavaScript",
    subtitle: "ផ្លូវសិក្សាសម្រាប់បង្កើតអន្តរកម្មវេបសាយ។",
    steps: [
      { title: "Syntax & Variables", desc: "let, const, types, operators" },
      { title: "Functions", desc: "Declarations, arrow functions, scope" },
      { title: "Arrays & Objects", desc: "map, filter, reduce, destructuring" },
      { title: "DOM Manipulation", desc: "Select, update, events" },
      { title: "Async JavaScript", desc: "Promises, async/await, fetch" },
      { title: "ES Modules", desc: "import / export, bundlers" },
      { title: "Error Handling", desc: "try/catch, debugging" },
    ],
  },
  react: {
    slug: "react",
    title: "React",
    subtitle: "ផ្លូវសិក្សាសម្រាប់បង្កើត UI ដោយ React។",
    steps: [
      { title: "JSX & Components", desc: "Functional components, composition" },
      { title: "Props & State", desc: "Data flow, useState" },
      { title: "Events & Forms", desc: "Handlers, controlled inputs" },
      { title: "useEffect", desc: "Side effects, lifecycle, cleanup" },
      { title: "Hooks", desc: "useRef, useMemo, custom hooks" },
      { title: "Context & State Mgmt", desc: "Context API, Zustand/Redux" },
      { title: "Data Fetching", desc: "React Query, suspense" },
    ],
  },
  nextjs: {
    slug: "nextjs",
    title: "Next.js",
    subtitle: "ផ្លូវសិក្សាសម្រាប់ Framework React។",
    steps: [
      { title: "App Router", desc: "File-based routing, layouts" },
      { title: "Server Components", desc: "RSC vs client components" },
      { title: "Data Fetching", desc: "fetch, caching, revalidation" },
      { title: "Server Actions", desc: "Mutations without API routes" },
      { title: "Route Handlers", desc: "API endpoints, middleware" },
      { title: "Rendering Strategies", desc: "SSR, SSG, ISR, streaming" },
      { title: "Deployment", desc: "Vercel, env, edge runtime" },
    ],
  },
  python: {
    slug: "python",
    title: "Python",
    subtitle: "ផ្លូវសិក្សាសម្រាប់ទិន្នន័យ និង AI។",
    steps: [
      { title: "Syntax & Types", desc: "Variables, strings, numbers, bool" },
      { title: "Control Flow", desc: "if/else, loops, comprehensions" },
      { title: "Functions & Modules", desc: "def, args, imports, packages" },
      { title: "Data Structures", desc: "list, dict, set, tuple" },
      { title: "OOP", desc: "Classes, inheritance, dunder methods" },
      { title: "Files & Errors", desc: "I/O, exceptions, context managers" },
      { title: "Libraries", desc: "pip, NumPy, Pandas, requests" },
    ],
  },
  sql: {
    slug: "sql",
    title: "SQL",
    subtitle: "ផ្លូវសិក្សាសម្រាប់គ្រប់គ្រងទិន្នន័យ។",
    steps: [
      { title: "SELECT Basics", desc: "Queries, WHERE, ORDER BY" },
      { title: "Filtering & Functions", desc: "Aggregates, GROUP BY, HAVING" },
      { title: "Joins", desc: "INNER, LEFT, RIGHT, self joins" },
      { title: "Subqueries & CTEs", desc: "Nested queries, WITH clauses" },
      { title: "Data Modeling", desc: "Keys, normalization, relations" },
      { title: "Indexes & Performance", desc: "Query plans, optimization" },
      { title: "Transactions", desc: "ACID, isolation levels" },
    ],
  },
  "system-design": {
    slug: "system-design",
    title: "System Design",
    subtitle: "ផ្លូវសិក្សាសម្រាប់រចនាប្រព័ន្ធធំៗ និងអាចពង្រីកបាន។",
    steps: [
      { title: "Fundamentals", desc: "Client-server, latency, throughput" },
      { title: "Scaling", desc: "Vertical vs horizontal, load balancing" },
      { title: "Databases", desc: "SQL vs NoSQL, replication, sharding" },
      { title: "Caching", desc: "Redis, CDN, cache strategies" },
      { title: "Messaging & Queues", desc: "Kafka, async processing" },
      { title: "API & Microservices", desc: "REST, gRPC, service boundaries" },
      { title: "Reliability", desc: "Availability, consistency, CAP" },
      { title: "Observability", desc: "Logging, metrics, monitoring" },
    ],
  },
};

export function getRoadmap(slug: string): Roadmap | undefined {
  return ROADMAPS[slug];
}

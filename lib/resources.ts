export type ResourceCategory = 'react' | 'ui' | 'python' | 'mcp' | 'agents' | 'other';

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  url: string;
  tags: string[];
  icon?: string;
}

export const resources: Resource[] = [
  // React UI Libraries
  {
    id: 'shadcn-ui',
    name: 'shadcn/ui',
    description: 'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    category: 'react',
    url: 'https://ui.shadcn.com/',
    tags: ['React', 'Tailwind CSS', 'Components'],
    icon: 'https://ui.shadcn.com/apple-touch-icon.png',
  },
  {
    id: 'heroui',
    name: 'HeroUI',
    description: 'Beautiful, fast and modern React UI library.',
    category: 'react',
    url: 'https://heroui.com/',
    tags: ['React', 'Tailwind CSS', 'Components'],
    icon: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/heroui_isotipo.png',
  },
  {
    id: 'radix-ui',
    name: 'Radix UI',
    description: 'Unstyled, accessible components for building high-quality design systems and web apps in React.',
    category: 'react',
    url: 'https://www.radix-ui.com/',
    tags: ['React', 'Accessible', 'Headless'],
    icon: 'https://logowik.com/content/uploads/images/radix-ui3498.logowik.com.webp',
  },
  
  // UI Libraries
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    category: 'ui',
    url: 'https://tailwindcss.com/',
    tags: ['CSS', 'Framework'],
    icon: '/images/tailwind.svg',
  },
  {
    id: 'gsap',
    name: 'GSAP',
    description: 'Professional-grade JavaScript animation for the modern web.',
    category: 'ui',
    url: 'https://gsap.com/',
    tags: ['Animation', 'JavaScript'],
    icon: 'https://gsap.com/community/uploads/monthly_2020_03/tweenmax.png.cf27916e926fbb328ff214f66b4c8429.png',
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    description: 'A production-ready motion library for React.',
    category: 'react',
    url: 'https://www.framer.com/motion/',
    tags: ['React', 'Animation'],
    icon: 'https://images.seeklogo.com/logo-png/58/2/framer-icon-logo-png_seeklogo-586477.png',
  },

  // Python UI Libraries
  {
    id: 'streamlit',
    name: 'Streamlit',
    description: 'A faster way to build and share data apps in Python.',
    category: 'python',
    url: 'https://streamlit.io/',
    tags: ['Python', 'Data Apps'],
    icon: '/images/python.svg',
  },
  {
    id: 'gradio',
    name: 'Gradio',
    description: 'Build and share delightful machine learning apps, all in Python.',
    category: 'python',
    url: 'https://gradio.app/',
    tags: ['Python', 'Machine Learning'],
    icon: '/images/python.svg',
  },

  // MCP Servers
  {
    id: 'mcp-server-postgres',
    name: 'PostgreSQL MCP Server',
    description: 'Model Context Protocol server for interacting with PostgreSQL databases.',
    category: 'mcp',
    url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
    tags: ['MCP', 'Database', 'PostgreSQL'],
    icon: '/images/postgresql.svg',
  },
  {
    id: 'mcp-server-github',
    name: 'GitHub MCP Server',
    description: 'Model Context Protocol server for interacting with GitHub.',
    category: 'mcp',
    url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
    tags: ['MCP', 'GitHub'],
    icon: '/images/git.svg',
  },

  // Agent Skills
  {
    id: 'agent-skill-frontend-design',
    name: 'Frontend Design Skill',
    description: 'Advanced frontend design instructions for agents to create premium user interfaces.',
    category: 'agents',
    url: '#',
    tags: ['Skill', 'Frontend', 'Design'],
    icon: '/images/terminal.svg',
  },
  {
    id: 'agent-skill-caveman',
    name: 'Caveman Mode',
    description: 'Ultra-compressed communication mode for agents to save tokens.',
    category: 'agents',
    url: '#',
    tags: ['Skill', 'Tokens', 'Optimization'],
    icon: '/images/terminal.svg',
  }
];

export const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'react', label: 'React UI' },
  { id: 'ui', label: 'UI & Animations' },
  { id: 'python', label: 'Python UI' },
  { id: 'mcp', label: 'MCP Servers' },
  { id: 'agents', label: 'Agent Skills' },
];

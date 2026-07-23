import { ProfileInfo, SkillCategory, TimelineEntry, ProjectItem } from '../types';

export const PROFILE_DATA: ProfileInfo = {
  name: "Prodip Sengupta",
  role: "Full-stack GenAI Engineer",
  quote: "I don’t just build apps — I build systems that think.",
  status: "Open to Work / Available for new projects",
  location: "India",
  experienceYears: "1+ Years",
  projectsCompleted: "27+",
  uptime: "99%",
  bio: "Prodip builds fast, scalable, and visually engaging web applications focusing on full-stack systems—ranging from UI/UX and backend API gateways to deployment and autonomous AI agents.",
  email: "prodipsengupta27@gmail.com",
  github: "https://github.com/prodipsen27",
  linkedin: "https://linkedin.com/in/prodipsen27",
  coreMetrics: [
    { label: "Problem Solving", value: 96 },
    { label: "Creativity", value: 91 },
    { label: "Communication", value: 88 }
  ],
  coreTechStack: [
    "GenAI", "MERN Stack", "MongoDB", "Express", "React", "Node.js", "Next.js", "JavaScript", "OpenAI", "Gemini", "Docker"
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Agents",
    skills: [
      { name: "Gemini / Claude API (Function Calling)", percentage: 95, description: "Structured outputs, tool use, schema execution" },
      { name: "LangGraph JS & LangChain", percentage: 92, description: "Stateful agentic workflows & human-in-the-loop loops" },
      { name: "RAG Pipelines & pgvector (RRF)", percentage: 92, description: "Reciprocal Rank Fusion, hybrid vector + keyword retrieval" },
      { name: "Anthropic MCP / Claude Code", percentage: 90, description: "Model Context Protocol servers & automated development" }
    ]
  },
  {
    title: "Full-Stack Development",
    skills: [
      { name: "React & Next.js App Router", percentage: 94, description: "Server components, streaming SSR, performance optimization" },
      { name: "Node.js & Express API Gateways", percentage: 90, description: "JWT auth, rate-limiting, RESTful architecture" },
      { name: "MongoDB, PostgreSQL & Supabase", percentage: 88, description: "Relational/document schemas, vector indices, ACID compliance" },
      { name: "Docker & Cloud Deployment", percentage: 85, description: "Containerized environments, Cloud Run, Vercel" }
    ]
  }
];

export const CAREER_TIMELINE: TimelineEntry[] = [
  {
    year: "2022",
    title: "Started Coding",
    subtitle: "Foundational CS & Algorithms",
    description: "Mastered core programming logic, data structures, algorithms, and fundamental computer science concepts.",
    highlights: ["Problem Solving Logic", "Data Structures & Algo", "JavaScript Foundations"],
    iconName: "Code2"
  },
  {
    year: "2024",
    title: "Started WebDev",
    subtitle: "Frontend Interfaces & Styling",
    description: "Built modern frontend web interfaces, focused on responsive design, CSS architecture, and interactive DOM logic.",
    highlights: ["Modern React & Tailwind", "Responsive Layouts", "Interactive Canvas UI"],
    iconName: "Layout"
  },
  {
    year: "2025",
    title: "Fullstack MERN Dev",
    subtitle: "Isolated Sessions & Secure Gateways",
    description: "Built production applications with isolated user sessions, database integrations, payment systems, and secure web API gateways.",
    highlights: ["MERN Architecture", "Database Modeling", "API Gateway Security"],
    iconName: "Server"
  },
  {
    year: "2026",
    title: "Fullstack Gen AI",
    subtitle: "Autonomous Agent Systems",
    description: "Specialized in agentic architectures, RAG pipelines, function calling, tool use, and multi-agent reasoning graphs.",
    highlights: ["LangGraph & MCP", "RAG Pipelines with RRF", "Autonomous AI Agents"],
    iconName: "Cpu"
  }
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "neural-archivist",
    title: "The Neural Archivist",
    category: "#PROJECTS",
    tagline: "Translating semantic soul of 17th-century manuscripts into contemporary visual languages.",
    description: "A tool designed to breathe life into forgotten texts. Using custom neural weights to translate the semantic soul of 17th-century manuscripts into contemporary visual languages.",
    tech: ["Next.js", "LangChain", "Gemini API", "PyTorch", "WebGL"],
    featured: true,
    date: "SEP 2, 2026",
    caption: "FILE_009_NEURAL.JPG",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    architectureDetails: [
      "Custom neural style weight projection for historical manuscripts",
      "Semantic translation model fine-tuned on 17th-century texts",
      "Interactive WebGL shader canvas for ink diffusion rendering"
    ],
    metrics: "Digitized over 1,400 rare manuscript pages with 99.4% semantic fidelity",
    githubUrl: "https://github.com/prodipsen27"
  },
  {
    id: "ink-and-pixel",
    title: "Ink & Pixel",
    category: "#EXPERIMENTAL",
    tagline: "Bridging the haptic disconnect with tactile CSS and WebGL shaders.",
    description: "Bridging the haptic disconnect. A design framework that exports tactile irregularities—ink bleeds, graphite texture, paper grain—directly into CSS and WebGL shaders.",
    tech: ["CSS3 Shaders", "WebGL", "TypeScript", "Canvas API", "Framer Motion"],
    featured: true,
    date: "AUG 14, 2026",
    caption: "STUDY_INKPIXEL_B.RAW",
    imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
    architectureDetails: [
      "Procedural paper grain generator running on 60 FPS GPU threads",
      "Dynamic ink-bleed diffusion model based on cursor pressure and velocity",
      "Exportable React component library for tactile physical UI"
    ],
    metrics: "Zero runtime drop in performance while serving procedural textures",
    githubUrl: "https://github.com/prodipsen27"
  },
  {
    id: "vitaltrace-ai",
    title: "VitalTrace AI Health Assistant",
    category: "#AI AGENTS",
    tagline: "Clinical agent network explaining medical reports and tracking biomarker trends.",
    description: "A comprehensive health intelligence network using autonomous clinical agent nodes that extract lab telemetry, convert raw blood panel data into natural language diagnostics, and visualize long-term biomarker health trends.",
    tech: ["Next.js", "LangChain", "Supabase", "pgvector", "Recharts"],
    featured: true,
    date: "JAN 10, 2026",
    caption: "DIAGNOSTIC_CORE.RAW",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    architectureDetails: [
      "pgvector similarity search for medical literature grounding",
      "Multi-agent validation node ensuring clinical precision",
      "Interactive trend charts for HDL/LDL, HbA1c, and Vitamin D levels"
    ],
    metrics: "Sub-2s medical report extraction with 98% OCR diagnostic accuracy",
    githubUrl: "https://github.com/prodipsen27"
  },
  {
    id: "findoc-ai",
    title: "FinDoc AI Research Assistant",
    category: "#RESEARCH",
    tagline: "RAG-powered SEC filing analyst with agentic retrieval and citation-grounded answers.",
    description: "Deep research agent designed for financial analysts to ingest 10-K, 10-Q SEC reports, calculate financial metrics, and produce audit-ready answers backed by exact page citations.",
    tech: ["React", "Node.js", "LangGraph", "OpenAI", "Supabase"],
    featured: true,
    date: "NOV 18, 2025",
    caption: "FINDOC_SEC_ANALYSIS.JPG",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    architectureDetails: [
      "Reciprocal Rank Fusion (RRF) combining dense vector & BM25 keyword search",
      "LangGraph conditional routing for verification before output",
      "PDF page chunk highlighter & citation drawer"
    ],
    metrics: "Reduces financial document analysis time from hours to seconds",
    githubUrl: "https://github.com/prodipsen27"
  },
  {
    id: "menuos-ai",
    title: "MenuOS – AI Restaurant Ordering System",
    category: "Full-Stack + AI",
    tagline: "QR-based smart menu with real-time ordering and AI assistant.",
    description: "Contactless digital dining experience featuring a dynamic QR menu, real-time WebSocket order desk for kitchen staff, and an AI waiter agent recommending pairings based on dietary preferences.",
    tech: ["Next.js", "Node.js", "MongoDB", "Socket.io", "Claude AI"],
    featured: true,
    date: "Oct 2025",
    caption: "MENUOS_DESK_KITCHEN.RAW",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    architectureDetails: [
      "Socket.io bi-directional synchronization for instant kitchen display updates",
      "Claude AI conversational agent answering allergen & preparation questions",
      "Custom kitchen dashboard with sound alerts and order status timeline"
    ],
    metrics: "Serves live orders across 12+ restaurants with 99.9% uptime",
    githubUrl: "https://github.com/prodipsen27"
  },
  {
    id: "querycart",
    title: "QueryCart",
    category: "GenAI",
    tagline: "Natural language powered sales dashboard.",
    description: "Translates plain English queries like 'Show top 5 revenue products in Q3' into optimized SQL/MongoDB queries and renders live interactive charts on demand.",
    tech: ["React", "Node.js", "PostgreSQL", "GPT-4o", "Recharts"],
    featured: false,
    date: "Aug 2025",
    caption: "QUERYCART_ANALYTICS.JPG",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    architectureDetails: [
      "Safe SQL Generation with Schema Reflection and Guardrails",
      "Recharts dynamic schema builder based on query result structure"
    ],
    metrics: "Zero-code query creation for business executives",
    githubUrl: "https://github.com/prodipsen27"
  },
  {
    id: "taraeffects",
    title: "TaraEffects Wedding Booking",
    category: "Creative Dev",
    tagline: "Interactive visual effects and motion-based UI.",
    description: "Luxury wedding media booking engine with interactive visual particle effects, canvas lighting, and dynamic date reservation pipeline.",
    tech: ["JavaScript", "Animations", "Canvas UI", "Tailwind CSS"],
    featured: false,
    date: "Jul 2025",
    caption: "TARAEFFECTS_UI_LIGHTS.JPG",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    architectureDetails: [
      "Custom HTML5 Canvas particle system simulating ambient gold dust",
      "60 FPS smooth motion transitions and responsive photo galleries"
    ],
    metrics: "Doubled customer booking conversion rate",
    githubUrl: "https://github.com/prodipsen27"
  },
  {
    id: "property-listing",
    title: "Property Listing Platform",
    category: "Full-Stack + AI",
    tagline: "Listing platform with authentication and image uploads.",
    description: "Real-estate marketplace platform with geo-spatial search, Cloudinary image transformations, secure broker auth, and automated property description generation.",
    tech: ["Node.js", "Express", "MongoDB", "Cloudinary", "React"],
    featured: false,
    date: "Jun 2025",
    caption: "PROPERTY_GEO_SEARCH.RAW",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    architectureDetails: [
      "MongoDB GeoJSON spatial querying for radius property search",
      "Cloudinary image optimization pipeline with automated watermark"
    ],
    metrics: "Over 500+ verified listings hosted seamlessly",
    githubUrl: "https://github.com/prodipsen27"
  },
  {
    id: "aurality-music",
    title: "Aurality – Music Platform",
    category: "Vibe-Code",
    tagline: "Music streaming platform with modern UI/UX.",
    description: "Experimental vibe-code music streaming experience inspired by luxury tactile audio gear, featuring audio visualizer waveforms, Framer Motion transitions, and mood-matching playlists.",
    tech: ["UI/UX", "Framer Motion", "Stitch", "Claude", "Gemini"],
    featured: true,
    date: "Dec 2023",
    caption: "AURALITY_AUDIO_GEAR.RAW",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    architectureDetails: [
      "Web Audio API real-time frequency visualizer",
      "Custom tactile UI controls with dark leather and gold foil styling"
    ],
    metrics: "Featured experiment showcasing dark leather & vibe-code UI",
    githubUrl: "https://github.com/prodipsen27"
  },
  {
    id: "artistly-booking",
    title: "Artistly.com Booking Platform",
    category: "Frontend",
    tagline: "Creative portfolio with modern UI/UX.",
    description: "Sleek artist discovery and event talent booking platform with fluid card layouts, calendar filters, and instant artist inquiry triggers.",
    tech: ["React", "Tailwind CSS", "UI/UX", "Animations"],
    featured: false,
    date: "Nov 2024",
    caption: "ARTISTLY_TALENT_GRID.JPG",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    architectureDetails: [
      "Framer Motion staggered grid reveals",
      "Mobile-first touch target optimization and accessibility support"
    ],
    metrics: "Selected as top design concept showcase",
    githubUrl: "https://github.com/prodipsen27"
  }
];

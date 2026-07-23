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
    id: "vitaltrace-ai",
    title: "VitalTrace AI Health Assistant",
    category: "Next.js + AI Agents",
    tagline: "Clinical agent network explaining medical reports and tracking biomarker trends.",
    description: "AI-powered clinical assistant designed to extract, analyze, and track health trends from diagnostic laboratory reports. Orchestrates a collaborative 3-agent pipeline (Extractor, Clinical Analyzer, and Pattern Detector) built with LangChain and DeepSeek-V3. Features client-side PDF parsing, RAG-powered vector similarity history search (pgvector) to plot biomarker trajectory charts, an automated physician consult guide, and robust user session separation via Supabase Auth and Row Level Security (RLS).",
    tech: ["Next.js", "LangChain", "Supabase", "pgvector", "Recharts", "DeepSeek", "AI Agents"],
    featured: true,
    date: "JAN 10, 2026",
    caption: "VITALTRACE_CORE.PNG",
    imageUrl: "/vitalTrace.png",
    architectureDetails: [
      "Collaborative 3-agent pipeline (Extractor, Clinical Analyzer, Pattern Detector) built with LangChain and DeepSeek-V3",
      "RAG-powered vector similarity history search using pgvector to plot biomarker trajectory charts",
      "Client-side PDF parsing and secure user session separation via Supabase Auth and Row Level Security (RLS)"
    ],
    metrics: "Sub-2s medical report extraction with 98% OCR diagnostic accuracy",
    githubUrl: "https://github.com/Prodipsen27/vitalTrace",
    demoUrl: "https://vital-trace-health.vercel.app/"
  },
  {
    id: "grocery-delivery",
    title: "Grocery Delivery Platform",
    category: "Full-Stack + AI",
    tagline: "MERN e-commerce with AI cart agent powered by Gemini.",
    description: "Full-stack grocery delivery platform with authentication, product filtering, Stripe payments, and admin dashboard. Features an AI cart agent built with Gemini function calling — understands natural language, searches real products from MongoDB, and manages each user's cart autonomously with isolated per-user memory.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Gemini", "AI Agents"],
    featured: true,
    date: "DEC 15, 2025",
    caption: "GROCERY_PLATFORM.PNG",
    imageUrl: "/grocery.png",
    architectureDetails: [
      "AI cart agent built with Gemini function calling to handle natural language cart interactions",
      "Complete e-commerce flow with Stripe checkout and JWT authorization",
      "Per-user chat history and session cart isolation stored in MongoDB"
    ],
    metrics: "Automated cart actions processed under 1.5 seconds",
    githubUrl: "https://github.com/Prodipsen27/grocery-app",
    demoUrl: "https://leafcart-tan.vercel.app/"
  },
  {
    id: "findoc-ai",
    title: "FinDoc AI Research Assistant",
    category: "RAG + Multi-Agent AI",
    tagline: "RAG-powered SEC filing analyst with agentic retrieval and citation-grounded answers.",
    description: "AI-powered financial research assistant designed for analyzing SEC filings, earnings transcripts, and corporate disclosures. Built with LangGraph and OpenAI to orchestrate a ReAct-style retrieval agent capable of iterative reasoning over thousands of pages of financial documents. Features a hybrid retrieval pipeline combining pgvector semantic search and PostgreSQL full-text search fused via Reciprocal Rank Fusion (RRF), delivering citation-grounded answers with exact source references. Includes structured JSON outputs, document-aware chunk retrieval, and a scalable Supabase-backed vector storage layer for institutional-grade financial analysis workflows.",
    tech: ["React", "Node.js", "LangGraph", "OpenAI", "Supabase", "pgvector", "PostgreSQL", "RAG", "AI Agents"],
    featured: true,
    date: "NOV 18, 2025",
    caption: "FINDOC_SEC_ANALYSIS.PNG",
    imageUrl: "/finDoc.png",
    architectureDetails: [
      "ReAct-style retrieval agent built with LangGraph and OpenAI capable of iterative reasoning over SEC filings",
      "Hybrid retrieval pipeline combining pgvector semantic search and PostgreSQL full-text search fused via Reciprocal Rank Fusion (RRF)",
      "Document-aware chunk retrieval delivering citation-grounded answers with exact source references"
    ],
    metrics: "Reduces financial document analysis time from hours to seconds",
    githubUrl: "https://github.com/Prodipsen27/FinDoc--RAG-SEC-filing-assistant",
    demoUrl: "https://fin-doc-rag-sec-filing-assistant.vercel.app/"
  },
  {
    id: "menuos-ai",
    title: "MenuOS – AI Restaurant Ordering System",
    category: "Full Stack + AI",
    tagline: "QR-based smart menu with real-time ordering and AI assistant.",
    description: "Built a full-stack digital menu system that allows customers to scan a QR code, browse a dynamic menu, and place orders seamlessly. Integrated a Claude-powered AI agent capable of understanding natural language, recommending dishes, and executing actions like adding items to cart. Implemented real-time order tracking using Socket.io, multi-language support, and a modern animated UI. Designed for restaurant scalability with admin dashboard, secure APIs, and MongoDB-backed persistence.",
    tech: ["Next.js", "Node.js", "MongoDB", "Socket.io", "Claude AI", "Zustand", "Tailwind", "Framer Motion"],
    featured: true,
    date: "OCT 05, 2025",
    caption: "MENUOS_DESK_KITCHEN.PNG",
    imageUrl: "/menu.png",
    architectureDetails: [
      "Socket.io bi-directional synchronization for instant kitchen display updates and order status tracking",
      "Claude AI conversational agent answering allergen, preparation, and dish recommendation questions",
      "Custom kitchen dashboard with sound alerts and order status timeline"
    ],
    metrics: "Handles active order tables in real-time with sub-100ms sync latency",
    githubUrl: "https://github.com/Prodipsen27/menuOS",
    demoUrl: "https://menu-os-frontend.vercel.app/"
  },
  {
    id: "querycart",
    title: "QueryCart",
    category: "GenAI",
    tagline: "Natural language powered sales dashboard.",
    description: "Built a fullstack AI dashboard where users ask sales questions in plain English. GPT-4o converts the input into PostgreSQL queries, executes them on a live database, and renders results as interactive charts and tables — with a SQL validation layer to block all destructive queries.",
    tech: ["React", "Node.js", "PostgreSQL", "GPT-4o", "Recharts"],
    featured: false,
    date: "AUG 20, 2025",
    caption: "QUERYCART_ANALYTICS.PNG",
    imageUrl: "/demo.jpg",
    architectureDetails: [
      "GPT-4o converts user's natural language input into optimized PostgreSQL queries",
      "SQL validation safety layer checks schema reflection and prevents destructive commands",
      "Interactive charts and tables dynamically generated using Recharts based on query response schema"
    ],
    metrics: "Zero-code query creation and visualization in under 500ms",
    githubUrl: "https://github.com/Prodipsen27/Query-Studio",
    demoUrl: "https://query-chart.vercel.app/"
  },
  {
    id: "taraeffects",
    title: "TaraEffects Wedding Booking",
    category: "Creative Dev",
    tagline: "Interactive visual effects and motion-based UI.",
    description: "Created a visually immersive web experience with animated effects, smooth transitions, and creative UI interactions focused on aesthetics and engagement.",
    tech: ["JavaScript", "Animations", "Canvas", "UI"],
    featured: false,
    date: "JUL 15, 2025",
    caption: "TARAEFFECTS_UI_LIGHTS.PNG",
    imageUrl: "/taraeffects.jpg",
    architectureDetails: [
      "Custom HTML5 Canvas particle system simulating ambient wedding decoration lighting",
      "60 FPS smooth motion transitions and responsive layout optimization"
    ],
    metrics: "Maintains smooth 60 FPS animations on mobile devices",
    githubUrl: "https://github.com/Prodipsen27/tara-effects",
    demoUrl: "https://tara-effects.vercel.app/"
  },
  {
    id: "property-listing",
    title: "Property Listing Platform",
    category: "Frontend-Backend",
    tagline: "Listing platform with authentication & image uploads.",
    description: "Built a property listing platform with Passport.js authentication, Cloudinary image uploads, and Joi validation for secure and structured data handling.",
    tech: ["Node.js", "Express", "MongoDB", "Cloudinary"],
    featured: false,
    date: "JUN 10, 2025",
    caption: "PROPERTY_LISTINGS.PNG",
    imageUrl: "/chillbase.png",
    architectureDetails: [
      "Secure broker authentication via Passport.js and validation using Joi schemas",
      "Automated image upload pipeline utilizing Cloudinary optimization"
    ],
    metrics: "Over 500+ verified listings hosted securely",
    githubUrl: "https://github.com/Prodipsen27/chillbase",
    demoUrl: "https://velvet-horizon-neon.vercel.app/"
  },
  {
    id: "aurality-music",
    title: "Aurality – Music Platform",
    category: "Vibe-Code",
    tagline: "Music streaming platform with modern UI/UX.",
    description: "Designed and developed a visually rich portfolio website for artists with smooth animations, responsive layouts, and aesthetic UI focused on storytelling.",
    tech: ["UI/UX", "Framer Motion", "Stitch", "Claude", "Gemini", "Antigravity"],
    featured: false,
    date: "DEC 01, 2023",
    caption: "AURALITY_AUDIO_GEAR.PNG",
    imageUrl: "/aurality.png",
    architectureDetails: [
      "Tactile skeuomorphic audio controls with premium dark color accents",
      "Smooth Framer Motion transitions and interactive sound visualizers"
    ],
    metrics: "Vibe-code design experiment for high-fidelity audio aesthetics",
    githubUrl: "https://github.com/Prodipsen27/auralitymusicstreaming",
    demoUrl: "https://auralitymusicstreaming.vercel.app/"
  },
  {
    id: "artistly-booking",
    title: "Artistly.com Booking Platform",
    category: "Frontend",
    tagline: "Creative portfolio with modern UI/UX.",
    description: "Designed and developed a visually rich portfolio website for artists with smooth animations, responsive layouts, and aesthetic UI focused on storytelling.",
    tech: ["React", "Tailwind", "UI/UX", "Animations"],
    featured: false,
    date: "NOV 15, 2024",
    caption: "ARTISTLY_TALENT_GRID.PNG",
    imageUrl: "/artist.jpg",
    architectureDetails: [
      "Framer Motion staggered card reveals and dynamic layout transition animations",
      "Staggered grid layouts optimized for 99.9% screen accessibility"
    ],
    metrics: "High-end design concept showcase with smooth rendering performance",
    githubUrl: "https://github.com/Prodipsen27/artistly-testproject",
    demoUrl: "https://artistly-testproject-kijh.vercel.app/"
  }
];

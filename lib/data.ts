export type SkillMeta = {
  name: string;
  icon: string;
  isLucide?: boolean;
  isDevicon?: boolean;
  isFa?: boolean;
  faIcon?: string;
  level: number;
};

export type DetailItem = {
  title: string;
  subtitle?: string;
  featured?: boolean;
  isNew?: boolean;
  isCurrent?: boolean;
  company?: string;
  period?: string;
  venue?: string;
  description: string;
  stack: string[];
  link?: string;
  linkText?: string;
  deployedLink?: string;
  linkIcon?: string;
  visual?: string;
  screenshots?: string[];
};

export type DetailsData = {
  project: Record<string, DetailItem>;
  experience: Record<string, DetailItem>;
  publication: Record<string, DetailItem>;
  other: Record<string, DetailItem>;
};

export const detailsData: DetailsData = {
  project: {
    aistora: {
      title: "AIStora | Full-Stack Analytics Platform",
      subtitle: "Project",
      featured: true,
      isNew: false,
      description:
        "<p>Outperformed Pandas <strong>3×</strong> on sort, group-by, and join operations across 100K+ row datasets by architecting an in-memory columnar query engine in Python using Apache Arrow, delivering sub-second filtering and aggregation.</p><br/><p>Shipped a production-grade Flask REST API with JWT auth and RBAC for secure multi-tenant querying, backed by PostgreSQL with per-user schema isolation. Containerized via Docker Compose with <strong>85% test coverage</strong> and automated CI/CD via GitHub Actions.</p><br/><p>Built a React dashboard with Recharts enabling non-technical users to query and visualize large datasets without writing SQL — closing the loop from raw data to insight in under 3 clicks.</p>",
      stack: [
        "Python",
        "Flask",
        "PostgreSQL",
        "Apache Arrow",
        "Docker",
        "GitHub Actions",
        "React",
        "JWT",
      ],
      link: "https://github.com/naga251602/aistora",
      linkText: "Repository",
      linkIcon: "github",
      visual:
        "PostgreSQL Database<br/>↓<br/>Flask API & Columnar Engine<br/>↓<br/>React Dashboard",
      screenshots: ["/demo_aistora.gif"],
    },
    graphql: {
      title: "GraphQL Task Management API",
      subtitle: "Project",
      featured: true,
      isNew: false,
      description:
        "<p>Held <strong>sub-100ms p99 latency at 1,000+ concurrent WebSocket connections</strong> by designing a schema-first GraphQL API with FastAPI and Strawberry, integrating Redis DataLoader batching to eliminate N+1 query overhead.</p><br/><p>Reduced average payload size <strong>60%</strong> on deeply nested task/subtask queries versus equivalent REST endpoints, with OAuth 2.0 PKCE flow handling auth across the full connection lifecycle.</p>",
      stack: [
        "FastAPI",
        "GraphQL",
        "Strawberry",
        "Redis",
        "Python",
        "OAuth 2.0",
        "WebSockets",
      ],
      link: "https://github.com/naga251602/todo-graphql",
      linkText: "Repository",
      linkIcon: "github",
      visual:
        "FastAPI + Strawberry GraphQL<br/>↓<br/>Redis DataLoader Batching<br/>↓<br/>1K+ Concurrent WebSockets",
      screenshots: [],
    },
    ipl_predictor: {
      title: "Deep Neural Net IPL Predictor | Multi-Modal Win Forecasting",
      subtitle: "Project",
      featured: false,
      isNew: true,
      description:
        "<p>Achieved <strong>80% test accuracy</strong> on 2025 IPL match outcomes by building a multi-modal deep learning framework integrating performance data from 13 cricket leagues across 235 players, with league-quality weighting and recency decay.</p><br/><p>Designed a Dynamic OVR rating system (55–97 scale) feeding a 4-source weighted attention transformer with learnable fusion weights, capturing phase-specific batting (Top Order, Middle, Finisher) and bowling (Powerplay, Middle, Death) performance.</p><br/><p>Boosted reliability to a <strong>Brier score of 0.24</strong> by combining a 2-layer Graph Attention Network modeling batter-bowler matchup asymmetries with a 10,000-iteration Monte Carlo simulation engine, deployed as a Flask API with SHAP explainability at sub-2s latency.</p>",
      stack: [
        "Python",
        "PyTorch",
        "Flask",
        "Graph Attention Networks",
        "Monte Carlo Simulation",
        "React",
        "SHAP",
      ],
      link: "https://github.com/Nikhilr-28/Deep-Neural-Network-IPL-Prediction",
      linkText: "Repository",
      linkIcon: "github",
      visual:
        "13-League Data Pipeline<br/>↓<br/>Dynamic OVR Ratings<br/>↓<br/>GAT + Monte Carlo Engine",
      screenshots: ["/demo_ipl.png", "/demo_ipl.png"],
    },
    pricewatch: {
      title: "PriceWatch | Automated Price Drop Tracker with Email Alerts",
      subtitle: "Project",
      featured: false,
      isNew: true,
      description:
        "<p>Cut user response time to deals from hours to <strong>under 60 seconds</strong> by building a Cheerio-based scraping pipeline that parses live product prices and fires instant transactional emails via Nodemailer the moment a target price hits.</p><br/><p>Reduced redundant scrape requests <strong>~40%</strong> across 200+ tracked products by implementing cross-user URL deduplication on hourly cron checks, lowering infrastructure cost without sacrificing freshness.</p><br/><p>Secured the platform with Supabase Auth (email/password + Google OAuth) and Row Level Security policies, plus a token-based one-click unsubscribe flow requiring no login.</p>",
      stack: [
        "Next.js",
        "Supabase",
        "PostgreSQL",
        "Cheerio",
        "Nodemailer",
        "Tailwind CSS",
      ],
      link: "https://github.com/naga251602/pricewatch",
      linkText: "Repository",
      linkIcon: "github",
      visual:
        "Product URL + Target Price<br/>↓<br/>Cheerio Scraper + Cron<br/>↓<br/>Email Alert + Unsubscribe",
      deployedLink: "https://pricewatch-eight-rosy.vercel.app/",
      screenshots: ["/demo_pricewatch.gif"],
    },
    orilix: {
      title: "Orilix | AI-Powered Dental Patient Management",
      subtitle: "Project",
      featured: false,
      isNew: false,
      description:
        "<p>Cut patient intake time <strong>~70%</strong> across 3 clinic workflows by building unique per-patient sharable onboarding questionnaire links that auto-populate the day's visitor list on submission.</p><br/><p>Reduced manual charting time <strong>60%</strong> (~15 min per appointment) by combining voice notes with AI-generated SOAP note summarization, eliminating documentation friction for clinicians.</p><br/><p>Engineered an interactive 3D dental model in Three.js for in-app note-taking directly on tooth surfaces, with Firebase as the real-time backend for patient data and authentication.</p>",
      stack: ["Flask", "Firebase", "Three.js", "Python", "JavaScript"],
      link: "https://github.com/naga251602/orilix",
      linkText: "Repository",
      linkIcon: "github",
      visual:
        "Firebase Auth & DB<br/>↓<br/>Flask API + AI Summarization<br/>↓<br/>Three.js 3D Dental Model",
      screenshots: [],
    },
    gblog: {
      title: "GBlog | Static Blogging Platform",
      subtitle: "Project",
      featured: false,
      isNew: false,
      description:
        "<p>Achieved <strong>Lighthouse 95+ scores</strong> on mobile and desktop by combining Next.js SSG with Incremental Static Regeneration and on-demand revalidation via Supabase Webhooks, serving pages in under 200ms.</p><br/><p>Improved tag and category search from <strong>O(n) to O(log n)</strong> by implementing a self-balancing AVL tree index over post metadata, with automatic rebalancing on every content update.</p>",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "Data Structures",
      ],
      link: "https://github.com/naga251602/gblog",
      linkText: "Repository",
      linkIcon: "github",
      visual: "",
      screenshots: ["/public/demo_gblog.png"],
    },
    supablog: {
      title: "SupaBlog | Node.js Blog Platform",
      subtitle: "Project",
      featured: false,
      isNew: false,
      description:
        "<p>Built a full-stack server-rendered blogging platform using Node.js and Express with EJS templating, integrating Supabase as a backend-as-a-service for PostgreSQL database management and authentication.</p><br/><p>Implemented a complete user authentication system using Supabase Auth with secure session management via express-session, supporting sign-up, sign-in, and logout flows with protected routes for authenticated users.</p><br/><p>Designed RESTful routes for full CRUD blog post operations — create, list, and view — with environment-based configuration via dotenv and consistent UI structure using express-ejs-layouts.</p>",
      stack: [
        "Node.js",
        "Express.js",
        "EJS",
        "Supabase",
        "PostgreSQL",
        "express-session",
        "CSS",
      ],
      link: "https://github.com/naga251602/supablog",
      linkText: "Repository",
      linkIcon: "github",
      visual:
        "Supabase Auth & PostgreSQL<br/>↓<br/>Express.js REST Routes<br/>↓<br/>EJS Server-Rendered Views",
      screenshots: [],
    },
    easymigrate: {
      title: "EasyMigrate | Universal Database Migration Tool",
      subtitle: "Project",
      featured: false,
      isNew: false,
      description:
        "<p>Built a universal any-to-any database migration CLI tool supporting <strong>6 SQL dialects</strong> (PostgreSQL, MySQL, SQLite, SQL Server, MariaDB, OracleDB), enabling cross-database schema and data transfer through a single command.</p><br/><p>Leveraged SQLAlchemy's cross-dialect abstraction layer to extract source schema (tables, columns, views), recreate it on the target, and faithfully transfer data — handling dialect differences transparently under the hood.</p><br/><p>Packaged as a pip-installable Python CLI with a minimal interface (just source and target connection URLs), pytest test suite, and open for community contributions under the MIT License.</p>",
      stack: [
        "Python",
        "SQLAlchemy",
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "SQL Server",
        "pytest",
      ],
      link: "https://github.com/naga251602/easymigrate",
      linkText: "Repository",
      linkIcon: "github",
      visual:
        "Source Database (any)<br/>↓<br/>SQLAlchemy Migration Engine<br/>↓<br/>Target Database (any)",
      screenshots: [],
    },
    gchat: {
      title: "GChat | Real-Time Messaging App",
      subtitle: "Project",
      featured: false,
      isNew: false,
      description:
        "<p>Delivered <strong>sub-second message latency</strong> by architecting a Next.js App Router app with Firestore real-time listeners, Google OAuth authentication, and live typing indicators.</p><br/><p>Built a modular component structure separating chat UI, auth context, and Firebase initialization layers, with full TypeScript type safety across shared interfaces and React Context-based auth state management.</p><br/><p>Designed a fully responsive, WCAG-compliant accessible UI with Tailwind CSS optimized across mobile, tablet, and desktop, enforced by ESLint for consistent code quality throughout the codebase.</p>",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Firebase",
        "Firestore",
        "Tailwind CSS",
        "ESLint",
      ],
      link: "https://github.com/naga251602/gchat",
      linkText: "Repository",
      linkIcon: "github",
      visual:
        "Firebase Auth (Google)<br/>↓<br/>Firestore Real-Time Listeners<br/>↓<br/>Next.js App Router UI",
      screenshots: [],
    },
  },

  experience: {
    aadithya: {
      title: "Software Engineer (Full Stack)",
      company: "Aadithya Cars",
      period: "Apr 2024 - Nov 2024",
      isCurrent: false,
      featured: false,
      subtitle: "Aadithya Cars • Apr 2024 - Nov 2024",
      description: `<ul class="list-disc pl-4 space-y-2">
        <li>Cut initial page load <strong>75% (3.2s → 800ms)</strong> via lazy loading, code splitting, and Brotli compression, raising Lighthouse Performance score to <strong>95+</strong>.</li>
        <li>Scaled data ingestion <strong>4×</strong> by replacing monolithic CSV ingestion with a chunk-based streaming pipeline, eliminating OOM crashes across 500K+ row inventory datasets.</li>
        <li>Hit <strong>99.5% uptime</strong> by integrating third-party valuation and financing APIs with exponential-backoff retry and circuit-breaker patterns, cutting time-to-interactive by 40%.</li>
        <li>Improved SQL query performance <strong>35%</strong> via composite index design and query plan analysis on PostgreSQL tables with 1M+ records.</li>
      </ul>`,
      stack: [
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "JavaScript",
        "System Architecture",
      ],
      link: "",
      linkText: "",
      visual: "",
    },
    virtusa_2: {
      title: "Software Engineering Intern",
      company: "Virtusa",
      period: "Dec 2023 - Apr 2024",
      isCurrent: false,
      featured: false,
      subtitle: "Virtusa • Dec 2023 - Apr 2024",
      description: `<ul class="list-disc pl-4 space-y-2">
        <li>Cut manual stock discrepancy errors <strong>~40%</strong> as <strong>sole backend owner</strong> of the EMart Inventory Management System (Spring Boot, Angular, MySQL), coordinating 3 engineers and shipping real-time stock tracking, expiry alerting 2–3 days in advance, and a maker-checker approval workflow.</li>
        <li>Reduced invoice processing from <strong>~2 days to same-day</strong> by building a SHA-256 validated CSV ingestion pipeline across 3 backend modules (Public Employment Center, Tamil Nadu EB Bill System, barcode generation), auto-generating signed PDF invoices emailed to vendors.</li>
      </ul>`,
      stack: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "Spring AOP",
        "Hibernate",
        "Angular",
        "MySQL",
        "REST APIs",
      ],
      link: "",
      linkText: "",
      visual: "",
    },
    rmk_ra: {
      title: "Research Assistant",
      company: "R.M.K Engineering College",
      period: "Sep 2023 - Apr 2024",
      isCurrent: false,
      subtitle: "R.M.K Engineering College • Sep 2023 - Apr 2024",
      description: `<ul class="list-disc pl-4 space-y-2">
        <li>Co-authored <strong>3 IEEE conference papers</strong> by implementing Python backend systems integrating sentiment analysis, text generation, and DenseNet medical image classification models — with one paper winning <strong>Best Paper, 3rd Place at ICCDS 2024</strong>.</li>
        <li>Built data ingestion and preprocessing pipelines supporting 3 ML research projects under faculty supervision, contributing to experimental evaluation and manuscript preparation across <strong>7 total citations</strong>.</li>
      </ul>`,
      stack: [
        "Python",
        "PyTorch",
        "Machine Learning",
        "NLP",
        "Computer Vision",
      ],
      link: "",
      linkText: "",
      visual: "",
    },
    virtusa_1: {
      title: "Software Engineering Intern",
      company: "Virtusa",
      period: "Jul 2022 - Aug 2022",
      isCurrent: false,
      featured: false,
      subtitle: "Virtusa • Jul 2022 - Aug 2022",
      description: `<ul class="list-disc pl-4 space-y-2">
        <li>Delivered a full-stack <strong>e-commerce grocery platform</strong> (Spring MVC, Angular 9+, MySQL) end-to-end in 6 weeks as team lead of 3, covering product catalog, cart, checkout, and order management across 5 core user flows.</li>
        <li>Engineered <strong>8 REST endpoints</strong> with Hibernate ORM and Spring Security, holding <strong>sub-3s page load</strong> under simulated 50-user load during final demo review.</li>
      </ul>`,
      stack: [
        "Java",
        "Spring MVC",
        "Spring Security",
        "Hibernate",
        "Angular",
        "MySQL",
        "REST APIs",
        "Bootstrap",
      ],
      link: "",
      linkText: "",
      visual: "",
    },
    sawbon: {
      title: "Software Development Intern",
      company: "SAWBON",
      period: "Feb 2022 - Mar 2022",
      isCurrent: false,
      subtitle: "SAWBON • Feb 2022 - Mar 2022",
      description: `<ul class="list-disc pl-4 space-y-2">
        <li>Sustained <strong>sub-250ms p95 response times</strong> at <strong>500 concurrent users</strong> with zero downtime by building concurrent Go REST APIs using goroutines, channels, and connection pooling against MongoDB.</li>
        <li>Cut median API latency <strong>15%</strong> and reduced DB read load <strong>30%</strong> by implementing Redis cache-aside with TTL-based invalidation across server-rendered Remix.js components.</li>
        <li>Achieved <strong>78% code coverage</strong> on critical service paths via unit and integration tests using Go's testing package.</li>
      </ul>`,
      stack: ["Go", "Redis", "MongoDB", "REST APIs", "Concurrency", "Remix.js"],
      link: "",
      linkText: "",
      visual: "",
    },
  },

  publication: {
    human_ai: {
      title:
        "Human-AI Collaboration for Backend Text Generation: Dynamic Content Recommendation for Websites based on Keywords",
      subtitle: "ICCDS 2024 | Best Paper, 3rd Place | Citations: 4",
      venue: "ICCDS 2024",
      featured: true,
      isNew: false,
      description:
        "<p><strong>🏆 Awarded Best Paper, 3rd Place</strong> at the 2024 International Conference on Computing and Data Science.</p><br/><p>Co-developed a keyword-driven content recommendation engine leveraging GPT-based AI pipelines to dynamically generate and personalize backend website copy, reducing manual authoring time by 60%.</p><br/><p>Evaluated system output quality against human-authored baselines through user studies with 40+ participants measuring coherence, relevance, and preference scores.</p>",
      stack: ["Python", "NLP", "GPT"],
      link: "https://ieeexplore.ieee.org/abstract/document/10560437",
      linkText: "Read Paper",
      linkIcon: "file-text",
      visual: "",
    },
    iccds2024: {
      title: "Sentiment-Based Drug Recommendation System",
      subtitle: "ICCDS 2024 | Citations: 3",
      venue: "ICCDS 2024",
      featured: false,
      isNew: false,
      description:
        "<p>Co-developed an NLP pipeline using fine-tuned BERT on domain-specific patient review corpora to classify sentiment and generate ranked drug recommendations at <strong>88% classification accuracy</strong>.</p><br/><p>Evaluated against TF-IDF and LSTM baselines, demonstrating a 12-point F1 improvement from transfer learning with biomedical pretraining.</p>",
      stack: ["Python", "NLP", "BERT"],
      link: "https://www.researchgate.net/profile/Shai-Kumar/publication/394529865",
      linkText: "Read Paper",
      linkIcon: "file-text",
      visual: "",
    },
    iccn2024: {
      title: "Automated Pneumonia Detection using DenseNet",
      subtitle: "ICCN 2024",
      venue: "ICCN 2024",
      featured: false,
      isNew: true,
      description:
        "<p>Co-trained DenseNet-121 on the CheXpert chest X-ray dataset with augmentation and class-weighting to handle label imbalance, achieving <strong>92% precision-recall AUC</strong> on the held-out test set.</p><br/><p>Benchmarked against ResNet-50 and VGG-16; DenseNet outperformed by 6% AUC via dense skip connections enabling richer feature reuse across layers.</p>",
      stack: ["Python", "Computer Vision", "PyTorch", "DenseNet"],
      link: "https://link.springer.com/chapter/10.1007/978-981-96-6124-4_8",
      linkText: "Read Paper",
      linkIcon: "file-text",
      visual: "",
    },
  },

  other: {
    printstruct: {
      title: "Contributor — PrintStruct",
      subtitle: "Open Source",
      isNew: false,
      description:
        "<p>Contributed to PrintStruct, a Python CLI tool on PyPI that visualizes project directory structures while respecting .gitignore rules.</p><br/><p>Refactored project structure for clarity, eliminated code duplication to reduce technical debt, and improved README documentation to lower barrier for new contributors.</p>",
      stack: ["Python", "Open Source"],
      link: "https://pypi.org/project/PrintStruct/",
      linkText: "PyPI Package",
      linkIcon: "package",
    },
    award_paper: {
      title: "Best Paper Presentation — 3rd Place",
      subtitle: "Achievement · ICCDS 2024",
      isNew: false,
      description:
        "<p>Awarded at the 2024 International Conference on Computing and Data Science for the paper 'Human-AI Collaboration for Backend Text Generation: Dynamic Content Recommendation for Websites based on Keywords'.</p>",
      stack: [],
      link: "",
      linkText: "",
      linkIcon: "award",
    },
    imagine_cup: {
      title: "Microsoft Imagine Cup",
      subtitle: "Hackathon",
      isNew: false,
      description:
        "<p>Built a collaborative platform connecting researchers, doctors, and patients to share medical reports and treatment knowledge for rare disease research.</p>",
      stack: ["React", "Node.js", "MongoDB"],
      link: "",
      linkText: "",
      linkIcon: "award",
    },
    shell_ai: {
      title: "Shell.ai Hackathon: EV Charging Challenge",
      subtitle: "Hackathon",
      isNew: false,
      description:
        "<p>Optimized an EV charging network topology to remain robust under demographic shifts and meet dynamic customer demand.</p>",
      stack: ["Python", "Pandas", "Algorithms"],
      link: "",
      linkText: "",
      linkIcon: "award",
    },
    smart_india: {
      title: "Smart India Hackathon",
      subtitle: "Hackathon",
      isNew: false,
      description:
        "<p>Developed an AI/ML-integrated e-learning portal for children, combining adaptive content delivery with modern machine learning algorithms.</p>",
      stack: ["Machine Learning", "Python"],
      link: "",
      linkText: "",
      linkIcon: "award",
    },
    cert_python: {
      title: "The Complete Python Developer",
      subtitle: "Certification",
      isNew: false,
      description:
        "<p>Comprehensive Udemy certification covering Python programming, testing, structure, and applications.</p>",
      stack: ["Python"],
      link: "https://www.udemy.com/certificate/UC-c23117b4-83ba-4b34-97ea-4bf9f3d96519/",
      linkText: "View Credential",
      linkIcon: "award",
    },
    cert_sql: {
      title: "SQL Masterclass: Beginner to Developer",
      subtitle: "Certification",
      isNew: false,
      description:
        "<p>Advanced Udemy certification for database management and querying optimizations using SQL.</p>",
      stack: ["SQL", "PostgreSQL"],
      link: "https://www.udemy.com/certificate/UC-b0d5fd8b-6986-4c12-8470-f06d6762500f/",
      linkText: "View Credential",
      linkIcon: "award",
    },
    cert_ml: {
      title: "Machine Learning Foundations: Linear Algebra",
      subtitle: "Certification",
      isNew: false,
      description:
        "<p>LinkedIn Learning certification on the core mathematical foundations of AI algorithms.</p>",
      stack: ["Machine Learning"],
      link: "",
      linkText: "",
      linkIcon: "award",
    },
    cert_react: {
      title: "Complete React Developer 2022",
      subtitle: "Certification",
      isNew: false,
      description:
        "<p>Comprehensive certification covering modern React features, state management, and ecosystem.</p>",
      stack: ["React"],
      link: "",
      linkText: "",
      linkIcon: "award",
    },
    cert_cp: {
      title: "Competitive Programming — Live",
      subtitle: "Coding Platform",
      isNew: false,
      description:
        "<p>GeeksForGeeks certification for advanced algorithms and data structure implementations.</p>",
      stack: ["Algorithms", "Data Structures"],
      link: "https://www.geeksforgeeks.org/certificate/9354614c6c49cc68c6dc158d4bd783bd",
      linkText: "View Credential",
      linkIcon: "code",
    },
  },
};

export const statsData = [
  { value: "2+", label: "Years Experience" },
  {
    value: `${Object.keys(detailsData.project).length}`,
    label: "Projects Built",
  },
  { value: "3", label: "Papers Published" },
];

export const skillsConfig: Record<string, SkillMeta[]> = {
  Languages: [
    { name: "Python", icon: "devicon-python-plain", level: 95 },
    { name: "Go", icon: "devicon-go-plain", level: 85 },
    { name: "TypeScript", icon: "devicon-typescript-plain", level: 90 },
    { name: "JavaScript", icon: "devicon-javascript-plain", level: 90 },
    { name: "SQL", icon: "devicon-sqldeveloper-plain", level: 90 },
    { name: "Java", icon: "devicon-java-plain", level: 85 },
    { name: "C++", icon: "devicon-cplusplus-plain", level: 75 },
  ],
  Backend: [
    { name: "FastAPI", icon: "devicon-fastapi-plain", level: 90 },
    { name: "Spring Boot", icon: "devicon-spring-plain", level: 85 },
    { name: "Flask", icon: "devicon-flask-original", level: 85 },
    { name: "Node.js", icon: "devicon-nodejs-plain", level: 80 },
    { name: "GraphQL", icon: "devicon-graphql-plain", level: 85 },
    { name: "REST APIs", icon: "fa-code", isFa: true, level: 95 },
    { name: "WebSockets", icon: "fa-bolt", isFa: true, level: 80 },
    { name: "JWT", icon: "fa-shield-halved", isFa: true, level: 85 },
  ],
  Frontend: [
    { name: "React", icon: "devicon-react-original", level: 90 },
    { name: "Next.js", icon: "devicon-nextjs-plain", level: 90 },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain", level: 90 },
    { name: "HTML/CSS", icon: "devicon-html5-plain", level: 95 },
  ],
  Databases: [
    { name: "PostgreSQL", icon: "devicon-postgresql-plain", level: 90 },
    { name: "MySQL", icon: "devicon-mysql-plain", level: 85 },
    { name: "MongoDB", icon: "devicon-mongodb-plain", level: 80 },
    { name: "Redis", icon: "devicon-redis-plain", level: 85 },
    { name: "SQLite", icon: "devicon-sqlite-plain", level: 80 },
  ],
  Infrastructure: [
    { name: "Docker", icon: "devicon-docker-plain", level: 85 },
    { name: "Kubernetes", icon: "devicon-kubernetes-plain", level: 70 },
    {
      name: "AWS",
      icon: "devicon-amazonwebservices-plain-wordmark",
      level: 80,
    },
    { name: "GitHub Actions", icon: "devicon-githubactions-plain", level: 85 },
    { name: "Linux", icon: "devicon-linux-plain", level: 90 },
    { name: "Nginx", icon: "devicon-nginx-original", level: 80 },
  ],
  "ML / Data": [
    { name: "PyTorch", icon: "devicon-pytorch-plain", level: 80 },
    { name: "Pandas", icon: "devicon-pandas-plain", level: 90 },
    { name: "scikit-learn", icon: "devicon-scikitlearn-plain", level: 85 },
    { name: "NumPy", icon: "devicon-numpy-plain", level: 90 },
    { name: "BERT", icon: "fa-brain", isFa: true, level: 80 },
    { name: "DenseNet", icon: "fa-network-wired", isFa: true, level: 80 },
  ],
  Core: [
    { name: "System Design", icon: "fa-layer-group", isFa: true, level: 85 },
    { name: "Concurrency", icon: "fa-code-branch", isFa: true, level: 90 },
    {
      name: "Performance Optimization",
      icon: "fa-gauge-high",
      isFa: true,
      level: 90,
    },
    { name: "Data Structures", icon: "fa-database", isFa: true, level: 95 },
    { name: "Algorithms", icon: "fa-microchip", isFa: true, level: 95 },
  ],
};

export const citations: Record<string, string> = {
  human_ai: `@inproceedings{venkataramanan2024humanai,\n  title={Human-AI Collaboration for Backend Text Generation},\n  booktitle={ICCDS 2024},\n  year={2024}\n}`,
  iccds2024: `@inproceedings{venkataramanan2024sentiment,\n  title={Sentiment-Based Drug Recommendation System},\n  booktitle={ICCDS 2024},\n  year={2024}\n}`,
  iccn2024: `@inproceedings{venkataramanan2024pneumonia,\n  title={Automated Pneumonia Detection using DenseNet},\n  booktitle={ICCN 2024},\n  year={2024}\n}`,
};

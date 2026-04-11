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
        "<p>Architected an in-memory columnar query engine in Python processing 100K+ row datasets with sub-second filtering, grouping, and aggregation outperforming naive pandas by 3x on benchmarks.</p><br/><p>Exposed functionality via Flask REST APIs with JWT auth and RBAC, supporting secure multi-tenant querying with per-user schema isolation backed by PostgreSQL. Containerized all microservices with Docker Compose and automated CI/CD via GitHub Actions, maintaining 85% test coverage.</p><br/><p>Built a React dashboard with real-time chart rendering using Recharts, enabling non-technical users to query and visualize large datasets without SQL knowledge.</p>",
      stack: ["Python", "Flask", "PostgreSQL", "Docker", "GitHub Actions", "Tailwind CSS", "JWT"],
      link: "https://github.com/naga251602/aistora",
      linkText: "Repository",
      linkIcon: "github",
      visual: "PostgreSQL Database<br/>↓<br/>Flask API & Columnar Engine<br/>↓<br/>React Dashboard",
      screenshots: ["/demo_aistora.gif"],

    },
    pricewatch: {
    title: "PriceWatch | Automated Price Drop Tracker with Email Alerts",
    subtitle: "Project",
    featured: false,
    isNew: true,
    description:
      "<p>Built a full-stack price tracking web app where users paste any product URL, set a target price, and receive an automated email alert the moment the price drops to their target.</p><br/><p>Implemented a Cheerio-based scraping engine that parses live prices from product pages across major retailers, with a cron-driven automation layer that checks all tracked products on a schedule and fires transactional emails via Nodemailer SMTP.</p><br/><p>Secured the platform with Supabase Auth (email/password + Google OAuth) and Row Level Security policies ensuring users only access their own data. Built an unsubscribe token system allowing one-click opt-out from email alerts without requiring login.</p>",
    stack: ["Next.js", "Supabase", "PostgreSQL", "Cheerio", "Nodemailer", "Tailwind CSS"],
    link: "https://github.com/naga251602/pricewatch",
    linkText: "Repository",
    linkIcon: "github",
    visual: "Product URL + Target Price<br/>↓<br/>Cheerio Scraper + Cron<br/>↓<br/>Email Alert + Unsubscribe",
    deployedLink:"https://pricewatch-eight-rosy.vercel.app/",
    screenshots: ["/demo_pricewatch.gif"],
  },
    ipl_predictor: {
      title: "Deep Neural Net IPL Predictor | Multi-Modal Win Forecasting",
      subtitle: "Project",
      featured: false,
      isNew: true,
      description:
        "<p>Built a multi-modal deep learning framework for IPL match outcome prediction achieving 80% test accuracy on 2025 IPL matches, integrating performance data from 13 cricket competitions across 235 players using league-quality weighting and recency decay.</p><br/><p>Designed a Dynamic OVR rating system (55-97 scale) with phase-specific scores for batting positions (Top Order, Middle, Finisher) and bowling phases (Powerplay, Middle, Death), feeding a 4-source weighted attention transformer with learnable fusion weights.</p><br/><p>Enhanced predictions with a 2-layer Graph Attention Network modeling batter-bowler confrontation asymmetries, combined with a 10,000-iteration Monte Carlo simulation engine yielding a Brier score of 0.24. Deployed as a production Flask API with SHAP explainability and sub-2-second latency.</p>",
      stack: ["Python", "PyTorch", "Flask", "Graph Attention Networks", "Monte Carlo Simulation", "React"],
      link: "https://github.com/Nikhilr-28/Deep-Neural-Network-IPL-Prediction",
      linkText: "Repository",
      linkIcon: "github",
      visual: "13-League Data Pipeline<br/>↓<br/>Dynamic OVR Ratings<br/>↓<br/>GAT + Monte Carlo Engine",
      screenshots: ["/demo_ipl.png", "/demo_ipl.png"],
    },
    graphql: {
      title: "GraphQL Task Management API",
      subtitle: "Project",
      featured: false,
      isNew: false,
      description:
        "<p>Designed a schema-first GraphQL API using FastAPI and Strawberry, eliminating REST over-fetching and reducing average payload size by 60% on deeply nested task/subtask queries.</p><br/><p>Integrated Redis DataLoader batching and OAuth 2.0 PKCE flow supporting 1000+ concurrent WebSocket connections at sub-100ms p99 latency under load testing.</p>",
      stack: ["FastAPI", "GraphQL", "Redis", "Python", "OAuth 2.0", "WebSockets"],
      link: "https://github.com/naga251602/todo-graphql",
      linkText: "Repository",
      linkIcon: "github",
      visual: "",
      screenshots: [],
    },
    gblog: {
      title: "GBlog | Static Blogging Platform",
      subtitle: "Project",
      featured: false,
      isNew: false,
      description:
        "<p>Built a Next.js SSG platform with Incremental Static Regeneration and automatic image optimization, achieving 95+ Lighthouse score on mobile and desktop audits.</p><br/><p>Implemented a custom AVL tree search index over post metadata, improving tag/category lookup from O(n) to O(log n) with automatic rebalancing on content updates.</p>",
      stack: ["Next.js", "React", "Data Structures", "TypeScript", "Tailwind CSS"],
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
      stack: ["Node.js", "Express.js", "EJS", "Supabase", "PostgreSQL", "express-session", "CSS"],
      link: "https://github.com/naga251602/supablog",
      linkText: "Repository",
      linkIcon: "github",
      visual: "Supabase Auth & PostgreSQL<br/>↓<br/>Express.js REST Routes<br/>↓<br/>EJS Server-Rendered Views",
      screenshots: [],
    },
    easymigrate: {
      title: "EasyMigrate | Universal Database Migration Tool",
      subtitle: "Project",
      featured: false,
      isNew: false,
      description:
        "<p>Built a universal any-to-any database migration CLI tool supporting PostgreSQL, MySQL, SQLite, SQL Server, MariaDB, and OracleDB — enabling seamless schema and data transfer across heterogeneous database systems with a single command.</p><br/><p>Leveraged SQLAlchemy's cross-database abstraction layer to extract source schema (tables, columns, views), recreate it on the target, and transfer data faithfully — handling dialect differences transparently under the hood.</p><br/><p>Packaged as an installable Python CLI via pip, keeping the interface minimal: just source and target connection URLs. Includes a pytest test suite and is open for community contributions under the MIT License.</p>",
      stack: ["Python", "SQLAlchemy", "PostgreSQL", "MySQL", "SQLite", "SQL Server", "pytest"],
      link: "https://github.com/naga251602/easymigrate",
      linkText: "Repository",
      linkIcon: "github",
      visual: "Source Database (any)<br/>↓<br/>SQLAlchemy Migration Engine<br/>↓<br/>Target Database (any)",
      screenshots: [],
    },
    gchat: {
      title: "GChat | Real-Time Messaging App",
      subtitle: "Project",
      featured: false,
      isNew: false,
      description:
        "<p>Built a real-time messaging application with Next.js App Router and Firebase, featuring Google OAuth authentication, instant message delivery via Firestore, and live typing indicators — all with sub-second latency.</p><br/><p>Architected a modular component structure separating chat UI, auth context, and Firebase initialization layers, with full TypeScript type safety across shared interfaces and React Context-based auth state management.</p><br/><p>Designed a fully responsive, accessible UI with Tailwind CSS adhering to WCAG principles, optimized across mobile, tablet, and desktop — with ESLint enforcing consistent code quality throughout the codebase.</p>",
      stack: ["Next.js", "React", "TypeScript", "Firebase", "Firestore", "Tailwind CSS", "ESLint"],
      link: "https://github.com/naga251602/gchat",
      linkText: "Repository",
      linkIcon: "github",
      visual: "Firebase Auth (Google)<br/>↓<br/>Firestore Real-Time Listeners<br/>↓<br/>Next.js App Router UI",
      screenshots: [],
    },
  },

  experience: {
    aadithya: {
      title: "Freelance Full-Stack Developer",
      company: "Aadithya Cars",
      period: "Apr 2024 - Nov 2024",
      isCurrent: false,
      featured: false,
      subtitle: "Aadithya Cars • Apr 2024 - Nov 2024",
      description: `<ul class="list-disc pl-4 space-y-2">
        <li>Reduced page load time <strong>75% (3.2s → 800ms)</strong> via lazy loading, code splitting, and Brotli compression, raising Lighthouse Performance score to 95+.</li>
        <li>Replaced monolithic CSV ingestion with a chunk-based streaming pipeline, eliminating OOM crashes and achieving <strong>4× throughput</strong> on 500K+ row inventory datasets.</li>
        <li>Integrated third-party valuation and financing APIs with exponential-backoff retry and circuit-breaker patterns, maintaining <strong>99.5% uptime</strong> and cutting time-to-interactive by 40%.</li>
        <li>Improved SQL query performance <strong>35%</strong> via composite index design and query plan analysis on PostgreSQL tables with 1M+ records.</li>
      </ul>`,
      stack: ["React", "Node.js", "PostgreSQL", "JavaScript", "System Architecture"],
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
        <li>Led a team of 4 interns to deliver an <strong>EMart Inventory Management System</strong> (Spring Boot, Angular, MySQL) — real-time warehouse/shelf stock tracking, expiry alerting 2–3 days in advance, and maker-checker approval workflow, reducing manual stock discrepancy errors by ~40%.</li>
        <li>Shipped <strong>3 backend modules</strong> (Public Employment Center, Tamil Nadu EB Bill System, barcode generation) with a CSV ingestion pipeline validating SHA-256 hashes and auto-generating signed PDF invoices emailed to vendors, cutting invoice processing time from ~2 days to same-day.</li>
      </ul>`,
      stack: ["Java", "Java EE", "Spring Boot", "Spring Security", "Spring AOP", "Spring Hibernate", "Angular", "MySQL", "JDBC", "REST APIs"],
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
        <li>Led a team of 3 interns to build and demo a full-stack <strong>e-commerce grocery application</strong> (Spring MVC, Angular 9+, MySQL) end-to-end in 6 weeks — covering product catalog, cart, checkout, and order management across 5 core user flows.</li>
        <li>Designed <strong>8 RESTful API endpoints</strong> and a normalized MySQL schema with Spring Hibernate ORM; integrated Spring Security for auth, achieving &lt;3s page load under simulated 50-user load during final demo review.</li>
      </ul>`,
      stack: ["Java", "Spring MVC", "Spring Security", "Spring Hibernate", "Angular", "MySQL", "JDBC", "REST APIs", "Bootstrap"],
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
        <li>Contributed to the development of ML-driven applications under faculty supervision, supporting data ingestion, preprocessing pipelines, and backend integration.</li>
        <li>Implemented backend systems in Python integrating machine learning models for sentiment analysis, text generation, and medical image classification.</li>
        <li>Assisted in experimental evaluation, result analysis, and manuscript preparation, contributing to <strong>3 accepted IEEE conference publications</strong> (7 total citations).</li>
      </ul>`,
      stack: ["Python", "Machine Learning", "NLP", "Computer Vision"],
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
        <li>Built concurrent Go REST APIs using goroutines, channels, and connection pooling, sustaining <strong>sub-250ms p95 response times</strong> under 500 concurrent users with zero downtime.</li>
        <li>Implemented Redis cache-aside with TTL-based invalidation, reducing DB read load by <strong>30%</strong> and cutting median API latency by <strong>15%</strong>.</li>
        <li>Achieved <strong>78% code coverage</strong> on critical service paths via unit and integration tests using Go&apos;s testing package.</li>
      </ul>`,
      stack: ["Go", "Redis", "REST APIs", "Concurrency"],
      link: "",
      linkText: "",
      visual: "",
    },
  },

  publication: {
    human_ai: {
      title: "Human-AI Collaboration for Backend Text Generation: Dynamic Content Recommendation for Websites based on Keywords",
      subtitle: "ICCDS 2024 | Citations: 4",
      venue: "ICCDS 2024",
      featured: true,
      isNew: false,
      description:
        "<p>Co-developed a keyword-driven content recommendation engine leveraging GPT-based AI pipelines to dynamically generate and personalize backend website copy, reducing manual authoring time by 60%.</p><br/><p>Evaluated system output quality against human-authored baselines through user studies with 40+ participants measuring coherence, relevance, and preference scores.</p>",
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
        "<p>Co-developed an NLP pipeline using fine-tuned BERT on domain-specific patient review corpora to classify sentiment and generate ranked drug recommendations at 88% classification accuracy.</p><br/><p>Evaluated against TF-IDF and LSTM baselines, demonstrating a 12-point F1 improvement from transfer learning with biomedical pretraining.</p>",
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
        "<p>Co-trained DenseNet-121 on the CheXpert chest X-ray dataset with augmentation and class-weighting to handle label imbalance, achieving 92% precision-recall AUC on the held-out test set.</p><br/><p>Benchmarked against ResNet-50 and VGG-16; DenseNet outperformed by 6% AUC via dense skip connections enabling richer feature reuse across layers.</p>",
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
      description: "<p>Optimized an EV charging network topology to remain robust under demographic shifts and meet dynamic customer demand.</p>",
      stack: ["Python", "Pandas", "Algorithms"],
      link: "",
      linkText: "",
      linkIcon: "award",
    },
    smart_india: {
      title: "Smart India Hackathon",
      subtitle: "Hackathon",
      isNew: false,
      description: "<p>Developed an AI/ML-integrated e-learning portal for children, combining adaptive content delivery with modern machine learning algorithms.</p>",
      stack: ["Machine Learning", "Python"],
      link: "",
      linkText: "",
      linkIcon: "award",
    },
    cert_python: {
      title: "The Complete Python Developer",
      subtitle: "Certification",
      isNew: false,
      description: "<p>Comprehensive Udemy certification covering Python programming, testing, structure, and applications.</p>",
      stack: ["Python"],
      link: "https://www.udemy.com/certificate/UC-c23117b4-83ba-4b34-97ea-4bf9f3d96519/",
      linkText: "View Credential",
      linkIcon: "award",
    },
    cert_sql: {
      title: "SQL Masterclass: Beginner to Developer",
      subtitle: "Certification",
      isNew: false,
      description: "<p>Advanced Udemy certification for database management and querying optimizations using SQL.</p>",
      stack: ["SQL", "PostgreSQL"],
      link: "https://www.udemy.com/certificate/UC-b0d5fd8b-6986-4c12-8470-f06d6762500f/",
      linkText: "View Credential",
      linkIcon: "award",
    },
    cert_ml: {
      title: "Machine Learning Foundations: Linear Algebra",
      subtitle: "Certification",
      isNew: false,
      description: "<p>LinkedIn Learning certification on the core mathematical foundations of AI algorithms.</p>",
      stack: ["Machine Learning"],
      link: "",
      linkText: "",
      linkIcon: "award",
    },
    cert_react: {
      title: "Complete React Developer 2022",
      subtitle: "Certification",
      isNew: false,
      description: "<p>Comprehensive certification covering modern React features, state management, and ecosystem.</p>",
      stack: ["React"],
      link: "",
      linkText: "",
      linkIcon: "award",
    },
    cert_cp: {
      title: "Competitive Programming — Live",
      subtitle: "Coding Platform",
      isNew: false,
      description: "<p>GeeksForGeeks certification for advanced algorithms and data structure implementations.</p>",
      stack: ["Algorithms", "Data Structures"],
      link: "https://www.geeksforgeeks.org/certificate/9354614c6c49cc68c6dc158d4bd783bd",
      linkText: "View Credential",
      linkIcon: "code",
    },
    award_paper: {
      title: "Best Paper Presentation — 3rd Place",
      subtitle: "Achievement",
      isNew: false,
      description: "<p>Awarded at the 2024 International Conference on Computing and Data Science for the paper 'Human-AI Collaboration for Backend Text Generation'.</p>",
      stack: [],
      link: "",
      linkText: "",
      linkIcon: "award",
    },
  },
};

export const statsData = [
  { value: "2+", label: "Years Experience" },
  { value: `${Object.keys(detailsData.project).length - 1}+`, label: "Projects Built" },
  { value: "3", label: "Papers Published" },
];

export const skillsConfig: Record<string, SkillMeta[]> = {
  Languages: [
    { name: "Python", icon: "devicon-python-plain", level: 95 },
    { name: "Go", icon: "devicon-go-plain", level: 85 },
    { name: "C++", icon: "devicon-cplusplus-plain", level: 80 },
    { name: "C", icon: "devicon-c-plain", level: 75 },
    { name: "JavaScript", icon: "devicon-javascript-plain", level: 90 },
    { name: "TypeScript", icon: "devicon-typescript-plain", level: 85 },
    { name: "SQL", icon: "devicon-sqldeveloper-plain", level: 90 },
  ],
  Backend: [
    { name: "FastAPI", icon: "devicon-fastapi-plain", level: 90 },
    { name: "Flask", icon: "devicon-flask-original", level: 85 },
    { name: "Node.js", icon: "devicon-nodejs-plain", level: 80 },
    { name: "GraphQL", icon: "devicon-graphql-plain", level: 85 },
    { name: "REST APIs", icon: "fa-code", isFa: true, level: 95 },
    { name: "WebSockets", icon: "fa-bolt", isFa: true, level: 80 },
    { name: "JWT", icon: "fa-shield-halved", isFa: true, level: 85 },
  ],
  Frontend: [
    { name: "React", icon: "devicon-react-original", level: 90 },
    { name: "Next.js", icon: "devicon-nextjs-plain", level: 85 },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain", level: 90 },
    { name: "HTML/CSS", icon: "devicon-html5-plain", level: 95 },
  ],
  Databases: [
    { name: "PostgreSQL", icon: "devicon-postgresql-plain", level: 85 },
    { name: "MongoDB", icon: "devicon-mongodb-plain", level: 80 },
    { name: "Redis", icon: "devicon-redis-plain", level: 85 },
    { name: "SQLite", icon: "devicon-sqlite-plain", level: 80 },
  ],
  Infrastructure: [
    { name: "Docker", icon: "devicon-docker-plain", level: 85 },
    { name: "Kubernetes", icon: "devicon-kubernetes-plain", level: 70 },
    { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark", level: 80 },
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
    { name: "Data Structures", icon: "fa-database", isFa: true, level: 95 },
    { name: "Algorithms", icon: "fa-microchip", isFa: true, level: 95 },
  ],
};

export const citations: Record<string, string> = {
  human_ai: `@inproceedings{venkataramanan2024humanai,\n  title={Human-AI Collaboration for Backend Text Generation},\n  booktitle={ICCDS 2024},\n  year={2024}\n}`,
  iccds2024: `@inproceedings{venkataramanan2024sentiment,\n  title={Sentiment-Based Drug Recommendation System},\n  booktitle={ICCDS 2024},\n  year={2024}\n}`,
  iccn2024: `@inproceedings{venkataramanan2024pneumonia,\n  title={Automated Pneumonia Detection using DenseNet},\n  booktitle={ICCN 2024},\n  year={2024}\n}`,
};

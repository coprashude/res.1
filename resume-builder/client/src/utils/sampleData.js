export const SAMPLE_RESUME_DATA = {
  id: "demo-resume-101",
  title: "Senior Full-Stack Engineer Resume",
  templateId: "toronto",
  colorScheme: "classic-blue",
  fontId: "inter",
  spacing: "normal",
  personalDetails: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Full-Stack Software Architect",
    email: "alex.morgan@techlead.dev",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA (Open to Remote)",
    website: "https://alexmorgan.dev",
    linkedin: "linkedin.com/in/alexmorgan-dev",
    github: "github.com/alexmorgan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80"
  },
  professionalSummary: "Results-driven Software Architect with 8+ years designing fault-tolerant, high-concurrency cloud distributed systems. Proven track record leading cross-functional teams to build enterprise React and Node.js microservices serving 10M+ active users. Passionate about automated CI/CD pipelines, responsive UX design, and mentoring junior engineers.",
  workExperience: [
    {
      id: "exp-1",
      jobTitle: "Staff Software Engineer & Tech Lead",
      company: "CloudScale Technologies",
      location: "San Francisco, CA",
      startDate: "2021-03",
      endDate: "Present",
      current: true,
      description: "• Spearheaded the redesign of core distributed microservices architecture using React 18, Node.js, and TypeScript, improving p99 API latency by 42%.\n• Mentored a team of 12 full-stack engineers and established strict code review and end-to-end testing standards (Jest, Cypress).\n• Architected real-time WebSocket infrastructure processing 15,000+ events per second with 99.99% system uptime."
    },
    {
      id: "exp-2",
      jobTitle: "Senior Full-Stack Engineer",
      company: "Apex Digital Solutions",
      location: "Austin, TX",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      description: "• Built customer-facing dashboard and resume analytics reporting tool using React, Redux, and Node.js.\n• Optimized database query bottlenecks on PostgreSQL and Redis cache, cutting page loading times by 58%.\n• Collaborated closely with Product and UX teams to build accessible, WCAG AA compliant design systems."
    },
    {
      id: "exp-3",
      jobTitle: "Software Developer",
      company: "Vanguard Tech Labs",
      location: "Seattle, WA",
      startDate: "2016-08",
      endDate: "2018-05",
      current: false,
      description: "• Developed responsive Single Page Applications (SPAs) with modern JavaScript ES6+, HTML5, and RESTful APIs.\n• Automated deployment workflows with Docker and GitHub Actions, reducing release cycle time from 2 days to 30 minutes."
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "B.S. in Computer Science & Engineering",
      location: "Berkeley, CA",
      startDate: "2012-09",
      endDate: "2016-05",
      grade: "3.85 GPA - Magna Cum Laude",
      description: "President of ACM Student Chapter. Courses: Distributed Systems, Algorithms, Computer Architecture, Database Design."
    }
  ],
  skills: [
    { id: "sk-1", name: "JavaScript / TypeScript", level: 5, category: "Languages" },
    { id: "sk-2", name: "React / Next.js", level: 5, category: "Frontend" },
    { id: "sk-3", name: "Node.js / Express", level: 5, category: "Backend" },
    { id: "sk-4", name: "PostgreSQL & MongoDB", level: 4, category: "Databases" },
    { id: "sk-5", name: "Docker & Kubernetes", level: 4, category: "DevOps" },
    { id: "sk-6", name: "AWS Cloud (ECS, S3, RDS)", level: 4, category: "Cloud" },
    { id: "sk-7", name: "GraphQL & REST APIs", level: 5, category: "API Design" },
    { id: "sk-8", name: "System Architecture & CI/CD", level: 5, category: "DevOps" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "OpenResume Cloud Engine",
      link: "https://github.com/alexmorgan/open-resume-engine",
      techStack: "React, Node.js, Puppeteer, Redis",
      description: "High-performance headless PDF resume rendering microservice generating over 100,000 PDF documents per month."
    },
    {
      id: "proj-2",
      title: "FlowState Task Board",
      link: "https://flowstate-board.io",
      techStack: "TypeScript, Vite, TailwindCSS, WebSockets",
      description: "Real-time collaborative kanban board with offline-first indexedDB sync and optimistic UI updates."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      date: "2023",
      url: "https://aws.amazon.com/verification"
    },
    {
      id: "cert-2",
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      date: "2022",
      url: "https://www.cncf.io/certification/cka"
    }
  ],
  languages: [
    { id: "lang-1", name: "English", level: "Native / Bilingual" },
    { id: "lang-2", name: "Spanish", level: "Professional Working" },
    { id: "lang-3", name: "German", level: "Conversational" }
  ],
  awards: [
    { id: "aw-1", title: "Innovator of the Year Award", organization: "CloudScale Technologies", year: "2023", description: "Recognized for leading the architecture redesign that reduced AWS cloud costs by 35%." }
  ],
  customSections: [
    {
      id: "cust-1",
      title: "Key Highlights & Patents",
      content: "• Co-inventor on US Patent #11,489,201: Adaptive Load Balancing in Distributed Microservice Meshes.\n• Keynote Speaker at JSWorld Conference 2024 on 'Resilient State Architecture in Modern Web Apps'."
    }
  ]
};

export const EMPTY_RESUME_DATA = {
  id: "new-resume",
  title: "Untitled Resume",
  templateId: "toronto",
  colorScheme: "classic-blue",
  fontId: "inter",
  spacing: "normal",
  personalDetails: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    avatar: ""
  },
  professionalSummary: "",
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  customSections: []
};


// Built-in intelligent AI suggestion assistant for resumes
const ACTION_VERBS = [
  "Spearheaded", "Architected", "Engineered", "Orchestrated", "Accelerated",
  "Optimized", "Revamped", "Pioneered", "Automated", "Delivered", "Transformed"
];

const SUMMARY_TEMPLATES = [
  "Dynamic and results-driven [ROLE] with [EXP] years of expertise delivering high-impact solutions in agile environments. Recognized for strong analytical problem-solving and cross-functional leadership.",
  "Innovative and detail-oriented [ROLE] specializing in modern architecture, scalable workflows, and user-centric systems. Proven track record boosting team velocity and system reliability.",
  "Accomplished [ROLE] with extensive background in building resilient applications, optimizing database performance, and driving measurable business growth."
];

export const aiService = {
  enhanceBulletPoint: async (text) => {
    // Simulate AI latency for realistic feel
    await new Promise(r => setTimeout(r, 450));
    if (!text || text.trim().length === 0) return "Accelerated core workflows by 35% through automated CI/CD and modular code architecture.";
    
    const randomVerb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
    // Clean existing verb if needed
    const cleaned = text.replace(/^[a-zA-Z]+ed\s+/i, "");
    return `${randomVerb} ${cleaned}${text.includes("%") || text.includes("$") ? "" : ", yielding a 30% performance efficiency gain."}`;
  },

  generateSummary: async (jobTitle = "Software Engineer", years = 5) => {
    await new Promise(r => setTimeout(r, 500));
    const template = SUMMARY_TEMPLATES[Math.floor(Math.random() * SUMMARY_TEMPLATES.length)];
    return template.replace("[ROLE]", jobTitle).replace("[EXP]", years);
  }
};


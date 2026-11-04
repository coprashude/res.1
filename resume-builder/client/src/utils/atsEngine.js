// Comprehensive ATS Score Calculation & Keyword Analysis Engine

const ACTION_VERBS = [
  "spearheaded", "architected", "engineered", "orchestrated", "accelerated",
  "optimized", "revamped", "pioneered", "automated", "delivered", "transformed",
  "managed", "designed", "developed", "implemented", "resolved", "collaborated",
  "supervised", "established", "streamlined", "formulated", "executed", "championed"
];

const COMMON_TECH_KEYWORDS = [
  "react", "node", "javascript", "typescript", "python", "aws", "docker", "sql",
  "nosql", "ci/cd", "git", "api", "rest", "graphql", "microservices", "kubernetes",
  "cloud", "agile", "scrum", "html", "css", "mongodb", "postgresql", "testing"
];

export const calculateATSScore = (resume) => {
  if (!resume) return { score: 0, breakdown: {}, suggestions: [] };

  const { personalDetails = {}, professionalSummary = "", workExperience = [], education = [], skills = [], projects = [] } = resume;

  let score = 0;
  const breakdown = {
    contact: { score: 0, max: 20, name: "Contact & Profile Information" },
    summary: { score: 0, max: 15, name: "Professional Summary" },
    experience: { score: 0, max: 30, name: "Work Experience & Metrics" },
    skills: { score: 0, max: 20, name: "Core Skills & Tech Keywords" },
    education: { score: 0, max: 15, name: "Education & Credentials" }
  };

  const suggestions = [];

  // 1. Contact Information (Max 20)
  let contactPts = 0;
  if (personalDetails.fullName && personalDetails.fullName.trim().length > 2) contactPts += 5;
  else suggestions.push({ type: "critical", section: "personalDetails", message: "Add your full candidate name." });

  if (personalDetails.email && personalDetails.email.includes("@")) contactPts += 5;
  else suggestions.push({ type: "critical", section: "personalDetails", message: "Valid professional email is required." });

  if (personalDetails.phone && personalDetails.phone.trim().length > 6) contactPts += 4;
  else suggestions.push({ type: "warning", section: "personalDetails", message: "Add a direct phone number." });

  if (personalDetails.location) contactPts += 3;
  else suggestions.push({ type: "info", section: "personalDetails", message: "Include city & state/country for regional recruiter filters." });

  if (personalDetails.linkedin || personalDetails.github || personalDetails.website) contactPts += 3;
  else suggestions.push({ type: "warning", section: "personalDetails", message: "Include LinkedIn or GitHub URL for recruiter credibility." });

  breakdown.contact.score = Math.min(20, contactPts);
  score += breakdown.contact.score;

  // 2. Summary (Max 15)
  let summaryPts = 0;
  const wordCount = professionalSummary.trim() ? professionalSummary.trim().split(/\s+/).length : 0;
  if (wordCount >= 25 && wordCount <= 120) {
    summaryPts = 15;
  } else if (wordCount > 0) {
    summaryPts = 8;
    suggestions.push({ type: "warning", section: "professionalSummary", message: "Summary should ideally be between 30 and 100 words for optimal ATS scanning." });
  } else {
    suggestions.push({ type: "critical", section: "professionalSummary", message: "Add a compelling Professional Summary with keywords matching your target role." });
  }
  breakdown.summary.score = summaryPts;
  score += breakdown.summary.score;

  // 3. Work Experience & Quantified Metrics (Max 30)
  let expPts = 0;
  if (workExperience.length >= 2) expPts += 10;
  else if (workExperience.length === 1) expPts += 6;
  else suggestions.push({ type: "critical", section: "workExperience", message: "Add at least 1-2 relevant work experiences." });

  const allExpText = workExperience.map(e => (e.description || "")).join(" ").toLowerCase();

  // Check action verbs
  const matchedVerbs = ACTION_VERBS.filter(v => allExpText.includes(v));
  if (matchedVerbs.length >= 4) expPts += 10;
  else if (matchedVerbs.length >= 1) {
    expPts += 5;
    suggestions.push({ type: "warning", section: "workExperience", message: `Include more high-impact action verbs (found ${matchedVerbs.length}, target 4+). e.g., Spearheaded, Orchestrated, Optimized.` });
  } else {
    suggestions.push({ type: "critical", section: "workExperience", message: "Begin bullet points with strong action verbs like Spearheaded, Engineered, Accelerated." });
  }

  // Check quantified impact numbers (%, $, X%, increased by)
  const numbersOrPercents = allExpText.match(/(\d+%\s*|\$\s*\d+|\d+\+?\s*(users|clients|projects|million|k\b))/gi) || [];
  if (numbersOrPercents.length >= 2) {
    expPts += 10;
  } else if (numbersOrPercents.length === 1) {
    expPts += 5;
    suggestions.push({ type: "warning", section: "workExperience", message: "Add more measurable metrics and percentages (e.g. 'boosted throughput by 35%')." });
  } else {
    suggestions.push({ type: "critical", section: "workExperience", message: "ATS and recruiters look for measurable impact. Add numbers, percentages, or dollar values to your achievements." });
  }

  breakdown.experience.score = Math.min(30, expPts);
  score += breakdown.experience.score;

  // 4. Skills (Max 20)
  let skillsPts = 0;
  if (skills.length >= 6) skillsPts = 20;
  else if (skills.length >= 3) {
    skillsPts = 12;
    suggestions.push({ type: "warning", section: "skills", message: "Target at least 6-8 core technical and functional skills." });
  } else {
    skillsPts = 4;
    suggestions.push({ type: "critical", section: "skills", message: "List at least 6 relevant technical skills to pass keyword filters." });
  }
  breakdown.skills.score = skillsPts;
  score += breakdown.skills.score;

  // 5. Education & Credentials (Max 15)
  let eduPts = 0;
  if (education.length > 0) {
    eduPts += 10;
    if (education.some(e => e.degree && e.institution)) eduPts += 5;
  } else {
    suggestions.push({ type: "warning", section: "education", message: "Add your educational background or highest degree achieved." });
  }
  breakdown.education.score = Math.min(15, eduPts);
  score += breakdown.education.score;

  // Rating badge
  let grade = "C";
  let gradeColor = "#ef4444"; // red
  if (score >= 85) {
    grade = "A+ (Excellent)";
    gradeColor = "#10b981"; // green
  } else if (score >= 70) {
    grade = "B (Good)";
    gradeColor = "#3b82f6"; // blue
  } else if (score >= 50) {
    grade = "C (Needs Improvement)";
    gradeColor = "#f59e0b"; // yellow
  }

  return {
    score: Math.min(100, Math.round(score)),
    grade,
    gradeColor,
    breakdown,
    suggestions,
    metricsFound: numbersOrPercents.length,
    actionVerbsFound: matchedVerbs.length
  };
};

export const analyzeJobMatch = (resume, jobDescription) => {
  if (!jobDescription || !jobDescription.trim()) {
    return { matchScore: 0, matchedKeywords: [], missingKeywords: [], recommendations: [] };
  }

  const jdLower = jobDescription.toLowerCase();
  const allResumeText = [
    resume.professionalSummary || "",
    (resume.skills || []).map(s => s.name).join(" "),
    (resume.workExperience || []).map(w => `${w.jobTitle} ${w.description}`).join(" "),
    (resume.projects || []).map(p => `${p.title} ${p.techStack} ${p.description}`).join(" ")
  ].join(" ").toLowerCase();

  // Extract common tech and requirement terms from JD
  const foundKeywords = [];
  const missingKeywords = [];

  COMMON_TECH_KEYWORDS.forEach(kw => {
    if (jdLower.includes(kw)) {
      if (allResumeText.includes(kw)) {
        foundKeywords.push(kw.toUpperCase());
      } else {
        missingKeywords.push(kw.toUpperCase());
      }
    }
  });

  const totalKeywords = foundKeywords.length + missingKeywords.length;
  const matchScore = totalKeywords > 0 
    ? Math.round((foundKeywords.length / totalKeywords) * 100) 
    : 70;

  const recommendations = [];
  if (missingKeywords.length > 0) {
    recommendations.push(`Incorporate high-frequency job keywords: ${missingKeywords.slice(0, 4).join(", ")} into your Skills or Experience bullets.`);
  }
  if (!allResumeText.includes("lead") && jdLower.includes("lead")) {
    recommendations.push("The job emphasizes leadership. Highlight past leadership or cross-functional coordination.");
  }

  return {
    matchScore,
    matchedKeywords: foundKeywords,
    missingKeywords,
    recommendations
  };
};


import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import styles from './JobMatchAnalyzer.module.css';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';

const SAMPLE_JOB_POSTING = `We are seeking a Senior Full-Stack Engineer / Solutions Architect to lead modern cloud applications.
Key Qualifications:
• 5+ years building distributed applications using React, TypeScript, and Node.js.
• Hands-on expertise with AWS, Docker, Microservices, and CI/CD pipelines.
• Strong foundation in PostgreSQL, SQL, and database optimization.
• Proven track record in Agile / Scrum, system design, and leading high-velocity development squads.`;

export const JobMatchAnalyzer = () => {
  const { 
    resumeData, 
    targetJobDescription, 
    setTargetJobDescription, 
    jobMatchResult,
    addListItem,
    setActiveView,
    setActiveSection
  } = useResume();

  const handleUseSample = () => {
    setTargetJobDescription(SAMPLE_JOB_POSTING);
  };

  const handleAddMissingSkill = (skillName) => {
    addListItem("skills", {
      name: skillName,
      level: 4,
      category: "Technical"
    });
  };

  const { matchScore, matchedKeywords, missingKeywords, recommendations } = jobMatchResult;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Job Match & ATS Keyword Analyzer</h1>
          <p className={styles.subtitle}>
            Paste a job description to scan keyword alignment and optimize your resume before submitting.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left Column: Job Description Input */}
        <div className={styles.inputCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Target Job Description</span>
            <button 
              type="button" 
              onClick={handleUseSample} 
              className={styles.sampleBtn}
            >
              Paste Sample Job
            </button>
          </div>
          <textarea
            className={styles.jdTextarea}
            rows={12}
            value={targetJobDescription}
            onChange={(e) => setTargetJobDescription(e.target.value)}
            placeholder="Paste the full job posting, required qualifications, and responsibilities here..."
          />
          <div className={styles.inputHint}>
            Scanner searches your skills, summary, work experience, and projects for exact keyword hits.
          </div>
        </div>

        {/* Right Column: Match Results & Gap Analysis */}
        <div className={styles.resultCard}>
          {/* Match Score Meter */}
          <div className={styles.meterBanner}>
            <div className={styles.radialWrapper}>
              <div 
                className={styles.radialCircle}
                style={{ 
                  borderColor: matchScore >= 75 ? '#10b981' : matchScore >= 50 ? '#3b82f6' : '#f59e0b'
                }}
              >
                <span className={styles.scoreNum}>{matchScore}%</span>
                <span className={styles.scoreSub}>MATCH</span>
              </div>
            </div>
            <div className={styles.meterText}>
              <h3 className={styles.matchVerdict}>
                {matchScore >= 75 
                  ? "Strong Alignment!" 
                  : matchScore >= 50 
                  ? "Moderate Alignment" 
                  : "Significant Gaps Detected"}
              </h3>
              <p className={styles.verdictDesc}>
                {matchScore >= 75
                  ? "Your resume reflects the primary technical qualifications highlighted in this posting."
                  : "Adding the missing keywords below to your skills and bullets will boost your ATS ranking."}
              </p>
            </div>
          </div>

          {/* Matched Keywords */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeading}>
              <CheckCircle2 size={16} color="#10b981" />
              <span>Matched Keywords ({matchedKeywords.length})</span>
            </div>
            {matchedKeywords.length === 0 ? (
              <p className={styles.emptyNotice}>No keywords matched yet. Paste a job description to start scan.</p>
            ) : (
              <div className={styles.keywordPills}>
                {matchedKeywords.map((kw, i) => (
                  <span key={i} className={styles.matchPill}>{kw}</span>
                ))}
              </div>
            )}
          </div>

          {/* Missing Keywords (Gaps) */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeading}>
              <AlertCircle size={16} color="#f59e0b" />
              <span>Missing Keywords in Resume ({missingKeywords.length})</span>
            </div>
            {missingKeywords.length === 0 ? (
              <p className={styles.emptyNotice}>Great job! All detected primary technologies are present in your resume.</p>
            ) : (
              <div className={styles.keywordPills}>
                {missingKeywords.map((kw, i) => (
                  <div key={i} className={styles.missingPill}>
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleAddMissingSkill(kw)}
                      className={styles.addSkillBtn}
                      title={`Add ${kw} to your skills list`}
                    >
                      <Plus size={12} /> Add
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actionable Recommendations */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeading}>
              <TrendingUp size={16} color="#3b82f6" />
              <span>Strategic Tailoring Advice</span>
            </div>
            {recommendations.length === 0 ? (
              <p className={styles.emptyNotice}>Paste a job description above to generate custom advice.</p>
            ) : (
              <ul className={styles.recList}>
                {recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick jump to editor */}
          <div className={styles.footerAction}>
            <button
              type="button"
              onClick={() => {
                setActiveView("editor");
                setActiveSection("skills");
              }}
              className={styles.jumpBtn}
            >
              Open Resume Editor to Apply Changes <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatchAnalyzer;


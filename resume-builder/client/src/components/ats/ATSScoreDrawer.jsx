import React from 'react';
import { useResume } from '../../context/ResumeContext';
import styles from './ATSScoreDrawer.module.css';
import { 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Zap, 
  Award, 
  TrendingUp, 
  Target,
  Sparkles
} from 'lucide-react';

export const ATSScoreDrawer = () => {
  const { atsAnalysis, isATSModalOpen, setIsATSModalOpen, setActiveSection } = useResume();

  if (!isATSModalOpen) return null;

  const { score, grade, gradeColor, breakdown, suggestions, metricsFound, actionVerbsFound } = atsAnalysis;

  const handleFixSection = (section) => {
    if (section) setActiveSection(section);
    setIsATSModalOpen(false);
  };

  return (
    <div className={styles.overlay} onClick={() => setIsATSModalOpen(false)}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Target className={styles.headerIcon} size={20} />
            <div>
              <h3>ATS Score & Optimization Audit</h3>
              <p>Applicant Tracking System compliance & recruiter readability check</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => setIsATSModalOpen(false)} 
            className={styles.closeBtn}
          >
            <X size={18} />
          </button>
        </div>

        {/* Big Score Card */}
        <div className={styles.scoreBanner}>
          <div className={styles.dialCircle} style={{ borderColor: gradeColor }}>
            <span className={styles.bigScore}>{score}</span>
            <span className={styles.scoreOutOf}>/100</span>
          </div>
          <div className={styles.scoreDetails}>
            <div className={styles.gradeBadge} style={{ backgroundColor: gradeColor }}>
              {grade}
            </div>
            <p className={styles.scoreSummary}>
              {score >= 80 
                ? "Excellent! Your resume has strong keyword density, structured sections, and high ATS pass probability."
                : score >= 60
                ? "Good foundation. Addressing the critical checklist items below will significantly improve your recruiter response rate."
                : "Needs attention. Your resume is missing key contact fields, metrics, or required action verbs."}
            </p>
            <div className={styles.statsRow}>
              <span className={styles.statBadge}>
                <Zap size={12} /> {actionVerbsFound} Action Verbs Found
              </span>
              <span className={styles.statBadge}>
                <TrendingUp size={12} /> {metricsFound} Metrics / % Numbers
              </span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className={styles.sectionBlock}>
          <h4 className={styles.blockHeading}>Category Breakdown</h4>
          <div className={styles.breakdownList}>
            {Object.entries(breakdown).map(([key, item]) => {
              const pct = Math.round((item.score / item.max) * 100);
              return (
                <div key={key} className={styles.breakdownItem}>
                  <div className={styles.breakdownTop}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemScore}>{item.score} / {item.max} ({pct}%)</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ 
                        width: `${pct}%`,
                        backgroundColor: pct >= 80 ? '#10b981' : pct >= 50 ? '#3b82f6' : '#f59e0b'
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actionable Optimization Checklist */}
        <div className={styles.sectionBlock}>
          <h4 className={styles.blockHeading}>Actionable Improvement Checklist</h4>
          {suggestions.length === 0 ? (
            <div className={styles.allGood}>
              <CheckCircle size={28} color="#10b981" />
              <p>Outstanding! No critical or warning issues detected. Your resume is primed for ATS parsers.</p>
            </div>
          ) : (
            <div className={styles.suggestionsList}>
              {suggestions.map((sug, i) => (
                <div 
                  key={i} 
                  className={`${styles.suggestionCard} ${
                    sug.type === 'critical' ? styles.critical : sug.type === 'warning' ? styles.warning : styles.info
                  }`}
                >
                  <div className={styles.sugIcon}>
                    {sug.type === 'critical' && <AlertTriangle size={15} color="#ef4444" />}
                    {sug.type === 'warning' && <AlertTriangle size={15} color="#f59e0b" />}
                    {sug.type === 'info' && <Info size={15} color="#3b82f6" />}
                  </div>
                  <div className={styles.sugText}>
                    <p>{sug.message}</p>
                    {sug.section && (
                      <button 
                        type="button" 
                        onClick={() => handleFixSection(sug.section)}
                        className={styles.fixBtn}
                      >
                        Go to Section &rarr;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSScoreDrawer;


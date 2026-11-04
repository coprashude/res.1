import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import styles from './Navbar.module.css';
import { 
  FileText, 
  Layers, 
  Mail, 
  Target, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw,
  Printer,
  Bot
} from 'lucide-react';
import { printResume } from '../../../utils/pdfGenerator';

export const Navbar = () => {
  const { 
    activeView, 
    setActiveView, 
    resumes, 
    atsAnalysis, 
    setIsATSModalOpen,
    isAIChatOpen,
    setIsAIChatOpen,
    isAutoSaving,
    lastSavedTime
  } = useResume();

  return (
    <nav className={styles.navbar}>
      {/* Brand & Logo */}
      <div className={styles.brand} onClick={() => setActiveView("editor")}>
        <div className={styles.brandIcon}>
          <Sparkles size={16} />
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandTitle}>ProResume <span className={styles.aiBadge}>AI</span></span>
          <span className={styles.brandSub}>Career & Resume Studio</span>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className={styles.navTabs}>
        <button
          type="button"
          onClick={() => setActiveView("editor")}
          className={`${styles.tab} ${activeView === "editor" ? styles.tabActive : ""}`}
        >
          <FileText size={15} />
          <span>Visual Editor</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveView("myResumes")}
          className={`${styles.tab} ${activeView === "myResumes" ? styles.tabActive : ""}`}
        >
          <Layers size={15} />
          <span>My Resumes</span>
          <span className={styles.countBadge}>{resumes.length}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveView("coverLetter")}
          className={`${styles.tab} ${activeView === "coverLetter" ? styles.tabActive : ""}`}
        >
          <Mail size={15} />
          <span>Cover Letter</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveView("jobMatch")}
          className={`${styles.tab} ${activeView === "jobMatch" ? styles.tabActive : ""}`}
        >
          <Target size={15} />
          <span>Job Match</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveView("interviewPrep")}
          className={`${styles.tab} ${activeView === "interviewPrep" ? styles.tabActive : ""}`}
        >
          <MessageSquare size={15} />
          <span>AI Interview</span>
          <span className={styles.newBadge}>AI</span>
        </button>
      </div>

      {/* Action Header Items */}
      <div className={styles.actions}>
        {/* Real-Time ATS Score Pill */}
        <button
          type="button"
          onClick={() => setIsATSModalOpen(true)}
          className={styles.atsPill}
          title="Click to view detailed ATS Score breakdown & suggestions"
          style={{ borderColor: atsAnalysis.gradeColor }}
        >
          <div className={styles.atsDial} style={{ backgroundColor: atsAnalysis.gradeColor }}>
            {atsAnalysis.score}
          </div>
          <div className={styles.atsText}>
            <span className={styles.atsLabel}>ATS SCORE</span>
            <span className={styles.atsGrade} style={{ color: atsAnalysis.gradeColor }}>
              {atsAnalysis.score}% {atsAnalysis.grade.split(" ")[0]}
            </span>
          </div>
        </button>

        {/* AI Copilot Toggle Button */}
        <button
          type="button"
          onClick={() => setIsAIChatOpen(!isAIChatOpen)}
          className={`${styles.aiCopilotBtn} ${isAIChatOpen ? styles.aiCopilotActive : ""}`}
          title="Toggle AI Chat Assistant"
        >
          <Bot size={16} />
          <span>AI Assistant</span>
        </button>

        {/* Quick Save Status */}
        <div className={styles.saveStatus}>
          {isAutoSaving ? (
            <span className={styles.saving}><RefreshCw size={12} className={styles.spin} /> Saving</span>
          ) : (
            <span className={styles.saved}><CheckCircle2 size={12} /> Auto-Saved</span>
          )}
        </div>

        {/* Export / Print */}
        <button
          type="button"
          onClick={printResume}
          className={styles.downloadBtn}
          title="Download PDF or Print"
        >
          <Printer size={15} />
          <span>Download PDF</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


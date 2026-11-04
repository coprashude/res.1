import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import styles from './MyResumes.module.css';
import { 
  Plus, 
  Copy, 
  Trash2, 
  Edit3, 
  FileText, 
  Check, 
  Sparkles,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { calculateATSScore } from '../../../utils/atsEngine';

export const MyResumes = () => {
  const { 
    resumes, 
    activeResumeId, 
    selectResume, 
    createNewResume, 
    duplicateResume, 
    deleteResume, 
    renameResume 
  } = useResume();

  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleStartRename = (resume) => {
    setEditingId(resume.id);
    setEditingTitle(resume.title || "Untitled Resume");
  };

  const handleSaveRename = (id) => {
    if (editingTitle.trim()) {
      renameResume(id, editingTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      {/* Header Banner */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Saved Resumes</h1>
          <p className={styles.subtitle}>
            Manage tailored resumes for different roles, companies, or career paths.
          </p>
        </div>
        <button 
          type="button" 
          onClick={() => createNewResume("New Targeted Resume")} 
          className={styles.createBtn}
        >
          <Plus size={16} /> Create New Resume
        </button>
      </div>

      {/* Grid of Resumes */}
      <div className={styles.grid}>
        {resumes.map((resume) => {
          const isActive = resume.id === activeResumeId;
          const ats = calculateATSScore(resume);

          return (
            <div key={resume.id} className={`${styles.card} ${isActive ? styles.activeCard : ""}`}>
              {/* Card Top / Title */}
              <div className={styles.cardHeader}>
                {editingId === resume.id ? (
                  <div className={styles.renameRow}>
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(resume.id)}
                      autoFocus
                      className={styles.renameInput}
                    />
                    <button 
                      type="button" 
                      onClick={() => handleSaveRename(resume.id)} 
                      className={styles.confirmBtn}
                    >
                      <Check size={14} />
                    </button>
                  </div>
                ) : (
                  <div className={styles.titleRow}>
                    <h3 className={styles.resumeTitle}>{resume.title || "Untitled Resume"}</h3>
                    <button 
                      type="button" 
                      onClick={() => handleStartRename(resume)} 
                      className={styles.renameIconBtn}
                      title="Rename"
                    >
                      <Edit3 size={13} />
                    </button>
                  </div>
                )}
                <div className={styles.badgeRow}>
                  {isActive && <span className={styles.activeBadge}>Active in Editor</span>}
                  <span 
                    className={styles.atsBadge} 
                    style={{ backgroundColor: ats.gradeColor }}
                  >
                    ATS {ats.score}%
                  </span>
                </div>
              </div>

              {/* Card Body Snapshot */}
              <div className={styles.cardBody} onClick={() => selectResume(resume.id)}>
                <div className={styles.snippetHeader}>
                  <strong>{resume.personalDetails?.fullName || "Candidate Name"}</strong>
                  <span>{resume.personalDetails?.jobTitle || "Job Title"}</span>
                </div>
                <div className={styles.snippetDetails}>
                  <div>Template: <strong className={styles.capitalize}>{resume.templateId || "Toronto"}</strong></div>
                  <div>Experience entries: <strong>{resume.workExperience?.length || 0}</strong></div>
                  <div>Skills listed: <strong>{resume.skills?.length || 0}</strong></div>
                </div>
              </div>

              {/* Card Actions */}
              <div className={styles.cardFooter}>
                <button
                  type="button"
                  onClick={() => selectResume(resume.id)}
                  className={styles.editBtn}
                >
                  <Edit3 size={14} /> Open Editor
                </button>

                <div className={styles.footerIcons}>
                  <button
                    type="button"
                    onClick={() => duplicateResume(resume.id)}
                    className={styles.iconBtn}
                    title="Duplicate / Clone"
                  >
                    <Copy size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteResume(resume.id)}
                    className={styles.iconBtnDanger}
                    title="Delete Resume"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Create Card Placeholder */}
        <div 
          className={styles.newCardPlaceholder} 
          onClick={() => createNewResume("Targeted Resume " + (resumes.length + 1))}
        >
          <div className={styles.placeholderIcon}>
            <Plus size={24} />
          </div>
          <span className={styles.placeholderText}>Create Another Resume</span>
          <span className={styles.placeholderSub}>Tailor for specific job description</span>
        </div>
      </div>
    </div>
  );
};

export default MyResumes;


import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import styles from './EditorSidebar.module.css';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Languages as LangIcon,
  PlusSquare
} from 'lucide-react';

const SECTIONS = [
  { id: "personalDetails", label: "Personal Details", icon: User },
  { id: "professionalSummary", label: "Summary", icon: FileText },
  { id: "workExperience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "languages", label: "Languages", icon: LangIcon },
  { id: "customSections", label: "Custom Section", icon: PlusSquare }
];

export const EditorSidebar = () => {
  const { activeSection, setActiveSection, resumeData } = useResume();

  // Helper to count entries
  const getCount = (id) => {
    if (Array.isArray(resumeData[id])) return resumeData[id].length;
    if (id === "personalDetails") return resumeData.personalDetails.fullName ? "✓" : "";
    if (id === "professionalSummary") return resumeData.professionalSummary ? "✓" : "";
    return "";
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles.navTitle}>Resume Sections</div>
      <div className={styles.navList}>
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          const count = getCount(sec.id);

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <div className={styles.navLeft}>
                <Icon size={16} className={styles.icon} />
                <span>{sec.label}</span>
              </div>
              {count && <span className={styles.badge}>{count}</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default EditorSidebar;


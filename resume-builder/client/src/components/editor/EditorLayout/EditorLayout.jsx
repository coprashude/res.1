import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import EditorHeader from '../EditorHeader/EditorHeader';
import EditorSidebar from '../EditorSidebar/EditorSidebar';
import PersonalDetails from '../sections/PersonalDetails/PersonalDetails';
import ProfessionalSummary from '../sections/ProfessionalSummary/ProfessionalSummary';
import WorkExperience from '../sections/WorkExperience/WorkExperience';
import Education from '../sections/Education/Education';
import Skills from '../sections/Skills/Skills';
import Projects from '../sections/Projects/Projects';
import Certifications from '../sections/Certifications/Certifications';
import Languages from '../sections/Languages/Languages';
import CustomSection from '../sections/CustomSection/CustomSection';
import TemplateEngine from '../../templates/TemplateEngine';
import styles from './EditorLayout.module.css';
import { ZoomIn, ZoomOut, Maximize2, Eye, Edit3 } from 'lucide-react';

const SECTION_COMPONENTS = {
  personalDetails: PersonalDetails,
  professionalSummary: ProfessionalSummary,
  workExperience: WorkExperience,
  education: Education,
  skills: Skills,
  projects: Projects,
  certifications: Certifications,
  languages: Languages,
  customSections: CustomSection
};

export const EditorLayout = () => {
  const { activeSection, resumeData } = useResume();
  const [zoom, setZoom] = useState(1);
  const [mobileTab, setMobileTab] = useState("editor"); // "editor" | "preview"

  const ActiveComponent = SECTION_COMPONENTS[activeSection] || PersonalDetails;

  return (
    <div className={styles.appContainer}>
      <EditorHeader />

      {/* Mobile Tab Switcher */}
      <div className={styles.mobileTabs}>
        <button
          type="button"
          onClick={() => setMobileTab("editor")}
          className={`${styles.tabBtn} ${mobileTab === "editor" ? styles.tabActive : ""}`}
        >
          <Edit3 size={14} /> Edit Content
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`${styles.tabBtn} ${mobileTab === "preview" ? styles.tabActive : ""}`}
        >
          <Eye size={14} /> Live Preview
        </button>
      </div>

      <div className={styles.mainSplit}>
        {/* Editor Half */}
        <div className={`${styles.editorHalf} ${mobileTab === "preview" ? styles.hiddenOnMobile : ""}`}>
          <EditorSidebar />
          <div className={styles.formContainer}>
            <div className={styles.formContent}>
              <ActiveComponent />
            </div>
          </div>
        </div>

        {/* Live Preview Half */}
        <div className={`${styles.previewHalf} ${mobileTab === "editor" ? styles.hiddenOnMobile : ""}`}>
          <div className={styles.previewToolbar}>
            <span className={styles.previewLabel}>
              <Eye size={14} /> Live Sheet Preview (A4)
            </span>
            <div className={styles.zoomControls}>
              <button 
                type="button" 
                onClick={() => setZoom(z => Math.max(0.6, z - 0.1))} 
                className={styles.zoomBtn}
                title="Zoom Out"
              >
                <ZoomOut size={13} />
              </button>
              <span className={styles.zoomText}>{Math.round(zoom * 100)}%</span>
              <button 
                type="button" 
                onClick={() => setZoom(z => Math.min(1.4, z + 0.1))} 
                className={styles.zoomBtn}
                title="Zoom In"
              >
                <ZoomIn size={13} />
              </button>
              <button 
                type="button" 
                onClick={() => setZoom(1)} 
                className={styles.zoomBtn}
                title="Reset Zoom"
              >
                <Maximize2 size={13} />
              </button>
            </div>
          </div>

          <div className={styles.previewViewport} id="resume-preview-container">
            <div 
              className={styles.sheetWrapper}
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
            >
              <TemplateEngine data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;


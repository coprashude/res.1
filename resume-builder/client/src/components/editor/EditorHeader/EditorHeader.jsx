import React, { useRef } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { TEMPLATES } from '../../../config/template.config';
import { COLOR_SCHEMES, FONT_OPTIONS, SPACING_OPTIONS } from '../../../config/constants';
import { downloadJSON } from '../../../utils/helpers';
import { printResume } from '../../../utils/pdfGenerator';
import styles from './EditorHeader.module.css';
import { 
  Download, 
  Printer, 
  RefreshCw, 
  Trash2, 
  Upload, 
  Save, 
  Palette, 
  Type, 
  Layout, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const EditorHeader = () => {
  const { 
    resumeData, 
    setTemplate, 
    setColorScheme, 
    setFont, 
    setSpacing, 
    loadSampleData, 
    clearResume,
    importResumeData,
    isAutoSaving,
    lastSavedTime
  } = useResume();

  const fileInputRef = useRef(null);

  const handleExportJSON = () => {
    downloadJSON(resumeData, `${(resumeData.personalDetails.fullName || "resume").toLowerCase().replace(/\s+/g, '_')}_data.json`);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        importResumeData(json);
      } catch (err) {
        alert("Invalid JSON file format");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <header className={styles.header}>
      {/* Brand & Autosave */}
      <div className={styles.leftGroup}>
        <div className={styles.brand}>
          <div className={styles.logoBadge}>CV</div>
          <span className={styles.brandName}>ProResume</span>
        </div>
        <div className={styles.autosaveStatus}>
          {isAutoSaving ? (
            <span className={styles.saving}><RefreshCw size={12} className={styles.spin} /> Saving...</span>
          ) : (
            <span className={styles.saved}><CheckCircle2 size={12} /> Saved {lastSavedTime}</span>
          )}
        </div>
      </div>

      {/* Customization Toolset */}
      <div className={styles.controlsGroup}>
        {/* Template Selector */}
        <div className={styles.selectWrapper} title="Select Template">
          <Layout size={14} className={styles.icon} />
          <select 
            value={resumeData.templateId || "toronto"} 
            onChange={(e) => setTemplate(e.target.value)}
            className={styles.select}
          >
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
            ))}
          </select>
        </div>

        {/* Color Palette Selector */}
        <div className={styles.colorPalette} title="Color Palette">
          <Palette size={14} className={styles.icon} />
          <div className={styles.colorSwatches}>
            {COLOR_SCHEMES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColorScheme(c.id)}
                className={`${styles.swatch} ${resumeData.colorScheme === c.id ? styles.swatchActive : ""}`}
                style={{ backgroundColor: c.primary }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Font Selector */}
        <div className={styles.selectWrapper} title="Typography">
          <Type size={14} className={styles.icon} />
          <select 
            value={resumeData.fontId || "inter"} 
            onChange={(e) => setFont(e.target.value)}
            className={styles.select}
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        {/* Spacing Selector */}
        <div className={styles.selectWrapper} title="Page Density">
          <select 
            value={resumeData.spacing || "normal"} 
            onChange={(e) => setSpacing(e.target.value)}
            className={styles.select}
          >
            {SPACING_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionsGroup}>
        <button 
          type="button" 
          onClick={loadSampleData} 
          className={styles.secondaryBtn}
          title="Fill with professional sample data"
        >
          <Sparkles size={14} /> Sample Data
        </button>

        <button 
          type="button" 
          onClick={handleExportJSON} 
          className={styles.iconBtn}
          title="Backup / Export JSON"
        >
          <Download size={14} /> JSON
        </button>

        <label className={styles.iconBtn} title="Import JSON backup">
          <Upload size={14} /> Import
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImportJSON} 
            accept=".json" 
            style={{ display: 'none' }} 
          />
        </label>

        <button 
          type="button" 
          onClick={clearResume} 
          className={styles.iconBtnDanger}
          title="Clear all fields"
        >
          <Trash2 size={14} />
        </button>

        <button 
          type="button" 
          onClick={printResume} 
          className={styles.primaryBtn}
          title="Export to PDF or Print"
        >
          <Printer size={15} /> Download PDF
        </button>
      </div>
    </header>
  );
};

export default EditorHeader;


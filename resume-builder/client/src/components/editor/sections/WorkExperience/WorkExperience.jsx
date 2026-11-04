import React, { useState } from 'react';
import { useResume } from '../../../../context/ResumeContext';
import { aiService } from '../../../../services/ai.service';
import styles from './WorkExperience.module.css';
import { Plus, Trash2, Sparkles, Briefcase, ChevronUp, ChevronDown } from 'lucide-react';

export const WorkExperience = () => {
  const { resumeData, addListItem, updateListItem, removeListItem, moveItemUp, moveItemDown } = useResume();
  const experiences = resumeData.workExperience || [];
  const [loadingAiId, setLoadingAiId] = useState(null);

  const handleAdd = () => {
    addListItem("workExperience", {
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    });
  };

  const handleEnhanceBullet = async (id, currentText) => {
    setLoadingAiId(id);
    try {
      const enhanced = await aiService.enhanceBulletPoint(currentText);
      updateListItem("workExperience", id, "description", enhanced);
    } finally {
      setLoadingAiId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Work Experience</h2>
          <p className={styles.subtitle}>Showcase your employment history, key roles, and quantified achievements.</p>
        </div>
        <button type="button" onClick={handleAdd} className={styles.addBtn}>
          <Plus size={15} /> Add Position
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className={styles.empty}>
          <Briefcase size={32} className={styles.emptyIcon} />
          <p>No work experience added yet.</p>
          <button type="button" onClick={handleAdd} className={styles.emptyBtn}>
            + Add First Role
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {experiences.map((exp, index) => (
            <div key={exp.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.reorderGroup}>
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveItemUp("workExperience", index)}
                    className={styles.moveBtn}
                    title="Move up"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    disabled={index === experiences.length - 1}
                    onClick={() => moveItemDown("workExperience", index)}
                    className={styles.moveBtn}
                    title="Move down"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <span className={styles.cardIndex}>Position #{index + 1}</span>
                </div>

                <button
                  type="button"
                  onClick={() => removeListItem("workExperience", exp.id)}
                  className={styles.removeBtn}
                  title="Remove this role"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Job Title</label>
                  <input
                    type="text"
                    value={exp.jobTitle || ""}
                    onChange={(e) => updateListItem("workExperience", exp.id, "jobTitle", e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Company / Organization</label>
                  <input
                    type="text"
                    value={exp.company || ""}
                    onChange={(e) => updateListItem("workExperience", exp.id, "company", e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Location</label>
                  <input
                    type="text"
                    value={exp.location || ""}
                    onChange={(e) => updateListItem("workExperience", exp.id, "location", e.target.value)}
                    placeholder="e.g. New York, NY or Remote"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroupDates}>
                  <div>
                    <label className={styles.label}>Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate || ""}
                      onChange={(e) => updateListItem("workExperience", exp.id, "startDate", e.target.value)}
                      placeholder="e.g. 2021-03"
                      className={styles.input}
                    />
                  </div>
                  <div>
                    <label className={styles.label}>End Date</label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? "Present" : (exp.endDate || "")}
                      onChange={(e) => updateListItem("workExperience", exp.id, "endDate", e.target.value)}
                      placeholder="e.g. 2023-11"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={!!exp.current}
                      onChange={(e) => updateListItem("workExperience", exp.id, "current", e.target.checked)}
                    />
                    I currently work in this role
                  </label>
                </div>

                <div className={styles.descGroup}>
                  <div className={styles.descHeader}>
                    <label className={styles.label}>Accomplishments & Bullet Points</label>
                    <button
                      type="button"
                      onClick={() => handleEnhanceBullet(exp.id, exp.description)}
                      disabled={loadingAiId === exp.id}
                      className={styles.aiEnhanceBtn}
                    >
                      <Sparkles size={13} />
                      {loadingAiId === exp.id ? "Optimizing..." : "AI Bullet Enhancer"}
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={exp.description || ""}
                    onChange={(e) => updateListItem("workExperience", exp.id, "description", e.target.value)}
                    placeholder="• Built feature X which increased user engagement by 25%&#10;• Led team of 5 engineers"
                    className={styles.textarea}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperience;

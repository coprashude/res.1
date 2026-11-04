import React from 'react';
import { useResume } from '../../../../context/ResumeContext';
import styles from './Education.module.css';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export const Education = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResume();
  const educations = resumeData.education || [];

  const handleAdd = () => {
    addListItem("education", {
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
      grade: "",
      description: ""
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Education</h2>
          <p className={styles.subtitle}>Add your university degrees, colleges, and academic certifications.</p>
        </div>
        <button type="button" onClick={handleAdd} className={styles.addBtn}>
          <Plus size={15} /> Add Education
        </button>
      </div>

      {educations.length === 0 ? (
        <div className={styles.empty}>
          <GraduationCap size={32} className={styles.emptyIcon} />
          <p>No education details added yet.</p>
          <button type="button" onClick={handleAdd} className={styles.emptyBtn}>
            + Add Degree
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {educations.map((edu, index) => (
            <div key={edu.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardIndex}>Degree #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeListItem("education", edu.id)}
                  className={styles.removeBtn}
                  title="Remove this degree"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Degree & Major</label>
                  <input
                    type="text"
                    value={edu.degree || ""}
                    onChange={(e) => updateListItem("education", edu.id, "degree", e.target.value)}
                    placeholder="e.g. B.S. in Computer Science"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>School / University</label>
                  <input
                    type="text"
                    value={edu.institution || ""}
                    onChange={(e) => updateListItem("education", edu.id, "institution", e.target.value)}
                    placeholder="e.g. UC Berkeley"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Dates Attended (or Grad Year)</label>
                  <input
                    type="text"
                    value={edu.endDate || ""}
                    onChange={(e) => updateListItem("education", edu.id, "endDate", e.target.value)}
                    placeholder="e.g. 2016 - 2020 or May 2020"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>GPA / Honors (Optional)</label>
                  <input
                    type="text"
                    value={edu.grade || ""}
                    onChange={(e) => updateListItem("education", edu.id, "grade", e.target.value)}
                    placeholder="e.g. 3.85 GPA - Magna Cum Laude"
                    className={styles.input}
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

export default Education;

import React from 'react';
import { useResume } from '../../../../context/ResumeContext';
import styles from './CustomSection.module.css';
import { Plus, Trash2 } from 'lucide-react';

export const CustomSection = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResume();
  const customSections = resumeData.customSections || [];

  const handleAdd = () => {
    addListItem("customSections", {
      title: "Key Accomplishments",
      content: ""
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Custom Sections</h2>
          <p className={styles.subtitle}>Add custom sections like Patents, Volunteer Work, Publications, or Hobbies.</p>
        </div>
        <button type="button" onClick={handleAdd} className={styles.addBtn}>
          <Plus size={15} /> Add Custom Section
        </button>
      </div>

      <div className={styles.list}>
        {customSections.map((cs) => (
          <div key={cs.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <input
                type="text"
                value={cs.title || ""}
                onChange={(e) => updateListItem("customSections", cs.id, "title", e.target.value)}
                placeholder="Section Title (e.g. Publications, Patents, Volunteer)"
                className={styles.titleInput}
              />
              <button
                type="button"
                onClick={() => removeListItem("customSections", cs.id)}
                className={styles.removeBtn}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <textarea
              rows={4}
              value={cs.content || ""}
              onChange={(e) => updateListItem("customSections", cs.id, "content", e.target.value)}
              placeholder="Enter details, bullet points, or descriptions..."
              className={styles.textarea}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSection;

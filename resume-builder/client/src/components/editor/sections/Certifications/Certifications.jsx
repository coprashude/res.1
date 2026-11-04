import React from 'react';
import { useResume } from '../../../../context/ResumeContext';
import styles from './Certifications.module.css';
import { Plus, Trash2, Award } from 'lucide-react';

export const Certifications = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResume();
  const certs = resumeData.certifications || [];

  const handleAdd = () => {
    addListItem("certifications", {
      name: "",
      issuer: "",
      date: "",
      url: ""
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Certifications & Licenses</h2>
          <p className={styles.subtitle}>Add verified industry certifications, cloud licenses, or training credentials.</p>
        </div>
        <button type="button" onClick={handleAdd} className={styles.addBtn}>
          <Plus size={15} /> Add Certification
        </button>
      </div>

      {certs.length === 0 ? (
        <div className={styles.empty}>
          <Award size={32} className={styles.emptyIcon} />
          <p>No certifications added yet.</p>
          <button type="button" onClick={handleAdd} className={styles.emptyBtn}>
            + Add First Certification
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {certs.map((c, index) => (
            <div key={c.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardIndex}>Certificate #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeListItem("certifications", c.id)}
                  className={styles.removeBtn}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Certification Name</label>
                  <input
                    type="text"
                    value={c.name || ""}
                    onChange={(e) => updateListItem("certifications", c.id, "name", e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Issuing Organization</label>
                  <input
                    type="text"
                    value={c.issuer || ""}
                    onChange={(e) => updateListItem("certifications", c.id, "issuer", e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Issue Year / Date</label>
                  <input
                    type="text"
                    value={c.date || ""}
                    onChange={(e) => updateListItem("certifications", c.id, "date", e.target.value)}
                    placeholder="e.g. 2023"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Credential URL (Optional)</label>
                  <input
                    type="text"
                    value={c.url || ""}
                    onChange={(e) => updateListItem("certifications", c.id, "url", e.target.value)}
                    placeholder="e.g. https://..."
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

export default Certifications;

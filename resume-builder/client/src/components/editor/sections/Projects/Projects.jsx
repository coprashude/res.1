import React from 'react';
import { useResume } from '../../../../context/ResumeContext';
import styles from './Projects.module.css';
import { Plus, Trash2, FolderGit2 } from 'lucide-react';

export const Projects = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResume();
  const projects = resumeData.projects || [];

  const handleAdd = () => {
    addListItem("projects", {
      title: "",
      link: "",
      techStack: "",
      description: ""
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Projects & Portfolio</h2>
          <p className={styles.subtitle}>Highlight standout personal, open-source, or client projects.</p>
        </div>
        <button type="button" onClick={handleAdd} className={styles.addBtn}>
          <Plus size={15} /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className={styles.empty}>
          <FolderGit2 size={32} className={styles.emptyIcon} />
          <p>No projects added yet.</p>
          <button type="button" onClick={handleAdd} className={styles.emptyBtn}>
            + Add Project
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {projects.map((proj, index) => (
            <div key={proj.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardIndex}>Project #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeListItem("projects", proj.id)}
                  className={styles.removeBtn}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Project Title</label>
                  <input
                    type="text"
                    value={proj.title || ""}
                    onChange={(e) => updateListItem("projects", proj.id, "title", e.target.value)}
                    placeholder="e.g. AI Resume Builder"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Live Demo or Repo URL</label>
                  <input
                    type="text"
                    value={proj.link || ""}
                    onChange={(e) => updateListItem("projects", proj.id, "link", e.target.value)}
                    placeholder="e.g. https://github.com/..."
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Technologies Used</label>
                  <input
                    type="text"
                    value={proj.techStack || ""}
                    onChange={(e) => updateListItem("projects", proj.id, "techStack", e.target.value)}
                    placeholder="e.g. React, TypeScript, Node.js, AWS"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Project Description & Impact</label>
                  <textarea
                    rows={3}
                    value={proj.description || ""}
                    onChange={(e) => updateListItem("projects", proj.id, "description", e.target.value)}
                    placeholder="Key problem solved, scale of users, or measurable results..."
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

export default Projects;

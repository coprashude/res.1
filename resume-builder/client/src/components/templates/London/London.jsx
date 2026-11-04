import React from 'react';
import styles from './London.module.css';
import { formatDate } from '../../../utils/dateUtils';

export const London = ({ data }) => {
  const { personalDetails, professionalSummary, workExperience, education, skills, projects, certifications } = data;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.name}>{personalDetails.fullName || "Your Full Name"}</h1>
        <div className={styles.subLine}>{personalDetails.jobTitle}</div>
        <div className={styles.contactBar}>
          {[personalDetails.email, personalDetails.phone, personalDetails.location, personalDetails.linkedin].filter(Boolean).join("  •  ")}
        </div>
      </header>

      {professionalSummary && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span>PROFILE</span>
            <hr />
          </div>
          <p className={styles.summaryText}>{professionalSummary}</p>
        </section>
      )}

      {workExperience && workExperience.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span>EXPERIENCE</span>
            <hr />
          </div>
          {workExperience.map((exp) => (
            <div key={exp.id} className={styles.item}>
              <div className={styles.titleRow}>
                <strong>{exp.jobTitle}</strong> — {exp.company}
                <span className={styles.date}>{formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}</span>
              </div>
              <div className={styles.itemDesc}>
                {exp.description.split("\n").map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span>EDUCATION</span>
            <hr />
          </div>
          {education.map((edu) => (
            <div key={edu.id} className={styles.item}>
              <div className={styles.titleRow}>
                <strong>{edu.degree}</strong>, {edu.institution}
                <span className={styles.date}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
              </div>
              {edu.grade && <div className={styles.grade}>{edu.grade}</div>}
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span>SKILLS & EXPERTISE</span>
            <hr />
          </div>
          <div className={styles.skillsInline}>
            {skills.map((s) => s.name).join(", ")}
          </div>
        </section>
      )}
    </div>
  );
};

export default London;


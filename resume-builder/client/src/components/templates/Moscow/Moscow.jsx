import React from 'react';
import styles from './Moscow.module.css';
import { formatDate } from '../../../utils/dateUtils';

export const Moscow = ({ data }) => {
  const { personalDetails, professionalSummary, workExperience, education, skills, projects } = data;

  return (
    <div className={styles.container}>
      <header className={styles.blackBanner}>
        <div className={styles.nameSection}>
          <h1 className={styles.name}>{personalDetails.fullName || "Your Full Name"}</h1>
          <p className={styles.title}>{personalDetails.jobTitle}</p>
        </div>
        <div className={styles.contactCol}>
          {personalDetails.email && <div>{personalDetails.email}</div>}
          {personalDetails.phone && <div>{personalDetails.phone}</div>}
          {personalDetails.location && <div>{personalDetails.location}</div>}
          {personalDetails.website && <div>{personalDetails.website}</div>}
        </div>
      </header>

      {professionalSummary && (
        <section className={styles.section}>
          <div className={styles.barTitle}>
            <span>ABOUT</span>
          </div>
          <p className={styles.text}>{professionalSummary}</p>
        </section>
      )}

      {workExperience && workExperience.length > 0 && (
        <section className={styles.section}>
          <div className={styles.barTitle}>
            <span>EXPERIENCE</span>
          </div>
          {workExperience.map((exp) => (
            <div key={exp.id} className={styles.block}>
              <div className={styles.blockRow}>
                <span className={styles.boldRole}>{exp.jobTitle}</span>
                <span className={styles.dateBadge}>
                  {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>
              <div className={styles.compLocation}>{exp.company} {exp.location && `// ${exp.location}`}</div>
              <div className={styles.bulletList}>
                {exp.description.split("\n").map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <div className={styles.twoCol}>
        {skills && skills.length > 0 && (
          <div className={styles.col}>
            <div className={styles.barTitle}>
              <span>SKILLS</span>
            </div>
            <div className={styles.skillCloud}>
              {skills.map((s) => (
                <span key={s.id} className={styles.skillItem}>{s.name}</span>
              ))}
            </div>
          </div>
        )}

        {education && education.length > 0 && (
          <div className={styles.col}>
            <div className={styles.barTitle}>
              <span>EDUCATION</span>
            </div>
            {education.map((edu) => (
              <div key={edu.id} className={styles.eduItem}>
                <div className={styles.boldRole}>{edu.degree}</div>
                <div className={styles.compLocation}>{edu.institution} ({formatDate(edu.endDate)})</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Moscow;


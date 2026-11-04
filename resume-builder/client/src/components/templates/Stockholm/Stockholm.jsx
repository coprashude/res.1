import React from 'react';
import styles from './Stockholm.module.css';
import { formatDate } from '../../../utils/dateUtils';

export const Stockholm = ({ data }) => {
  const { personalDetails, professionalSummary, workExperience, education, skills, projects, certifications, languages } = data;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.name}>{personalDetails.fullName || "Your Full Name"}</h1>
        <p className={styles.title}>{personalDetails.jobTitle || "Your Title"}</p>
        <div className={styles.contacts}>
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <span>• {personalDetails.phone}</span>}
          {personalDetails.location && <span>• {personalDetails.location}</span>}
          {personalDetails.linkedin && <span>• {personalDetails.linkedin}</span>}
        </div>
      </header>

      {professionalSummary && (
        <section className={styles.section}>
          <h2 className={styles.heading}>Summary</h2>
          <p className={styles.text}>{professionalSummary}</p>
        </section>
      )}

      {workExperience && workExperience.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.heading}>Experience</h2>
          <div className={styles.list}>
            {workExperience.map((exp) => (
              <div key={exp.id} className={styles.item}>
                <div className={styles.row}>
                  <strong className={styles.itemTitle}>{exp.jobTitle}</strong>
                  <span className={styles.date}>{formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}</span>
                </div>
                <div className={styles.company}>{exp.company} {exp.location ? `, ${exp.location}` : ""}</div>
                <div className={styles.desc}>
                  {exp.description.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.heading}>Skills</h2>
          <div className={styles.skillChips}>
            {skills.map((s) => (
              <span key={s.id} className={styles.chip}>{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.heading}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className={styles.item}>
              <div className={styles.row}>
                <strong className={styles.itemTitle}>{edu.degree}</strong>
                <span className={styles.date}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
              </div>
              <div className={styles.company}>{edu.institution} {edu.grade ? `(${edu.grade})` : ""}</div>
            </div>
          ))}
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.heading}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} className={styles.item}>
              <div className={styles.row}>
                <strong className={styles.itemTitle}>{p.title}</strong>
                {p.techStack && <span className={styles.tech}>{p.techStack}</span>}
              </div>
              <p className={styles.descText}>{p.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Stockholm;


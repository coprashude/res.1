import React from 'react';
import styles from './NewYork.module.css';
import { formatDate } from '../../../utils/dateUtils';

export const NewYork = ({ data }) => {
  const { personalDetails, professionalSummary, workExperience, education, skills, projects } = data;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.name}>{personalDetails.fullName || "Your Full Name"}</h1>
        <p className={styles.title}>{personalDetails.jobTitle || "Executive Professional"}</p>
        <div className={styles.contactBar}>
          {[personalDetails.location, personalDetails.phone, personalDetails.email, personalDetails.linkedin].filter(Boolean).join("  |  ")}
        </div>
      </header>

      {professionalSummary && (
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Executive Summary</h2>
          <p className={styles.summaryText}>{professionalSummary}</p>
        </section>
      )}

      {workExperience && workExperience.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Professional Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className={styles.item}>
              <div className={styles.headerLine}>
                <span className={styles.companyName}>{exp.company}</span>
                <span className={styles.dateSpan}>
                  {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>
              <div className={styles.roleLine}>
                <em>{exp.jobTitle}</em>
                {exp.location && <span>, {exp.location}</span>}
              </div>
              <div className={styles.bodyText}>
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
          <h2 className={styles.sectionHeading}>Education & Credentials</h2>
          {education.map((edu) => (
            <div key={edu.id} className={styles.item}>
              <div className={styles.headerLine}>
                <span className={styles.companyName}>{edu.institution}</span>
                <span className={styles.dateSpan}>{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</span>
              </div>
              <div className={styles.roleLine}>{edu.degree} {edu.grade && `• ${edu.grade}`}</div>
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Core Competencies</h2>
          <div className={styles.skillList}>
            {skills.map((s) => s.name).join("  •  ")}
          </div>
        </section>
      )}
    </div>
  );
};

export default NewYork;


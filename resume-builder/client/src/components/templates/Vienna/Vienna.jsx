import React from 'react';
import styles from './Vienna.module.css';
import { formatDate } from '../../../utils/dateUtils';

export const Vienna = ({ data }) => {
  const { personalDetails, professionalSummary, workExperience, education, skills, projects, certifications } = data;

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.tag}>CREATIVE PROFESSIONAL</div>
        <h1 className={styles.name}>{personalDetails.fullName || "Your Full Name"}</h1>
        <p className={styles.role}>{personalDetails.jobTitle}</p>
        <div className={styles.pills}>
          {personalDetails.email && <span className={styles.pill}>{personalDetails.email}</span>}
          {personalDetails.phone && <span className={styles.pill}>{personalDetails.phone}</span>}
          {personalDetails.location && <span className={styles.pill}>{personalDetails.location}</span>}
          {personalDetails.website && <span className={styles.pill}>{personalDetails.website}</span>}
        </div>
      </header>

      {professionalSummary && (
        <section className={styles.card}>
          <h2 className={styles.cardHeading}>About Me</h2>
          <p className={styles.cardText}>{professionalSummary}</p>
        </section>
      )}

      <div className={styles.grid}>
        <div className={styles.col}>
          <h2 className={styles.colHeading}>Experience</h2>
          {workExperience && workExperience.map((exp) => (
            <div key={exp.id} className={styles.box}>
              <div className={styles.boxTop}>
                <strong>{exp.jobTitle}</strong>
                <span className={styles.badge}>{formatDate(exp.startDate)} – {exp.current ? "Now" : formatDate(exp.endDate)}</span>
              </div>
              <div className={styles.boxCompany}>{exp.company}</div>
              <div className={styles.boxDesc}>
                {exp.description.split("\n").map((b, i) => <p key={i}>{b}</p>)}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.col}>
          <h2 className={styles.colHeading}>Key Skills & Expertise</h2>
          <div className={styles.skillBadges}>
            {skills && skills.map((s) => (
              <span key={s.id} className={styles.skillBadge}>{s.name}</span>
            ))}
          </div>

          <h2 className={styles.colHeading} style={{ marginTop: '20px' }}>Education</h2>
          {education && education.map((edu) => (
            <div key={edu.id} className={styles.box}>
              <div className={styles.boxTop}>
                <strong>{edu.degree}</strong>
              </div>
              <div className={styles.boxCompany}>{edu.institution} ({formatDate(edu.endDate)})</div>
            </div>
          ))}

          {certifications && certifications.length > 0 && (
            <>
              <h2 className={styles.colHeading} style={{ marginTop: '20px' }}>Certifications</h2>
              {certifications.map((c) => (
                <div key={c.id} className={styles.certBox}>
                  <strong>{c.name}</strong>
                  <div className={styles.certSub}>{c.issuer} • {c.date}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vienna;


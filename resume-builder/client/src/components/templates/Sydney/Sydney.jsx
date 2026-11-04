import React from 'react';
import styles from './Sydney.module.css';
import { formatDate } from '../../../utils/dateUtils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export const Sydney = ({ data }) => {
  const { personalDetails, professionalSummary, workExperience, education, skills, projects, certifications } = data;

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        {personalDetails.avatar && (
          <img src={personalDetails.avatar} alt="Profile" className={styles.avatar} />
        )}
        <h1 className={styles.sideName}>{personalDetails.fullName || "Your Full Name"}</h1>
        <p className={styles.sideRole}>{personalDetails.jobTitle}</p>

        <div className={styles.contactBlock}>
          <h3 className={styles.sideHeading}>Contact</h3>
          {personalDetails.email && <div className={styles.contactItem}><Mail size={12} /> {personalDetails.email}</div>}
          {personalDetails.phone && <div className={styles.contactItem}><Phone size={12} /> {personalDetails.phone}</div>}
          {personalDetails.location && <div className={styles.contactItem}><MapPin size={12} /> {personalDetails.location}</div>}
          {personalDetails.website && <div className={styles.contactItem}><Globe size={12} /> {personalDetails.website.replace(/^https?:\/\//, '')}</div>}
          {personalDetails.linkedin && <div className={styles.contactItem}><Linkedin size={12} /> {personalDetails.linkedin}</div>}
          {personalDetails.github && <div className={styles.contactItem}><Github size={12} /> {personalDetails.github}</div>}
        </div>

        {skills && skills.length > 0 && (
          <div className={styles.skillsBlock}>
            <h3 className={styles.sideHeading}>Skills</h3>
            {skills.map((s) => (
              <div key={s.id} className={styles.skillItem}>
                <span>{s.name}</span>
                <div className={styles.dotBar}>
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <span key={dot} className={dot <= (s.level || 4) ? styles.dotFilled : styles.dotEmpty} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {education && education.length > 0 && (
          <div className={styles.eduBlock}>
            <h3 className={styles.sideHeading}>Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className={styles.sideEduItem}>
                <div className={styles.eduDegree}>{edu.degree}</div>
                <div className={styles.eduInst}>{edu.institution}</div>
                <div className={styles.eduYear}>{formatDate(edu.endDate)}</div>
              </div>
            ))}
          </div>
        )}
      </aside>

      <main className={styles.main}>
        {professionalSummary && (
          <section className={styles.section}>
            <h2 className={styles.mainHeading}>Profile</h2>
            <p className={styles.summaryText}>{professionalSummary}</p>
          </section>
        )}

        {workExperience && workExperience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.mainHeading}>Work Experience</h2>
            {workExperience.map((exp) => (
              <div key={exp.id} className={styles.expCard}>
                <div className={styles.cardHeader}>
                  <strong className={styles.jobTitle}>{exp.jobTitle}</strong>
                  <span className={styles.expDate}>{formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}</span>
                </div>
                <div className={styles.companyLine}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                <div className={styles.expBody}>
                  {exp.description.split("\n").map((b, i) => (
                    <p key={i}>{b}</p>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {projects && projects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.mainHeading}>Key Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className={styles.expCard}>
                <div className={styles.cardHeader}>
                  <strong className={styles.jobTitle}>{p.title}</strong>
                  {p.techStack && <span className={styles.techTag}>{p.techStack}</span>}
                </div>
                <p className={styles.projDesc}>{p.description}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default Sydney;


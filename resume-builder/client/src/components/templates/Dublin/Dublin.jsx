import React from 'react';
import styles from './Dublin.module.css';
import { formatDate } from '../../../utils/dateUtils';
import { Terminal, Code, Cpu, ExternalLink } from 'lucide-react';

export const Dublin = ({ data }) => {
  const { personalDetails, professionalSummary, workExperience, education, skills, projects, certifications } = data;

  return (
    <div className={styles.container}>
      <header className={styles.techHeader}>
        <div className={styles.prompt}>
          <Terminal size={14} className={styles.termIcon} />
          <span>developer@system:~# whoami</span>
        </div>
        <h1 className={styles.name}>{personalDetails.fullName || "Your Full Name"}</h1>
        <p className={styles.role}>&lt;{personalDetails.jobTitle} /&gt;</p>
        <div className={styles.metaRow}>
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.location && <span>📍 {personalDetails.location}</span>}
          {personalDetails.github && <span>🐙 {personalDetails.github}</span>}
          {personalDetails.website && <span>🌐 {personalDetails.website}</span>}
        </div>
      </header>

      {professionalSummary && (
        <section className={styles.section}>
          <div className={styles.secTitle}>// SUMMARY</div>
          <p className={styles.summary}>{professionalSummary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className={styles.section}>
          <div className={styles.secTitle}>// TECH_STACK</div>
          <div className={styles.tagsGrid}>
            {skills.map((s) => (
              <div key={s.id} className={styles.tag}>
                <code>{s.name}</code>
                {s.level && <span className={styles.tagLvl}>{s.level}/5</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {workExperience && workExperience.length > 0 && (
        <section className={styles.section}>
          <div className={styles.secTitle}>// EXPERIENCE</div>
          {workExperience.map((exp) => (
            <div key={exp.id} className={styles.expBlock}>
              <div className={styles.expHead}>
                <span className={styles.expRole}>{exp.jobTitle} @ <span className={styles.comp}>{exp.company}</span></span>
                <span className={styles.expTime}>[{formatDate(exp.startDate)} -&gt; {exp.current ? "HEAD" : formatDate(exp.endDate)}]</span>
              </div>
              <div className={styles.expBullets}>
                {exp.description.split("\n").map((b, i) => (
                  <div key={i} className={styles.bulletRow}>
                    <span className={styles.arrow}>&gt;</span>
                    <span>{b.replace(/^[•\*\-]\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className={styles.section}>
          <div className={styles.secTitle}>// OPEN_SOURCE_AND_PROJECTS</div>
          <div className={styles.projGrid}>
            {projects.map((p) => (
              <div key={p.id} className={styles.projCard}>
                <div className={styles.projHeader}>
                  <strong>{p.title}</strong>
                  {p.link && <ExternalLink size={12} />}
                </div>
                {p.techStack && <div className={styles.projStack}>{p.techStack}</div>}
                <p className={styles.projDesc}>{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section className={styles.section}>
          <div className={styles.secTitle}>// EDUCATION</div>
          {education.map((edu) => (
            <div key={edu.id} className={styles.eduRow}>
              <strong>{edu.degree}</strong> — {edu.institution} ({formatDate(edu.endDate)})
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Dublin;


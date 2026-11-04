import React from 'react';
import styles from './Toronto.module.css';
import { formatDate } from '../../../utils/dateUtils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export const Toronto = ({ data }) => {
  const { personalDetails, professionalSummary, workExperience, education, skills, projects, certifications, languages, customSections } = data;

  return (
    <div className={styles.container}>
      {/* Header Banner */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {personalDetails.avatar && (
            <img src={personalDetails.avatar} alt={personalDetails.fullName} className={styles.avatar} />
          )}
          <div>
            <h1 className={styles.name}>{personalDetails.fullName || "Your Full Name"}</h1>
            <p className={styles.title}>{personalDetails.jobTitle || "Your Professional Title"}</p>
          </div>
        </div>
        <div className={styles.contactGrid}>
          {personalDetails.email && (
            <div className={styles.contactItem}><Mail size={13} /> {personalDetails.email}</div>
          )}
          {personalDetails.phone && (
            <div className={styles.contactItem}><Phone size={13} /> {personalDetails.phone}</div>
          )}
          {personalDetails.location && (
            <div className={styles.contactItem}><MapPin size={13} /> {personalDetails.location}</div>
          )}
          {personalDetails.website && (
            <div className={styles.contactItem}><Globe size={13} /> {personalDetails.website.replace(/^https?:\/\//, '')}</div>
          )}
          {personalDetails.linkedin && (
            <div className={styles.contactItem}><Linkedin size={13} /> {personalDetails.linkedin}</div>
          )}
          {personalDetails.github && (
            <div className={styles.contactItem}><Github size={13} /> {personalDetails.github}</div>
          )}
        </div>
      </header>

      {/* Main Body Grid */}
      <div className={styles.bodyGrid}>
        {/* Main Column */}
        <div className={styles.mainColumn}>
          {/* Summary */}
          {professionalSummary && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Professional Profile</h2>
              <p className={styles.summaryText}>{professionalSummary}</p>
            </section>
          )}

          {/* Work Experience */}
          {workExperience && workExperience.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Employment History</h2>
              <div className={styles.timeline}>
                {workExperience.map((exp) => (
                  <div key={exp.id} className={styles.timelineItem}>
                    <div className={styles.itemHeader}>
                      <span className={styles.itemRole}>{exp.jobTitle}</span>
                      <span className={styles.itemDate}>
                        {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className={styles.itemSub}>
                      <span className={styles.itemCompany}>{exp.company}</span>
                      {exp.location && <span className={styles.itemLocation}>• {exp.location}</span>}
                    </div>
                    <div className={styles.itemDescription}>
                      {exp.description.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Key Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} className={styles.projectItem}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemRole}>{proj.title}</span>
                    {proj.link && <span className={styles.itemLink}>{proj.link.replace(/^https?:\/\//, '')}</span>}
                  </div>
                  {proj.techStack && <div className={styles.techPill}>{proj.techStack}</div>}
                  <p className={styles.projectDesc}>{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar Column */}
        <aside className={styles.sidebarColumn}>
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Expertise</h2>
              <div className={styles.skillsList}>
                {skills.map((skill) => (
                  <div key={skill.id} className={styles.skillRow}>
                    <span className={styles.skillName}>{skill.name}</span>
                    {skill.level && (
                      <div className={styles.skillBar}>
                        <div className={styles.skillFill} style={{ width: `${(skill.level / 5) * 100}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className={styles.sideItem}>
                  <div className={styles.sideDegree}>{edu.degree}</div>
                  <div className={styles.sideInst}>{edu.institution}</div>
                  <div className={styles.sideDate}>{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</div>
                  {edu.grade && <div className={styles.sideGrade}>{edu.grade}</div>}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Certifications</h2>
              {certifications.map((c) => (
                <div key={c.id} className={styles.sideItem}>
                  <div className={styles.certName}>{c.name}</div>
                  <div className={styles.certIssuer}>{c.issuer} {c.date && `• ${c.date}`}</div>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Languages</h2>
              <div className={styles.langPills}>
                {languages.map((l) => (
                  <div key={l.id} className={styles.langTag}>
                    <strong>{l.name}</strong> <span>({l.level})</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Custom Sections */}
          {customSections && customSections.map((cs) => (
            <section key={cs.id} className={styles.sideSection}>
              <h2 className={styles.sideTitle}>{cs.title}</h2>
              <p className={styles.customText}>{cs.content}</p>
            </section>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default Toronto;


import React from 'react';
import { useResume } from '../../../../context/ResumeContext';
import styles from './PersonalDetails.module.css';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Image } from 'lucide-react';

export const PersonalDetails = () => {
  const { resumeData, updatePersonalDetails } = useResume();
  const p = resumeData.personalDetails;

  const handleChange = (e) => {
    updatePersonalDetails(e.target.name, e.target.value);
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Personal Information</h2>
        <p className={styles.subtitle}>Enter your contact information and headline to let recruiters find you.</p>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroupFull}>
          <label className={styles.label}><User size={14} /> Full Name</label>
          <input
            type="text"
            name="fullName"
            value={p.fullName || ""}
            onChange={handleChange}
            placeholder="e.g. Alex Morgan"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroupFull}>
          <label className={styles.label}>Job Title / Headline</label>
          <input
            type="text"
            name="jobTitle"
            value={p.jobTitle || ""}
            onChange={handleChange}
            placeholder="e.g. Senior Full-Stack Software Architect"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}><Mail size={14} /> Email Address</label>
          <input
            type="email"
            name="email"
            value={p.email || ""}
            onChange={handleChange}
            placeholder="e.g. alex@example.com"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}><Phone size={14} /> Phone Number</label>
          <input
            type="text"
            name="phone"
            value={p.phone || ""}
            onChange={handleChange}
            placeholder="e.g. +1 (555) 234-5678"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}><MapPin size={14} /> City, Country / State</label>
          <input
            type="text"
            name="location"
            value={p.location || ""}
            onChange={handleChange}
            placeholder="e.g. San Francisco, CA"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}><Globe size={14} /> Portfolio / Website</label>
          <input
            type="text"
            name="website"
            value={p.website || ""}
            onChange={handleChange}
            placeholder="e.g. https://alexmorgan.dev"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}><Linkedin size={14} /> LinkedIn URL / Handle</label>
          <input
            type="text"
            name="linkedin"
            value={p.linkedin || ""}
            onChange={handleChange}
            placeholder="e.g. linkedin.com/in/alexmorgan"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}><Github size={14} /> GitHub Handle / URL</label>
          <input
            type="text"
            name="github"
            value={p.github || ""}
            onChange={handleChange}
            placeholder="e.g. github.com/alexmorgan"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroupFull}>
          <label className={styles.label}><Image size={14} /> Profile Picture / Avatar URL</label>
          <input
            type="text"
            name="avatar"
            value={p.avatar || ""}
            onChange={handleChange}
            placeholder="Paste image URL (optional)"
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;

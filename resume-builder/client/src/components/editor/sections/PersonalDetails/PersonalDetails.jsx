import React, { useRef } from 'react';
import { useResume } from '../../../../context/ResumeContext';
import styles from './PersonalDetails.module.css';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Image, Upload, X } from 'lucide-react';

export const PersonalDetails = () => {
  const { resumeData, updatePersonalDetails, handlePhotoUpload } = useResume();
  const p = resumeData.personalDetails || {};
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    updatePersonalDetails(e.target.name, e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePhotoUpload(file);
    }
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Personal Information</h2>
        <p className={styles.subtitle}>Enter your contact information and headline to let recruiters find you.</p>
      </div>

      {/* Photo Upload Section */}
      <div className={styles.photoUploadRow}>
        <div className={styles.avatarPreview}>
          {p.avatar ? (
            <img src={p.avatar} alt="Profile" className={styles.avatarImg} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <User size={32} />
            </div>
          )}
        </div>
        <div className={styles.photoControls}>
          <span className={styles.photoLabel}>Candidate Photo / Headshot</span>
          <div className={styles.photoBtnGroup}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={styles.uploadBtn}
            >
              <Upload size={14} /> Upload from Device
            </button>
            {p.avatar && (
              <button
                type="button"
                onClick={() => updatePersonalDetails("avatar", "")}
                className={styles.removePhotoBtn}
              >
                <X size={14} /> Remove
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          <span className={styles.photoHint}>Supports JPG, PNG, WEBP. Converted locally into resume.</span>
        </div>
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
      </div>
    </div>
  );
};

export default PersonalDetails;

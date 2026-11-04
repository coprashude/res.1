import React, { useState } from 'react';
import { useResume } from '../../../../context/ResumeContext';
import { aiService } from '../../../../services/ai.service';
import styles from './ProfessionalSummary.module.css';
import { Sparkles, Loader2 } from 'lucide-react';

export const ProfessionalSummary = () => {
  const { resumeData, updateSummary } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAISuggestion = async () => {
    setIsGenerating(true);
    try {
      const generated = await aiService.generateSummary(
        resumeData.personalDetails.jobTitle || "Software Engineer",
        5
      );
      updateSummary(generated);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.title}>Professional Summary</h2>
          <p className={styles.subtitle}>Highlight your key qualifications, achievements, and career focus.</p>
        </div>
        <button 
          type="button" 
          onClick={handleAISuggestion} 
          disabled={isGenerating}
          className={styles.aiBtn}
        >
          {isGenerating ? <Loader2 size={14} className={styles.spin} /> : <Sparkles size={14} />}
          {isGenerating ? "Generating..." : "AI Auto-Write"}
        </button>
      </div>

      <textarea
        rows={6}
        value={resumeData.professionalSummary || ""}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Write a concise 3-4 sentence summary of your career accomplishments..."
        className={styles.textarea}
      />
    </div>
  );
};

export default ProfessionalSummary;

import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import styles from './CoverLetterGenerator.module.css';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Printer, 
  Building2, 
  Briefcase, 
  User, 
  FileText,
  Loader2
} from 'lucide-react';

export const CoverLetterGenerator = () => {
  const { resumeData, coverLetter, setCoverLetter } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const candidateName = resumeData.personalDetails?.fullName || "Alex Morgan";
  const candidateEmail = resumeData.personalDetails?.email || "candidate@email.com";
  const candidatePhone = resumeData.personalDetails?.phone || "+1 (555) 000-0000";
  const candidateRole = resumeData.personalDetails?.jobTitle || "Software Engineer";

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 600));

    const company = coverLetter.companyName || "the organization";
    const role = coverLetter.jobTitle || "the position";
    const manager = coverLetter.hiringManager || "Hiring Team";

    const topSkill = (resumeData.skills?.[0]?.name) || "modern full-stack engineering";
    const recentCompany = (resumeData.workExperience?.[0]?.company) || "prior industry roles";

    const generated = `Dear ${manager},

I am writing to express my enthusiastic interest in the ${role} position at ${company}. With a proven background as a ${candidateRole} and demonstrated expertise in ${topSkill}, I am eager to contribute to ${company}'s ongoing mission and high-impact technical initiatives.

In my recent experience at ${recentCompany}, I have consistently focused on building scalable, reliable solutions while accelerating team productivity and optimizing system architectures. The opportunity to leverage my experience in ${topSkill} to tackle complex challenges at ${company} directly aligns with my career trajectory and dedication to engineering excellence.

Furthermore, I am impressed by ${company}'s forward-thinking culture and technical innovation. I would welcome the opportunity to discuss how my qualifications, track record of quantifiable results, and technical leadership can deliver immediate value to your organization.

Thank you very much for your time and consideration.

Sincerely,

${candidateName}
${candidateEmail} | ${candidatePhone}`;

    setCoverLetter(prev => ({ ...prev, generatedContent: generated }));
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (!coverLetter.generatedContent) return;
    navigator.clipboard.writeText(coverLetter.generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>AI Cover Letter Generator</h1>
          <p className={styles.subtitle}>
            Instantly generate a tailored, professional cover letter aligned with your resume credentials.
          </p>
        </div>
      </div>

      <div className={styles.splitGrid}>
        {/* Left Inputs Form */}
        <div className={styles.inputPanel}>
          <h3 className={styles.panelTitle}>Target Opportunity Details</h3>
          
          <div className={styles.formGroup}>
            <label className={styles.label}><Building2 size={14} /> Target Company</label>
            <input
              type="text"
              value={coverLetter.companyName}
              onChange={(e) => setCoverLetter({ ...coverLetter, companyName: e.target.value })}
              placeholder="e.g. Google, Stripe, Microsoft"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}><Briefcase size={14} /> Target Job Role</label>
            <input
              type="text"
              value={coverLetter.jobTitle}
              onChange={(e) => setCoverLetter({ ...coverLetter, jobTitle: e.target.value })}
              placeholder="e.g. Senior Full-Stack Engineer"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}><User size={14} /> Hiring Manager Name (Optional)</label>
            <input
              type="text"
              value={coverLetter.hiringManager}
              onChange={(e) => setCoverLetter({ ...coverLetter, hiringManager: e.target.value })}
              placeholder="e.g. Hiring Team or Jane Doe"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}><FileText size={14} /> Job Highlights / Notes (Optional)</label>
            <textarea
              rows={4}
              value={coverLetter.jobDetails}
              onChange={(e) => setCoverLetter({ ...coverLetter, jobDetails: e.target.value })}
              placeholder="Paste specific job requirements or themes you want emphasized..."
              className={styles.textarea}
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className={styles.generateBtn}
          >
            {isGenerating ? <Loader2 size={16} className={styles.spin} /> : <Sparkles size={16} />}
            {isGenerating ? "Synthesizing Letter..." : "Generate AI Cover Letter"}
          </button>
        </div>

        {/* Right Preview / Editor */}
        <div className={styles.previewPanel}>
          <div className={styles.previewToolbar}>
            <span className={styles.previewHeading}>Letter Output</span>
            <div className={styles.toolBtns}>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!coverLetter.generatedContent}
                className={styles.toolBtn}
                title="Copy to clipboard"
              >
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                disabled={!coverLetter.generatedContent}
                className={styles.toolBtn}
                title="Print or export PDF"
              >
                <Printer size={14} /> Print
              </button>
            </div>
          </div>

          <div className={styles.letterSheet} id="printable-cover-letter">
            <textarea
              className={styles.letterTextarea}
              value={coverLetter.generatedContent || (
                "Click 'Generate AI Cover Letter' to compose a personalized, persuasive letter based on your current resume experience and target role."
              )}
              onChange={(e) => setCoverLetter({ ...coverLetter, generatedContent: e.target.value })}
              placeholder="Generated cover letter will appear here for editing..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;


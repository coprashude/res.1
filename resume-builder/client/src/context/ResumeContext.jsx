import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { SAMPLE_RESUME_DATA, EMPTY_RESUME_DATA } from '../utils/sampleData';
import { STORAGE_KEY_RESUME } from '../config/constants';
import { calculateATSScore, analyzeJobMatch } from '../utils/atsEngine';
import { aiService } from '../services/ai.service';

const ResumeContext = createContext(null);
const STORAGE_KEY_ALL_RESUMES = "proresume_all_resumes";
const STORAGE_KEY_ACTIVE_ID = "proresume_active_resume_id";

export const ResumeProvider = ({ children }) => {
  // Navigation View: "editor" | "myResumes" | "coverLetter" | "jobMatch" | "interviewPrep"
  const [activeView, setActiveView] = useState("editor");

  // All Resumes Store (Multi-resume support)
  const [resumes, setResumes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ALL_RESUMES);
      if (saved) return JSON.parse(saved);
      // Check legacy single resume key
      const legacy = localStorage.getItem(STORAGE_KEY_RESUME);
      if (legacy) {
        const parsed = JSON.parse(legacy);
        return [parsed];
      }
    } catch (e) {
      console.error("Failed to load resumes", e);
    }
    return [SAMPLE_RESUME_DATA];
  });

  const [activeResumeId, setActiveResumeId] = useState(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      if (savedId) return savedId;
    } catch {}
    return SAMPLE_RESUME_DATA.id;
  });

  // Current active resume data
  const currentResume = useMemo(() => {
    return resumes.find(r => r.id === activeResumeId) || resumes[0] || SAMPLE_RESUME_DATA;
  }, [resumes, activeResumeId]);

  const [activeSection, setActiveSection] = useState("personalDetails");
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(new Date().toLocaleTimeString());

  // ATS Modal state
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);

  // AI Chat Assistant state
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Cover Letter state
  const [coverLetter, setCoverLetter] = useState({
    companyName: "Google Cloud",
    jobTitle: "Senior Solutions Architect",
    hiringManager: "Hiring Manager",
    jobDetails: "Leading enterprise digital transformation, designing distributed cloud microservices, and mentoring engineering teams.",
    generatedContent: ""
  });

  // Target Job Description for Matcher
  const [targetJobDescription, setTargetJobDescription] = useState("");

  // Autosave to localStorage
  useEffect(() => {
    setIsAutoSaving(true);
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY_ALL_RESUMES, JSON.stringify(resumes));
        localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeResumeId);
        localStorage.setItem(STORAGE_KEY_RESUME, JSON.stringify(currentResume));
        setLastSavedTime(new Date().toLocaleTimeString());
      } catch (e) {
        console.error("Autosave error", e);
      } finally {
        setIsAutoSaving(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [resumes, activeResumeId, currentResume]);

  // Real-time ATS Score calculation
  const atsAnalysis = useMemo(() => {
    return calculateATSScore(currentResume);
  }, [currentResume]);

  // Real-time Job Match analysis
  const jobMatchResult = useMemo(() => {
    return analyzeJobMatch(currentResume, targetJobDescription);
  }, [currentResume, targetJobDescription]);

  // Mutation helper for current active resume
  const updateCurrentResume = useCallback((updater) => {
    setResumes(prevList => {
      return prevList.map(item => {
        if (item.id === (currentResume?.id || activeResumeId)) {
          return typeof updater === 'function' ? updater(item) : { ...item, ...updater };
        }
        return item;
      });
    });
  }, [currentResume?.id, activeResumeId]);

  // Personal Details
  const updatePersonalDetails = useCallback((field, value) => {
    updateCurrentResume(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value }
    }));
  }, [updateCurrentResume]);

  // Photo upload reader (converts local file to Base64)
  const handlePhotoUpload = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      updatePersonalDetails("avatar", e.target.result);
    };
    reader.readAsDataURL(file);
  }, [updatePersonalDetails]);

  // Professional Summary
  const updateSummary = useCallback((summary) => {
    updateCurrentResume({ professionalSummary: summary });
  }, [updateCurrentResume]);

  // Add Item to list
  const addListItem = useCallback((section, defaultItem) => {
    updateCurrentResume(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), { id: `${section}-${Date.now()}`, ...defaultItem }]
    }));
  }, [updateCurrentResume]);

  // Update Item in list
  const updateListItem = useCallback((section, id, field, value) => {
    updateCurrentResume(prev => ({
      ...prev,
      [section]: (prev[section] || []).map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  }, [updateCurrentResume]);

  // Remove Item from list
  const removeListItem = useCallback((section, id) => {
    updateCurrentResume(prev => ({
      ...prev,
      [section]: (prev[section] || []).filter(item => item.id !== id)
    }));
  }, [updateCurrentResume]);

  // Move Item Up (Reordering)
  const moveItemUp = useCallback((section, index) => {
    if (index <= 0) return;
    updateCurrentResume(prev => {
      const list = [...(prev[section] || [])];
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
      return { ...prev, [section]: list };
    });
  }, [updateCurrentResume]);

  // Move Item Down (Reordering)
  const moveItemDown = useCallback((section, index) => {
    updateCurrentResume(prev => {
      const list = [...(prev[section] || [])];
      if (index >= list.length - 1) return prev;
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
      return { ...prev, [section]: list };
    });
  }, [updateCurrentResume]);

  // Styling setters
  const setTemplate = useCallback((templateId) => updateCurrentResume({ templateId }), [updateCurrentResume]);
  const setColorScheme = useCallback((colorScheme) => updateCurrentResume({ colorScheme }), [updateCurrentResume]);
  const setFont = useCallback((fontId) => updateCurrentResume({ fontId }), [updateCurrentResume]);
  const setSpacing = useCallback((spacing) => updateCurrentResume({ spacing }), [updateCurrentResume]);

  // Multi-Resume Management
  const createNewResume = useCallback((title = "Untitled Resume") => {
    const newId = `resume-${Date.now()}`;
    const newResume = {
      ...EMPTY_RESUME_DATA,
      id: newId,
      title
    };
    setResumes(prev => [newResume, ...prev]);
    setActiveResumeId(newId);
    setActiveView("editor");
    return newId;
  }, []);

  const duplicateResume = useCallback((id) => {
    const target = resumes.find(r => r.id === id);
    if (!target) return;
    const newId = `resume-copy-${Date.now()}`;
    const cloned = {
      ...JSON.parse(JSON.stringify(target)),
      id: newId,
      title: `${target.title} (Copy)`
    };
    setResumes(prev => [cloned, ...prev]);
    setActiveResumeId(newId);
  }, [resumes]);

  const deleteResume = useCallback((id) => {
    if (resumes.length <= 1) {
      alert("You must keep at least one resume!");
      return;
    }
    const filtered = resumes.filter(r => r.id !== id);
    setResumes(filtered);
    if (activeResumeId === id) {
      setActiveResumeId(filtered[0].id);
    }
  }, [resumes, activeResumeId]);

  const renameResume = useCallback((id, newTitle) => {
    setResumes(prev => prev.map(r => r.id === id ? { ...r, title: newTitle } : r));
  }, []);

  const selectResume = useCallback((id) => {
    setActiveResumeId(id);
    setActiveView("editor");
  }, []);

  const loadSampleData = useCallback(() => {
    updateCurrentResume(SAMPLE_RESUME_DATA);
  }, [updateCurrentResume]);

  const clearResume = useCallback(() => {
    updateCurrentResume(EMPTY_RESUME_DATA);
  }, [updateCurrentResume]);

  const importResumeData = useCallback((imported) => {
    if (imported && imported.personalDetails) {
      updateCurrentResume(imported);
    }
  }, [updateCurrentResume]);

  return (
    <ResumeContext.Provider value={{
      // Navigation
      activeView,
      setActiveView,
      // Resumes
      resumes,
      activeResumeId,
      resumeData: currentResume,
      createNewResume,
      duplicateResume,
      deleteResume,
      renameResume,
      selectResume,
      // Section Editing
      activeSection,
      setActiveSection,
      updatePersonalDetails,
      handlePhotoUpload,
      updateSummary,
      addListItem,
      updateListItem,
      removeListItem,
      moveItemUp,
      moveItemDown,
      // Styling
      setTemplate,
      setColorScheme,
      setFont,
      setSpacing,
      loadSampleData,
      clearResume,
      importResumeData,
      // Status
      isAutoSaving,
      lastSavedTime,
      // ATS & Job Match
      atsAnalysis,
      isATSModalOpen,
      setIsATSModalOpen,
      targetJobDescription,
      setTargetJobDescription,
      jobMatchResult,
      // AI Chat
      isAIChatOpen,
      setIsAIChatOpen,
      // Cover Letter
      coverLetter,
      setCoverLetter
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within a ResumeProvider");
  return context;
};

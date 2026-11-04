import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SAMPLE_RESUME_DATA, EMPTY_RESUME_DATA } from '../utils/sampleData';
import { STORAGE_KEY_RESUME } from '../config/constants';

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESUME);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load resume from storage", e);
    }
    return SAMPLE_RESUME_DATA;
  });

  const [activeSection, setActiveSection] = useState("personalDetails");
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(new Date().toLocaleTimeString());

  // Autosave to localStorage
  useEffect(() => {
    setIsAutoSaving(true);
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY_RESUME, JSON.stringify(resumeData));
        setLastSavedTime(new Date().toLocaleTimeString());
      } catch (e) {
        console.error("Autosave failed", e);
      } finally {
        setIsAutoSaving(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [resumeData]);

  // Update Personal Details
  const updatePersonalDetails = useCallback((field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value
      }
    }));
  }, []);

  // Update Summary
  const updateSummary = useCallback((summary) => {
    setResumeData(prev => ({ ...prev, professionalSummary: summary }));
  }, []);

  // Generic List item adder
  const addListItem = useCallback((section, defaultItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), { id: `${section}-${Date.now()}`, ...defaultItem }]
    }));
  }, []);

  // Generic List item updater
  const updateListItem = useCallback((section, id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  // Generic List item remover
  const removeListItem = useCallback((section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  }, []);

  // Reorder items
  const reorderList = useCallback((section, startIndex, endIndex) => {
    setResumeData(prev => {
      const list = Array.from(prev[section] || []);
      const [removed] = list.splice(startIndex, 1);
      list.splice(endIndex, 0, removed);
      return { ...prev, [section]: list };
    });
  }, []);

  // Styling updates
  const setTemplate = useCallback((templateId) => {
    setResumeData(prev => ({ ...prev, templateId }));
  }, []);

  const setColorScheme = useCallback((colorScheme) => {
    setResumeData(prev => ({ ...prev, colorScheme }));
  }, []);

  const setFont = useCallback((fontId) => {
    setResumeData(prev => ({ ...prev, fontId }));
  }, []);

  const setSpacing = useCallback((spacing) => {
    setResumeData(prev => ({ ...prev, spacing }));
  }, []);

  // Load sample or clear
  const loadSampleData = useCallback(() => {
    setResumeData(SAMPLE_RESUME_DATA);
  }, []);

  const clearResume = useCallback(() => {
    setResumeData(EMPTY_RESUME_DATA);
  }, []);

  const importResumeData = useCallback((imported) => {
    if (imported && imported.personalDetails) {
      setResumeData(imported);
    }
  }, []);

  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      activeSection,
      setActiveSection,
      isAutoSaving,
      lastSavedTime,
      updatePersonalDetails,
      updateSummary,
      addListItem,
      updateListItem,
      removeListItem,
      reorderList,
      setTemplate,
      setColorScheme,
      setFont,
      setSpacing,
      loadSampleData,
      clearResume,
      importResumeData
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};


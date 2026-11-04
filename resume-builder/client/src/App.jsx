import React from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/common/Navbar/Navbar';
import EditorLayout from './components/editor/EditorLayout/EditorLayout';
import MyResumes from './components/dashboard/MyResumes/MyResumes';
import CoverLetterGenerator from './components/coverLetter/CoverLetterGenerator';
import JobMatchAnalyzer from './components/jobMatch/JobMatchAnalyzer';
import InterviewPrep from './components/interview/InterviewPrep';
import ATSScoreDrawer from './components/ats/ATSScoreDrawer';
import AIChatAssistant from './components/aiChat/AIChatAssistant';
import './App.css';

function MainAppShell() {
  const { activeView } = useResume();

  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main-content">
        {activeView === "editor" && <EditorLayout />}
        {activeView === "myResumes" && <MyResumes />}
        {activeView === "coverLetter" && <CoverLetterGenerator />}
        {activeView === "jobMatch" && <JobMatchAnalyzer />}
        {activeView === "interviewPrep" && <InterviewPrep />}
      </main>

      {/* Global ATS Audit Slide-out Drawer */}
      <ATSScoreDrawer />

      {/* Global AI Copilot Assistant */}
      <AIChatAssistant />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <ResumeProvider>
            <MainAppShell />
          </ResumeProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;

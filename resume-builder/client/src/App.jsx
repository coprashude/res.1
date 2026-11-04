import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import EditorLayout from './components/editor/EditorLayout/EditorLayout';
import './App.css';

export function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <ResumeProvider>
            <EditorLayout />
          </ResumeProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;


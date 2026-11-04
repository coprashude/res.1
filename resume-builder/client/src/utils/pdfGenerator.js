export const printResume = () => {
  window.print();
};

export const exportToPDF = (elementId = "resume-preview-container", fileName = "resume.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }
  window.print();
};


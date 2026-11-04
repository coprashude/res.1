export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    ME: `${API_BASE_URL}/auth/me`
  },
  RESUMES: {
    LIST: `${API_BASE_URL}/resumes`,
    CREATE: `${API_BASE_URL}/resumes`,
    GET: (id) => `${API_BASE_URL}/resumes/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/resumes/${id}`,
    DELETE: (id) => `${API_BASE_URL}/resumes/${id}`,
    EXPORT_PDF: (id) => `${API_BASE_URL}/resumes/${id}/pdf`
  },
  AI: {
    ENHANCE_BULLET: `${API_BASE_URL}/ai/enhance-bullet`,
    GENERATE_SUMMARY: `${API_BASE_URL}/ai/generate-summary`
  }
};


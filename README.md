# ProResume - Modern Full-Stack Resume Builder

A full-featured, responsive, production-ready Resume Builder application built with **React 18, Vite, Node.js, Express, and Lucide Icons**.

---

## 🚀 Features

- **8 Hand-Crafted Resume Templates**:
  - `Toronto`: Split sidebar with bold header banner and progress indicators.
  - `Stockholm`: Scandinavian minimalism with refined typography.
  - `New York`: Executive corporate elegance with serif fonts.
  - `Vienna`: Creative color-blocked layout with tag pills.
  - `Sydney`: Dual-column layout with dark accent sidebar.
  - `London`: Classic British academic grid with crisp dividers.
  - `Dublin`: Tech-first developer resume with terminal style & code tags.
  - `Moscow`: Bold high-contrast architectural layout.
- **Dynamic Real-Time Preview**: Instant updates as you type with zoom controls (60% to 140%).
- **AI-Powered Writing Assistant**: One-click action-verb optimizer and professional summary generator.
- **Customization Engine**:
  - 6 Professional Color Schemes (Corporate Blue, Emerald Slate, Modern Purple, Ruby Crimson, Obsidian Noir, Warm Amber).
  - 6 Google Font Families (Inter, Roboto, Open Sans, Lato, Montserrat, Merriweather).
  - Page Density & Spacing options (Compact, Normal, Spacious).
- **Data Persistence & Export**:
  - LocalStorage automatic saving.
  - High-fidelity PDF export / Print stylesheet (`@media print`).
  - JSON Import & Export for backup and multi-resume workflows.
  - 1-Click "Sample Data" loader.

---

## 📁 Project Structure

```text
resume-builder/
├── client/                     # Frontend (React 18 + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── editor/         # Sections, Sidebar, Header, Layout
│   │   │   └── templates/      # 8 Resume Templates + TemplateEngine
│   │   ├── context/            # ResumeContext, AuthContext, ThemeContext
│   │   ├── services/           # AI & API services
│   │   ├── utils/              # Sample Data, Formatters, Date Utils
│   │   ├── config/             # Templates, Fonts, Color Schemes
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── package.json
└── server/                     # Backend API (Node.js + Express)
    ├── src/
    │   ├── routes/             # Auth, Resumes, AI routes
    │   └── index.js
    └── package.json
```

---

## 🏃‍♂️ How to Run

### Development Servers (Currently Running):
- **Frontend**: [http://127.0.0.1:5173](http://127.0.0.1:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

To start both servers anytime, simply run `start.bat` or:
```bash
# Frontend
cd resume-builder/client
npm run dev

# Backend
cd resume-builder/server
npm start
```


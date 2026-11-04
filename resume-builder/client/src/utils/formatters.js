export const cleanBulletPoints = (text) => {
  if (!text) return [];
  return text
    .split("\n")
    .map(line => line.trim().replace(/^[\u2022\u25E6\u2043\u2219\*\-]\s*/, ""))
    .filter(Boolean);
};

export const sanitizeFileName = (name) => {
  return (name || "resume")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "_")
    .replace(/_+/g, "_");
};


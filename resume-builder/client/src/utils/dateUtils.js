export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  if (dateStr.toLowerCase() === "present") return "Present";
  
  const [year, month] = dateStr.split("-");
  if (!month) return year || "";
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mIndex = parseInt(month, 10) - 1;
  return `${months[mIndex] || month} ${year}`;
};

export const calculateDuration = (startDate, endDate) => {
  if (!startDate) return "";
  const start = new Date(startDate);
  const end = (!endDate || endDate.toLowerCase() === "present") ? new Date() : new Date(endDate);
  
  const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (totalMonths <= 0) return "";
  
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
};


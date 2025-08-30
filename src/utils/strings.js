export const initialsFrom = (name) => {
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (!trimmed) return "";
  const parts = trimmed.split(" ");
  if (parts.length === 1) {
    const s = parts[0].replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    return s.slice(0, 2);
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

export const normalize = (s) => s.trim().replace(/\s+/g, " ").toLowerCase();

export const stamp = (d = new Date()) => ({
  date: d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  time: d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
});

export const nowISO = () => new Date().toISOString();

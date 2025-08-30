const KEY = "pocket-notes-v1";

const seed = {
  groups: [
    {
      id: "g-1",
      name: "My Notes",
      color: "#1e49ff",
      initials: "MN",
      createdAt: new Date().toISOString(),
    },
  ],
  activeGroupId: "g-1",
  notes: {
    "g-1": [],
  },
};

export const loadState = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : seed;
  } catch {
    return seed;
  }
};

export const saveState = (state) => {
  localStorage.setItem(KEY, JSON.stringify(state));
};

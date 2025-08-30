import { useEffect, useMemo, useState } from "react";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar/Sidebar";
import NotesPane from "./components/NotesPane/NotesPane";
import CreateGroupModal from "./components/CreateGroupModal/CreateGroupModal";
import Toast from "./components/Toast/Toast";
import { loadState, saveState } from "./utils/storage";

function App() {
  const [state, setState] = useState(loadState());
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");

  // inside App.jsx
  const deleteGroup = (id) => {
    setState((prevState) => {
      // 1. Filter out the deleted group
      const updatedGroups = prevState.groups.filter((group) => group.id !== id);

      // 2. Remove notes related to that group
      const updatedNotes = { ...prevState.notes };
      delete updatedNotes[id];

      // 3. Decide which group should be active next
      let newActiveId = null;
      if (updatedGroups.length > 0) {
        newActiveId = updatedGroups[0].id;
      }

      // 4. Return updated state
      return {
        ...prevState,
        groups: updatedGroups,
        notes: updatedNotes,
        activeGroupId: newActiveId,
      };
    });

    // 5. Show confirmation
    setToast({ message: "Group deleted", type: "warning" });
  };

  // persist
  useEffect(() => {
    saveState(state);
  }, [state]);

  const activeGroup = useMemo(
    () => state.groups.find((g) => g.id === state.activeGroupId),
    [state.groups, state.activeGroupId]
  );
  const activeNotes = useMemo(
    () => state.notes[state.activeGroupId] ?? [],
    [state.notes, state.activeGroupId]
  );

  const selectGroup = (id) => setState((s) => ({ ...s, activeGroupId: id }));
  const unselectGroup = () => setState((s) => ({ ...s, activeGroupId: null }));

  const createGroup = ({ name, color, initials }) => {
    setState((s) => {
      const id = `g-${
        crypto.randomUUID?.() || Math.random().toString(36).slice(2)
      }`;
      const group = {
        id,
        name,
        color,
        initials,
        createdAt: new Date().toISOString(),
      };
      return {
        ...s,
        groups: [...s.groups, group],
        activeGroupId: id,
        notes: { ...s.notes, [id]: [] },
      };
    });
    setToast({ message: "Group created", type: "success" });
  };

  const addNote = (text) => {
    setState((s) => {
      const id = `n-${
        crypto.randomUUID?.() || Math.random().toString(36).slice(2)
      }`;
      const now = new Date().toISOString();
      const newNote = { id, text, createdAt: now, updatedAt: now };
      const gid = s.activeGroupId;
      return {
        ...s,
        notes: { ...s.notes, [gid]: [...(s.notes[gid] || []), newNote] },
      };
    });
  };

  return (
    <div className="app">
      {/* Sidebar always visible on desktop; on mobile it stays on top */}
      <div className="layout">
        <Sidebar
          groups={state.groups}
          activeGroupId={state.activeGroupId}
          onSelect={selectGroup}
          onUnselect={unselectGroup}
          onOpenCreate={() => setShowModal(true)}
          onDelete={deleteGroup}
        />
        <NotesPane
          group={activeGroup}
          notes={activeNotes}
          onAddNote={addNote}
          onBack={unselectGroup}
        />
      </div>

      {/* <FloatingAdd onClick={() => setShowModal(true)} /> */}

      <CreateGroupModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={createGroup}
        existing={state.groups}
      />

      <Toast {...toast} onDone={() => setToast("")} />
      <ToastContainer />
    </div>
  );
}
export default App;

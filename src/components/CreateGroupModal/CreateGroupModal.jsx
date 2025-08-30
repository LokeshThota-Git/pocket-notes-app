import { useEffect, useRef, useState } from "react";
import s from "./CreateGroupModal.module.css";
import { colorChoices } from "../../data/colors";
import { initialsFrom, normalize } from "../../utils/strings";

export default function CreateGroupModal({
  open,
  onClose,
  onCreate,
  existing,
}) {
  const boxRef = useRef(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState(colorChoices[0]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setName("");
      setColor(colorChoices[0]);
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const submit = () => {
    const trimmed = name.trim().replace(/\s+/g, " ");
    if (trimmed.length < 2) {
      setError("Group name must be at least 2 characters.");
      return;
    }
    const exists = existing.some(
      (g) => normalize(g.name) === normalize(trimmed)
    );
    if (exists) {
      setError("Group already exists.");
      return;
    }
    onCreate({
      name: trimmed,
      color,
      initials: initialsFrom(trimmed),
    });
    onClose();
  };

  return (
    <div className={s.backdrop} role="dialog" aria-modal="true">
      <div className={s.box} ref={boxRef}>
        <h3 className={s.title}>Create New group</h3>

        <label className={s.label}>
          <span>Group Name</span>
          <input
            className={s.input}
            placeholder="Enter group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            autoFocus
          />
        </label>

        <div className={s.colors}>
          <span className={s.labelText}>Choose colour</span>
          <div className={s.swatchRow}>
            {colorChoices.map((c) => (
              <button
                key={c}
                className={`${s.swatch} ${color === c ? s.swatchActive : ""}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                aria-label={`Choose ${c}`}
              />
            ))}
          </div>
        </div>

        {error && <div className={s.error}>{error}</div>}

        <div className={s.actions}>
          <button className={s.create} onClick={submit}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

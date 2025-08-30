import { useEffect, useMemo, useRef, useState } from "react";
import { LogoImage } from "../../assets/constants";
import s from "./NotesPane.module.css";
import NoteCard from "./NoteCard";
import { IoSendSharp } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
export default function NotesPane({ group, notes, onAddNote, onBack }) {
  const [text, setText] = useState("");
  const scrollerRef = useRef(null);

  useEffect(() => {
    setText("");
  }, [group?.id]);

  // Scroll to bottom whenever notes change (like the mock “scroll behaviour”)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [notes]);

  const canSend = useMemo(() => text.trim().length > 0, [text]);

  const send = () => {
    if (!canSend) return;
    onAddNote(text.trim());
    setText("");
  };

  const keyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!group) {
    return (
      <div className={s.cover}>
        <div className={s.hero}>
          <img src={LogoImage} alt="" />
          <div className={s.description}>
            <div className="">
              <h2>Pocket Notes</h2>
              <p>
                Send and receive messages without keeping your phone online. Use
                Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
            </div>
            <div className={s.lock}>
              <IoMdLock className={s.lockIcon} /> end-to-end encrypted
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={s.wrap}>
      <div className={s.header}>
        <div className={s.badge} style={{backgroundColor: group.color}}>{group.initials}</div>
        <div className={s.title}>{group.name}</div>
        <button className={s.backButton} onClick={onBack} aria-label="Back">
          <IoArrowBack />
        </button>
      </div>

      <div className={s.scroller} ref={scrollerRef}>
        {notes.map((n) => (
          <NoteCard key={n.id} note={n} />
        ))}
      </div>

      <div className={s.inputBar}>
        <div className={s.textareaWrap}>
          <textarea
            className={s.input}
            placeholder="Enter your text here..........."
            value={text}
            id={s.input}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={keyDown}
          />
          <button
            className={`${s.send} ${canSend ? s.sendActive : ""}`}
            onClick={send}
            aria-label="Send"
          >
            <IoSendSharp />
          </button>
        </div>
      </div>
    </section>
  );
}

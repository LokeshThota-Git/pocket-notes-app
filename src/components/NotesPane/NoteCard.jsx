import s from "./NoteCard.module.css";
import { stamp } from "../../utils/date";

export default function NoteCard({ note }) {
  const { date, time } = stamp(new Date(note.updatedAt || note.createdAt));
  return (
    <div className={s.card}>
      <div className={s.body}>{note.text}</div>
      <div className={s.meta}>
        <span>{date}</span>
        <span>•</span>
        <span>{time}</span>
      </div>
    </div>
  );
}

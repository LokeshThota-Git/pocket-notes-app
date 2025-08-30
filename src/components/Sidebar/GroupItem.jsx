import s from "./GroupItem.module.css";
import { MdDeleteOutline } from "react-icons/md";

function GroupItem({ group, active, onClick, onDelete }) {
  return (
    <div className={`${s.itemWrap} ${active ? s.active : ""}`}>
      <button
        className={`${s.item}`}
        onClick={onClick}
      >
        <span className={s.dp} style={{ backgroundColor: group.color }}>
          {group.initials}
        </span>
        <span className={s.name}>{group.name}</span>
      </button>
      <button className={s.delete} onClick={(e)=>{e.stopPropagation(); onDelete();}}>
        <MdDeleteOutline />
      </button>
    </div>
  );
}
export default GroupItem;

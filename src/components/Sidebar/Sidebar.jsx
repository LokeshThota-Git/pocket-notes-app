import s from "./Sidebar.module.css";
import GroupItem from "./GroupItem";

export default function Sidebar({
  groups,
  activeGroupId,
  onSelect,
  onUnselect,
  onOpenCreate,
  onDelete,
}) {
  return (
    <aside className={s.wrap} data-group-active={!!activeGroupId}>
      <div className={s.title}>Pocket Notes</div>

      {/* Unselect button - only visible on big screens when a group is active */}
      {activeGroupId && (
        <div className={s.unselectBtn}>
          <button
            className={s.unselect}
            onClick={onUnselect}
            aria-label="Unselect group"
          >
            ← Back to Notes
          </button>
        </div>
      )}

      <div className={s.addBtn}>
        <button
          className={s.add}
          onClick={onOpenCreate}
          aria-label="Create new group"
        >
          +
        </button>
      </div>
      <div className={s.list} role="list">
        {groups.map((g) => (
          <GroupItem
            key={g.id}
            group={g}
            active={g.id === activeGroupId}
            onClick={() => onSelect(g.id)}
            onDelete={() => onDelete(g.id)}
          />
        ))}
      </div>
    </aside>
  );
}

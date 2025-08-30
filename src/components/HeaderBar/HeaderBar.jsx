import styles from "./HeaderBar.module.css";

export default function HeaderBar({ title }) {
  return (
    <header className={styles.wrap}>
      <div className={styles.badge}>MN</div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}

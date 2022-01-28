import styles from "./main.module.scss";

export default function Main({ children }) {
  return <div className={styles.mainWrapper}>{children}</div>;
}

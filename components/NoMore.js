import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function NoMore({ children }) {
  return (
    <div className={styles.nomore}>
      {children ? (
        children
      ) : (
        <Link href="/" className={styles.click}>
          <h1>看起來這裡</h1>
          <h1>什麼都沒有了</h1>
          <h1>回主頁吧</h1>
        </Link>
      )}
    </div>
  );
}

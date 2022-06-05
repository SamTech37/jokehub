import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function NoMore({ children }) {
  return (
    <div className={styles.nomore}>
      {children ? (
        children
      ) : (
        <Link href="/">
          <a>
            <h1 className={styles.click}>看起來這裡什麼都沒有了</h1>
            <h1 className={styles.click}>回主頁吧</h1>
          </a>
        </Link>
      )}
    </div>
  );
}

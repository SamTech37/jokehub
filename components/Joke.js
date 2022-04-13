import React from "react";
import styles from "../styles/Joke.module.css";

export default function joke() {
  return (
    <div className={styles.main}>
      <div className={styles.score}>7</div>
      <div className={styles.body}>Joke</div>
    </div>
  );
}

import React from "react";
import styles from "../styles/Joke.module.css";

export default function PostingBlock() {
  return (
    <div className={styles.main}>
      <div className={styles.body}>Tell a joke!</div>
    </div>
  );
}

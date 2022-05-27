import React, { useState } from "react";

import styles from "../styles/Joke.module.css";

export default function JokeModal({ open, setOpen, children }) {
  return (
    open && (
      <>
        <div
          className={styles.backdrop}
          onClick={() => {
            setOpen(false);
            document.body.style.overflow = "visible";
          }}
        />
        {children}
      </>
    )
  );
}

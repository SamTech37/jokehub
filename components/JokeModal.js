import React from "react";
import styles from "../styles/Modal.module.css";

export default function JokeModal({ children, modalContent, setModalContent }) {
  return (
    !!modalContent && (
      <>
        <div
          className={styles.backdrop}
          onClick={() => {
            setModalContent();
            //document.body.style.overflow = "visible";
          }}
        />
        <div className={styles.container}>{children}</div>
      </>
    )
  );
}

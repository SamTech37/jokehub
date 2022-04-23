import React from "react";
import styles from "../styles/Joke.module.css";

export default function joke({ joke, blobPattern }) {
  return (
    <div className={styles.main}>
      <style jsx>{`
        .blob {
          display: flex;
          height: 15vw;
          width: 15vw;
          margin: 0;
          justify-content: center;
          align-items: center;
          background-image: url(${blobPattern.src});
          background-repeat: no-repeat;
          background-position: center;
          font-size: 32px;
          font-weight: 500;
          transition: 300ms;
          @media screen and (max-width: 450px) {
            height: 20vh;
            width: 60%;
          }
        }
      `}</style>
      <div className="blob">7</div>
      <div className={styles.body}>{joke}</div>
    </div>
  );
}

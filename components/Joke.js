import React, { useState } from "react";
import Link from "next/link";
import { Range, getTrackBackground } from "react-range";
import { FaShare } from "react-icons/fa";
import styles from "../styles/Joke.module.css";
export default function Joke({
  joke,
  blobPattern,
  isModal,
  setModalContent,
  setOpen,
}) {
  const [score, setScore] = useState([5]); //remeber to math.floor before writing to db
  const openModal = () => {
    setModalContent(joke);
    setOpen(true);
    document.body.style.overflow = "hidden";
  };
  return (
    <div className={isModal ? styles.modal : styles.main}>
      <style jsx>{`
        .pattern {
          background-image: url(${blobPattern.src});
        }
      `}</style>
      <div className={styles.score}>
        <div className={`${styles.blob} pattern`}>
          {Math.round((joke.totalRating / joke.rates) * 10) / 10 || "None"}
        </div>
        <Link href={`/u/${joke.posterUid}`} passHref>
          <img
            className={styles.u}
            src={`https://avatars.dicebear.com/api/croodles-neutral/${joke.posterUid}.svg`}
            alt="poster"
            width={80}
            height={80}
          />
        </Link>
      </div>
      <div className={styles.body}>
        {isModal ? (
          <p className={styles.content}>{joke.content}</p>
        ) : (
          <a className={styles.link} onClick={openModal}>
            <p className={styles.clamp}>{joke.content}</p>
          </a>
        )}
      </div>
      <div className={styles.slide}>
        <Range
          values={score}
          step={0.1}
          min={0}
          max={10}
          onChange={(values) => setScore(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "90%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "7px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: score,
                    colors: ["#FFAB10", "#ccc"],
                    min: 0,
                    max: 10,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "40px",
                width: "40px",
                borderRadius: "4px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
                fontWeight: "500",
                fontSize: "30px",
                fontFamily: "VT323",
              }}
            >
              {score[0].toFixed(0)}
            </div>
          )}
        />
      </div>
      <p className={styles.tag}>{"#" + joke.keyword}</p>

      <div className={styles.share}>
        <span className={styles.dropup}>
          <button className={styles.sharebtn}>
            <FaShare />
          </button>
          <span className={styles.menu}>
            <button className={styles.sharebtn}>h </button>
          </span>
        </span>
      </div>
      <div className={styles.rate}>
        <button className={styles.ratebtn}>Rate</button>
      </div>
    </div>
  );
}

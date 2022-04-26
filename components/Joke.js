import React, { useState } from "react";
import styles from "../styles/Joke.module.css";
import { Range, getTrackBackground } from "react-range";
export default function Joke({ joke, blobPattern }) {
  const [score, setScore] = useState([5]); //remeber to math.floor before writing to db
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
      <div className="blob">
        {Math.round((joke.totalRating / joke.rates) * 10) / 10 || "無"}
      </div>
      <div className={styles.body}>
        <p>{joke.content}</p>

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
                width: "80%",
                marginLeft: "5%",
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
                fontSize: "24px",
              }}
            >
              {score[0].toFixed(0)}
            </div>
          )}
        />
      </div>
    </div>
  );
}

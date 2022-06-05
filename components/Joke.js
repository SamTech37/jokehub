import React, { useState } from "react";
import Link from "next/link";
import { rateJoke } from "../firebase/client";
import { Range, getTrackBackground } from "react-range";
import { FaShare } from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";

import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  LineIcon,
  TwitterIcon,
} from "react-share";
import styles from "../styles/Joke.module.css";
export default function Joke({ user, joke, blobPattern, displayMode }) {
  const shareUrl = `https://jokehub.vercel.app/p/${joke.id}`;
  const [userRate, setUserRate] = useState([5]); //remeber to [0]and math.round before writing to db
  const [rated, setRated] = useState(false);
  const [score, setScore] = useState(
    joke.rates == 0
      ? "None"
      : Math.round((joke.totalRating / joke.rates) * 10) / 10
  ); //update display score without refetching
  const [display, setDisplay] = useState(displayMode); //"main","modal" or "page"

  const openModal = () => {
    setDisplay("modal");
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setDisplay("main");
    document.body.style.overflow = "visible";
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRate = () => {
    setScore(
      Math.round(
        ((joke.totalRating + Math.round(userRate[0])) / (joke.rates + 1)) * 10
      ) / 10
    );
    setRated(true);
    rateJoke(joke.id, user.uid, userRate[0]);
  };
  return (
    <>
      {display == "modal" && (
        <div className={styles.backdrop} onClick={closeModal} />
      )}

      <div className={styles[display]}>
        {display == "modal" && (
          <div className={styles.close} onClick={closeModal}>
            <span className={styles.closebtn}>
              <AiOutlineCloseCircle />
            </span>
          </div>
        )}

        <style jsx>{`
          .pattern {
            background-image: url(${blobPattern.src});
          }
        `}</style>

        <div className={styles.score}>
          <div className={`${styles.blob} pattern`}>{score}</div>
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
          {display == "main" ? (
            <a className={styles.link} onClick={openModal}>
              <p className={styles.clamp}>{joke.content}</p>
            </a>
          ) : (
            <p className={styles.content}>{joke.content}</p>
          )}
        </div>

        <div className={styles.slide}>
          <Range
            values={userRate}
            step={0.1}
            min={0}
            max={10}
            onChange={(values) => setUserRate(values)}
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
                      values: userRate,
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
                {userRate[0].toFixed(0)}
              </div>
            )}
          />
        </div>
        <Link href={`/t/${joke.keyword}`}>
          <p className={styles.tag}>{"#" + joke.keyword}</p>
        </Link>

        <div className={styles.share}>
          <span className={styles.dropup}>
            <button className={styles.sharebtn}>
              <FaShare />
            </button>
            <span className={styles.menu}>
              <button
                className={styles.sharebtn}
                onClick={() => navigator.clipboard.writeText(shareUrl)}
              >
                <HiLink size={32} />
              </button>

              <TwitterShareButton url={shareUrl} tags={["JokeHub"]}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>

              <FacebookShareButton url={shareUrl} hashtag="JokeHub">
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>

              <LineShareButton url={shareUrl} title="JokeHub">
                <LineIcon size={32} round={true} />
              </LineShareButton>
            </span>
          </span>
        </div>
        <div className={styles.rate}>
          {user ? (
            rated || joke.ratedUsers.includes(user?.uid) ? (
              <button disabled className={styles.ratebtn}>
                給過了
              </button>
            ) : (
              <button className={styles.ratebtn} onClick={handleRate}>
                給分
              </button>
            )
          ) : (
            <button className={styles.ratebtn} onClick={backToTop}>
              請登入
            </button>
          )}
        </div>
      </div>
    </>
  );
}

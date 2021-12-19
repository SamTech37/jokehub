import React, { useState } from "react";
import styled from "styled-components";
import wave1 from "../assets/wave1.svg";

const Body = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  padding: 0px 10vw;
  h2 {
    white-space: pre-wrap; //line breaking, mutiple spaces , etc.
    font-size: 1.5em;
  }

  button {
    color: #ffab01;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #ffab01;
    border-radius: 3px;
    &:hover {
      opacity: 0.5;
    }
  }
  .slider {
    width: 60%;
    height: 15px;
    -webkit-appearance: none;
    outline: none;
    border-radius: 5px;
    background: #eee;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 25px;
      background: #333;
    }
    &::-moz-range-thumb {
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 25px;
      background: #333;
    }
  }

  @media screen and (max-width: 450px) {
    //responsive width and font size
    h2 {
      font-size: 5vw;
    }
    .slider {
      width: 95%;
    }
  }
`;
const Spacer = styled.div`
  aspect-ratio: 900/300;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${wave1});
`;
export default function ListItem({
  content,
  rates,
  totRating,
  postId,
  rateJoke,
  ratedUsers,
  user,
  signed,
}) {
  const [userRate, setUserRate] = useState(5);
  //if user has rated, the button will be disabled
  const handleClick = () => {
    if (signed) {
      rateJoke(postId, userRate);
    }
  };
  if (signed) {
    return (
      <div>
        <Body>
          <div>
            <h2>{content}</h2>

            {ratedUsers.includes(user?.uid) ? (
              <button onClick={() => alert("You have rated this!")}>
                Rated
              </button>
            ) : (
              <div>
                <input
                  onChange={(event) =>
                    setUserRate(parseInt(event.target.value / 10))
                  }
                  type={"range"}
                  className="slider"
                />
                <h1>{Number(userRate)}</h1>
                <button onClick={handleClick}>Rate</button>
              </div>
            )}
          </div>
          <p>{rates + "  Rates"}</p>
        </Body>
        <Spacer />
      </div>
    );
  } else {
    return (
      <Body>
        <div>
          <h2>{content}</h2>
        </div>

        <p>{rates + "  Rates"}</p>
      </Body>
    );
  }
}

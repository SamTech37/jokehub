import React, { useState } from "react";
import styled from "styled-components";

const Body = styled.div`
  height: 100%;
  width: 60%;
  border: 2px solid black;
  border-radius: 1.5em;
  margin: auto;
  padding: 1em;
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
    width: 80%;
    margin: auto;
    padding: 4vw;
  }
`;
const AvgRatingJar = styled.div`
  display: flex;
  align-self: center;
  justify-self: center;
  p {
    color: #ffab01;
  }
  .circle {
    border: solid blue 5px;
    height: 5em;
    width: 5em;
    border-radius: 40%;
    box-shadow: 0 0 0 5px #4973ff88;
    animation: spin 5s linear infinite;
    color: black;
    text-align: center;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
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
      <Body>
        <div>
          <h2>{content}</h2>

          {ratedUsers.includes(user?.uid) ? (
            <button onClick={() => alert("You have rated this!")}>Rated</button>
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
        {/*
        <AvgRatingJar>
          <div className="circle">
            <p>{"Avg"}</p>
          </div>
        </AvgRatingJar>*/}
        <p>{rates + "  Rates"}</p>
      </Body>
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

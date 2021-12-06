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
    max-width: 100%;
    min-width: 50%;
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
`;
export default function ListItem({
  content,
  rates,
  totRating,
  postId,
  rateJoke,
  user,
  signed,
}) {
  const [userRate, setUserRate] = useState(5);
  //if user has rated, the button will be disabled
  const handleClick = () => {
    if (signed) {
      rateJoke(postId, userRate);
      alert("Rated!");
    }
  };
  return (
    <Body>
      <h2>{content}</h2>
      <p>{rates + "  Rates"}</p>
      <p>{"Total Rating: " + totRating}</p>
      <input
        onChange={(event) => setUserRate(parseInt(event.target.value / 10))}
        type={"range"}
        className="slider"
      />
      <h1>{Number(userRate)}</h1>
      <button onClick={handleClick}>Rate</button>
    </Body>
  );
}

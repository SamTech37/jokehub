import React from "react";
import { useState } from "react/cjs/react.development";
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
    width: 4em;
    height: 2em;
    border-radius: 30px;
    margin-left: 1em;
  }
`;
const Rater = styled.input`
  width: 20em;
  height: 3em;
`;
export default function ListItem({ content, rates, totRating }) {
  //if user has rated, the button will be disabled

  const [userRate, SetUserRate] = useState(5);
  return (
    <Body>
      <h2>{content}</h2>
      <p>{rates + "  Rates"}</p>
      <p>{"Average Rating: " + totRating}</p>
      <Rater
        onChange={(event) => SetUserRate(parseInt(event.target.value / 10))}
        type={"range"}
        min="0"
        max="100"
      />
      <h1>{userRate}</h1>

      <button>Rate</button>
    </Body>
  );
}

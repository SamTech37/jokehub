import React from "react";
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
`;
const Rater = styled.input`
  color: red;
`;
export default function ListItem({ content, rates, totRating }) {
  return (
    <Body>
      <h2>{content}</h2>
      <h5>{rates + "  Rates"}</h5>
      <h5>{"Average Rating: " + totRating}</h5>
      <Rater type={"range"} />
    </Body>
  );
}

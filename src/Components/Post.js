import React from "react";
import styled from "styled-components";

const Body = styled.div`
  height: 100%;
  border: 2px solid black;
  border-radius: 1.5em;
  margin: 2px;
  padding: 1em;
`;

export default function Post({ joke }) {
  return (
    <Body>
      <h1>{joke.title}</h1>
      <h2>{joke.content}</h2>
      <h3>{"rate: " + joke.rate}</h3>
      <h3>{"poster: " + joke.poster}</h3>
    </Body>
  );
}

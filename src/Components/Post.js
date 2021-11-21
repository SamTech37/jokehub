import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
const Body = styled.div`
  height: 100%;
  border: 2px solid black;
  border-radius: 1.5em;
  margin: 2px;
  padding: 1em;
`;

export default function Post() {
  const { postId } = useParams();
  //fetch the joke by its ID here
  return (
    <Body>
      <h1>postId = {postId}</h1>

      <h2>Joke content</h2>
      <h3>Joke rating and N rates</h3>
      <h3>Joke poster</h3>
      <button>Rate</button>
    </Body>
    //pseudo
  );
}

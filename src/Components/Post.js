import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spacer from "./Spacer";
import { useParams } from "react-router-dom";
const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  padding: 0px 10vw;

  h2 {
    white-space: pre-wrap; //line breaking, mutiple spaces , etc.
    font-size: 1.5em;
  }
  button {
    color: #ffab01;
    font-size: 1em;
    margin: 1em;
    margin-top: 3em;
    padding: 0.25em 1em;
    border: 2px solid #ffab01;
    border-radius: 3px;
    &:hover {
      opacity: 0.5;
    }
  }
`;

export default function Post({ inPost }) {
  //fetch the joke by its ID here
  let { postId } = useParams();
  const [curJoke, setCurJoke] = useState({});
  useEffect(async () => {
    const joke = await inPost(postId);
    setCurJoke(joke);
  }, []);
  return (
    <div>
      <Spacer />
      <Body>
        <h2 style={{ fontWeight: 500 }}>{curJoke.content}</h2>
      </Body>
    </div>
  );
}

import React, { useState } from "react";
import styled from "styled-components";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: orange;
    font-size: 2em;
    color: white;
    width: 200px;
    height: 100px;
    border-radius: 30px;
  }
  textarea {
    margin-top: 1em;
    height: 300px;
    width: 500px;
  }
`;
export default function PostingPage({ postJoke, signed }) {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  return (
    <Body>
      <textarea
        type="text"
        placeholder="Content..."
        onChange={(event) => {
          setNewContent(event.target.value);
        }}
      ></textarea>
      <button onClick={() => postJoke(newTitle, newContent)} disabled={!signed}>
        Send
      </button>
      {!signed && <h2>Please Login First!</h2>}
    </Body>
  );
}

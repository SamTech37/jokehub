import React, { useState } from "react";
import styled from "styled-components";

const SendButton = styled.button`
  background-color: orange;
  font-size: 2em;
  color: white;
  width: 200px;
  height: 100px;
  border-radius: 30px;
`;
export default function PostingPage({ postJoke, signed }) {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Title..."
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Content..."
        onChange={(event) => {
          setNewContent(event.target.value);
        }}
      />
      <SendButton
        onClick={() => postJoke(newTitle, newContent)}
        disabled={!signed}
      >
        Send
      </SendButton>
      {!signed && <h2>Please Login First!</h2>}
    </div>
  );
}

import React, { useState } from "react";
import styled from "styled-components";

const SendButton = styled.button`
  background-color: orange;
  font-size: 2em;
  color: white;
  width: 200px;
  height: 100px;
`;
export default function PostingPage({ postJoke }) {
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
      <SendButton onClick={() => postJoke(newTitle, newContent)}>
        Send
      </SendButton>
    </div>
  );
}

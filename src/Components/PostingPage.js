import React, { useState } from "react";
import { UserContext } from "../App";
import styled from "styled-components";
import { useContext } from "react/cjs/react.development";

const SendButton = styled.button`
  background-color: orange;
  font-size: 2em;
  color: white;
  width: 200px;
  height: 100px;
`;
export default function PostingPage({ postJoke }) {
  const user = useContext(UserContext);
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
      {user == null && <h2>Please Login First!</h2>}
    </div>
  );
}

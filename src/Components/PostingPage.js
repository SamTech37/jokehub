import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: orange;
    color: white;
    font-size: 1.5em;

    max-width: 15em;
    width: 30%;
    height: 3em;
    border-radius: 1.5em;
  }
  textarea {
    margin-top: 0.5em;
    font-size: 1.5em;
    padding: 0.5em;
    border-width: 0.1em;
    border-radius: 0.5em;
    height: 24em;
    max-width: 60em;
    width: 70%;
  }
  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    max-width: 60em;
    width: 70%;
  }
`;
export default function PostingPage({ postJoke, signed }) {
  const [newContent, setNewContent] = useState("");
  const maxLen = 1500;
  let navigate = useNavigate();
  const handleClick = () => {
    if (newContent !== "") {
      postJoke(newContent);
      alert("Post succeed!");
      navigate("/");
    } else {
      alert("Can't post nothing!");
    }
  };
  return (
    <Body>
      <textarea
        type="text"
        placeholder="Write your joke here..."
        maxLength={maxLen}
        onChange={(event) => {
          setNewContent(event.target.value);
        }}
      />
      <p>{"word count " + newContent.length + "/" + maxLen}</p>
      <button onClick={handleClick} disabled={!signed}>
        Send
      </button>
      {!signed && <h2>Please Login First!</h2>}
    </Body>
  );
}

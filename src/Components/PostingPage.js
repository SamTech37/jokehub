import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-top: 0.5em;
    color: white;
    background-color: orange;
    border: 1px orange solid;
    border-radius: 0.5rem;
    padding: 10px 20px;
    font-size: 2rem;
    box-shadow: 0px 0px 5px #000000;
  }
  textarea {
    margin-top: 0.5em;
    font-size: 1.5em;
    padding: 0.5em;
    border-width: 0.1em;
    border-radius: 0.5em;
    height: 60vh;
    width: 70vw;
  }
  input {
    font-size: 1em;
    padding: 0.5em;
    border-width: 0.1em;
    border-radius: 0.5em;

    width: 70%;
  }
  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    width: 70%;
    font-size: 16px;
  }
  h2 {
    margin-top: 0.5em;
    margin-bottom: 0;
  }
`;
export default function PostingPage({ postJoke, signed }) {
  const [newContent, setNewContent] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const maxLen = 1500;
  let navigate = useNavigate();
  const handleClick = () => {
    if (newContent === "") {
      alert("Can't post nothing!");
    } else if (newKeyword === "") {
      alert("Please fill in a keyword!");
    } else {
      postJoke(newContent, newKeyword);
      alert("Post succeed!");
      navigate("/");
    }
  };
  return (
    <Body>
      {!signed && <h2>Please Login with Google First!</h2>}
      <textarea
        type="text"
        placeholder="Write your joke here..."
        maxLength={maxLen}
        autoFocus
        onChange={(event) => {
          setNewContent(event.target.value);
        }}
      />
      <p>{"word count " + newContent.length + "/" + maxLen}</p>
      <input
        type="text"
        placeholder="a keyword, genre, whatsoever..."
        maxLength="20"
        onChange={(event) => {
          setNewKeyword(event.target.value);
        }}
      />
      <p>{"word count " + newKeyword.length + "/20"}</p>

      <button onClick={handleClick} disabled={!signed}>
        Send
      </button>
    </Body>
  );
}

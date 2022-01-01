import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  textarea {
    margin-top: 0.5em;
    font-size: 1.5em;
    padding: 0.5em;
    border-width: 0.1em;
    border-radius: 0.5em;
    height: 60vh;
    width: 70vw;
  }
  .submit {
    margin-top: 0.5em;
    margin-bottom: 1em;
    color: white;
    background-color: #ffab01;
    border: 1px orange solid;
    border-radius: 0.5rem;
    padding: 10px 20px;
    font-size: 2rem;
    box-shadow: 0px 0px 5px #000000;
    cursor: pointer;
    transition: 400ms, ease-in;
    &:hover {
      background-color: #c58300;
      box-shadow: 0 0 5px #c58300, 0 0 25px #c58300;
    }
  }
  .keyword {
    font-size: 1em;
    padding: 0.5em;
    border-width: 0.1em;
    border-radius: 0.5em;

    width: 70vw;
  }
  form {
    display: flex;
    flex-direction: column;
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
  const handleSubmit = () => {
    postJoke(newContent, newKeyword.toLowerCase());
    alert("Post succeed!");
    navigate("/");
  };
  return (
    <Body>
      {!signed && <h2>Please Sign in with Google First!</h2>}

      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder="Write your joke here..."
          maxLength={maxLen}
          autoFocus
          required
          onChange={(event) => {
            setNewContent(event.target.value);
          }}
        />
        <p>{"word count " + newContent.length + "/" + maxLen}</p>
        <input
          className=" keyword"
          type="text"
          placeholder="a keyword, genre, whatsoever..."
          maxLength="20"
          required
          onChange={(event) => {
            setNewKeyword(event.target.value);
          }}
        />
        <p>{"word count " + newKeyword.length + "/20"}</p>
        <input
          type="submit"
          value="Submit"
          className="submit"
          disabled={!signed}
        />
      </form>
    </Body>
  );
}

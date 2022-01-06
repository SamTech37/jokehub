import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
//context
import { LangContext } from "../LangContext";
const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  textarea {
    margin-top: 8px;
    resize: none;
    font-size: 24px;
    padding: 8px;
    border-width: 2px;
    border-radius: 8px;
    height: 50vh;
    width: 70vw;
  }
  .keyword {
    font-size: 24px;
    padding: 8px;
    border-width: 2px;
    border-radius: 8px;
    width: 70vw;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  p {
    margin: 8px;
    width: 70%;
    font-size: 16px;
  }
  h2 {
    margin: 8px;
  }
  .submit {
    color: white;
    background-color: #ffab01;
    border: none;
    border-radius: 8px;
    margin-top: 8px;
    padding: 10px 20px;
    font-size: 32px;
    box-shadow: 0px 0px 5px #000000;
    cursor: pointer;
    transition: 400ms, ease-in;
    &:hover {
      background-color: #c58300;
      box-shadow: 0 0 5px #c58300, 0 0 25px #c58300;
    }
    &:disabled {
      background-color: #757575;
      cursor: unset;
      box-shadow: unset;
    }
  }
  @media screen and (max-height: 750px) {
    h2 {
      font-size: 24px;
    }
    textarea {
      font-size: 20px;
      height: 40vh;
    }
    .keyword {
      font-size: 20px;
    }
    label {
      font-size: 16px;
    }
    p {
      font-size: 14px;
    }
    .submit {
      padding: 5px 10px;
      font-size: 24px;
    }
  }
`;
export default function PostingPage({ postJoke, signed }) {
  const language = useContext(LangContext);

  const [newContent, setNewContent] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [newLanguage, setNewLanguage] = useState("English");
  const maxLen = 1500;
  let navigate = useNavigate();
  const handleSubmit = () => {
    postJoke(
      newContent,
      newKeyword.toLowerCase().replaceAll(" ", ""), //remove blanks, lowercased for better search
      newLanguage
    );
    alert("Post succeed!");
    navigate("/");
  };
  return (
    <Body>
      {!signed && (
        <h2>
          {language === "中文"
            ? "請先用Google登入"
            : "Please Sign in with Google First!"}
        </h2>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          placeholder={
            language === "中文"
              ? "把你的笑話寫在這裡"
              : "Write your joke here..."
          }
          maxLength={maxLen}
          autoFocus
          required
          onChange={(event) => {
            setNewContent(event.target.value);
          }}
          value={newContent}
        />
        {language === "中文" ? (
          <p>{"字數 " + newContent.length + "/" + maxLen}</p>
        ) : (
          <p>{"word count " + newContent.length + "/" + maxLen}</p>
        )}

        <input
          className="keyword"
          type="text"
          placeholder={
            language === "中文"
              ? "一個關鍵字、分類、索引之類的"
              : "a keyword, genre, whatsoever..."
          }
          maxLength="20"
          required
          onChange={(event) => {
            setNewKeyword(event.target.value);
          }}
          value={newKeyword}
        />

        {language === "中文" ? (
          <p>{"字數 " + newKeyword.length + "/20"}</p>
        ) : (
          <p>{"word count " + newKeyword.length + "/20"}</p>
        )}

        <label>
          {language === "中文" ? "笑話的語言" : "Language of the joke"}
        </label>
        <select
          name="language"
          required
          value={newLanguage}
          onChange={(event) => {
            setNewLanguage(event.target.value);
          }}
        >
          <option>中文</option>
          <option>English</option>
        </select>
        <input
          alt="HI"
          type="submit"
          value={language === "中文" ? "提交" : "Submit"}
          className="submit"
          disabled={!signed}
        />
      </form>
    </Body>
  );
}

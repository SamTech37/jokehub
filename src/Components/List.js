import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import { ImArrowUp2 } from "react-icons/im";
import { useSearchParams, useNavigate } from "react-router-dom";
//context
import { LangContext } from "../LangContext";

const BackToTop = styled.button`
  z-index: 50;
  border: none;
  outline: none;
  background-color: #ffaa01cc;
  text-align: center;
  color: white;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  border-radius: 1rem;
  position: fixed;
  bottom: 2em;
  right: 1em;
  font-size: 24px;
  -webkit-tap-highlight-color: transparent;

  @media screen and (max-width: 450px) {
    bottom: 1em;
    right: 0;
    height: 40px;
    width: 40px;
    border-radius: 14px;
    font-size: 1rem;
  }
`;
const FetchArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  border-top: 1px solid #999;
  margin-left: 1em;
  margin-right: 1em;
  button {
    margin-top: 0.5em;
    margin-bottom: 1em;
    color: white;
    background-color: #ffab01;
    border: none;
    border-radius: 0.5rem;
    padding: 10px 20px;
    font-size: 2rem;
    box-shadow: 0px 0px 5px #000000;
    cursor: pointer;
    &:hover {
      background-color: #c58300;
      box-shadow: 0 0 5px #c58300;
    }
  }
`;
const Search = styled.form`
  display: flex;
  input {
    padding: 10px;
    font-size: 17px;
    border: 1px solid grey;
    float: left;
    width: 80%;
    background: #f1f1f1;
  }
  button {
    float: left;
    width: 20%;
    padding: 10px;
    background: #2196f3;
    color: white;
    font-size: 17px;
    border: 1px solid grey;
    border-left: none; /* Prevent double borders */
    cursor: pointer;
    &:hover {
      background: #0b7dda;
    }
  }
`;
export default function List({
  posts,
  rateJoke,
  nextBatch,
  getPosts,
  batchSize,
  user,
  deleteJoke,
}) {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleNext = () => {
    backToTop();
    nextBatch();
  };
  const handleLast = () => {
    backToTop();
    getPosts();
    navigate("/");
  };
  let navigate = useNavigate();
  let [params, setParams] = useSearchParams();
  let keyword = params.get("keyword");
  //read data onMount
  useEffect(
    () => getPosts(keyword?.toLocaleLowerCase().replaceAll(" ", "")),
    []
  ); //aware of null //remove blanks, lowercased for better search

  const language = useContext(LangContext);
  return (
    <div>
      <Search>
        <input
          type="text"
          placeholder={
            language === "中文" ? "搜尋關鍵字..." : "Search keyword..."
          }
          name="keyword"
          required
        />
        <button type="submit">🔍</button>
      </Search>
      <BackToTop onClick={backToTop} aria-label="back to top">
        <ImArrowUp2 />
      </BackToTop>
      {posts.map((post) => {
        return (
          <ListItem
            key={post.id}
            postId={post.id}
            posterUid={post.posterUid}
            content={post.content}
            rates={post.rates}
            totRating={post.totalRating}
            ratedUsers={post.ratedUsers}
            keyword={post.keyword}
            user={user}
            rateJoke={rateJoke}
            deleteJoke={deleteJoke}
            isList={false}
          />
        );
      })}
      <FetchArea>
        {posts.length === batchSize ? (
          <button onClick={handleNext}>
            {language === "中文" ? "更多" : "Next"}
          </button>
        ) : (
          <button onClick={handleLast}>What's new!</button> //no need translate here
        )}
      </FetchArea>
    </div>
  );
}

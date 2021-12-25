import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import { ImArrowUp2 } from "react-icons/im";

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
    background-color: #ffab01;
    border: 2px solid #ffab01;
    color: #fff;
    font-size: 2em;
    margin: 1em;
    padding: 0.25em 1em;

    border-radius: 1em;
    &:hover {
      opacity: 0.5;
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
  signed,
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
  };

  return (
    <div>
      <BackToTop onClick={backToTop}>
        <ImArrowUp2 />
      </BackToTop>
      {posts.map((post) => {
        return (
          <ListItem
            key={post.id}
            postId={post.id}
            content={post.content}
            rates={post.rates}
            totRating={post.totalRating}
            ratedUsers={post.ratedUsers}
            user={user}
            signed={signed}
            rateJoke={rateJoke}
          />
        );
      })}
      <FetchArea>
        {posts.length == batchSize ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleLast}>What's new!</button>
        )}
      </FetchArea>
    </div>
  );
}

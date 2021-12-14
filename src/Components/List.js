import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import { ImArrowUp2 } from "react-icons/im";

const BackToTop = styled.button`
  z-index: 99;
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
  @media screen and (max-width: 450px) {
    bottom: 1em;
    right: 0;
    height: 40px;
    width: 40px;
    border-radius: 14px;
    font-size: 1rem;
  }
`;

export default function List({ posts, rateJoke, user, signed }) {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    </div>
  );
}

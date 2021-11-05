import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Item = styled.div`
  height: 100%;
  border: 2px solid black;
  border-radius: 1.5em;
  margin: 2px;
  padding: 1em;
`;

export default function List() {
  const initialData = [
    {
      title: "What do you call a magic owl?",
      content: "Hoodini!",
      rate: 10,
      poster: "someone",
      postId: "0", //since it's a unique val, use it for key
    },
    {
      title: "What's the heaviest stuff in my pants?",
      content: "Your mom",
      rate: 7,
      poster: "scankhunt69",
      postId: "1",
    },
    {
      title: "欸波波",
      content: "欸波波 欸波波",
      rate: 0,
      poster: "joseph",
      postId: "3",
    },
    {
      title: "必成",
      content: "高必成 低必成",
      rate: 5,
      poster: "johnathan",
      postId: "2",
    },
  ];
  // fetch data here
  return (
    <div>
      {initialData.map((joke) => {
        return (
          <Item key={joke.postId}>
            <NavLink to={joke.postId}>
              <h1>{joke.title}</h1>{" "}
            </NavLink>

            <h3>{"rate: " + joke.rate}</h3>
            <h3>{"poster: " + joke.poster}</h3>
          </Item>
        );
      })}
    </div>
  );
}

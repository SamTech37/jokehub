import React from "react";
import styled from "styled-components";
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
      id: "0",
    },
    {
      title: "What's the heaviest stuff in my pants?",
      content: "Your mom",
      rate: 7,
      poster: "scankhunt69",
      id: "1",
    },
  ];
  return (
    <div>
      {initialData.map((joke) => {
        return (
          <Item>
            <h1>{joke.title}</h1>
            <h3>{"rate: " + joke.rate}</h3>
            <h3>{"poster: " + joke.poster}</h3>
          </Item>
        );
      })}
    </div>
  );
}

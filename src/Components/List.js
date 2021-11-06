import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
//firebase

const Item = styled.div`
  height: 100%;
  border: 2px solid black;
  border-radius: 1.5em;
  margin: 2px;
  padding: 1em;
`;

export default function List({ jokes }) {
  // fetch data here

  return (
    <div>
      {jokes.map((joke) => {
        return (
          <Item>
            <h1>{joke.title}</h1>
            <h2>{joke.content}</h2>
            <h3>{"author: " + joke.author}</h3>
          </Item>
        );
      })}
    </div>
  );
}

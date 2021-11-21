import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
//firebase

const Item = styled.div`
  height: 100%;
  width: 60%;
  border: 2px solid black;
  border-radius: 1.5em;
  margin: auto;
  padding: 1em;
`;
const Rater = styled.input`
  color: red;
`;
export default function List({ posts }) {
  // fetch data here

  return (
    <div>
      {posts.map((post) => {
        return (
          <Item key={post.id}>
            <h2>{post.content}</h2>
            <h3>{"poster: " + post.poster}</h3>
            <Rater type={"range"} />
          </Item>
        );
      })}
    </div>
  );
}

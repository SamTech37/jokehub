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
  h2 {
    white-space: pre-wrap; //line breaking, mutiple spaces , etc.
  }
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
            <h2>{post.content.replace("<br />", "d")}</h2>

            <Rater type={"range"} />
          </Item>
        );
      })}
    </div>
  );
}

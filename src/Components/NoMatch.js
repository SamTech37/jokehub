import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Body = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
  a {
    font-size: 30px;
  }
`;
export default function NoMatch() {
  return (
    <Body>
      <h1>Looks like we got nothing here</h1>
      <h2>Maybe a misspelling or something</h2>
      {"\n"}
      <Link to="/">Let's head back home</Link>
    </Body>
  );
}

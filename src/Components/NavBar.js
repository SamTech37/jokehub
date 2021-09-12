import React from "react";
import styled from "styled-components";

const Nav = styled.div`
  background: #fdfd66;
  height: 100px;
  display: flex;
  flex-direction: row;
  h2 {
    margin: 1em;
  }
`;
export default function NavBar() {
  return (
    <Nav>
      <h2>Joke Hub </h2>
      <h2>Profile </h2>
      <h2>Post </h2>
    </Nav>
  );
}

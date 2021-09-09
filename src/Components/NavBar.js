import React from "react";
import styled from "styled-components";

const Nav = styled.div`
  background: #ffff4d;
`;
export default function NavBar() {
  return (
    <Nav>
      <h1>Joke Hub</h1>
      <h2>profile</h2>
      <h2>Post</h2>
    </Nav>
  );
}

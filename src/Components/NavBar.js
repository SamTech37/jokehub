import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
      <h2>
        <Link to="/">JokeHub</Link>
      </h2>
      <h2>
        <Link to="/profile">Profile</Link>
      </h2>
      <h2>
        <Link to="/post">Post</Link>
      </h2>
    </Nav>
  );
}

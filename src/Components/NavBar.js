import React from "react";
import styled from "styled-components";

import icon from "../assets/icon.png";

import { Link, NavLink } from "react-router-dom";
const Nav = styled.div`
  background: #fdfd66;
  height: 100px;
  display: flex;
  flex-direction: row;
  button {
    margin: 1em;
    background: transparent;
    font-size: 1.5em;
    border-width: 0;
    &:hover {
      color: #0000005c;
    }
  }
`;
export default function NavBar() {
  return (
    <Nav>
      <NavLink to="/">
        <img src={icon} alt="wut" height="80" width="300" />
      </NavLink>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
      <Link to="/post">
        <button>Post</button>
      </Link>
    </Nav>
  );
}

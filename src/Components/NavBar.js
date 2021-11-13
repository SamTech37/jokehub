import React, { useState } from "react";
import styled from "styled-components";
import icon from "../assets/icon.svg";

import { Link, NavLink } from "react-router-dom";
const Nav = styled.div`
  background: #fdfd66;
  height: auto;
  width: 100%;
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
  img {
    max-width: 250px;
    min-width: 150px;
    margin: 0.5em;
    height: auto;
  }
`;
export default function NavBar({ signIn, signOut, signed }) {
  const handleClick = () => {
    if (signed) return signOut();
    return signIn();
  };
  return (
    <Nav>
      <NavLink to="/">
        <img src={icon} alt="wut" />
      </NavLink>
      <Link to="/about">
        <button>About</button>
      </Link>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
      <Link to="/post">
        <button>Post</button>
      </Link>
      <button onClick={handleClick}>{signed ? "Logout" : "Login"}</button>
    </Nav>
  );
}

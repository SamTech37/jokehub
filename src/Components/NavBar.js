import React, { useState } from "react";
import styled from "styled-components";
import icon from "../assets/icon.svg";

import { BrowserView, MobileView } from "react-device-detect";
import { Link, NavLink } from "react-router-dom";

const MobileNav = styled.div`
  background: #fdfd66;
  height: 15%;
  width: 100%;
  display: flex;
  flex-direction: row;

  img {
    max-width: 12em;
    min-width: 5em;
    margin: 0.5em;
    height: auto;
    justify-self: center;
  }
  .openbtn {
    position: absolute;
    right: 0.5em;
    height: 3em;
    width: 2em;
    background: transparent;
    font-size: 1.5em;
    border-width: 0;
    &:hover {
      color: #0000005c;
    }
  }
  .drawerNav {
    //props should be passed like in react
    width: 100%;
    height: ${(props) => (props.open ? "100%" : "0")};
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.9);
    background: solid;
    overflow-y: hidden;
    transition: 0.5s;
    a {
      padding: 8px;
      text-decoration: none;
      font-size: 36px;
      color: #fff;
      display: block;
      transition: 0.3s;
      &:hover {
        opacity: 0.5;
      }
    }
  }
  .drawerNav-content {
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  .closebtn {
    position: absolute;
    top: 20px;
    right: 45px;
    font-size: 60px;
    color: white;
  }

  @media screen and (max-height: 450px) {
    //resize the drawer responsively
    .drawerNav a {
      font-size: 20px;
    }
    .closebtn {
      font-size: 40px;
      top: 15px;
      right: 35px;
    }
  }
`;
const Nav = styled.div`
  background: #fdfd66;
  max-height: 15%;
  width: 100%;
  display: flex;
  flex-direction: row;
  img {
    max-width: 12em;
    min-width: 5em;
    height: 3em;
    margin-left: 1em;
    margin-top: 1em;
    justify-self: center;
  }
  .NavContent {
    display: flex;
    flex-direction: row;
    a {
      padding: 1em;
      text-decoration: none;
      font-size: 1.5em;
      color: black;
      display: block;
      transition: 0.3s;
      &:hover {
        opacity: 0.5;
      }
    }
  }
`;

export default function NavBar({ signIn, signOut, signed }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleAuth = () => {
    if (signed) return signOut();
    return signIn();
  };

  return (
    <div>
      <BrowserView>
        <Nav>
          <NavLink to="/">
            <img src={icon} alt="home" />
          </NavLink>
          <div className="NavContent">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/post">Post</Link>
            <a onClick={handleAuth}>{signed ? "Logout" : "Login"}</a>
          </div>
        </Nav>
      </BrowserView>
      <MobileView>
        <MobileNav open={drawerOpen}>
          <NavLink to="/">
            <img src={icon} alt="home" />
          </NavLink>

          <button className="openbtn" onClick={() => setDrawerOpen(true)}>
            &#9776;
          </button>

          <div className="drawerNav" onClick={() => setDrawerOpen(false)}>
            <a className="closebtn">Close</a>
            <div className="drawerNav-content">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/post">Post</Link>
              <a onClick={handleAuth}>{signed ? "Logout" : "Login"}</a>
            </div>
          </div>
        </MobileNav>
      </MobileView>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import icon from "../assets/icon.svg";
import LoginModal from "./LoginModal";
import { GiHamburgerMenu } from "react-icons/gi";
import { BrowserView, MobileView } from "react-device-detect";
import { Link, NavLink } from "react-router-dom";

const MobileNav = styled.div`
  position: relative;
  background: #fdfd66;
  height: 15%;
  width: 100%;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  a {
    -webkit-tap-highlight-color: #fdfd6688;
  }
  img {
    width: 100px;
    margin: 8px;
    justify-self: center;
  }
  .headerRight {
    display: flex;
    align-items: center;
  }
  .headerBtn {
    border: none;
    color: white;
    background-color: #aa8b66;
    border-radius: 3px;
    padding: 7px 14px;
    margin-right: 8px;
    font-size: 20px;
    box-shadow: 2px 1px 5px #000000;
    text-decoration: none;
  }
  .openbtn {
    background: transparent;
    border-width: 0;
    font-size: 1.5em;
    color: #504538;
    padding: 10px;

    &:hover {
      opacity: 0.5;
    }
  }
  .closebtn {
    position: absolute;
    top: 20px;
    right: 45px;
    font-size: 30px;
    color: white;
    background-color: transparent;
    border: none;
  }

  .drawerNav {
    //props should be passed like in react
    width: 100%;
    height: ${(props) => (props.open ? "100%" : "0")};
    position: fixed;
    z-index: 999;
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
  @media screen and (max-width: 450px) {
    .headerBtn {
      font-size: 15px;
    }
  }
`;
const Nav = styled.div`
  background: #fdfd66;
  max-height: 15%;
  width: 100%;
  display: flex;
  flex-direction: row;
  font-weight: 500;
  img {
    width: 200px;
    height: 60px;
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
export default function NavBar({
  signInGoogle,
  signOut,
  mobileSignInGoogle,
  signed,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (signed) return signOut();
    return setModalOpen(true);
  };
  const handleAuthMobile = () => {
    if (signed) return signOut();
    return mobileSignInGoogle();
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
            <a onClick={handleClick}>{signed ? "Sign out" : "Sign in"}</a>
          </div>

          <LoginModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            signInGoogle={signInGoogle}
          ></LoginModal>
        </Nav>
      </BrowserView>
      <MobileView>
        <MobileNav open={drawerOpen}>
          <NavLink to="/">
            <img src={icon} alt="home" className="icon" />
          </NavLink>
          <div className="headerRight">
            <button className="headerBtn" onClick={handleAuthMobile}>
              {signed ? "SignOut" : "SignIn"}
            </button>
            <Link className="headerBtn" to="/post">
              Post
            </Link>
            <button className="openbtn" onClick={() => setDrawerOpen(true)}>
              <GiHamburgerMenu />
            </button>
          </div>

          <div className="drawerNav" onClick={() => setDrawerOpen(false)}>
            <button className="closebtn">Close</button>
            <div className="drawerNav-content">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/post">Post</Link>
            </div>
          </div>
        </MobileNav>
      </MobileView>
    </div>
  );
}

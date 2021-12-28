import React, { useState, useEffect } from "react";
import styled from "styled-components";
import icon from "../assets/icon.svg";
import LoginModal from "./LoginModal";
import { FcGoogle } from "react-icons/fc";
import { BrowserView, MobileView } from "react-device-detect";
import { Link, NavLink } from "react-router-dom";

const MobileNav = styled.div`
  background: #fdfd66;
  height: 15%;
  width: 100%;
  display: flex;
  flex-direction: row;
  font-weight: 500;
  a {
    -webkit-tap-highlight-color: #fdfd6688;
  }
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
  font-weight: 500;
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
const MobileModal = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  width: 100%;
  height: ${(props) => (props.open ? "100%" : "0")};
  position: fixed;
  z-index: 500;
  bottom: 0;
  left: 0;
  display: flex;
  background: #f2f2f2e6;
  overflow-y: hidden;
  transition: 0.5s;
  .signin-btn {
    transition: background-color 0.3s, box-shadow 0.3s;
    width: 60%;
    height: 80px;
    padding: 12px 16px 12px 16px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

    font-size: 30px;
    font-weight: 500;
    color: #757575;
    background-color: #f2f2f2;
    &:hover {
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
    }

    &:focus {
      outline: none;
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
        0 0 0 3px #c8dafc;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    position: relative;
    background-color: white;
    border-radius: 1em;
    padding: 20px;
  }
  .caveats {
    font-size: 12px;
    display: block; /* or inline-block */
    width: 70%;
    line-height: 1.142;
  }
  .dismissBtn {
    border: 2px solid black;
    background-color: white;
    border-radius: 1em;
    color: black;
    padding: 14px 28px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  h2 {
    font-weight: bold;
    font-size: 24px;
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
  useEffect(() => {
    setTimeout(() => setModalOpen(true), 3000);
  }, []); //a login hint when first open
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
              <a onClick={() => setModalOpen(true)}>
                {signed ? "Sign out" : "Sign in"}
              </a>
            </div>
          </div>
          <MobileModal open={modalOpen}>
            <div className="content">
              <h2>Sign In To Enjoy Full Features</h2>
              <button className="signin-btn">
                <FcGoogle />
                Sign in
              </button>
              <p className="caveats">
                Authentication is used to identify users and prevent other
                issues. Posting and rating is anonymous and
                <span style={{ color: "tomato" }}> we won't collect</span> any
                of your personal information.
              </p>
              <button
                className="dismissBtn"
                onClick={() => setModalOpen(false)}
              >
                Dismiss
              </button>
            </div>
          </MobileModal>
        </MobileNav>
      </MobileView>
    </div>
  );
}

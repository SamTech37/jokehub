import React, { useState, useContext } from "react";
import styled from "styled-components";
import icon from "../assets/icon.svg";
import LoginModal from "./LoginModal";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLine } from "react-icons/ri";
import { BrowserView, MobileView } from "react-device-detect";
import { Link, NavLink } from "react-router-dom";
//context
import { LangContext } from "../LangContext";

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
    background-color: #836c50;
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
    right: 20px;
    font-size: 50px;
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
    button {
      padding: 8px;
      font-size: 36px;
      color: #fff;
      background-color: transparent;
      border: none;
      transition: 0.3s;
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
  position: relative;
  background: #fdfd66;
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  font-weight: 500;
  img {
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
const Toggle = styled.div`
  position: absolute;
  right: 50px;
  top: 30px;
  margin: auto;
  .langToggle {
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 24px;
    border: 1px solid black;
    &:hover {
      box-shadow: 0 0 10px #777;
    }
  }
`;
export default function NavBar({
  signInGoogle,
  signOut,
  mobileSignInGoogle,
  signInFacebook,
  mobileSignInFacebook,
  signed,
  setLanguage,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const language = useContext(LangContext);

  const handleSignModal = () => {
    if (signed) return signOut();
    return setModalOpen(true);
  };
  const handleLangChange = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "中文" ? "English" : "中文"
    );
  };

  return (
    <div>
      <BrowserView>
        <Nav>
          <NavLink to="/">
            <img src={icon} alt="home" width={"200px"} height={" 60px"} />
          </NavLink>
          <div className="NavContent">
            <Link to="/">{language === "中文" ? "主頁" : "Home"}</Link>
            <Link to="/about">{language === "中文" ? "關於" : "About"}</Link>
            <Link to="/post">{language === "中文" ? "發布" : "Post"}</Link>
            {language === "中文" ? (
              <a onClick={handleSignModal}>{signed ? "登出" : "登入"}</a>
            ) : (
              <a onClick={handleSignModal}>{signed ? "Sign out" : "Sign in"}</a>
            )}
            <Toggle>
              <button className="langToggle" onClick={handleLangChange}>
                {"中/EN"}
              </button>
            </Toggle>
          </div>

          <LoginModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            signInGoogle={signInGoogle}
            signInFacebook={signInFacebook}
          ></LoginModal>
        </Nav>
      </BrowserView>

      <MobileView>
        <MobileNav open={drawerOpen}>
          <NavLink to="/">
            <img
              src={icon}
              alt="home"
              className="icon"
              width={"100px"}
              height={"30px"}
            />
          </NavLink>
          <div className="headerRight">
            {language === "中文" ? (
              <button className="headerBtn" onClick={handleSignModal}>
                {signed ? "登出" : "登入"}
              </button>
            ) : (
              <button className="headerBtn" onClick={handleSignModal}>
                {signed ? "SignOut" : "SignIn"}
              </button>
            )}
            <Link className="headerBtn" to="/post">
              {language === "中文" ? "發布" : "Post"}
            </Link>
            <button
              className="openbtn"
              onClick={() => setDrawerOpen(true)}
              aria-label="open nav menu"
            >
              <GiHamburgerMenu />
            </button>
          </div>

          <div className="drawerNav" onClick={() => setDrawerOpen(false)}>
            <button className="closebtn" aria-label="close nav menu">
              <RiCloseLine />
            </button>
            <div className="drawerNav-content">
              <Link to="/">{language === "中文" ? "主頁" : "Home"}</Link>
              <Link to="/about">{language === "中文" ? "關於" : "About"}</Link>
              <Link to="/post">{language === "中文" ? "發布" : "Post"}</Link>
              <button onClick={handleLangChange}>{"中/EN"}</button>
            </div>
          </div>
        </MobileNav>

        <LoginModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          signInGoogle={mobileSignInGoogle}
          signInFacebook={mobileSignInFacebook}
        ></LoginModal>
      </MobileView>
    </div>
  );
}

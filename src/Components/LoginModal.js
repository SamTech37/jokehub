import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
const Body = styled.div`
  .modal {
    //props should be passed like in react
    width: 100%;
    height: ${(props) => (props.open ? "100%" : "0")};
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 500;
    top: 0;
    left: 0;
    background: #f2f2f2e6;
    overflow-y: hidden;
    transition: 0.5s;
  }
  .modal-content {
    padding: 0.5em;
    position: relative;
    height: 60%;
    width: 50%;
    border-radius: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    h2 {
      font-weight: bold;
      margin-bottom: 1.5em;
    }
  }
  .closebtn {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2em;
    border: 0;
    overflow: hidden;
    background: transparent;
    cursor: pointer;
    color: black;
  }
  .signin-btn {
    transition: background-color 0.3s, box-shadow 0.3s;
    width: 60%;
    height: 60px;
    padding: 12px 16px 12px 16px;
    margin-bottom: 15px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 20px;
    font-weight: 500;
    color: #757575;
    background-color: white;
    &:hover {
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
    }

    &:focus {
      outline: none;
      box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
        0 0 0 3px #c8dafc;
    }
  }

  .caveats {
    margin-top: 1.5em;
    font-size: 14px;
    display: block; /* or inline-block */
    width: 300px;
    line-height: 1.462;
  }
`;
export default function LoginModal({ modalOpen, setModalOpen, signInGoogle }) {
  const handleGoogleAuth = () => {
    signInGoogle();
    setModalOpen(false);
  };
  return (
    <Body open={modalOpen}>
      <div className="modal">
        <div className="modal-content">
          <button className="closebtn" onClick={() => setModalOpen(false)}>
            <IoMdClose />
          </button>
          <h2>Sign in to Share and Rate jokes</h2>

          <button className="signin-btn">
            <FaFacebook style={{ color: "#3b5998" }} /> Sign in with Facebook
          </button>
          <button className="signin-btn" onClick={handleGoogleAuth}>
            <FcGoogle />
            Sign in with Google
          </button>

          <p className="caveats">
            Authentication is used to identify users and prevent other issues.
            Posting and rating is anonymous and
            <span style={{ color: "tomato" }}> we won't collect</span> any of
            your personal information.
          </p>
        </div>
      </div>
    </Body>
  );
}

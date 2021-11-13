import React from "react";
import styled from "styled-components";

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  section {
    background: #40e0d040;
    height: 100px;
    margin: 1em;
  }
  button {
    background-color: orange;
    font-size: 2em;
    color: white;
    width: 200px;
    height: 100px;
    border-radius: 30px;
  }
`;
export default function LoginPage({ signIn, signOut, user }) {
  return (
    <Body>
      <h1>Login Page</h1>
      <button onClick={signIn}>Login</button>
      <button onClick={signOut}>Logout</button>
      <section>hi {user?.displayName}</section>
    </Body>
  );
}

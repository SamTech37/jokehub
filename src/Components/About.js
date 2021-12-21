import React from "react";
import styled from "styled-components";

const Body = styled.div`
  margin-right: 1em;
  margin-left: 1em;
  h2 {
    padding-left: 1em;
  }
`;

export default function About() {
  return (
    <Body>
      <h1>What is this site?</h1>
      <h2>
        It's a site where you can post jokes and rate others' jokes,
        anonymously.
      </h2>
      <h1>Why?</h1>
      <h2>It's made by a Taiwanese high school student just for fun.</h2>
      <h1>How to use this site?</h1>
      <h2>
        Login with Google and post whatever joke you like and rate others'
        jokes.
      </h2>

      <h5>© 2021 CK Sam K. and Hank L. All rights reserved.</h5>
    </Body>
  );
}

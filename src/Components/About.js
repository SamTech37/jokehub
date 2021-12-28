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
        Once you've signed in, you can post and rate jokes. The authentication
        is used to identify users in order to prevent duplicated rates and other
        issues. Posting and rating is anonymous and we won't collect any of your
        personal information.
      </h2>

      <h5>© 2021 CK Sam K. and Hank L. All rights reserved.</h5>
    </Body>
  );
}

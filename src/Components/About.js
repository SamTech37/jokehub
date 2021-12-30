import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
      <h2>
        It's made and designed by two Taiwanese high school students just for
        fun.
      </h2>
      <h1>How to use this site?</h1>
      <h2>Once you've signed in, you can post and rate jokes.</h2>

      <h1>Privacy Policy</h1>
      <h2>
        Authentication is used to identify users in order to prevent duplicated
        rates and other issues. Posting and rating is anonymous and we won't use
        any of your personal information.
      </h2>
      <Link to="/about/terms">Terms</Link>
      <h5>© 2021 CK Sam K. and Hank L. All rights reserved.</h5>
    </Body>
  );
}

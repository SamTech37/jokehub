import React from "react";
import styled from "styled-components";

const Body = styled.div`
  height: 100%;
  border: 2px solid black;
  border-radius: 1.5em;
  margin: 2px;
  padding: 1em;
`;

export default function Post({ joke }) {
  return <Body></Body>;
}

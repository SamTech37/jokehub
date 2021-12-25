import React from "react";
import styled from "styled-components";

import blob from "../assets/blob.svg";
const Body = styled.div`
  display: flex;
  height: 30vh;
  width: 30vw;
  margin: 0;
  justify-content: center;
  align-items: center;
  background-image: url(${blob});
  background-repeat: no-repeat;
  background-position: center;
  @media screen and (max-width: 450px) {
    height: 20vh;
    width: 60%;
  }
`;
export default function Blob(props) {
  return <Body>{props.children}</Body>;
}

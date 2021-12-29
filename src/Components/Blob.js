import React from "react";
import styled from "styled-components";

import blob from "../assets/blob.svg";
import blob1 from "../assets/blob1.svg";
import blob2 from "../assets/blob2.svg";
import blob3 from "../assets/blob3.svg";
const Body = styled.div`
  display: flex;
  height: 30vh;
  width: 30vw;
  margin: 0;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.pat});
  background-repeat: no-repeat;
  background-position: center;
  @media screen and (max-width: 450px) {
    height: 20vh;
    width: 60%;
  }
`;
export default function Blob(props) {
  const patterns = [blob, blob1, blob2, blob3];
  return (
    <Body pat={patterns[Math.floor(Math.random() * patterns.length)]}>
      {props.children}
    </Body>
  );
}

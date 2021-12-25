import React from "react";
import styled from "styled-components";

import wave1 from "../assets/wave1.svg";
import wave2 from "../assets/wave2.svg";
const Body = styled.div`
  aspect-ratio: 1000/200;
  background-image: url(${wave2});
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media screen and (max-width: 450px) {
    aspect-ratio: 900/300;
    background-image: url(${wave1});
  }
`;
export default function Spacer() {
  return <Body />;
}

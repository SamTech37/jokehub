import React from "react";
import styled from "styled-components";

const Body = styled.div`
  width: 60%;
  height: 60px;
  background: #fff;
  border-radius: 10px;
  padding: 0 3vw;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
  }
  input {
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    background: #dddddd88;
    border-radius: 5px;
    outline: none;
    border: none;
    z-index: 100;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffab01;
      cursor: pointer;
    }
    &::-moz-range-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffab01;
      cursor: pointer;
    }
    &::-moz-range-progress {
      background: #fdfd33;
    }
  }
  span {
    font-size: 1.5em;
    font-weight: bold;
    display: flex;
    justify-self: center;
    position: absolute;
    z-index: 99;
  }
  @media screen and (max-width: 450px) {
    width: 95%;
  }
`;
export default function Slider({ userRate, setUserRate }) {
  return (
    <Body>
      <div className="field">
        <input
          onInput={(event) => setUserRate(parseInt(event.target.value / 10))}
          type={"range"}
        />
        <span>{userRate}</span>
      </div>
    </Body>
  );
}

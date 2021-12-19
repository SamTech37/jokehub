import React, { useState } from "react";
import styled from "styled-components";
import wave1 from "../assets/wave1.svg";
import wave2 from "../assets/wave2.svg";
import blob from "../assets/blob.svg";
const Body = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  padding: 0px 10vw;

  h2 {
    white-space: pre-wrap; //line breaking, mutiple spaces , etc.
    font-size: 1.5em;
  }
  button {
    color: #ffab01;
    font-size: 1em;
    margin: 1em;
    margin-top: 3em;
    padding: 0.25em 1em;
    border: 2px solid #ffab01;
    border-radius: 3px;
    &:hover {
      opacity: 0.5;
    }
  }
  .blob {
    display: flex;
    height: 30vh;
    width: 30vw;
    margin: 0;
    justify-content: center;
    align-items: center;
    background-image: url(${blob});
    background-repeat: no-repeat;
    background-position: center;
  }
  .ratingSec {
    margin-top: 2em;
    display: block;
  }
  @media screen and (max-width: 450px) {
    //responsive width and font size
    h2 {
      font-size: 5vw;
    }
    .blob {
      height: 20vh;
      width: 60%;
    }
  }
`;
const Spacer = styled.div`
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

const Slider = styled.div`
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

export default function ListItem({
  content,
  rates,
  totRating,
  postId,
  rateJoke,
  ratedUsers,
  user,
  signed,
}) {
  const [userRate, setUserRate] = useState(5);

  //if user has rated, the button will be disabled
  const handleClick = () => {
    if (signed) {
      rateJoke(postId, userRate);
    }
  };
  if (signed) {
    return (
      <div>
        <Spacer />
        <Body>
          <div>
            <h2>{content}</h2>

            <div className="ratingSec">
              <div className="g">
                <div className="blob">
                  <h1>
                    {rates !== 0
                      ? Math.round((totRating / rates) * 10) / 10
                      : "None"}
                  </h1>
                </div>
              </div>
              <p>{`out of ${rates} rates`}</p>
              <Slider>
                <div className="field">
                  <input
                    onInput={(event) =>
                      setUserRate(parseInt(event.target.value / 10))
                    }
                    type={"range"}
                  />
                  <span>{userRate}</span>
                </div>
              </Slider>
              {ratedUsers.includes(user?.uid) ? (
                <button onClick={() => alert("You've Rated This!")}>
                  Rated
                </button>
              ) : (
                <button onClick={handleClick}>Rate</button>
              )}
            </div>
          </div>
        </Body>
      </div>
    );
  } else {
    return (
      <div>
        <Spacer />
        <Body>
          <h2>{content}</h2>
          <div className="blob">
            <h1>
              {rates !== 0 ? Math.round((totRating / rates) * 10) / 10 : "None"}
            </h1>
          </div>
        </Body>
      </div>
    );
  }
}

import React, { useState } from "react";
import styled from "styled-components";
import Slider from "./Slider";
import Spacer from "./Spacer";
import Blob from "./Blob";
const Body = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  padding: 0px 10vw;

  h2 {
    white-space: pre-wrap; //line breaking, mutiple spaces , etc.
    font-size: 1.5em;
    font-weight: 500;
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
  .ratingSec {
    margin-top: 2em;
    display: block;
  }
  //responsive width and font size
  @media screen and (max-width: 450px) {
    h2 {
      font-size: 5vw;
    }
    .btnGroup {
      display: flex;
      justify-content: center;
    }
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

  //if user has rated, the button can't send rate
  const handleClick = () => {
    if (signed) {
      rateJoke(postId, userRate);
    }
  };
  const handleCopy = () => {
    let text = "https://jokehub6969.web.app/p/" + postId;
    navigator.clipboard.writeText(text);
    alert("URL copied!");
  };
  if (signed) {
    return (
      <div>
        <Spacer />
        <Body>
          <div>
            <h2>{content}</h2>

            <div className="ratingSec">
              <Blob>
                <h1>
                  {rates !== 0
                    ? Math.round((totRating / rates) * 10) / 10
                    : "None"}
                </h1>
              </Blob>
              <p
                style={{ fontWeight: 500 }}
              >{`average out of ${rates} rates`}</p>
              <Slider userRate={userRate} setUserRate={setUserRate} />
              <div className="btnGroup">
                {ratedUsers.includes(user?.uid) ? (
                  <button onClick={() => alert("You've Rated This!")}>
                    Rated
                  </button>
                ) : (
                  <button onClick={handleClick}>Rate</button>
                )}
                <button onClick={handleCopy}>Share</button>
              </div>
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
          <Blob>
            <h1>
              {rates !== 0 ? Math.round((totRating / rates) * 10) / 10 : "None"}
            </h1>
          </Blob>
        </Body>
      </div>
    );
  }
}

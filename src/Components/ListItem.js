import React, { useState } from "react";
import styled from "styled-components";
import Slider from "./Slider";
import Spacer from "./Spacer";
import Blob from "./Blob";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
const Body = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0px 10vw;
  overflow: hidden;
  p {
    white-space: pre-wrap; //line breaking, mutiple spaces , etc.
    font-weight: 500;
  }
  .content {
    font-weight: 500;
    white-space: pre-wrap;
    font-size: 1.5em;
    line-height: 1.5;
  }
  button {
    color: #ffab01;
    font-size: 1em;
    margin: 1em;
    margin-top: 3em;
    padding: 0.25em 1em;
    box-shadow: 0 0 5px #dfe0df;
    border: 2px solid #ffab01;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
  .toggler {
    color: #099726;
    border-radius: 1em;
    font-size: 1.5rem;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .ratingSec {
    margin-top: 2em;
    display: block;
  }
  //responsive width and font size
  @media screen and (max-width: 450px) {
    .content {
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
  const [folded, setFolded] = useState(true);
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

  return (
    <div>
      <Spacer />
      <Body>
        <div>
          {folded ? (
            <ResponsiveEllipsis
              className="content"
              text={content}
              maxLine="10"
              ellipsis={
                <div className="toggler" onClick={() => setFolded(false)}>
                  Read more
                </div>
              }
              basedOn="words"
            />
          ) : (
            <div>
              <p className="content">{content}</p>
              <div className="toggler" onClick={() => setFolded(true)}>
                Read less
              </div>
            </div>
          )}

          <Blob>
            <h1>
              {rates !== 0 ? Math.round((totRating / rates) * 10) / 10 : "None"}
            </h1>
          </Blob>
          <p>{`average out of ${rates} rates`}</p>

          {signed && (
            <div className="ratingSec">
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
          )}
        </div>
      </Body>
    </div>
  );
}

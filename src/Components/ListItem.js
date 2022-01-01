import React, { useState } from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import Slider from "./Slider";
import Spacer from "./Spacer";
import Blob from "./Blob";
//ellispsis
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Body = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 10vw;
  min-height: 500px;
  overflow: hidden;
  p {
    white-space: pre-wrap; //line breaking, mutiple spaces , etc.
    font-weight: 500;
  }
  .content {
    font-weight: 500;
    white-space: pre-wrap;
    font-size: 1.5em;
    line-height: 1.4;
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
    color: #ffab01;
    border-radius: 1em;
    font-size: 1.5rem;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .ratingSec {
    margin-top: 2em;
  }
  .modifyBtn {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 2.5vw;
    font-size: 30px;
    -webkit-tap-highlight-color: #ff6347bb;
  }
  //responsive width and font size
  @media screen and (max-width: 450px) {
    p {
      font-size: 5vw;
    }
    .content {
      font-size: 5vw;
    }
    .btnGroup {
      display: flex;
      justify-content: center;
    }
    .modifyBtn {
      font-size: 20px;
    }
  }
`;

export default function ListItem({
  content,
  rates,
  totRating,
  postId,
  posterUid,
  rateJoke,
  deleteJoke,
  ratedUsers,
  user,
  signed,
  isList,
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
  const handleDelete = () => {
    const flag = prompt("You sure? Type 'Yes' if you want to delete.", "bruh");
    if (flag === "Yes") deleteJoke(postId);
  };

  return (
    <div>
      <Spacer className="spacer" />
      <Body>
        <div>
          {folded && isList ? ( //don't show ellipsis when inside a post
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
              {isList && (
                <div className="toggler" onClick={() => setFolded(true)}>
                  Read less
                </div>
              )}
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
              {user.uid === posterUid && (
                <div className="modifyBtn">
                  <BiTrash onClick={handleDelete} color="red" />
                </div>
              )}
            </div>
          )}
        </div>
      </Body>
    </div>
  );
}

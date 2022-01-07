import React, { useState, useContext } from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { AiOutlineLink, AiOutlineCheck } from "react-icons/ai";
import Slider from "./Slider";
import Spacer from "./Spacer";
import blob from "../assets/blob.svg";
import blob2 from "../assets/blob2.svg";
import blob3 from "../assets/blob3.svg";
import {
  FacebookIcon,
  TwitterIcon,
  LineIcon,
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
} from "react-share";
//context
import { LangContext } from "../LangContext";
//ellispsis
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Body = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 10vw;
  min-height: 550px;
  overflow: hidden;
  p {
    white-space: pre-wrap; //line breaking, mutiple spaces , etc.
    font-weight: 500;
  }
  .keywordAnc {
    text-decoration: none;
    color: #00dd93;
  }
  .content {
    font-weight: 500;
    white-space: pre-wrap;
    font-size: 1.5em;
    line-height: 1.4;
  }

  .toggler {
    color: #00dd93;
    border-radius: 1em;
    font-size: 16px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .ratingSec {
    margin-top: 24px;
  }
  .btnGroup {
    margin-bottom: 20px;
    .myBtn {
      margin: 8px;
      color: #ffab01;
      background-color: white;
      font-size: 20px;
      padding: 0.25em 1em;
      box-shadow: 0 0 10px #dfe0df;
      border: 2px solid #ffab01;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 20px #dfe0df;
      }
      &:disabled {
        border: 2px solid #999;
        color: #999;
        cursor: unset;
        box-shadow: unset;
      }
    }
  }
  .share {
    display: block;
    button {
      margin: 8px;
    }
  }

  .deleteBtn {
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
    .keywordAnc {
      font-size: 5vw;
    }
    .content {
      font-size: 5vw;
    }
    .btnGroup {
      font-size: 5vw;
    }
    .modifyBtn {
      font-size: 20px;
    }
  }
`;
const Blob = styled.div`
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
export default function ListItem({
  content,
  rates,
  totRating,
  postId,
  posterUid,
  keyword,
  rateJoke,
  deleteJoke,
  ratedUsers,
  user,
  isList,
}) {
  const [userRate, setUserRate] = useState(5); //if user has rated, the button can't send rate
  const [folded, setFolded] = useState(true);
  const [copied, setCopied] = useState(false);
  const language = useContext(LangContext);
  const patterns = [blob, blob2, blob3];
  const [pattern, setPattern] = useState(
    patterns[Math.floor(Math.random() * patterns.length)]
  );
  const handleRate = () => {
    if (user) {
      rateJoke(postId, userRate);
    }
  };
  const link = window.location.origin + "/p/" + postId; // current orgin + path to post
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    if (copied) alert("Link copied!");
    setCopied(true);
  };
  const handleDelete = () => {
    const flag =
      language === "中文"
        ? prompt("你確定嗎?如果確定要刪除，輸入'是' ", "bruh")
        : prompt("You sure? Type ' Yes ' if you want to delete.", "bruh");
    if (flag === "Yes" || flag === "是") deleteJoke(postId);
  };

  return (
    <div>
      <Spacer className="spacer" />
      <Body>
        <a href={`/?keyword=${keyword}`} className="keywordAnc">
          {"#" + keyword}
        </a>
        <div>
          {folded ? (
            <ResponsiveEllipsis
              className="content"
              text={content}
              maxLine="10"
              ellipsis={
                <div className="toggler" onClick={() => setFolded(false)}>
                  {language === "中文" ? "展開" : "Read more"}
                </div>
              }
              basedOn="words"
            />
          ) : (
            <div>
              <p className="content">{content}</p>
              <div className="toggler" onClick={() => setFolded(true)}>
                {language === "中文" ? "收起" : "Read less"}
              </div>
            </div>
          )}

          {/*for crawling*/}
          <a href={"/p/" + postId} />

          <Blob pat={pattern}>
            <h1>
              {rates !== 0
                ? Math.round((totRating / rates) * 10) / 10
                : language === "中文"
                ? "無"
                : "None"}
            </h1>
          </Blob>
          <p>
            {language === "中文"
              ? ` ${rates} 則評分裡平均`
              : `average out of ${rates} rates`}
          </p>

          {user && (
            <div className="ratingSec">
              <Slider userRate={userRate} setUserRate={setUserRate} />
              <div className="btnGroup">
                {ratedUsers.includes(user?.uid) ? (
                  <button disabled className="myBtn">
                    {language === "中文" ? "給過了" : "Rated"}
                  </button>
                ) : (
                  <button onClick={handleRate} className="myBtn">
                    {language === "中文" ? "給分" : "Rate"}
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  aria-label="copy link"
                  className="myBtn"
                >
                  {copied ? (
                    <AiOutlineCheck size={20} />
                  ) : (
                    <AiOutlineLink size={20} />
                  )}
                </button>
              </div>

              {user.uid === posterUid && isList && (
                <div className="deleteBtn" aria-label="delete post">
                  <BiTrash onClick={handleDelete} color="red" />
                </div>
              )}
            </div>
          )}
          <div className="share">
            <FacebookShareButton
              url={link}
              quote="Haha funny joke on Jokehub"
              hashtag="#jokehub"
            >
              <FacebookIcon size={30} />
            </FacebookShareButton>
            <TwitterShareButton url={link} title="Haha funny joke on Jokehub">
              <TwitterIcon size={30} />
            </TwitterShareButton>
            <LineShareButton url={link}>
              <LineIcon size={30} />
            </LineShareButton>
          </div>
        </div>
      </Body>
    </div>
  );
}

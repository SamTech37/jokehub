import React, { useContext } from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
//context
import { LangContext } from "../LangContext";

const Body = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
  a {
    font-size: 30px;
  }
`;
export default function NoMatch() {
  const language = useContext(LangContext);

  return language === "中文" ? (
    <Body>
      <h1>看起來這裡什麼都沒有</h1>
      <h2>或許是打錯網址之類的</h2>
      {"\n"}
      <Link to="/">回主頁吧</Link>
    </Body>
  ) : (
    <Body>
      <h1>Looks like we got nothing here</h1>
      <h2>Maybe a misspelling or something</h2>
      {"\n"}
      <Link to="/">Let's head back home</Link>
    </Body>
  );
}

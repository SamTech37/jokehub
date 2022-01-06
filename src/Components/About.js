import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//context
import { LangContext } from "../LangContext";

const Body = styled.div`
  margin-right: 1em;
  margin-left: 1em;
  h2 {
    padding-left: 1em;
  }
`;

export default function About() {
  const language = useContext(LangContext);
  return language === "中文" ? (
    <Body>
      <h1>這是什麼?</h1>
      <h2>這是一個可以匿名發笑話還有評分笑話的網站。</h2>
      <h1>為什麼?</h1>
      <h2>
        做好玩的。認真講大概是因為我跟同學有時候會互評笑話，丟到網路上看看有沒有其他人會感興趣。
      </h2>
      <h1>如何使用這個網站?</h1>
      <h2>用Google登入之後就可以發布笑話還有給分;沒有登入也可以瀏覽笑話。</h2>

      <h1>隱私政策</h1>
      <h2>登入與驗證是用來識別使用者，發布還有評分笑話仍是匿名的。</h2>

      <p>可用站點:</p>
      <a href="https://jokehub.web.app/">https://jokehub.web.app/</a>
      <br />
      <a href="https://jokehub6969.web.app/">https://jokehub6969.web.app/</a>
      <br />
      <br />
      <Link to="/about/terms">服務條款</Link>
      <h5>© 2021 CK Sam K. and Hank L. All rights reserved. 版權所有©</h5>
    </Body>
  ) : (
    <Body>
      <h1>What is this site?</h1>
      <h2>
        It's a site where you can post jokes and rate others' jokes,
        anonymously.
      </h2>
      <h1>Why?</h1>
      <h2>
        It's made and designed by two Taiwanese high school students just for
        fun.
      </h2>
      <h1>How to use this site?</h1>
      <h2>Once you've signed in, you can post and rate jokes.</h2>

      <h1>Privacy Policy</h1>
      <h2>
        Authentication is used to identify users in order to prevent duplicated
        rates and other issues. Posting and rating is still anonymous.
      </h2>
      <p>available sites:</p>
      <a href="https://jokehub.web.app/">https://jokehub.web.app/</a>
      <br />
      <a href="https://jokehub6969.web.app/">https://jokehub6969.web.app/</a>
      <br />
      <br />
      <Link to="/about/terms">Terms</Link>
      <h5>© 2021 CK Sam K. and Hank L. All rights reserved.</h5>
    </Body>
  );
}

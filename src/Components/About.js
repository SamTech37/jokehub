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
      <h1>
        這是最後一個使用create-react-app的版本，我在2021年底到2022年初開發完成。接下來為了更好的SEO跟效能，我決定用Nextjs改寫。
        這也是我在學習歷程裡面放的版本- Sam K. 1/10/2020
      </h1>
      <h1>這是什麼?</h1>
      <h2>這是一個可以匿名發笑話還有評分笑話的網站。</h2>
      <h1>為什麼?</h1>
      <h2>
        做好玩的。認真講大概是因為我跟同學有時候會互評笑話，丟到網路上看看有沒有其他人會感興趣。
      </h2>
      <h1>如何使用這個網站?</h1>
      <h2>
        用Google或FB登入之後就可以發布笑話還有給分;沒有登入也可以瀏覽笑話。
      </h2>
      <h1>關於登入</h1>
      <h2>登入與驗證是用來識別使用者，發布還有評分笑話仍是匿名的。</h2>
      <br />
      <br />
      <Link to="/about/terms">服務條款</Link>
      <br />
      <Link to="/about/privacy">隱私政策</Link>
      <h5>© 2021 CK Sam K. and Hank L. All rights reserved. 版權所有©</h5>
    </Body>
  ) : (
    <Body>
      <h1>
        這是最後一個使用create-react-app的版本，我在2021年底到2022年初開發完成。接下來為了更好的SEO跟效能，我決定用Nextjs改寫。
        這也是我在學習歷程裡面放的版本- Sam K. 1/10/2020
      </h1>
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
      <h2>
        Once you've signed in with Google or FB, you can post and rate jokes.
      </h2>

      <h1>About Signing in</h1>
      <h2>
        Authentication is used to identify users in order to prevent duplicated
        rates and other issues. Posting and rating is still anonymous.
      </h2>
      <br />
      <br />
      <Link to="/about/terms">Terms</Link>
      <br />
      <Link to="/about/privacy">Privacy Policy</Link>
      <h5>© 2021 CK Sam K. and Hank L. All rights reserved.</h5>
    </Body>
  );
}

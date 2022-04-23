import React, { useContext } from "react";
import Link from "next/link";
import styles from "../../styles/About.module.css";
export default function About() {
  return (
    <div className={styles.body}>
      <h1>這是什麼?</h1>
      <h2>這是一個可以發布,分享還有評分笑話的網站。</h2>
      <h1>為什麼?</h1>
      <h2>
        做好玩的。認真講大概是因為我跟同學有時候會互評笑話，所以做出來丟到網路上看看有沒有其他人會感興趣。
      </h2>
      <h1>如何使用這個網站?</h1>
      <h2>
        用Google或FB登入之後就可以發布笑話還有給分;沒有登入也可以瀏覽笑話。
      </h2>
      <br />
      <br />
      <Link href="/about/terms">
        <a>服務條款</a>
      </Link>
      <br />
      <Link href="/about/privacy">
        <a>隱私政策</a>
      </Link>
      <h5>© 2021 CK Sam K. and Hank L. All rights reserved. 版權所有©</h5>
    </div>
  );
}

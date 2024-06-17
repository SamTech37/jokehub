import React from "react";
import Link from "next/link";
import styles from "../../styles/About.module.css";
export default function About() {
  return (
    <div className={styles.body}>
      <h1>這是什麼?</h1>
      <h2>這是一個可以發布,分享還有評分笑話的網站。</h2>
      <h2 className={styles.notice}>
        笑話皆為用戶自行發布，本網站不為其言論負任何責任，但也不鼓勵任何形式的仇恨言論。
        <br />
        若您主觀上不喜歡某則笑話，請自行予以低分。
        <br />
        本站因開發者忙於其他事項，疏於更新維護，敬請見諒。
      </h2>
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
      <Link href="/about/terms">服務條款</Link>
      <br />
      <Link href="/about/privacy">隱私政策</Link>
      <h5>© 2021 CK Sam K. and Hank L. All rights reserved. 版權所有©</h5>
    </div>
  );
}

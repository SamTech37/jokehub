import React from "react";
import Link from "next/link";
import styles from "../styles/Install.module.css";
import { MdOutlineAddBox, MdIosShare } from "react-icons/md";
import { AiOutlineMore } from "react-icons/ai";
export default function Install() {
  return (
    <div className={styles.body}>
      <h1>安裝 JokeHub App</h1>
      <h2>IOS</h2>
      <span className={styles.instruction}>
        <MdIosShare size={48} />
        <p>1. 按Safari的分享按鈕</p>
      </span>
      <span className={styles.instruction}>
        <MdOutlineAddBox size={48} />
        <p>{`2. 按"加到主畫面"`}</p>
      </span>
      <h2>Android</h2>
      <p>看到安裝提示的時候確認</p>
      <span className={styles.instruction}>
        <span>
          或是點選「更多」圖示
          <AiOutlineMore size={36} />
          後按加到主畫面
        </span>
      </span>
      <p>
        更多資訊請參考
        <Link
          href={`https://support.google.com/chrome/answer/9658361?hl=zh-Hant&co=GENIE.Platform%3DAndroid`}
        >
          <a>這裡</a>
        </Link>
      </p>
    </div>
  );
}

import React from "react";
import styles from "../styles/Me.module.css";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import {
  signInGooglePop,
  // signInFacebookPop,
  // signInGoogleRedirect,
  // signInFacebookRedirect,
} from "../firebase/client";

export default function Login() {
  return (
    <div className={styles.body}>
      <div
        //apply multiple styles
        className={`${styles.login}`}
      >
        <button className={styles.signin} onClick={signInGooglePop}>
          <FcGoogle />
          用Google登入
        </button>

        {/* <button className={styles.signin} onClick={signInFacebookPop}>
          <BsFacebook color="#4267B2" />
          用Facebook登入
        </button> */}
        <p className={styles.caveat}>
          登入僅為了創造一個可辨識用戶的獨特憑證，我們並不會使用或存取您的個人資料。驗證程序全由Google包辦。
          <br />
          <Link href="/about/terms">服務條款</Link>
          <br />
          <Link href="/about/privacy">隱私政策</Link>
        </p>
      </div>
    </div>
  );
}

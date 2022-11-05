import React from "react";
import styles from "../styles/Me.module.css";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import {
  signInGooglePop,
  signInFacebookPop,
  signInGoogleRedirect,
  signInFacebookRedirect,
} from "../firebase/client";
export default function Login() {
  return (
    <div className={styles.body}>
      <div
        //apply multiple styles
        className={`${styles.login} ${styles.loginWeb}`}
      >
        <button className={styles.signin} onClick={signInGooglePop}>
          <FcGoogle />
          用Google登入
        </button>

        <button className={styles.signin} onClick={signInFacebookPop}>
          <BsFacebook color="#4267B2" />
          用Facebook登入
        </button>
        <p className={styles.caveat}>
          登入僅為了創造一個可辨識用戶的獨特憑證，我們並不會使用或存取您的個人資料。驗證程序全由FB,Google包辦。
          <br />
          <Link href="/about/terms">
            <a>服務條款</a>
          </Link>
          <br />
          <Link href="/about/privacy">
            <a>隱私政策</a>
          </Link>
        </p>
      </div>

      <div className={`${styles.login} ${styles.loginMobile}`}>
        <button className={styles.signin} onClick={signInGoogleRedirect}>
          <FcGoogle />
          用Google登入
        </button>

        <button className={styles.signin} onClick={signInFacebookRedirect}>
          <BsFacebook color="#4267B2" />
          用Facebook登入
        </button>
        <p className={styles.caveat}>
          登入僅為了創造一個可辨識用戶的獨特憑證，我們並不會使用或存取您的個人資料。驗證程序全由FB,Google包辦。
          <br />
          <Link href="/about/terms">
            <a>服務條款</a>
          </Link>
          <br />
          <Link href="/about/privacy">
            <a>隱私政策</a>
          </Link>
        </p>
      </div>
    </div>
  );
}

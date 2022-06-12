import React from "react";
import styles from "../styles/Me.module.css";
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
    <div>
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
        <p>
          登入僅為了創造一個可辨識用戶的獨特憑證，我們並不會使用或存取您的個人資料。而驗證程序則全由FB,Google包辦。
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
        <p>
          登入僅為了創造一個可辨識用戶的獨特憑證，我們並不會使用或存取您的個人資料。而驗證程序則全由FB,Google包辦。
        </p>
      </div>
    </div>
  );
}

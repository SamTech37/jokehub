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
      <div className={`${styles.login} ${styles.loginWeb}`}>
        <button className={styles.signin} onClick={signInGooglePop}>
          <FcGoogle />
          用Google登入
        </button>

        <button className={styles.signin} onClick={signInFacebookPop}>
          <BsFacebook color="#4267B2" />
          用Facebook登入
        </button>
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
      </div>
    </div>
  );
}

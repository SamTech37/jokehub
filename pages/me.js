import React from "react";
import styles from "../styles/Me.module.css";
import { BiLogOut } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import {
  userSignOut,
  signInGooglePop,
  signInFacebookPop,
  signInGoogleRedirect,
  signInFacebookRedirect,
} from "../firebase/client";
export default function me({ user }) {
  return (
    <div className={styles.body}>
      {user ? (
        <div className={styles.main}>
          <button onClick={userSignOut} className={styles.signout}>
            <BiLogOut />
          </button>
          <img
            src={`https://avatars.dicebear.com/api/croodles-neutral/${user?.uid}.svg`}
            alt="your avatar"
            className={styles.doodle}
          />
          <div className={styles.profile}>
            <h1>{"NickName"}</h1>
            <p>you haven't set you nickname</p>
            <h2>{"Bio:"}</h2>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

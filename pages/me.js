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
        <div>
          <button onClick={userSignOut}>
            <BiLogOut />
          </button>
          <img
            src={`https://avatars.dicebear.com/api/croodles-neutral/${user?.uid}.svg`}
            alt="poster"
            width={100}
            height={100}
          />
          <h1> {user?.displayName}</h1>
        </div>
      ) : (
        <div className={styles.login}>
          <button className={styles.signin} onClick={signInGooglePop}>
            <FcGoogle />
            用Google登入
          </button>

          <button className={styles.signin} onClick={signInFacebookPop}>
            <BsFacebook color="#4267B2" />
            用Facebook登入
          </button>
        </div>
      )}
    </div>
  );
}

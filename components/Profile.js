import React from "react";
import styles from "../styles/Me.module.css";
import { BiLogOut } from "react-icons/bi";
import { userSignOut } from "../firebase/client";
export default function Profile({ user }) {
  return (
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
        <p>{"you haven't set you nickname"}</p>
        <h2>{"Bio:"}</h2>
      </div>
    </div>
  );
}

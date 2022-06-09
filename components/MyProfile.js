import React, { useState } from "react";
import styles from "../styles/Me.module.css";
import { BiLogOut } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";

import { userSignOut, changeNickname, changeBio } from "../firebase/client";
export default function MyProfile({ user }) {
  const [nickname, setNickname] = useState("暱稱");
  const [bio, setBio] = useState(`按一下開始編輯`);

  const handleUpdate = async () => {};
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
        <input
          className={styles.nickname}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={10}
        />
        <textarea
          className={styles.bio}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={200}
        />
        <div className={styles.edit}>
          <BsCheckLg className={styles.editbtn} />
        </div>
      </div>
    </div>
  );
}

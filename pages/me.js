import React, { useState } from "react";
import styles from "../styles/Me.module.css";
import Login from "../components/Login";
import MyProfile from "../components/MyProfile";

export default function Me({ user }) {
  const [profile, setProfile] = useState({
    //lift this state
    nickname: "暱稱",
    bio: "簡介按一下開始編輯",
  });

  return (
    <div className={styles.body}>
      {user ? (
        <MyProfile user={user} profile={profile} setProfile={setProfile} />
      ) : (
        <Login />
      )}
    </div>
  );
}

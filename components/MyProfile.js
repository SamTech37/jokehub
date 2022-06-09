import React, { useState } from "react";
import styles from "../styles/Me.module.css";
import { BiLogOut } from "react-icons/bi";
import { userSignOut } from "../firebase/client";
export default function MyProfile({ user }) {
  const [profile, setProfile] = useState({
    nickname: "暱稱",
    bio: "自介",
  });
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [edit, setEdit] = useState(false);
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
      {edit ? (
        <div>hi</div>
      ) : (
        <div className={styles.profile}>
          <h2>{profile.nickname}</h2>
          <h2>{profile.bio}</h2>
        </div>
      )}
    </div>
  );
}

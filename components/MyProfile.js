import React, { useState, useEffect } from "react";
import styles from "../styles/Me.module.css";
import { BiLogOut } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";

import { userSignOut, updateProfile, getProfile } from "../firebase/client";
export default function MyProfile({ user }) {
  useEffect(() => {
    async function onMount() {
      const data = await getProfile(user.uid);

      if (data == "none") {
        //user hasn't setted profile
        setProfile({ nickname: "暱稱", bio: "簡介按一下開始編輯" });
      } else setProfile(data);
      console.log(profile);
      setNewNickname(profile.nickname);
      setNewBio(profile.bio);
    }
    onMount();
  }, []);
  const [profile, setProfile] = useState({
    nickname: "暱稱",
    bio: "簡介按一下開始編輯",
  });
  const [newNickname, setNewNickname] = useState("暱稱");
  const [newBio, setNewBio] = useState("簡介按一下開始編輯");

  const handleUpdate = async () => {
    if (newNickname && newBio) {
      await updateProfile(user.uid, newNickname, newBio);
    } else {
      alert("請不要留白");
    }
  };
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
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          maxLength={10}
        />
        <textarea
          className={styles.bio}
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          maxLength={200}
        />
        {
          //show when editing
          (newNickname !== profile.nickname || newBio !== profile.bio) && (
            <div className={styles.edit}>
              <BsCheckLg className={styles.editbtn} onClick={handleUpdate} />
            </div>
          )
        }
      </div>
    </div>
  );
}

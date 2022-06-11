import React, { useState, useEffect } from "react";
import styles from "../styles/Me.module.css";
import { BiArrowBack, BiLogOut } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { useRouter } from "next/router";

import { userSignOut, updateProfile, getProfile } from "../firebase/client";
export default function MyProfile({ user, profile, setProfile }) {
  const router = useRouter();

  useEffect(() => {
    async function onMount() {
      const data = await getProfile(user.uid);
      //if user has set profile
      if (!(data == "none")) setProfile(data);
    }
    onMount();
  }, []);
  const handleUpdate = async () => {
    if (profile.nickname && profile.bio) {
      let userInput = confirm("確定要修改？");
      if (userInput) {
        await updateProfile(user.uid, profile.nickname, profile.bio);
        alert("修改成功");
      }
    } else {
      alert("請不要留白");
    }
  };

  const [editting, setEditting] = useState(false);
  return (
    <div className={styles.main}>
      <button
        className={styles.back}
        onClick={() => router.back()}
        aria-label="back to previous page"
      >
        <BiArrowBack />
      </button>

      <img
        src={`https://avatars.dicebear.com/api/croodles-neutral/${user?.uid}.svg`}
        alt="your avatar"
        className={styles.doodle}
      />
      <div className={styles.profile}>
        <input
          className={styles.nickname}
          maxLength={10}
          value={profile.nickname}
          onChange={(e) => {
            setProfile((prevProfile) => ({
              nickname: e.target.value,
              bio: prevProfile.bio,
            }));
            setEditting(true);
          }}
        />
        <textarea
          className={styles.bio}
          maxLength={200}
          value={profile.bio}
          onChange={(e) => {
            setProfile((prevProfile) => ({
              nickname: prevProfile.nickname,
              bio: e.target.value,
            }));
            setEditting(true);
          }}
        />
        <BiLogOut onClick={userSignOut} className={styles.signout} />

        {editting && (
          <BsCheckLg className={styles.editbtn} onClick={handleUpdate} />
        )}
      </div>
    </div>
  );
}

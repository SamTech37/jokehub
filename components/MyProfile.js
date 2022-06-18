import React, { useState, useEffect } from "react";
import styles from "../styles/Me.module.css";
import { BiArrowBack, BiLogOut } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import Link from "next/link";
import { userSignOut, updateProfile, getProfile } from "../firebase/client";
export default function MyProfile({ user, profile, setProfile }) {
  useEffect(() => {
    async function initialLoad() {
      const data = await getProfile(user.uid);
      //if user has set profile
      if (!(data == "none")) {
        setProfile(data);
        sessionStorage.setItem("Profile", JSON.stringify(data));
      }
    }

    if (sessionStorage.getItem("Profile")) {
      setProfile(JSON.parse(sessionStorage.getItem("Profile")));
      console.log("get session");
    } else {
      initialLoad();
    }
  }, []);
  const handleUpdate = async () => {
    if (profile.nickname && profile.bio) {
      let userInput = confirm("確定要修改？");
      if (userInput) {
        await updateProfile(user.uid, profile.nickname, profile.bio);
        alert("修改成功");
        sessionStorage.setItem("Profile", JSON.stringify(profile));
      }
    } else {
      alert("請不要留白");
    }
  };

  const [editting, setEditting] = useState(false);
  return (
    <div className={styles.main}>
      <Link href="/" passHref>
        <button className={styles.back} aria-label="back to previous page">
          <BiArrowBack />
        </button>
      </Link>

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

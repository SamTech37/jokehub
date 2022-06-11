import styles from "../../styles/Me.module.css";
import React from "react";
import { getProfile } from "../../firebase/client";

export default function User({ userProfile, uid }) {
  const profile = JSON.parse(userProfile);
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <img
          src={`https://avatars.dicebear.com/api/croodles-neutral/${uid}.svg`}
          alt="your avatar"
          className={styles.doodle}
        />

        <div className={styles.profile}>
          <h2>{profile.nickname ? profile.nickname : "暱稱"}</h2>
          <h2>{profile.bio ? profile.bio : "簡介"}</h2>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const userId = query.uid;
  const data = await getProfile(userId);
  return {
    props: { uid: userId, userProfile: JSON.stringify(data) },
  };
}

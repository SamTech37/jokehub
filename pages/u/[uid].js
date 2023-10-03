import styles from "../../styles/Me.module.css";
import React from "react";
import { getProfile } from "../../firebase/client";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
export default function User({ userProfile, uid }) {
  const profile = JSON.parse(userProfile);
  const router = useRouter();
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <button
          className={styles.back}
          onClick={() => router.back()}
          aria-label="back to previous page"
        >
          <BiArrowBack />
        </button>
        <img
          //update api
          src={`https://api.dicebear.com/7.x/croodles-neutral/svg?seed=${uid}`}
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

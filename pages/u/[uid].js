import styles from "../../styles/Me.module.css";
import React from "react";
import { useRouter } from "next/router";
export default function User() {
  const router = useRouter();
  const { uid } = router.query;
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <img
          src={`https://avatars.dicebear.com/api/croodles-neutral/${uid}.svg`}
          alt="your avatar"
          className={styles.doodle}
        />
        <div className={styles.profile}>
          <h1>{"NickName"}</h1>
          <h2>{"Bio:"}</h2>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(){

// };

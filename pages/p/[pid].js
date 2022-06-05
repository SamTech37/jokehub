import React from "react";
import Joke from "../../components/Joke";
import NoMore from "../../components/NoMore";
import Link from "next/link";

import { getJoke } from "../../firebase/client";
import blob from "../../assets/blob.svg";
import styles from "../../styles/Home.module.css";
export default function JokePage({ jokeJSON, user }) {
  const joke = JSON.parse(jokeJSON);
  return joke == "none" ? (
    <NoMore>
      <Link href="/">
        <a>
          <h1 className={styles.click}>看起來這裡什麼都沒有</h1>
          <h1 className={styles.click}>或許是打錯網址之類的</h1>
          <h1 className={styles.click}>回主頁吧</h1>
        </a>
      </Link>
    </NoMore>
  ) : (
    <Joke displayMode="page" joke={joke} blobPattern={blob} user={user} />
  );
}

export async function getServerSideProps({ query }) {
  const jokeId = query.pid;
  const data = await getJoke(jokeId);
  return {
    props: { jokeJSON: JSON.stringify(data) },
  };
}

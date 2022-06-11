import React from "react";
import Joke from "../../components/Joke";
import NoMore from "../../components/NoMore";
import Link from "next/link";
import { NextSeo } from "next-seo";

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
    <>
      <NextSeo
        title={"JokeHub | " + joke.content.slice(0, 30) + "..."}
        description="A website where you can share jokes and rate others' jokes. Laugh and enjoy. No censorship."
        canonical={`https://jokehub.vercel.app/p/${joke.id}`}
        openGraph={{
          type: "website",
          url: `https://jokehub.vercel.app/p/${joke.id}`,
          title: `JokeHub | 笑是良藥 #${joke.keyword}`,
          description:
            "A website where you can share jokes and rate others' jokes. Laugh and enjoy. No censorship.",
          site_name: "JokeHub",
          images: [
            {
              url: "https://jokehub.vercel.app/og-image.png",
              width: 1200,
              height: 630,
              alt: "JokeHub opengraph image",
            },
          ],
          article: {
            authors: [joke.poster],
            tags: [joke.keyword],
            publishedTime: new Date(joke.time._seconds * 1000).toISOString(),
          },
        }}
        facebook={{
          appId: "256152399957750",
        }}
      />
      <Joke displayMode="page" joke={joke} blobPattern={blob} user={user} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const jokeId = query.pid;
  const data = await getJoke(jokeId);
  return {
    props: { jokeJSON: JSON.stringify(data) },
  };
}

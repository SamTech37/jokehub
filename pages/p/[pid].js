import React from "react";
import Joke from "../../components/Joke";
import { getJoke } from "../../firebase/client";
import blob from "../../assets/blob.svg";
export default function JokePage({ jokeJSON, user }) {
  const joke = JSON.parse(jokeJSON);
  return <Joke displayMode="page" joke={joke} blobPattern={blob} user={user} />;
}

export async function getServerSideProps({ query }) {
  const jokeId = query.pid;
  const data = await getJoke(jokeId);
  return {
    props: { jokeJSON: JSON.stringify(data) },
  };
}

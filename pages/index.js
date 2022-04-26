import styles from "../styles/Home.module.css";
import Joke from "../components/Joke";
import blob from "../assets/blob.svg";
import blob1 from "../assets/blob1.svg";
import blob2 from "../assets/blob2.svg";
import blob3 from "../assets/blob3.svg";
import blob4 from "../assets/blob4.svg";
import { getRandomJoke } from "../firebase/client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroller";

export default function Home() {
  const [jokes, setJokes] = useState([]);

  const blobs = [blob, blob1, blob2, blob3, blob4];
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {jokes.map((j) => {
          return (
            <Joke
              joke={j}
              key={uuidv4()}
              blobPattern={blobs[Math.floor(Math.random() * blobs.length)]}
            />
          );
        })}
        <button onClick={() => getRandomJoke(setJokes)}>GET</button>
        {/* <InfiniteScroll
    pageStart={0}
    loadMore={loadFunc}
    hasMore={true || false}
    loader={<div className="loader" key={0}>Loading ...</div>}
    >
    {items}
</InfiniteScroll> */}
      </main>
    </div>
  );
}

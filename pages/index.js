import styles from "../styles/Home.module.css";
import Joke from "../components/Joke";
import blob from "../assets/blob.svg";
import blob1 from "../assets/blob1.svg";
import blob2 from "../assets/blob2.svg";
import blob3 from "../assets/blob3.svg";
import blob4 from "../assets/blob4.svg";
import { getRandomJoke, getJokesChrono } from "../firebase/client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroller";
import { async } from "@firebase/util";

export default function Home() {
  const blobs = [blob, blob1, blob2, blob3, blob4];
  const [jokes, setJokes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadMore = async () => {
    if (!loading) {
      setLoading(true);
      const newJokes = await getJokesChrono();
      setJokes((prevJokes) => [...prevJokes, ...newJokes]);
      console.log("loaded");
      setLoading(false);
    }
  };
  return (
    <div>
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
        <button onClick={loadMore}>GET</button>
      </main>
    </div>
  );
}

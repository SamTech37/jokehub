import styles from "../styles/Home.module.css";
import Joke from "../components/Joke";
import PostingBlock from "../components/PostingBlock";
import blob from "../assets/blob.svg";
import blob1 from "../assets/blob1.svg";
import blob2 from "../assets/blob2.svg";
import blob3 from "../assets/blob3.svg";
import blob4 from "../assets/blob4.svg";
import { getRandomJoke, getJokesChrono } from "../firebase/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home({ initialJokes, user }) {
  const blobs = [blob, blob1, blob2, blob3, blob4];
  const [jokes, setJokes] = useState(JSON.parse(initialJokes));
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () =>
    setTimeout(async () => {
      const newJokes = await getJokesChrono();
      setJokes((prevJokes) => [...prevJokes, ...newJokes]);
      if (newJokes.length == 0) setHasMore(false);
    }, 1000);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <button className={styles.scroll} onClick={backToTop}>
        ⬆
      </button>
      <main className={styles.main}>
        <PostingBlock user={user} />
        <InfiniteScroll
          dataLength={jokes.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<h2>loading...</h2>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {jokes.map(
            (
              i,
              index //the i is useful
            ) => (
              <Joke
                key={index}
                joke={jokes[index]}
                blobPattern={blobs[Math.floor(Math.random() * blobs.length)]}
              />
            )
          )}
        </InfiniteScroll>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  //these codes run on server
  let randomJokes = [
    await getRandomJoke(),
    await getRandomJoke(),
    await getRandomJoke(),
  ];
  return {
    props: { initialJokes: JSON.stringify(randomJokes) },
  };
}

import styles from "../styles/Home.module.css";
import Joke from "../components/Joke";
import PostingBlock from "../components/PostingBlock";
import blob from "../assets/blob.svg";
import blob1 from "../assets/blob1.svg";
import blob2 from "../assets/blob2.svg";
import blob3 from "../assets/blob3.svg";
import blob4 from "../assets/blob4.svg";
import { MdArrowUpward } from "react-icons/md";
import { getRandomJoke, getJokesChrono } from "../firebase/client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home({ user }) {
  const blobs = [blob, blob1, blob2, blob3, blob4];
  const [jokes, setJokes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    async function initialLoad() {
      document.body.style.overflow = "hidden";
      const newJokes = [
        await getRandomJoke(),
        await getRandomJoke(),
        await getRandomJoke(),
      ];
      setJokes(
        (prevJokes) => [...prevJokes, ...newJokes],
        (document.body.style.overflow = "visible")
      );
      if (newJokes.length == 0) setHasMore(false);
    }
    initialLoad();
  }, []);
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
        <MdArrowUpward />
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
                user={user}
                displayMode="main"
                key={index}
                joke={jokes[index]}
                blobPattern={blobs[index % blobs.length]}
              />
            )
          )}
        </InfiniteScroll>
      </main>
    </div>
  );
}

// export async function getStaticProps() {
//   //these codes run on server
//   let randomJokes = [
//     await getRandomJoke(),
//     await getRandomJoke(),
//     await getRandomJoke(),
//   ];
//   return {
//     props: { initialJokes: JSON.stringify(randomJokes) },
//     revalidate: 60,
//   };
// }

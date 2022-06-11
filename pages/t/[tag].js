import styles from "../../styles/Home.module.css";
import Joke from "../../components/Joke";
import blob from "../../assets/blob.svg";
import blob1 from "../../assets/blob1.svg";
import blob2 from "../../assets/blob2.svg";
import blob3 from "../../assets/blob3.svg";
import blob4 from "../../assets/blob4.svg";
import { getJokesTag } from "../../firebase/client";
import { MdArrowUpward } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import InfiniteScroll from "react-infinite-scroll-component";
import NoMore from "../../components/NoMore";

export default function Tagged({ tag, user }) {
  const router = useRouter();
  const blobs = [blob, blob1, blob2, blob3, blob4];
  const [jokes, setJokes] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function initialLoad() {
      document.body.style.overflow = "hidden";
      const newJokes = await getJokesTag(tag);
      setJokes(
        (prevJokes) => [...prevJokes, ...newJokes],
        (document.body.style.overflow = "visible")
      );
      if (newJokes.length == 0) setHasMore(false);
    }
    initialLoad();
  }, []);
  const loadMore = async () =>
    setTimeout(async () => {
      console.log("loading");
      const newJokes = await getJokesTag(tag);
      setJokes((prevJokes) => [...prevJokes, ...newJokes]);
      if (newJokes.length == 0) setHasMore(false);
    }, 500);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <button
        className={styles.scroll}
        onClick={backToTop}
        aria-label="back to top button"
      >
        <MdArrowUpward />
      </button>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => router.back()}>
          <BiArrowBack />
        </button>
        <h1>{tag}</h1>
      </div>
      {/* <button onClick={loadMore}>Load</button>
       {jokes.map((j) => (
        <Joke
          user={user}
          displayMode="main"
          key={jokes.indexOf(j)}
          joke={j}
          blobPattern={blobs[0]}
        />
      ))}  */}
      <main className={styles.main}>
        <InfiniteScroll
          dataLength={jokes.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<h2>loading...</h2>}
          endMessage={<NoMore />}
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

export async function getServerSideProps({ query }) {
  const tag = query.tag;
  return { props: { tag } };
}

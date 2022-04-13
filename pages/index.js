import styles from "../styles/Home.module.css";
import Joke from "../components/Joke";
export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Joke />
        <Joke />
        <Joke />
      </main>
    </div>
  );
}

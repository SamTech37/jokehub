import styles from "../styles/Home.module.css";
import Joke from "../components/Joke";
import blob from "../assets/blob.svg";
import blob1 from "../assets/blob1.svg";
import blob2 from "../assets/blob2.svg";
import blob3 from "../assets/blob3.svg";
import blob4 from "../assets/blob4.svg";

export default function Home() {
  const jokes = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac semper eros, vel ultricies augue. Duis ultricies at dolor id commodo. Aliquam scelerisque, orci id malesuada ultricies, enim urna bibendum dolor, eget cursus sem enim vitae odio. Praesent at elit ex. Sed posuere, lectus mollis eleifend elementum, urna erat luctus orci, eu auctor erat libero nec metus. Ut facilisis purus in efficitur mollis. Donec eget pulvinar purus.",
    ":欸地震時有杯牛奶被震倒了，你知道為什麼嗎？:我知道，因為乳糖不耐震:白癡因為地震很大",
    "有一天張雨生去森林裡,出來的時候帶著一個木頭,有人問他木頭怎麼來的,他說與生俱來的",
  ];
  const blobs = [blob, blob1, blob2, blob3, blob4];
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {jokes.map((j) => {
          return (
            <Joke
              joke={j}
              key={jokes.indexOf(j)}
              blobPattern={blobs[Math.floor(Math.random() * blobs.length)]}
            />
          );
        })}
      </main>
    </div>
  );
}

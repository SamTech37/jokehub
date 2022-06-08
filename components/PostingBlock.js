import React, { useState } from "react";
import styles from "../styles/Joke.module.css";
import { postJoke } from "../firebase/client";
import { useRouter } from "next/router";

export default function PostingBlock({ user }) {
  let router = useRouter();
  const [newContent, setNewContent] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("請先登入!");
      return;
    }
    if (!newContent || !newKeyword) {
      alert("Please tell a joke");
      return;
    }
    const processedTag = newKeyword
      .toLowerCase()
      .replaceAll(" ", "")
      .replaceAll("#", "");
    const jokeId = await postJoke(newContent, processedTag, user.uid);
    router.push(`/p/${jokeId}`, `/p/${jokeId}`, {});
    setNewContent("");
    setNewKeyword("");
  };
  return (
    <div className={styles.postingblock}>
      <form className={styles.post}>
        <textarea
          className={styles.input}
          placeholder="說個笑話"
          maxLength={1500}
          onChange={(e) => setNewContent(e.target.value)}
          value={newContent}
          required
        />

        <input
          type="text"
          className={styles.input}
          placeholder="風格,類型,關鍵字之類的"
          maxLength={15}
          onChange={(e) => setNewKeyword(e.target.value)}
          value={newKeyword}
          required
        />
        <button className={styles.tell} disabled={!user} onClick={handleSubmit}>
          {user ? "Tell" : "請先登入"}
        </button>
      </form>
    </div>
  );
}

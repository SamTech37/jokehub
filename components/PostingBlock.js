import React, { useState } from "react";
import styles from "../styles/Joke.module.css";
import { postJoke } from "../firebase/client";
import { useRouter } from "next/router";
import { AiFillCaretDown } from "react-icons/ai";
import { useCombobox } from "downshift";
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
    fetch("/api/autotweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: newKeyword,
        id: jokeId,
        contentSliced: newContent.slice(0, 30),
      }),
    });
    router.push(`/p/${jokeId}`, `/p/${jokeId}`, {});
    setNewContent("");
    setNewKeyword("");
  };

  const categories = [
    "諧音",
    "政治",
    "老媽",
    "地獄",
    "爛笑話",
    "黑色幽默",
    "雙關",
    "反串",
  ];
  const [inputItems, setInputItems] = useState(categories);
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(categories.filter((item) => item.includes(inputValue)));
      setNewKeyword(inputValue);
    },
  });

  return (
    <div className={styles.postingblock}>
      <form className={styles.post}>
        <textarea
          className={styles.textarea}
          placeholder="說個笑話"
          maxLength={1500}
          onChange={(e) => setNewContent(e.target.value)}
          value={newContent}
          required
        />

        <div className={styles.combobox}>
          <div {...getComboboxProps()} className={styles.flex}>
            <input
              type="text"
              className={styles.input}
              placeholder="風格,類型,關鍵字之類的"
              maxLength={15}
              {...getInputProps()}
              required
            />
            <button
              type="button"
              {...getToggleButtonProps()}
              aria-label="toggle menu"
              className={styles.suggestBtn}
            >
              <AiFillCaretDown />
            </button>
          </div>
          <ul
            {...getMenuProps()}
            className={isOpen ? styles.suggestions : styles.hide}
          >
            {isOpen &&
              inputItems.map((item, index) => (
                <li
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: "#bde4ff" }
                      : {}
                  }
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
        <button className={styles.tell} disabled={!user} onClick={handleSubmit}>
          {user ? "Tell" : "請先登入"}
        </button>
      </form>
    </div>
  );
}

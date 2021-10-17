import React from "react";
import Post from "./Post";

export default function List() {
  const initialData = [
    {
      title: "What do you call a magic owl?",
      content: "Hoodini!",
      rate: 10,
      poster: "someone",
      id: "0",
    },
    {
      title: "What's the heaviest stuff in my pants?",
      content: "Your mom",
      rate: 7,
      poster: "scankhunt69",
      id: "1",
    },
  ];
  return (
    <div>
      {initialData.map((joke) => {
        return <Post joke={joke}></Post>;
      })}
    </div>
  );
}

import React from "react";
import Post from "./Post";

export default function List() {
  const initialData = [
    {
      title: "What do you call a magic owl?",
      content: "Hoodini!",
      id: "0",
    },
    {
      title: "What's the heaviest stuff in my pants?",
      content: "Your mom",
      id: "1",
    },
  ];
  return (
    <div>
      {initialData.map((joke) => {
        return (
          <>
            <h2>{joke.title}</h2>
            <h3>{joke.content}</h3>
          </>
        );
      })}
    </div>
  );
}

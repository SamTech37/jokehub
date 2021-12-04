import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";

export default function List({ posts }) {
  // fetch data here

  return (
    <div>
      {posts.map((post) => {
        return (
          <ListItem
            key={post.id}
            content={post.content}
            rates={post.rates}
            totRating={post.totalRating}
          />
        );
      })}
    </div>
  );
}

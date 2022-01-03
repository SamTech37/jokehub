import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import NoMatch from "./NoMatch";
import { useParams } from "react-router-dom";

export default function Post({
  user,
  currentPost,
  inPost,
  rateJoke,
  deleteJoke,
}) {
  //fetch the joke by its ID here
  let { postId } = useParams();
  useEffect(() => {
    async function fetchPost() {
      try {
        await inPost(postId);
      } catch (error) {
        alert("Loading faild, Please try again.");
      }
    }
    fetchPost();
  }, []);
  if (currentPost === "empty") return <NoMatch />;
  else if (currentPost) {
    return (
      <ListItem
        postId={currentPost.id}
        posterUid={currentPost.posterUid}
        content={currentPost.content}
        rates={currentPost.rates}
        totRating={currentPost.totalRating}
        ratedUsers={currentPost.ratedUsers}
        keyword={currentPost.keyword}
        user={user}
        rateJoke={rateJoke}
        deleteJoke={deleteJoke}
      />
    );
  } else {
    return <h1>Loading</h1>;
  }
}

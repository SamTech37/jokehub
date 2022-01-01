import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import NoMatch from "./NoMatch";
import { useParams } from "react-router-dom";

export default function Post({ inPost, rateJoke, user, signed, deleteJoke }) {
  //fetch the joke by its ID here
  let { postId } = useParams();
  const [joke, setJoke] = useState();
  useEffect(() => {
    async function fetchPost() {
      try {
        setJoke(await inPost(postId));
      } catch (error) {
        alert("Loading faild, Please try again.");
      }
    }
    fetchPost();
  }, []);
  if (joke === "empty") return <NoMatch />;
  else if (joke) {
    return (
      <ListItem
        postId={joke.id}
        posterUid={joke.posterUid}
        content={joke.content}
        rates={joke.rates}
        totRating={joke.totalRating}
        ratedUsers={joke.ratedUsers}
        user={user}
        signed={signed}
        rateJoke={rateJoke}
        deleteJoke={deleteJoke}
        isList={false} //don't show the read more in here
      ></ListItem>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

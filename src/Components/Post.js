import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import { useParams } from "react-router-dom";

export default function Post({ inPost, rateJoke, user, signed, deleteJoke }) {
  //fetch the joke by its ID here
  let { postId } = useParams();
  const [joke, setJoke] = useState();
  useEffect(async () => {
    try {
      setJoke(await inPost(postId));
    } catch (error) {
      console.log("e");
    }
  }, []);
  if (joke) {
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

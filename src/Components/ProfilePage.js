import React, { useContext } from "react";
import { UserContext } from "../App";
import styled from "styled-components";
export default function ProfilePage() {
  const user = useContext(UserContext);
  return (
    <div>
      <h1>Profiles!</h1>
      <h2>{user?.displayName}</h2>
    </div>
  );
}

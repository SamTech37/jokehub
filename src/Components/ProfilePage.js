import React from "react";
import styled from "styled-components";
export default function ProfilePage({ user }) {
  return (
    <div>
      <h1>Profiles!</h1>
      <h2>{user?.displayName}</h2>
      <section>
        <h1>Your Posts:</h1>
      </section>
    </div>
  );
}

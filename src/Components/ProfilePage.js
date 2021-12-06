import React from "react";
import styled from "styled-components";
export default function ProfilePage({ user, signed }) {
  return (
    <div>
      <h1>Profiles!</h1>
      {signed && <h2>{user.displayName}</h2>}
      <section>
        <h1>Your Posts:</h1>
      </section>
    </div>
  );
}

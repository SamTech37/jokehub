import React from "react";
import styled from "styled-components";
export default function ProfilePage({ user, signed }) {
  return (
    <div>
      <h1>Profiles!</h1>
      <div>
        <h2>{signed ? user.displayName : "Please Login First!"}</h2>
        <section>
          <h1>Your Posts:</h1>
        </section>
      </div>
    </div>
  );
}

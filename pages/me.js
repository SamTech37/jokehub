import React from "react";

export default function me({ user }) {
  return (
    <div>
      me
      <h1> {user?.displayName}</h1>
    </div>
  );
}

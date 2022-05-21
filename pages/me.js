import React from "react";

export default function me({ user }) {
  return (
    <div>
      <img
        src={`https://avatars.dicebear.com/api/croodles-neutral/${user?.uid}.svg`}
        alt="poster"
        width={100}
        height={100}
      />
      <h1> {user?.displayName}</h1>
    </div>
  );
}

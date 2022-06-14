import React from "react";
import PWAPrompt from "react-ios-pwa-prompt";

export default function Install() {
  return (
    <div>
      <PWAPrompt />
      <h1>安裝 JokeHub App</h1>
      <h2>IOS</h2>
      <h2>Android</h2>
      <button>安裝</button>
    </div>
  );
}

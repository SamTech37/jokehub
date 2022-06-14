import React, { useState, useEffect } from "react";

export default function Install() {
  const [event, setEvent] = useState();
  function storeEvent(e) {
    e.preventDefault();
    setEvent(e);
    console.log(`event was fired.`);
  }
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", storeEvent);

    return () => {
      window.removeEventListener("beforeinstallprompt", storeEvent);
      console.log(`event was cleaned.`);
    };
  }, [event]);
  return (
    <div>
      <h1>安裝 JokeHub App</h1>
      <h2>IOS</h2>
      <h2>Android</h2>
      <button onClick={() => console.log(event)}>安裝</button>
    </div>
  );
}

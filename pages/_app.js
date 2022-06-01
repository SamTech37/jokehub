import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useAuth } from "../firebase/client";
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  useAuth(setUser);

  return (
    <>
      <Navbar user={user}></Navbar>
      <Component {...pageProps} user={user} />
    </>
  );
}

export default MyApp;

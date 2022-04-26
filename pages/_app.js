import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { signInGooglePop, userSignOut } from "../firebase/client";
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const AuthBtn = (
    <div>
      <button
        onClick={() => {
          if (user) userSignOut(setUser);
          else signInGooglePop(setUser);
        }}
      >
        {user ? "SignOut" : "SignIn"}
      </button>
      <button onClick={() => console.log(user)}>Check</button>
    </div>
  );
  return (
    <>
      <Navbar AuthBtn={AuthBtn}></Navbar>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

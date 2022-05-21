import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import {
  signInGooglePop,
  signInFacebookPop,
  userSignOut,
  useAuth,
} from "../firebase/client";
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  useAuth(setUser);
  const AuthBtn = (
    <div>
      <button
        onClick={() => {
          if (user) userSignOut();
          else signInGooglePop();
        }}
      >
        {user ? "SignOut" : "Google"}
      </button>

      <button
        onClick={() => {
          if (user) userSignOut();
          else signInFacebookPop();
        }}
      >
        {user ? "SignOut" : "FB"}
      </button>
    </div>
  );
  return (
    <>
      <Navbar AuthBtn={AuthBtn}></Navbar>
      <Component {...pageProps} user={user} />
    </>
  );
}

export default MyApp;

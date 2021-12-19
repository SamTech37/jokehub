import react, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import List from "./Components/List";
import About from "./Components/About";
import Post from "./Components/Post";
import PostingPage from "./Components/PostingPage";
import styled from "styled-components";
//routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//DB
import { db, auth } from "./firebaseConfig";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  where,
  arrayUnion,
  increment,
} from "firebase/firestore";
//auth
import {
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

function App() {
  //DB
  const [posts, setPosts] = useState([]);
  const postsColletionRef = collection(db, "posts");
  const postJoke = async (newContent) => {
    //write data
    try {
      await addDoc(postsColletionRef, {
        content: newContent,
        time: serverTimestamp(),
        posterUid: user.uid,
        rates: Number(0),
        totalRating: Number(0),
        ratedUsers: [],
      });
    } catch (error) {
      alert("Post Failed, Please Try Again.");
    }
  };
  const rateJoke = async (id, userRate) => {
    const jokeDoc = doc(db, "posts", id);
    await updateDoc(jokeDoc, {
      ratedUsers: arrayUnion(user.uid),
      rates: increment(1),
      totalRating: increment(userRate),
    });
  };
  const getUsersPost = async (uid) => {
    const q = query(
      postsColletionRef,
      where("posterUid", "==", uid),
      orderBy("time", "desc")
    );
  };

  const editJoke = async (id, editContent) => {
    const jokeDoc = doc(db, "posts", id);
    const newFields = { content: editContent };
    await updateDoc(jokeDoc, newFields);
  };
  //read data onMount
  useEffect(() => {
    const getPosts = async () => {
      const q = query(postsColletionRef, orderBy("time", "desc"), limit(10));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };
    getPosts();
  }, []);

  //Auth
  const [user, setUser] = useState({});
  const [signed, setSigned] = useState(false);

  const userSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      alert("Login Failed, Please Try Again.");
    });
  };
  const mobileUserSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const userSignOut = () => {
    signOut(auth);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setSigned(user ? true : false);
  });

  return (
    <Router>
      <NavBar
        signIn={userSignIn}
        signOut={userSignOut}
        mobileUserSignIn={mobileUserSignIn}
        signed={signed}
      />
      <Body>
        <Routes>
          <Route
            path="/post"
            element={<PostingPage postJoke={postJoke} signed={signed} />}
          />

          <Route path="/about" element={<About />} />

          {/*<Route path="/:postId" element={<Post />} />*/}

          <Route
            index
            element={
              <List
                posts={posts}
                rateJoke={rateJoke}
                user={user}
                signed={signed}
              />
            }
          />
        </Routes>
      </Body>
    </Router>
  );
}

const Body = styled.div`
  height: 100%;
  background: #fff;
`;

export default App;

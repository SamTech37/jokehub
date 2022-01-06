import react, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import List from "./Components/List";
import About from "./Components/About";
import Post from "./Components/Post";
import PostingPage from "./Components/PostingPage";
import NoMatch from "./Components/NoMatch";
import Terms from "./Components/Terms";
import TermsZh from "./Components/TermsZh";
import styled from "styled-components";
//context
import { LangContext } from "./LangContext";
//routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//DB
import { db, auth } from "./firebaseConfig";
import {
  collection,
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
  startAfter,
  getDoc,
  deleteDoc,
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
  const [lastDoc, setLastDoc] = useState();
  const batchSize = 5;

  const [currentPost, setCurrentPost] = useState();
  const postsColletionRef = collection(db, "posts");
  const postJoke = async (newContent, newKeyword, newLanguage) => {
    //write data
    try {
      await addDoc(postsColletionRef, {
        content: newContent,
        keyword: newKeyword,
        language: newLanguage,
        time: serverTimestamp(),
        posterUid: user.uid,
        rates: Number(0),
        totalRating: Number(0),
        ratedUsers: [],
      });
    } catch (error) {
      alert("Something went wrong. Please try again!");
    }
  };
  const rateJoke = async (id, userRate) => {
    await updateDoc(doc(db, "posts", id), {
      ratedUsers: arrayUnion(user.uid),
      rates: increment(1),
      totalRating: increment(userRate),
    });
  };

  const deleteJoke = async (id) => {
    if (signed) {
      await deleteDoc(doc(db, "posts", id)).catch((error) =>
        alert("Something went wrong. Please try again!")
      );
    } else {
      alert("Illegal Modification!");
    }
  };
  const inPost = async (id) => {
    const jokeRef = doc(db, "posts", id);
    const docSnap = await getDoc(jokeRef);
    if (docSnap.exists()) {
      onSnapshot(jokeRef, (snapshot) => {
        setCurrentPost({ ...snapshot.data(), id: snapshot.id });
      });
    } else {
      setCurrentPost("empty");
    }
  };
  const getPosts = async (keyword) => {
    //keyword is lowercased and without blanks for sake of convenience
    if (keyword) {
      const q = query(
        postsColletionRef,
        where("keyword", "==", keyword), // where clause first
        orderBy("time", "desc"),
        limit(batchSize)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]); // last doc
      });
    } else {
      const q = query(
        postsColletionRef,
        orderBy("time", "desc"),
        limit(batchSize)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]); // last doc
      });
    }
  };
  const nextBatch = async (keyword) => {
    if (keyword) {
      const next = query(
        postsColletionRef,
        where("keyword", "==", keyword), // where clause first
        orderBy("time", "desc"),
        startAfter(lastDoc),
        limit(batchSize)
      );
      const unsubscribe = onSnapshot(next, (querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]); // last doc
      });
    } else {
      const next = query(
        postsColletionRef,
        orderBy("time", "desc"),
        startAfter(lastDoc),
        limit(batchSize)
      );
      const unsubscribe = onSnapshot(next, (querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]); // last doc
      });
    }
  };

  //Auth
  const [user, setUser] = useState();
  const [signed, setSigned] = useState(false);

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      alert("Something went wrong. Please try again!");
    });
  };
  const mobileSignInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const userSignOut = () => {
    signOut(auth);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setSigned(currentUser ? true : false);
    setUser(currentUser);
  });

  const [language, setLanguage] = useState("中文");

  return (
    <Router>
      <LangContext.Provider value={language}>
        <Container>
          <NavBar
            signInGoogle={signInGoogle}
            mobileSignInGoogle={mobileSignInGoogle}
            signOut={userSignOut}
            signed={signed}
            setLanguage={setLanguage}
          />

          <Routes>
            <Route
              index
              element={
                <List
                  posts={posts}
                  user={user}
                  batchSize={batchSize}
                  rateJoke={rateJoke}
                  deleteJoke={deleteJoke}
                  nextBatch={nextBatch}
                  getPosts={getPosts}
                />
              }
            />

            <Route
              path="/p/:postId"
              element={
                <Post
                  user={user}
                  currentPost={currentPost}
                  deleteJoke={deleteJoke}
                  inPost={inPost}
                  rateJoke={rateJoke}
                />
              }
            />
            <Route
              path="/post"
              element={<PostingPage postJoke={postJoke} signed={signed} />}
            />
            <Route
              path="/about/terms"
              element={language === "中文" ? <TermsZh /> : <Terms />}
            />
            <Route exact path="/about" element={<About />} />

            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Container>
      </LangContext.Provider>
    </Router>
  );
}

const Container = styled.div`
  height: 100vh;
  background: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;

export default App;

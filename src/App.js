import react, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import List from "./Components/List";
import About from "./Components/About";
import Post from "./Components/Post";
import PostingPage from "./Components/PostingPage";
import Terms from "./Terms";
import styled from "styled-components";
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
  const [sortBy, setSortBy] = useState("time"); //rates,totalRating
  const batchSize = 5;
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

  const deleteJoke = async (id) => {
    if (signed) {
      await deleteDoc(doc(db, "posts", id)).catch((error) =>
        alert("Error deleting, Please Try Again.")
      );
    } else {
      alert("Illegal Modification!");
    }
  };
  const inPost = async (id) => {
    const docRef = doc(db, "posts", id); //fetch only the post
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };
  const getPosts = async () => {
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
  };
  const nextBatch = async () => {
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
  };

  //read data onMount
  useEffect(() => {
    getPosts();
  }, []);

  //Auth
  const [user, setUser] = useState();
  const [signed, setSigned] = useState(false);

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      alert("Login Failed, Please Try Again.");
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
    setUser(currentUser);
    setSigned(user ? true : false);
  });

  return (
    <Router>
      <Container>
        <NavBar
          signInGoogle={signInGoogle}
          mobileSignInGoogle={mobileSignInGoogle}
          signOut={userSignOut}
          signed={signed}
        />

        <Routes>
          <Route
            index
            element={
              <List
                posts={posts}
                rateJoke={rateJoke}
                deleteJoke={deleteJoke}
                nextBatch={nextBatch}
                getPosts={getPosts}
                user={user}
                signed={signed}
                batchSize={batchSize}
              />
            }
          />
          <Route
            path="/post"
            element={<PostingPage postJoke={postJoke} signed={signed} />}
          />
          <Route path="/about/terms" element={<Terms />} />
          <Route exact path="/about" element={<About />} />

          <Route
            path="/p/:postId"
            element={
              <Post
                deleteJoke={deleteJoke}
                inPost={inPost}
                rateJoke={rateJoke}
                user={user}
                signed={signed}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  height: 100%;
  background: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;

export default App;

import react, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import List from "./Components/List";
import About from "./Components/About";
import Post from "./Components/Post";
import PostingPage from "./Components/PostingPage";
import ProfilePage from "./Components/ProfilePage";
//routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//DB
import { db, auth } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
//auth
import {
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
    await addDoc(postsColletionRef, {
      content: newContent,
      poster: "user",
      time: serverTimestamp(),
      rates: Number(0),
      totalRating: Number(0),
    });
  };
  const editJoke = async (id, editContent) => {
    const jokeDoc = doc(db, "posts", id);
    const newFields = { content: editContent };
    await updateDoc(jokeDoc, newFields);
  };
  //Auth
  const [user, setUser] = useState({});

  const [signed, setSigned] = useState(false);
  const provider = new GoogleAuthProvider();

  const userSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  const userSignOut = () => {
    signOut(auth).catch((error) => {
      console.log("error");
    });
  };
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setSigned(user ? true : false);
  });
  //onMount
  useEffect(() => {
    const getPosts = async () => {
      //read data
      const postsData = await getDocs(postsColletionRef);
      setPosts(postsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  return (
    <Router>
      <NavBar signIn={userSignIn} signOut={userSignOut} signed={signed} />
      <div>
        <Switch>
          <Route path="/profile">
            <ProfilePage user={user} />
          </Route>

          <Route path="/post">
            <PostingPage postJoke={postJoke} signed={signed} />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/:postId" children={<Post />} />

          <Route path="/">
            <List posts={posts} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;

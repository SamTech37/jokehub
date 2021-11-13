import react, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import List from "./Components/List";
import About from "./Components/About";
import Post from "./Components/Post";
import PostingPage from "./Components/PostingPage";
import LoginPage from "./Components/LoginPage";
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
} from "firebase/firestore";
//auth
import {
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

function App() {
  //DB
  const [posts, setPosts] = useState([]);
  const postsColletionRef = collection(db, "posts");
  const postJoke = async (newTitle, newContent) => {
    //write data
    await addDoc(postsColletionRef, {
      title: newTitle,
      content: newContent,
      author: user.displayName,
    });
  };
  const editJoke = async (id, editTitle, editContent) => {
    const jokeDoc = doc(db, "posts", id);
    const newFields = { title: editTitle, content: editContent };
    await updateDoc(jokeDoc, newFields);
  };
  //Auth
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  const userSignIn = async () => {
    await signInWithRedirect(auth, provider);
    await getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        setUser(result.user);
      })
      .catch((error) => {
        const errorCode = error.Code;
        console.log("error");
      });
  };

  const userSignOut = async () => {
    await signOut(auth);
  };
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  //main
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
      <NavBar />
      <div>
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/post">
            <PostingPage postJoke={postJoke} />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/login">
            <LoginPage signIn={userSignIn} signOut={userSignOut} user={user} />
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

function Profile() {
  return <h2>Profile</h2>;
}

export default App;

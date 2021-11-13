import react, { useEffect, useState, useContext } from "react";
import NavBar from "./Components/NavBar";
import List from "./Components/List";
import About from "./Components/About";
import Post from "./Components/Post";
import PostingPage from "./Components/PostingPage";
import ProfilePage from "./ProfilePage";
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
      author: "user",
    });
  };
  const editJoke = async (id, editTitle, editContent) => {
    const jokeDoc = doc(db, "posts", id);
    const newFields = { title: editTitle, content: editContent };
    await updateDoc(jokeDoc, newFields);
  };
  //Auth
  const [user, setUser] = useState({});
  const [signed, setSigned] = useState(false);
  const provider = new GoogleAuthProvider();

  const userSignIn = async () => {
    await signInWithRedirect(auth, provider);
  };

  const userSignOut = async () => {
    await signOut(auth);
  };
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setSigned(user ? true : false);
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
      <NavBar
        signIn={userSignIn}
        signOut={userSignOut}
        user={user}
        signed={signed}
      />
      <div>
        <Switch>
          <Route path="/profile">
            <ProfilePage user={user} />
          </Route>

          <Route path="/post">
            <PostingPage postJoke={postJoke} />
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

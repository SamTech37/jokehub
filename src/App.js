import react, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import List from "./Components/List";
import About from "./Components/About";
import Post from "./Components/Post";
import PostingPage from "./Components/PostingPage";
//routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//DB
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

function App() {
  const [posts, setPosts] = useState([]);
  const postsColletionRef = collection(db, "posts");

  const postJoke = async () => {};
  useEffect(() => {
    const getPosts = async () => {
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
            <PostingPage />
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

function Profile() {
  return <h2>Profile</h2>;
}

export default App;

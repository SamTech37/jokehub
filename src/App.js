import react, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import List from "./Components/List";
import About from "./Components/About";
import Post from "./Components/Post";
import PostingPage from "./Components/PostingPage";
//routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([
    {
      title: "緯來電",
      content: "緯來電影台",
      author: "Sam",
    },
  ]);
  /*async function fetchJokes() {
    const querySanpshot = await getDocs(collection(db, "posts"));
    querySanpshot.forEach((doc) => {
      jokes.push({
        title: doc.data().title,
        content: doc.data().content,
        author: doc.data().author,
      });
    });
  }*/
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

import NavBar from "./Components/NavBar";
import List from "./Components/List";
import About from "./Components/About";
import Post from "./Components/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
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
            <List />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Profile() {
  return <h2>Profile</h2>;
}

function PostingPage() {
  return <h2>you're posting something</h2>;
}

export default App;

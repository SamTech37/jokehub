import NavBar from "./Components/NavBar";
import List from "./Components/List";
import About from "./Components/About";
import Post from "./Components/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyC6pFwwbDsBp3k0JPE0vbGmzI0ehotdAcI",
    authDomain: "jokehub6969.firebaseapp.com",
    projectId: "jokehub6969",
    storageBucket: "jokehub6969.appspot.com",
    messagingSenderId: "494799104202",
    appId: "1:494799104202:web:7e5a266be800b7ef9c6c33",
    measurementId: "G-3S70Y68DB0",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

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

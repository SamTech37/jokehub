import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  query,
  where,
  limit,
  collection,
  documentId,
  orderBy,
  startAfter,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import {
  getAuth,
  signInWithPopup,
  signOut,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASSUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const postsRef = collection(db, "posts");
//database

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
let nextBatch = {};
export const getJokesChrono = async () => {
  const q = query(
    postsRef,
    limit(3),
    orderBy("time", "desc"),
    startAfter(nextBatch)
  );

  const newJokes = [];
  let snapshot = await getDocs(q);
  snapshot.forEach((doc) => newJokes.push({ ...doc.data(), id: doc.id }));

  if (snapshot.empty) nextBatch = "No More";
  else nextBatch = snapshot.docs[snapshot.docs.length - 1]; //set the startAfter
  return newJokes;
};

export const getRandomJoke = async () => {
  const key = makeid(20); //make a random id and query the closest docs
  const q = query(postsRef, limit(1), where(documentId(), ">=", key));
  const backupQ = query(postsRef, limit(1), where(documentId(), "<", key));

  let snapshot = await getDocs(q);
  if (snapshot.size == 0) snapshot = await getDocs(backupQ); //in case the first result is empty
  const newJoke = { ...snapshot.docs[0].data(), id: snapshot.docs[0].id };
  return newJoke;
};
export const getJoke = async (jokeId) => {
  const docRef = doc(db, "posts", jokeId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const joke = { ...docSnap.data(), id: docSnap.id };
    return joke;
  } else {
    return;
  }
};

export const postJoke = async (content, keyword, uid) => {
  const newDoc = await addDoc(postsRef, {
    content: content,
    keyword: keyword,
    language: "中文",
    time: serverTimestamp(),
    posterUid: uid,
    rates: Number(0),
    totalRating: Number(0),
    ratedUsers: [],
  });
  return newDoc.id;
};

//auth
export const signInGooglePop = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
};

export const signInFacebookPop = () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
};

export const signInGoogleRedirect = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
};

export const signInFacebookRedirect = () => {
  const provider = new FacebookAuthProvider();
  signInWithRedirect(auth, provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
};

export const userSignOut = () => {
  signOut(auth);
};
export const useAuth = (setUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
};

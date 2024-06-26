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
  updateDoc,
  increment,
  arrayUnion,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import {
  getAuth,
  signInWithPopup,
  signOut,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  deleteUser,
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
const usersRef = collection(db, "users");
//profile&users
export const updateProfile = async (uid, newName, newBio) => {
  await setDoc(
    doc(db, "users", uid),
    { nickname: newName, bio: newBio },
    { merge: true }
  );
};
export const getProfile = async (uid) => {
  const q = query(usersRef, limit(1), where(documentId(), "==", uid));
  let snapshot = await getDocs(q);

  if (snapshot.docs.length == 0) {
    return "none";
  } else {
    return { ...snapshot.docs[0].data() }; //nickname,bio,link?
  }
};
//jokes
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export const getRandomJoke = async () => {
  const key = makeid(20); //make a random id and query the closest docs
  const q = query(postsRef, limit(1), where(documentId(), ">=", key));
  const backupQ = query(postsRef, limit(1), where(documentId(), "<", key));

  let snapshot = await getDocs(q);
  if (snapshot.size == 0) snapshot = await getDocs(backupQ); //in case the first result is empty
  const newJoke = { ...snapshot.docs[0].data(), id: snapshot.docs[0].id };
  return newJoke;
};

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
let nextBatchTag = {};
export const getJokesTag = async (tag) => {
  const q = query(
    postsRef,
    limit(3),
    where("keyword", "==", tag),
    orderBy("time", "desc"),
    startAfter(nextBatchTag)
  );
  const newJokes = [];
  let snapshot = await getDocs(q);
  snapshot.forEach((doc) => newJokes.push({ ...doc.data(), id: doc.id }));

  if (snapshot.empty) nextBatchTag = "No More";
  else nextBatchTag = snapshot.docs[snapshot.docs.length - 1]; //set the startAfter
  return newJokes;
};

export const getJoke = async (jokeId) => {
  const docRef = doc(db, "posts", jokeId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const joke = { ...docSnap.data(), id: docSnap.id };
    return joke;
  } else {
    return "none";
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

export const rateJoke = async (pid, uid, userRate) => {
  if (userRate >= 0 && userRate <= 10) {
    await updateDoc(doc(db, "posts", pid), {
      ratedUsers: arrayUnion(uid),
      rates: increment(1),
      totalRating: increment(userRate),
    });
  }
};

export const getSitemapPaths = async () => {
  const q = query(
    postsRef,
    limit(100),
    orderBy("time", "desc"),
    startAfter(nextBatch)
  );

  const paths = [];
  let snapshot = await getDocs(q);
  snapshot.forEach((doc) => paths.push(doc.id));

  return paths;
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

//FB login is disabled due to the outdated token
// export const signInFacebookPop = () => {
//   const provider = new FacebookAuthProvider();
//   signInWithPopup(auth, provider).catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorCode, errorMessage);
//   });
// };

//sign in with redirect is deprecated after June 24, 2024
//please use signInWithPopup instead
//or configure the OAuth redirect domain in the Firebase console
/*
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
*/

export const deleteProfile = async (uid) => {
  deleteDoc(doc(db, "users", uid));
  deleteUser(auth.currentUser).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
  return;
};
export const userSignOut = () => {
  signOut(auth);
};
export const useAuth = (setUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
};

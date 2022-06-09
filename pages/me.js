import React from "react";
import styles from "../styles/Me.module.css";
import Login from "../components/Login";
import MyProfile from "../components/MyProfile";
export default function Me({ user }) {
  return (
    <div className={styles.body}>
      {user ? <MyProfile user={user} /> : <Login />}
    </div>
  );
}

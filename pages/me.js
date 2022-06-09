import React, { useState, useEffect } from "react";
import styles from "../styles/Me.module.css";
import Login from "../components/Login";
import Profile from "../components/Profile";
export default function Me({ user }) {
  return (
    <div className={styles.body}>
      {user ? <Profile user={user} /> : <Login />}
    </div>
  );
}

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import icon from "../assets/icon.svg";
import styles from "../styles/Navbar.module.css";
export default function Navbar({ user }) {
  return (
    <div className={styles.body}>
      <Link href="/" shallow={true}>
        <a>
          <Image src={icon} height={80} alt="Icon of this website, JokeHub." />
        </a>
      </Link>
      <DropdownMenu user={user} />
    </div>
  );
}

function DropdownMenu({ user }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.menuBtn}>
      <a onClick={() => setOpen(!open)}>😅</a>
      {open && (
        <div className={styles.menu}>
          <Link href="/">
            <a>首頁</a>
          </Link>
          <Link href="/me">
            <a>{user ? "個人" : "登入"}</a>
          </Link>
          <Link href="/about">
            <a>關於</a>
          </Link>
          <a>安裝</a>
        </div>
      )}
    </div>
  );
}

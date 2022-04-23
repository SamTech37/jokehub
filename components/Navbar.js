import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import icon from "../assets/icon.svg";
export default function Navbar() {
  return (
    <div className={styles.body}>
      <Link href="/">
        <a>
          <Image src={icon} height={80} />
        </a>
      </Link>
      <DropdownMenu />
    </div>
  );
}

function DropdownMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.menuBtn}>
      <a onClick={() => setOpen(!open)}>😅</a>
      {open && (
        <div className={styles.menu}>
          <Link href="/">
            <a>首頁</a>
          </Link>
          <Link href="/about">
            <a>關於</a>
          </Link>
          <Link href="/me">
            <a>帳戶</a>
          </Link>
          <a>安裝</a>
        </div>
      )}
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import icon from "../assets/icon.svg";
import styles from "../styles/Navbar.module.css";
import { BiMenuAltRight } from "react-icons/bi";
export default function Navbar({ user }) {
  return (
    <div className={styles.body}>
      <Link href="/" shallow={true}>
        <a>
          <Image
            src={icon}
            height={80}
            width={320}
            alt="Icon of this website, JokeHub."
          />
        </a>
      </Link>
      <DropdownMenu user={user} />
    </div>
  );
}

function DropdownMenu({ user }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    //close if clicked outside
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    //subcribe
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      //unsubscribe
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div
      className={styles.menuBtn}
      ref={wrapperRef} //clicks outside this div will close the menu
    >
      <BiMenuAltRight
        color="white"
        size={32}
        onClick={(e) => {
          setOpen(!open);
        }}
      />

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
          {/* hide in standalone mode */}
          <Link href="/install">
            <a>安裝</a>
          </Link>
        </div>
      )}
    </div>
  );
}

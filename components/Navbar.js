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
        <Image
          priority
          src={icon}
          height={80}
          width={320}
          alt="Icon of this website, JokeHub."
        />
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
          <Link href="/">首頁</Link>
          <Link href="/me">{user ? "個人" : "登入"}</Link>
          <Link href="/about">關於</Link>
          {
            /* hide in standalone mode */
            !window.matchMedia("(display-mode: standalone)").matches && (
              <Link href="/install">安裝</Link>
            )
          }
        </div>
      )}
    </div>
  );
}

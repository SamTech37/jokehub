import React from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import icon from "../assets/icon.svg";
export default function Navbar() {
  return (
    <div className={styles.body}>
      <Link href="/">
        <a>
          <Image src={icon} height={100} />
        </a>
      </Link>
    </div>
  );
}

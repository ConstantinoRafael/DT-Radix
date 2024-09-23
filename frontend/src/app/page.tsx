import React from "react";
import Link from "next/link";
import styles from "./style.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Choose the functionality</h1>
      <div className={styles.buttonContainer}>
        <Link href="/dashboard" className={styles.button}>
          Dashboard
        </Link>
        <Link href="/upload-csv" className={styles.button}>
          Upload CSV
        </Link>
      </div>
    </div>
  );
};

export default Home;

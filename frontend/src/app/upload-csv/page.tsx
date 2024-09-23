"use client";

import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.css"; // Supondo que você tenha um arquivo de estilo
import Link from "next/link";

const Dashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:5000/api/sensors/upload-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(`File uploaded successfully`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `Error uploading file: ${
            error.response ? error.response.data.error : error.message
          }`
        );
      } else {
        setMessage(`An unexpected error occurred: ${error}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Link href="/" className={styles.button}>
          Home
        </Link>
        <Link href="/dashboard" className={styles.button}>
          Dashboard
        </Link>
      </div>
      <h1>Upload CSV</h1>
      <div className={styles.uploadSection}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload} className={styles.button}>
          Upload
        </button>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Dashboard;

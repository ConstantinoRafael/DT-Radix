"use client";

import React, { useState } from "react";
import axios from "axios";

const UploadCSV: React.FC = () => {
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
    <div>
      <h1>Upload CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadCSV;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SensorAveragesTable from "../components/SensorAverageTable";
import SensorAveragesBarChart from "../components/SensorAveragesBarChart";
import styles from "./style.module.css";
import Link from "next/link";

interface SensorAverage {
  equipmentId: string;
  averageValue: number;
}

type Period = "24h" | "48h" | "1w" | "1m";

const SensorDashboard: React.FC = () => {
  const [averages, setAverages] = useState<SensorAverage[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("24h");

  useEffect(() => {
    const fetchSensorAverages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sensors/sensor-averages?period=${selectedPeriod}`
        );
        setAverages(response.data);
      } catch (error) {
        console.error("Error fetching sensor averages:", error);
      }
    };

    fetchSensorAverages();
  }, [selectedPeriod]);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value as Period);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Link href="/" className={styles.button}>
          Home
        </Link>
        <Link href="/upload-csv" className={styles.button}>
          Upload CSV
        </Link>
      </div>
      <h1>Sensor Dashboard</h1>

      <div className={styles.selectContainer}>
        <label htmlFor="period">Select Period: </label>
        <select
          id="period"
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className={styles.select}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="48h">Last 48 Hours</option>
          <option value="1w">Last 1 Week</option>
          <option value="1m">Last 1 Month</option>
        </select>
      </div>

      <SensorAveragesTable averages={averages} />
      <SensorAveragesBarChart averages={averages} />
    </div>
  );
};

export default SensorDashboard;

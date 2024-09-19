"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SensorAveragesTable from "../components/SensorAverageTable";
import SensorAveragesBarChart from "../components/SensorAveragesBarChart";

// Interface para os dados de média dos sensores
interface SensorAverage {
  equipmentId: string;
  averageValue: number;
}

// Interface para os períodos disponíveis
type Period = "24h" | "48h" | "1w" | "1m";

const SensorDashboard: React.FC = () => {
  const [averages, setAverages] = useState<SensorAverage[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("24h"); // Estado para o período selecionado

  // Função para buscar os dados de médias da API com base no período selecionado
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
  }, [selectedPeriod]); // Chama a API sempre que o período selecionado mudar

  // Função para alterar o período selecionado
  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value as Period);
  };

  return (
    <div>
      <h1>Sensor Dashboard</h1>

      {/* Select para o usuário escolher o período */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="period">Select Period: </label>
        <select
          id="period"
          value={selectedPeriod}
          onChange={handlePeriodChange}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="48h">Last 48 Hours</option>
          <option value="1w">Last 1 Week</option>
          <option value="1m">Last 1 Month</option>
        </select>
      </div>

      {/* Renderizar a tabela de médias */}
      <SensorAveragesTable averages={averages} />

      {/* Renderizar o gráfico de barras */}
      <SensorAveragesBarChart averages={averages} />
    </div>
  );
};

export default SensorDashboard;

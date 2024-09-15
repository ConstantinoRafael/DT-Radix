"use client";
import React, { useEffect, useState } from "react";
import api from "@/services/api";

interface SensorAverage {
  equipmentId: string;
  averageValue: number;
}

const SensorAverageTable: React.FC = () => {
  const [period, setPeriod] = useState("24h");
  const [averages, setAverages] = useState<SensorAverage[]>([]);

  useEffect(() => {
    api
      .get(`http://localhost:5000/api/sensors/sensor-averages?period=${period}`)
      .then((res) => {
        setAverages(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [period]);

  return (
    <div>
      <h2>Médias dos Sensores</h2>
      <select onChange={(e) => setPeriod(e.target.value)} value={period}>
        <option value="24h">Últimas 24 horas</option>
        <option value="48h">Últimas 48 horas</option>
        <option value="1w">Última Semana</option>
        <option value="1m">Último Mês</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Média</th>
          </tr>
        </thead>
        <tbody>
          {averages.map((avg) => (
            <tr key={avg.equipmentId}>
              <td>{avg.equipmentId}</td>
              <td>{avg.averageValue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorAverageTable;

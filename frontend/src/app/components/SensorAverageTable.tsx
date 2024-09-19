import React from "react";

interface SensorAverage {
  equipmentId: string;
  averageValue: number;
}

interface SensorAveragesTableProps {
  averages: SensorAverage[];
}

const SensorAveragesTable: React.FC<SensorAveragesTableProps> = ({
  averages,
}) => {
  return (
    <div>
      <h2>Sensor Averages</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Average Value</th>
          </tr>
        </thead>
        <tbody>
          {averages.map((average, index) => (
            <tr key={index}>
              <td>{average.equipmentId}</td>
              <td>{average.averageValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorAveragesTable;

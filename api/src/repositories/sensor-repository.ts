import SensorReading, { ISensorReading } from "../models/sensor-reading-model";

export class SensorRepository {
  async saveSensorData(
    equipmentId: string,
    timestamp: Date,
    value: number
  ): Promise<ISensorReading> {
    const sensorData = new SensorReading({ equipmentId, timestamp, value });
    return await sensorData.save();
  }
}

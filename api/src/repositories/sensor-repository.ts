import SensorReading, {
  ISensorReading,
  SensorAverage,
} from "../models/sensor-reading-model";

export class SensorRepository {
  async saveSensorData(
    equipmentId: string,
    timestamp: Date,
    value: number
  ): Promise<ISensorReading> {
    const sensorData = new SensorReading({ equipmentId, timestamp, value });
    return await sensorData.save();
  }

  async getAverageSensorReadings(startDate: Date): Promise<SensorAverage[]> {
    return await SensorReading.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: "$equipmentId",
          averageValue: { $avg: "$value" },
        },
      },
      {
        $project: {
          equipmentId: "$_id",
          _id: 0,
          averageValue: 1,
        },
      },
    ]);
  }
}

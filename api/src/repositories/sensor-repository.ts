import SensorReading, {
  CreateSensorData,
  ISensorReading,
  ResultCreateSensorData,
  SensorAverage,
} from "../models/sensor-reading-model";

export class SensorRepository {
  async saveSensorReading(
    sensorData: CreateSensorData
  ): Promise<ResultCreateSensorData> {
    const sensorReading = new SensorReading(sensorData);
    return await sensorReading.save();
  }

  async saveMultipleSensorReadings(
    sensorDataArray: ISensorReading[]
  ): Promise<CreateSensorData[]> {
    return await SensorReading.insertMany(sensorDataArray);
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

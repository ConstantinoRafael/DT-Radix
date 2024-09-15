import moment from "moment";
import { SensorRepository } from "../repositories/sensor-repository";
import {
  CreateSensorData,
  ResultCreateSensorData,
  SensorAverage,
} from "../models/sensor-reading-model";
import csv from "csvtojson";

export class SensorService {
  private sensorRepository: SensorRepository;

  constructor(sensorRepository: SensorRepository) {
    this.sensorRepository = sensorRepository;
  }

  async saveSensorReading(
    sensorData: CreateSensorData
  ): Promise<ResultCreateSensorData> {
    return await this.sensorRepository.saveSensorReading(sensorData);
  }

  async saveSensorReadingsFromCSV(
    csvData: Buffer
  ): Promise<ResultCreateSensorData[]> {
    const jsonArray = await csv().fromString(csvData.toString());

    const sensorDataArray: CreateSensorData[] = jsonArray.map(
      (row: CreateSensorData) => ({
        equipmentId: row.equipmentId,
        timestamp: new Date(row.timestamp),
        value: row.value,
      })
    );

    console.log(sensorDataArray);
    return await this.sensorRepository.saveMultipleSensorReadings(
      sensorDataArray
    );
  }

  private getStartDate(period: string): Date {
    switch (period) {
      case "24h":
        return moment().subtract(24, "hours").toDate();
      case "48h":
        return moment().subtract(48, "hours").toDate();
      case "1w":
        return moment().subtract(1, "week").toDate();
      case "1m":
        return moment().subtract(1, "month").toDate();
      default:
        throw new Error('Invalid period. Use "24h", "48h", "1w" or "1m".');
    }
  }

  async getSensorAverages(period: string): Promise<SensorAverage[]> {
    const startDate = this.getStartDate(period);
    return await this.sensorRepository.getAverageSensorReadings(startDate);
  }
}

import { SensorRepository } from "../repositories/sensor-repository";

export class SensorService {
  private sensorRepository: SensorRepository;

  constructor(sensorRepository: SensorRepository) {
    this.sensorRepository = sensorRepository;
  }

  async saveSensorData(
    equipmentId: string,
    timestamp: Date,
    value: number
  ): Promise<void> {
    await this.sensorRepository.saveSensorData(equipmentId, timestamp, value);
  }
}

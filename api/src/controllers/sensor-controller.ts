import { Request, Response } from "express";
import { SensorService } from "../services/sensor-service";

export class SensorController {
  private sensorService: SensorService;

  constructor(sensorService: SensorService) {
    this.sensorService = sensorService;
  }

  public async postSensorData(req: Request, res: Response): Promise<Response> {
    try {
      const { equipmentId, timestamp, value } = req.body;

      if (!equipmentId || !timestamp || !value) {
        return res
          .status(400)
          .json({ error: "Missing parameters in the request body" });
      }

      await this.sensorService.saveSensorData(
        equipmentId,
        new Date(timestamp),
        value
      );

      return res
        .status(201)
        .json({ message: "Sensor data saved successfully" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

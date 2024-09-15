import { Request, Response } from "express";
import { SensorService } from "../services/sensor-service";
import { ResultCreateSensorData } from "../models/sensor-reading-model";

export class SensorController {
  private sensorService: SensorService;

  constructor(sensorService: SensorService) {
    this.sensorService = sensorService;
  }

  public async saveSensorReading(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const sensorData = req.body;

      if (
        !sensorData.equipmentId ||
        !sensorData.timestamp ||
        !sensorData.value
      ) {
        return res
          .status(400)
          .json({ error: "Missing parameters in the request body" });
      }

      const result: ResultCreateSensorData =
        await this.sensorService.saveSensorReading(sensorData);

      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  public async getSensorAverages(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { period } = req.query;

      if (!period) {
        return res
          .status(400)
          .json({ error: '"period" parameter is required' });
      }

      const averages = await this.sensorService.getSensorAverages(
        period as string
      );

      return res.status(200).json(averages);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

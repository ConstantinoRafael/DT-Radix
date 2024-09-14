import { Router } from "express";
import { SensorRepository } from "../repositories/sensor-repository";
import { SensorService } from "../services/sensor-service";
import { SensorController } from "../controllers/sensor-controller";

const router = Router();

const sensorRepository = new SensorRepository();
const sensorService = new SensorService(sensorRepository);
const sensorController = new SensorController(sensorService);

router.post("/sensor-data", (req, res) =>
  sensorController.postSensorData(req, res)
);

export default router;

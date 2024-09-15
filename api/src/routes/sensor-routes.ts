import { Router } from "express";
import { SensorRepository } from "../repositories/sensor-repository";
import { SensorService } from "../services/sensor-service";
import { SensorController } from "../controllers/sensor-controller";
import multer from "multer";
const router = Router();

const sensorRepository = new SensorRepository();
const sensorService = new SensorService(sensorRepository);
const sensorController = new SensorController(sensorService);

const upload = multer();

router.post("/sensor-data", (req, res) =>
  sensorController.saveSensorReading(req, res)
);

router.post("/upload-csv", upload.single("file"), (req, res) =>
  sensorController.uploadCSV(req, res)
);

router.get("/sensor-averages", (req, res) =>
  sensorController.getSensorAverages(req, res)
);

export default router;

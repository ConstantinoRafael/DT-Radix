import express from "express";
import { config } from "dotenv";
import { connectDb } from "./config/database";
import SensorRoutes from "./routes/sensor-routes";
import AuthRoutes from "./routes/auth-routes";
import cors from "cors";

config();
const app = express();

app.use(express.json());
app.use(cors());
connectDb();

app.use("/api/sensors", SensorRoutes);
app.use("/", AuthRoutes);

app.get("/", (req, res) => {
  res.send("Sensors API is running!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));

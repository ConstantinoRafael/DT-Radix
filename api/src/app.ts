import express from "express";
import { config } from "dotenv";
import { connectDb } from "./config/database";
import SensorRoutes from "./routes/sensor-routes";

config();
const app = express();

app.use(express.json());

connectDb();

app.use("/api/sensors", SensorRoutes);

app.get("/", (req, res) => {
  res.send("Sensors API is running!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));

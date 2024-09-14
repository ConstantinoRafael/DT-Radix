import express from "express";
import { config } from "dotenv";

config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("helooow");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));

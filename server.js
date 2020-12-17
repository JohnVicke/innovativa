import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import { get } from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import popularTimesRoutes from "./routes/PopularTimesRoutes";

config();

const app = express();

/**
 * DARESAY API:
 * https://daresay-dev.eu-gb.cf.appdomain.cloud/innovativa/SENSOR/FROM/TO/NO/KEY
 */
const sensor = "A81758FFFE03BC34";

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("Connected to database 🚀")
);

//  https://daresay-dev.eu-gb.cf.appdomain.cloud/innovativa/A81758FFFE03BC34/2020-11-01/2020-11-10/1/139kTnm10ksR

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

app.use("/api/populartimes/", popularTimesRoutes);

app.get("/test", async (_, res) => {
  try {
    const r = await get(
      `https://daresay-dev.eu-gb.cf.appdomain.cloud/innovativa/${sensor}/2020-11-18/2020-11-23/10/${process.env.DARESAY_API_KEY}`
    );
    return res.json({ result: r.data });
  } catch (e) {
    return res.json({ error: e });
  }
});

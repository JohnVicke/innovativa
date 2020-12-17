import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import { get } from "axios";
import cors from "cors";
import Parser from "./utils/parser";
import fs from "fs";

config();

const app = express();

/**
 * DARESAY API:
 * https://daresay-dev.eu-gb.cf.appdomain.cloud/innovativa/SENSOR/FROM/TO/NO/KEY
 */
const sensor = "A81758FFFE03BC34";

app.use(cors());
app.use(morgan("dev"));

//  https://daresay-dev.eu-gb.cf.appdomain.cloud/innovativa/A81758FFFE03BC34/2020-11-01/2020-11-10/1/139kTnm10ksR

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

const parser = new Parser();
parser.parseFile(`${__dirname}/placeringar_sensorer.xlsx`);

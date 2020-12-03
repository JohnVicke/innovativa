const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");

dotenv.config();

const app = express();

/**
 * DARESAY API:
 * https://daresay-dev.eu-gb.cf.appdomain.cloud/innovativa/SENSOR/FROM/TO/NO/KEY
 */

const testLoraSensor = "A81758FFFE03BC34";

app.use(cors());
app.use(morgan("dev"));

app.get("/test", async (_, res) => {
  try {
    const r = await axios.get(
      `https://daresay-dev.eu-gb.cf.appdomain.cloud/innovativa/${testLoraSensor}/2020-11-01/2020-11-10/3/${process.env.DARESAY_API_KEY}`
    );
    console.log(r.data);
    return res.json({ result: r.data });
  } catch (e) {
    return res.json({ error: e });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

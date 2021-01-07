import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import { get } from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import popularTimesRoutes from "./routes/PopularTimesRoutes";

import { sleep, normalize, convertTime } from "./utils/utils";
import Parser from "./utils/parser";
import mondayData from "./misc/rawdata_mondays.json";

config();

const app = express();

/**
 * DARESAY API:
 * https://daresay-dev.eu-gb.cf.appdomain.cloud/innovativa/SENSOR/FROM/TO/NO/KEY
 */

const sensor = "A81758FFFE03BC34";
const BASEURL = "https://daresay-dev.eu-gb.cf.appdomain.cloud/innovativa";
const parser = new Parser();
parser.parseFile(`${__dirname}/placeringar_sensorer.xlsx`);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

<<<<<<< HEAD
=======
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("Connected to database 🚀")
);

//  https://daresay-dev.eu-gb.cf.appdomain.cloud/innovativa/A81758FFFE03BC34/2020-11-01/2020-11-10/1/139kTnm10ksR

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

app.use("/api/populartimes/", popularTimesRoutes);

>>>>>>> master
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
<<<<<<< HEAD

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

const fetchData = (url) => {
  return get(url)
    .then((res) => {
      return {
        success: true,
        data: res.data,
      };
    })
    .catch((e) => {
      return { sucess: false };
    });
};

const getAllSensorData = (urls) => {
  return Promise.all(urls.map(fetchData));
};

const getUrl = ({ sensor, from, to, nr }) => {
  return `${BASEURL}/${sensor}/${from}/${to}/${nr}/${process.env.DARESAY_API_KEY}`;
};

const getAllUrls = (from, to) => {
  return parser.sensorInfo.map((sensor) => getUrl({ sensor: sensor.sensorId, from: from, to: to, nr: 1000 }));
};

/**
 * do while date is less than todays date:
 *    request data from sensor
 *    save res in object
 *    increase start and end date with 7 days
 *
 * Theoretically this should work for all days.
 */

const getStartDate = (day) => {
  let _day = 6;
  switch (day) {
    case "monday": {
      break;
    }
    case "tuesday": {
      _day++;
      break;
    }
    case "wednesday": {
      _day += 2;
      break;
    }
    case "thursday": {
      _day += 3;
      break;
    }
    case "friday": {
      _day += 4;
      break;
    }
    case "saturday": {
      _day += 5;
      break;
    }
    case "sunday": {
      _day += 6;
      break;
    }
    default: {
      _day = undefined;
    }
  }
  return _day;
};

const injectValuesInBaseUrl = (from, to, nr, url) => {
  let copy = url;
  copy = copy.replace(/\:from/, from);
  copy = copy.replace(/\:to/, to);
  copy = copy.replace(/\:nr/, nr);
  return copy;
};

app.get("/api/generate_popular/:day", async (req, res) => {
  // This solution will only work when using data from THIS year
  let day = getStartDate(req.params.day.toLowerCase());
  if (!day) res.json({ success: false, error: "Day entered not valid format" });
  if (day < 10) {
    day = "0" + day.toString();
  }

  const start = new Date(`2020-01-${day}T07:00`);
  const end = new Date(`2020-01-${day}T23:00`);
  const nr = 1000;
  const today = new Date();
  const output = {};

  let i = 0; // debugging to make sure i dont overload API

  do {
    try {
      let url = "";
      for (const [key, lindell_url] of Object.entries(parser.sensorInfo)) {
        // Api calls to lindell always return key error 2 so i will ignore this for now
        if (key === "Lindellhallen") {
          lindell_url.forEach(async (u) => {
            url = injectValuesInBaseUrl(convertTime(start), convertTime(end), nr, u["baseurl"]);
          });
        } else {
          for (const [floor, urls] of Object.entries(parser.sensorInfo[key])) {
            Promise.all(
              urls.forEach((url, index) => {
                console.log(`iterations: ${i++}`);
                setTimeout(async () => {
                  url = injectValuesInBaseUrl(convertTime(start), convertTime(end), nr, url.baseurl);
                  const data = await fetchData(url);
                  try {
                    const parsedData = parser.parseDay(data);
                    if (!(key in output)) {
                      output[key] = {};
                    }
                    if (!(floor in output[key])) {
                      output[key][floor] = [];
                    }
                    output[key][floor].push({ data: { day: req.params.day, times: parsedData } });
                    console.log(output);
                  } catch (e) {
                    console.log({ ERROR: e });
                  }
                }, index * 4000);
              })
            ).then((values) => {
              console.log(values);
            });
          }
        }
      }
      start.setDate(start.getDate() + 7);
      end.setDate(end.getDate() + 7);
    } catch (e) {
      console.log(e);
    }
  } while (false);
  return res.json(output);
});

app.get("/data", (_, res) => {
  const averageTimes = {};
  mondayData.forEach((data) => {
    Object.keys(data.data.times).map((key) => {
      if (!(key in averageTimes)) {
        averageTimes[key] = 0;
      }
      averageTimes[key] += parseInt(data.data.times[key], 10);
    });
  });

  const sumTimes = averageTimes;
  const normalizedTimes = {};
  let max = 0,
    min = Infinity;

  Object.keys(averageTimes).map((key) => {
    averageTimes[key] /= mondayData.length;
    if (averageTimes[key] > max) max = averageTimes[key];
    if (averageTimes[key] < min) min = averageTimes[key];
  });

  Object.keys(averageTimes).map((key) => {
    normalizedTimes[key] = normalize(sumTimes[key], max, min).toFixed(2);
  });

  res.json({ day: "mondays", sumTimes: sumTimes, averageTimes: averageTimes, normalized: normalizedTimes });
});
=======
>>>>>>> master

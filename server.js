import express, { response } from "express";
import morgan from "morgan";
import { config } from "dotenv";
import { get } from "axios";
import cors from "cors";

import { normalize, convertTime } from "./utils/utils";
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

app.get("/api/generate_popular/:day", async (req, res) => {
  // This solution will only work when using data from THIS year
  let day = getStartDate(req.params.day.toLowerCase());
  if (!day) res.json({ success: false, error: "Day entered not valid format" });
  if (day < 10) {
    day = "0" + day.toString();
  }
  console.log(day);
  const start = new Date(`2020-01-${day}T07:00`);
  const end = new Date(`2020-01-${day}T23:00`);
  const today = new Date();
  const output = [];

  let i = 0; // debugging to make sure i dont overload API

  do {
    const urls = getAllUrls(convertTime(start), convertTime(end));
    try {
      const data = await fetchData(urls[0]);
      const parsedData = parser.parseDay(data);
      output.push({
        startTime: convertTime(start),
        endTime: convertTime(end),
        sensor: parser.sensorInfo[0],
        data: { day: req.params.day, times: parsedData },
      });
      start.setDate(start.getDate() + 7);
      end.setDate(end.getDate() + 7);
      console.log(`iterations: ${i++}`);
    } catch (e) {
      return res.json({ error: e });
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

import express, { response } from "express";
import morgan from "morgan";
import { config } from "dotenv";
import { get } from "axios";
import cors from "cors";
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

// Put this in utils
const convertTime = (t) => {
  const z = t.getTimezoneOffset() * 60 * 1000;
  const tLocal = t - z;
  const dateLocal = new Date(tLocal);
  const iso = dateLocal.toISOString();
  return iso.slice(0, 19);
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
  let dayDate = 6;
  switch (req.params.day) {
    case "tuesday": {
      dayDate++;
      break;
    }
    case "wednesday": {
      dayDate += 2;
      break;
    }
    case "thursday": {
      dayDate += 3;
      break;
    }
    case "friday": {
      dayDate += 4;
      break;
    }
    case "saturday": {
      dayDate += 5;
      break;
    }
    case "sunday": {
      dayDate += 6;
      break;
    }
  }
  return dayDate;
};

app.get("/api/:day", async (req, res) => {
  // This solution will only work when using data from THIS year
  const startDayDate = getStartDate(req.params.day.toLowerCase());

  const start = new Date(`2020-01-${startDayDate}T07:00`);
  const end = new Date(`2020-01-${startDayDate}T23:00`);
  const today = new Date();
  const output = [];
  let i = 0;
  do {
    const r = getAllUrls(convertTime(start), convertTime(end));
    try {
      const data = await fetchData(r[0]);
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
      console.log(e);
    }
  } while (start < today);
  return res.json(output);
});

// TODO: Move to utils
const normalize = (val, max, min) => {
  if (max - min === 0) return 1;
  return ((val - min) / (max - min)) * 10;
};

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

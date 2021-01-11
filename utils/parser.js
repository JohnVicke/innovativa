import xlsx from "node-xlsx";
import { DARESAY_API_KEY, BASEURL } from "../constants";

const places = {
  nv: "Naturvetarhuset",
  sv: "Sammhällsvetarhuset",
  li: "Lindellhallen",
};

class Parser {
  constructor() {
    this.placements = null;
    this.sensorInfo = null;
  }

  parseDay({ data }) {
    const timeMap = {};
    data.map((el) => {
      const h = new Date(el.time).getHours();
      if (!(h in timeMap)) {
        timeMap[h] = [];
      }
      timeMap[h].push(el.dd.pir);
    });

    for (const [key, value] of Object.entries(timeMap))
      timeMap[key] = (value.reduce((a, b) => a + b) / value.length).toFixed(2);

    return timeMap;
  }

  getPlaceNameAndFloor(data) {
    const floor = data.match(/\d+/);
    const key = data.match(/\w{2}/)[0].toLowerCase();

    let info = {
      place: places[key],
    };

    if (key !== "li") info = { ...info, floor: parseInt(floor, 10) };

    return info;
  }

  getUrl(sensor) {
    return `${BASEURL}/${sensor}/:from/:to/:nr/${process.env.DARESAY_API_KEY}`;
  }

  parseSensorinfo(sensorInfo) {
    const sensors = [];
    const sensorMap = {};
    for (let i = 1; i < sensorInfo.data.length; i++) {
      const sensorId = sensorInfo.data[i][7];
      const url = this.getUrl(sensorId);

      if (sensorInfo.data[i][4] === "ERS") {
        const info = this.getPlaceNameAndFloor(sensorInfo.data[i][5]);
        if (info.place === "Lindellhallen") {
          if (!(info.place in sensorMap)) {
            sensorMap[info.place] = [];
          }
          sensorMap[info.place].push({ baseurl: url });
        } else if (!(info.place in sensorMap)) {
          sensorMap[info.place] = {};
        } else {
          if (info.floor) {
            if (!(info.floor in sensorMap[info.place])) {
              sensorMap[info.place][info.floor] = [];
            }
            sensorMap[info.place][info.floor].push({ baseurl: url });
          }
        }

        sensors.push({ info: info, sensorId: sensorId });
      }
    }
    this.sensorInfo = sensorMap;
  }

  parseFile(filename) {
    const workSheetsFromFile = xlsx.parse(filename);
    const sensorInfo = workSheetsFromFile[2];
    this.parseSensorinfo(sensorInfo);
  }
}

export default Parser;

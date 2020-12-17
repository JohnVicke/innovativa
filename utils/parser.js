import xlsx from "node-xlsx";

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

  parseSensorinfo(sensorInfo) {
    const sensors = [];
    for (let i = 1; i < sensorInfo.data.length; i++) {
      if (sensorInfo.data[i][4] === "ERS") {
        const info = this.getPlaceNameAndFloor(sensorInfo.data[i][5]);
        const sensorId = sensorInfo.data[i][7];
        sensors.push({ info: info, sensorId: sensorId });
      }
    }
    this.sensorInfo = sensors;
  }

  parseFile(filename) {
    const workSheetsFromFile = xlsx.parse(filename);
    const sensorInfo = workSheetsFromFile[2];
    this.parseSensorinfo(sensorInfo);
  }
}

export default Parser;

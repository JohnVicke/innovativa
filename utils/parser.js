import xlsx from "node-xlsx";

class Parser {
  constructor() {
    this.placements = null;
    this.sensorInfo = null;
  }

  parsePlacements(placements) {
    for (let i = 0; i < 2; i++) {
      console.log(placements.data[i]);
    }
  }

  parseSensorinfo(sensorInfo) {
    for (let i = 1; i < 2; i++) {
      //console.log(sensorInfo.data[i]);
    }
  }

  parseFile(filename) {
    const workSheetsFromFile = xlsx.parse(filename);
    const placements = workSheetsFromFile[0];
    const sensorInfo = workSheetsFromFile[2];
    this.parsePlacements(placements);
    this.parseSensorinfo(sensorInfo);
  }
}

export default Parser;

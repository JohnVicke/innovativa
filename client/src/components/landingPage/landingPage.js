import React from "react";
import _ from "lodash";
import "../onBoarding/onBoarding.css";
import "./landingPage.css";
import Dropdown from "../dropdown/dropdown";
import PirGraph from "../chart/pirGraph";
import location from "../landingPage/location";
import Button from "../Button/Button";

const week = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
  "Söndag",
];

const place = _.map(location, (place, index) => ({
  id: index,
  title: place.place,
  selected: false,
  key: "place",
}));

const days = _.map(week, (value, index) => ({
  id: index,
  title: value,
  selected: false,
  key: "days",
}));

const riskLevels = {
  0: "mycket låg",
  2.5: "låg",
  5: "mellan hög",
  7.5: "hög",
  10: "mycket hög",
};

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      place,
      floors: [],
      days,
      chosenPlace: "",
      chosenFloor: "",
      chosenDay: "",
      hour: 0,
      graphData: [],
    };
  }

  getGreeting = () => {
    var greeting;
    var time = new Date().getHours();
    if (time < 5) {
      greeting = "Godnatt";
    } else if (time < 10) {
      greeting = "Godmorgon";
    } else if (time < 14) {
      greeting = "Goddag";
    } else {
      greeting = "Godkväll";
    }
    return greeting.toUpperCase();
  };

  resetThenSet = (id, key) => {
    const temp = JSON.parse(JSON.stringify(this.state[key]));

    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;

    this.setState({
      [key]: temp,
    });

    if (key === "place") {
      this.setState({
        chosenPlace: temp[id].title,
        chosenFloor: "",
        chosenDay: "",
        graphData: [],
      });
      this.updateFloors(id, key);
    } else if (key === "floors") {
      this.setState({
        chosenFloor: temp[id].title,
      });
      if (this.state.chosenDay !== "") {
        this.updateGraph();
      }
    } else if (key === "days") {
      this.setState({
        chosenDay: temp[id].title,
      });
      this.updateGraph();
    }
    this.updateHour();
  };

  updateFloors = (id, key) => {
    const temp = JSON.parse(JSON.stringify(this.state[key]));
    const floors = location.filter((item) => item.place === temp[id].title);

    const tempFloors = [];
    floors.forEach((value, key) => {
      console.log(value.floor);
      let floor = {
        id: key,
        title: value.floor,
        selected: false,
        key: "floors",
      };
      tempFloors.push(floor);
    });
    this.setState({
      floors: tempFloors,
    });
  };

  updateGraph = () => {
    const graphData = location
      .filter((item) => item.place === this.state.chosenPlace)
      .filter((item) => item.floor === this.state.chosenFloor);
    this.setState({
      graphData: graphData[0],
    });
  };

  updateHour = () => {
    const d = new Date();
    this.state.hour = d.getHours();
  };

  getRisk = () => {
    const pir = this.state.graphData["data"][
      days.filter((item) => item.title === this.state.chosenDay)[0].id
    ].times.filter((item) => item.time === this.state.hour)[0].pir;

    var closest = Object.keys(riskLevels).reduce(function (prev, curr) {
      return Math.abs(curr - pir) < Math.abs(prev - pir) ? curr : prev;
    });
    return riskLevels[closest];
  };

  startQuiz = (e) => {
    this.props.history.push("/Quiz");
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <h3 className="caption">{this.getGreeting()}</h3>
          <h1>Virustider</h1>
          <div className="dd-wrapper">
            <div className="dd-flex-wrapper">
              <div className="place">
                <Dropdown
                  title="Välj plats"
                  list={this.state.place}
                  resetThenSet={this.resetThenSet}
                  onChange={this.updateFloors}
                  label="PLATS"
                />
              </div>
              {this.state.chosenPlace !== "" && (
                <Dropdown
                  title="Välj våning"
                  list={this.state.floors}
                  resetThenSet={this.resetThenSet}
                  label="VÅNING"
                />
              )}
            </div>
            <div className="dd-flex-wrapper">
              {this.state.chosenFloor !== "" && (
                <Dropdown
                  title="Välj dag"
                  list={this.state.days}
                  resetThenSet={this.resetThenSet}
                  label="DAG"
                />
              )}
            </div>
          </div>
          {this.state.chosenDay !== "" && (
            <p className="uppercase">
              {this.state.chosenDay} {this.state.hour}:00 VANLIGTSVIS{" "}
              <b> {this.getRisk()} smittorisk</b> I {this.state.chosenPlace}{" "}
              VÅNING {this.state.chosenFloor}
            </p>
          )}
        </div>
        {this.state.graphData != 0 && (
          <div className="graph-wrapper">
            <PirGraph
              data={this.state.graphData}
              day={
                days.filter((item) => item.title === this.state.chosenDay)[0].id
              }
            />
          </div>
        )}
        <div className="button">
          <Button
            children="Starta Quiz"
            onClick={() => this.startQuiz()}
          ></Button>
        </div>
      </div>
    );
  }
}

export default LandingPage;

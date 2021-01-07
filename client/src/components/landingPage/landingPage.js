import React from "react";
import _ from "lodash";
import "../onBoarding/onBoarding.css";
import "./landingPage.css";
import Dropdown from "../dropdown/dropdown";
import PirGraph from "../chart/pirGraph";
import location from "../landingPage/location";

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
      graphData: [],
    };
  }

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
  };

  updateFloors = (id, key) => {
    const temp = JSON.parse(JSON.stringify(this.state[key]));
    const floors = location.filter((item) => item.place === temp[id].title);

    const tempFloors = [];
    floors.forEach((value, key) => {
      console.log(value.floor);
      let floor = {
        id: key + id,
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
    console.log(graphData);
    this.setState({
      graphData: graphData[0],
    });
  };

  render() {
    return (
      <div className="wrapper">
        <h3 className="caption">GODMORGON</h3>
        <h1>Virustider</h1>
        <p>
          10:00 VANLIGTSVIS <b>HÖG SMITTORISK!</b> I NATURVETARHUSET VÅNING 1
        </p>
        <div className="dd-wrapper">
          <Dropdown
            title="Välj plats"
            list={this.state.place}
            resetThenSet={this.resetThenSet}
            onChange={this.updateFloors}
          />
          {this.state.chosenPlace !== "" && (
            <Dropdown
              title="Välj våning"
              list={this.state.floors}
              resetThenSet={this.resetThenSet}
            />
          )}
          {this.state.chosenFloor !== "" && (
            <Dropdown
              title="Välj dag"
              list={this.state.days}
              resetThenSet={this.resetThenSet}
            />
          )}
        </div>
        {this.state.graphData != 0 && (
          <PirGraph
            data={this.state.graphData}
            day={
              days.filter((item) => item.title === this.state.chosenDay)[0].id
            }
          />
        )}
        <div className="buttons">
          <button className="nasta" type="button">
            Starta quiz
          </button>
        </div>
      </div>
    );
  }
}

export default LandingPage;

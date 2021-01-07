import React from "react";
import NextButton from "../nextButton/nextButton";
import "../onBoarding/onBoarding.css";
import "./landingPage.css";
import Dropdown from "../dropdown/dropdown";

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      location: [
        {
          place: "Naturvetarhuset",
          floor: 3,
          data: [
            {
              dispName: "måndag",
              abbrv: "mån",
              name: "monday",
              times: {
                7: "3.72",
                8: "6.76",
                9: "7.54",
                10: "8.45",
                11: "10.00",
                12: "9.49",
                13: "7.83",
                14: "7.41",
                15: "6.23",
                16: "4.41",
                17: "2.62",
                18: "0.86",
                19: "0.35",
                20: "0.21",
                21: "0.03",
                22: "0.00",
              },
            },
            {
              dispName: "tisdag",
              abbrv: "tis",
              name: "tuesday",
              times: {
                7: "3.72",
                8: "6.76",
                9: "7.54",
                10: "8.45",
                11: "10.00",
                12: "9.49",
                13: "7.83",
                14: "7.41",
                15: "6.23",
                16: "4.41",
                17: "2.62",
                18: "0.86",
                19: "0.35",
                20: "0.21",
                21: "0.03",
                22: "0.00",
              },
            },
          ],
        },
        {
          place: "MIT",
          floor: 2,
          data: [
            {
              dispName: "måndag",
              abbrv: "mån",
              name: "monday",
              times: {
                7: "3.72",
                8: "6.76",
                9: "7.54",
                10: "8.45",
                11: "10.00",
                12: "9.49",
                13: "7.83",
                14: "7.41",
                15: "6.23",
                16: "4.41",
                17: "2.62",
                18: "0.86",
                19: "0.35",
                20: "0.21",
                21: "0.03",
                22: "0.00",
              },
            },
            {
              dispName: "tisdag",
              abbrv: "tis",
              name: "tuesday",
              times: {
                7: "3.72",
                8: "6.76",
                9: "7.54",
                10: "8.45",
                11: "10.00",
                12: "9.49",
                13: "7.83",
                14: "7.41",
                15: "6.23",
                16: "4.41",
                17: "2.62",
                18: "0.86",
                19: "0.35",
                20: "0.21",
                21: "0.03",
                22: "0.00",
              },
            },
          ],
        },
      ],
    };
  }
  componentDidMount() {
    window.addEventListener("keydown", this.tabKeyPressed);
    window.addEventListener("mousedown", this.mouseClicked);
  }

  tabKeyPressed = (e) => {
    if (e.keyCode === 9) {
      document.querySelector("body").classList.remove("noFocus");
      window.removeEventListener("keydown", this.tabKeyPressed);
      window.addEventListener("mousedown", this.mouseClicked);
    }
  };

  mouseClicked = () => {
    document.querySelector("body").classList.add("noFocus");
    window.removeEventListener("mousedown", this.mouseClicked);
    window.addEventListener("keydown", this.tabKeyPressed);
  };

  toggleItem = (id, key) => {
    const temp = JSON.parse(JSON.stringify(this.state[key]));

    temp[id].selected = !temp[id].selected;

    this.setState({
      [key]: temp,
    });
  };

  resetThenSet = (id, key) => {
    const temp = JSON.parse(JSON.stringify(this.state[key]));

    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;

    this.setState({
      [key]: temp,
    });
  };
  render() {
    return (
      <div className="wrapper">
        <h3 className="caption">GODMORGON</h3>
        <h1>Virustider</h1>
        <div className="dd-wrapper">
          <Dropdown title="Välj plats" list={this.state.location} />
          <Dropdown title="Välj våning" list={this.state.location} />
          <Dropdown title="Välj hus" list={this.state.location} />
        </div>
        <p>10:00 VANLIGTSVIS HÖG SMITTORISK! I NATURVETARHUSET VÅNING 1</p>
        <div className="btn-container">
          <button className="nasta" type="button">
            Starta quiz
          </button>
        </div>
      </div>
    );
  }
}

export default LandingPage;

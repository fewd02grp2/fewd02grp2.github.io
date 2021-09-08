import React, { Component } from "react";
import "./Getday.css";
import { render } from "react-dom";

class Getday extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    this.state = {
      currentDate: date,
    };
  }

  render() {
    return <div className="day-info">{this.state.currentDate}</div>;
  }
}

export default Getday;

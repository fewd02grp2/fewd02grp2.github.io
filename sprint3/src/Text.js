import React, { Component } from "react";

class Text extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerText: "",
    };
  }

  componentDidMount() {
    let array = [
        "Good Morning User",
        "How do you feel today?",
        "Have you finished your tasks?",
      ],
      intervalDurationMs = 3000,
      currentIndex = 0,
      maxNumTimes = -1,
      numTimesRan = 0;

    let interval = setInterval(
      function () {
        if (maxNumTimes !== 0) {
          this.setState({
            headerText: array[currentIndex],
          });
          currentIndex++;
          if (currentIndex > array.length - 1) {
            if (maxNumTimes === -1) {
              currentIndex = 0;
            } else {
              numTimesRan++;
              if (numTimesRan === maxNumTimes) {
                clearInterval(interval);
              } else {
                currentIndex = 0;
              }
            }
          }
        } else {
          clearInterval(interval);
        }
      }.bind(this),
      intervalDurationMs
    );
  }

  render() {
    return (
      <div style={{ color: this.state.color }}>{this.state.headerText}</div>
    );
  }
}

export default Text;

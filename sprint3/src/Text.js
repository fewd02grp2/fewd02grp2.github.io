// import React, { Component } from "react";

// class Text extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       headerText: "",
//     };
//   }

//   componentDidMount() {
//     let array = [
//         "Good Morning User",
//         "How do you feel today?",
//         "Have you finished your tasks?",
//       ],
//       intervalDurationMs = 3000,
//       currentIndex = 0,
//       maxNumTimes = -1,
//       numTimesRan = 0;

//     let interval = setInterval(
//       function () {
//         if (maxNumTimes !== 0) {
//           this.setState({
//             headerText: array[currentIndex],
//           });
//           currentIndex++;
//           if (currentIndex > array.length - 1) {
//             if (maxNumTimes === -1) {
//               currentIndex = 0;
//             } else {
//               numTimesRan++;
//               if (numTimesRan === maxNumTimes) {
//                 clearInterval(interval);
//               } else {
//                 currentIndex = 0;
//               }
//             }
//           }
//         } else {
//           clearInterval(interval);
//         }
//       }.bind(this),
//       intervalDurationMs
//     );
//   }

//   render() {
//     return (
//       <div style={{ color: this.state.color }}>{this.state.headerText}</div>
//     );
//   }
// }

// export default Text;
import React, { useEffect, useState } from "react";

function WordShow({ textList, colorList, speed }) {
  textList = textList || [
    "Good Morning",
    "How do you feel today?",
    "Have you finished your tasks?",
  ];

  colorList = colorList || ["lightblue", "lavender", "lightpink"];
  speed = speed || 100;
  const [round, setRound] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [textCharIndex, setTextCharIndex] = useState(0);
  const [isAddText, setIsAddText] = useState(true);
  const [isWait, setIsWait] = useState(false);
  const text = textList[textIndex % textList.length].slice(0, textCharIndex);
  const color = colorList[textIndex % colorList.length];

  useEffect(() => {
    setTimeout(changeText, 100);
  }, [round]);
  function changeText() {
    if (isWait) {
      setIsWait(false);
      setRound((round) => round + 1);
      return;
    }

    if (
      isAddText &&
      textCharIndex < textList[textIndex % textList.length].length
    ) {
      setTextCharIndex((textCharIndex) => textCharIndex + 1);
    }
    if (!isAddText && textCharIndex > 0) {
      setTextCharIndex((textCharIndex) => textCharIndex - 1);
    }
    const isEndOfWord =
      textCharIndex === textList[textIndex % textList.length].length &&
      isAddText;
    const isStartOfWord = textCharIndex === 0 && !isAddText;
    if (isEndOfWord) {
      setIsWait(true);
      setIsAddText((isAddText) => !isAddText);
    }
    if (isStartOfWord) {
      setIsWait(true);
      setIsAddText((isAddText) => !isAddText);
      setTextIndex((index) => index + 1);
    }
    setRound((round) => round + 1);
  }
  return <p style={{ color: color }}>{text}</p>;
}

export default WordShow;

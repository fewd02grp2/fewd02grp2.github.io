// import React, { useEffect, useState } from "react";

// export default function Weather() {
//   const [weather, setWeather] = useState(null);

//   useEffect(() => {
//     const getDayInfo = async () => {
//       const weatherRes = await fetch("http://localhost:8080/weatherinfo");
//       const weatherData = await weatherRes.json();
//       console.log(weatherData);
//       const weatherCode = weatherData.weather[0].id;
//       let weatherIcon;
//       const obj = {
//         200: "bolt",
//         300: "cloud-rain",
//         500: "cloud-showers-heavy",
//         600: "snowflake",
//         700: "smog",
//         800: "sun",
//         810: "cloud",
//       };
//       if (weatherCode > 800) weatherIcon = obj[810];
//       else if (weatherCode == 800) weatherIcon = obj[800];
//       else if (weatherCode >= 700) weatherIcon = obj[700];
//       else if (weatherCode >= 600) weatherIcon = obj[600];
//       else if (weatherCode >= 500) weatherIcon = obj[500];
//       else if (weatherCode >= 300) weatherIcon = obj[300];
//       else if (weatherCode >= 200) weatherIcon = obj[200];
//       setWeather(`<i class="fas fa-${weatherIcon}"></i>`);
//     };
//     getDayInfo();
//   }, []);

//   return <div className="day-info">{weather}</div>;
// }
<i class="fas fa-cloud-rain"></i>;

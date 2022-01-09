import React from "react";

import Time from "./Time";
import Temperature from "./Temperature";
import WeatherDescription from "./WeatherDescription";
import Humidity from "./Humidity";
import Pressure from "./Pressure";
import Wind from "./Wind";
import UVIndex from "./UVIndex";
import TemperatureGraph from "./TemperatureGraph";

export const Dashboard = (props) => {
  return (
    <div className="dashboard-container">
      <div className="component-group">
        <div className="component">
          <Time></Time>
          Last updated: {props.lastUpdateTime.format("h:mm A")}
        </div>
        <div className="component">
          <Temperature
            currentTemp={props.temp}
            humidity={props.humidity}
            windSpeed={props.speed}
          ></Temperature>
        </div>
        <div className="component">
          <TemperatureGraph
            history={props.weatherHistory}
            forecast={props.forecast}
          ></TemperatureGraph>
        </div>
      </div>

      <div className="component-group" style={{ padding: "50px 0" }}>
        <div className="component">
          <WeatherDescription
            description={props.description}
            iconId={props.iconId}
          ></WeatherDescription>
        </div>
        <div className="component">
          <Humidity humidity={props.humidity}></Humidity>
        </div>
        <div className="component">
          <Pressure pressure={props.pressure}></Pressure>
        </div>
        <div className="component">
          <Wind speed={props.speed} direction={props.deg}></Wind>
        </div>
        <div className="component">
          <UVIndex uv={props.uvIndex}></UVIndex>
        </div>
      </div>
    </div>
  );
};

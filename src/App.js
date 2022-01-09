import React, { Component } from "react";
import "./App.css";
import Moment from "moment";
import { Dashboard } from "./components/Dashboard";
import { RadarMap } from "./components/RadarMap";
import { TabSwitcher } from "./components/TabSwitcher";
import { TenDayForecast } from "./components/TenDayForecast";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: {},
      forecast: {},
      currentLoaded: false,
      forecastLoaded: false,
      weatherHistory: [],
      uvIndex: 0,
      error: null,
      lastUpdateTime: Moment(),
      sleepMode: false,
      currentTab: 0,
    };
  }

  componentDidMount() {
    this.updateData();
    this.updateInterval = setInterval(() => this.updateData(), 1000 * 60 * 5);

    document.ondblclick = () => {
      if (!this.state.sleepMode) {
        this.setState({ sleepMode: true });
        setTimeout(() => {
          this.setState({ sleepMode: false });
        }, 1000000);
      } else {
        this.setState({ sleepMode: false });
      }
    };
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    const { temp, humidity, pressure } = this.state.currentWeather.main
      ? this.state.currentWeather.main
      : 0;
    const description = this.state.currentWeather.weather
      ? this.state.currentWeather.weather[0].description
      : "unknown";
    const iconId = this.state.currentWeather.weather
      ? this.state.currentWeather.weather[0].icon
      : "01d";
    const { speed, deg } = this.state.currentWeather.wind
      ? this.state.currentWeather.wind
      : 0;
    const forecast = this.state.forecast.list ? this.state.forecast.list : [];

    if (!this.state.sleepMode) {
      return (
        <div style={{ display: "flex" }}>
          <TabSwitcher
            onTabSwitch={(tab) => this.setState({ currentTab: tab })}
            currentTab={this.state.currentTab}
          />
          {this.state.currentTab === 0 && (
            <Dashboard
              temp={temp}
              humidity={humidity}
              weatherHistory={this.state.weatherHistory}
              forecast={forecast}
              description={description}
              iconId={iconId}
              pressure={pressure}
              speed={speed}
              deg={deg}
              uvIndex={this.state.uvIndex}
              lastUpdateTime={this.state.lastUpdateTime}
            />
          )}
          {this.state.currentTab === 1 && <RadarMap />}
          {this.state.currentTab === 2 && <TenDayForecast />}
        </div>
      );
    } else {
      return <div className="sleep"></div>;
    }
  }

  updateData() {
    // Get current weather
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=15232,us&units=imperial&APPID=3cb6de73c631b0f4f5c720b82cbb6384"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (
            result &&
            result.cod &&
            (result.cod === 200 || result.cod === "200")
          ) {
            this.setState({
              currentWeather: result,
              currentLoaded: true,
              lastUpdateTime: Moment(),
              weatherHistory: this.state.weatherHistory.concat({
                time: Moment(),
                temperature: result.main.temp,
              }),
            });
            console.log("Refreshed at " + Moment().format("h:mm:ss A"));
          } else {
            console.log(
              "Error" + result.cod + " at " + Moment().format("h:mm:ss A")
            );
          }
        },
        (error) => {
          this.setState({
            currentLoaded: true,
            error,
          });
        }
      );

    // Get 5 day forecast
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?zip=15232,us&units=imperial&APPID=3cb6de73c631b0f4f5c720b82cbb6384"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (
            result &&
            result.cod &&
            (result.cod === 200 || result.cod === "200")
          ) {
            this.setState({
              forecast: result,
              forecastLoaded: true,
            });
          }
        },
        (error) => {
          this.setState({
            forecastLoaded: true,
            error,
          });
        }
      );

    // Get UV index
    fetch(
      "https://api.openweathermap.org/data/2.5/uvi?appid=3cb6de73c631b0f4f5c720b82cbb6384&lat=40.457652&lon=-79.936219"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            uvIndex: result.value,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }
}

export default App;

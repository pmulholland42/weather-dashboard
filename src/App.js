import React, {Component} from 'react';
import './App.css';
import Moment from 'moment';

import Time from './components/Time';
import Temperature from './components/Temperature';
import WeatherDescription from './components/WeatherDescription';
import Humidity from './components/Humidity';
import Pressure from './components/Pressure';
import Wind from './components/Wind';
import UVIndex from './components/UVIndex';
import TemperatureGraph from './components/TemperatureGraph';

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
      lastUpdateTime: Moment()
    }
  }

  componentDidMount() {
    this.updateData();
    this.updateInterval = setInterval(() => this.updateData(), 1000*60*5);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    const {temp, humidity, pressure} = this.state.currentWeather.main ? this.state.currentWeather.main : 0;
    const description = this.state.currentWeather.weather ? this.state.currentWeather.weather[0].description : "unknown";
    const iconId = this.state.currentWeather.weather ? this.state.currentWeather.weather[0].icon : "01d";
    const {speed, deg} = this.state.currentWeather.wind ? this.state.currentWeather.wind : 0;
    const forecast = this.state.forecast.list ? this.state.forecast.list : [];

    return (
      <div class="container">

          <div className="component-group">
            <div className="component">
              <Time></Time>
              Last updated: {this.state.lastUpdateTime.format("h:mm A")}
            </div>
            <div className="component">
              <Temperature currentTemp={temp} humidity={humidity} windSpeed={speed}></Temperature>
            </div>
            <div className="component">
              <TemperatureGraph history={this.state.weatherHistory} forecast={forecast}></TemperatureGraph>
            </div>
          </div>

          <div className="component-group" style={{padding: "50px 0"}}>
            <div className="component">
              <WeatherDescription description={description} iconId={iconId}></WeatherDescription>
            </div>
            <div className="component">
              <Humidity humidity={humidity}></Humidity>
            </div>
            <div className="component">
              <Pressure pressure={pressure}></Pressure>
            </div>
            <div className="component">
              <Wind speed={speed} direction={deg}></Wind>
            </div>
            <div className="component">
              <UVIndex uv={this.state.uvIndex}></UVIndex>
            </div>
          </div>
      </div>
    );
  }

  updateData() {
    // Get current weather
    fetch('https://api.openweathermap.org/data/2.5/weather?zip=15232,us&units=imperial&APPID=3cb6de73c631b0f4f5c720b82cbb6384')
      .then(res => res.json())
      .then(
        (result) => {
          if (result && result.cod && (result.cod === 200 || result.cod === "200")) {
            this.setState({
              currentWeather: result,
              currentLoaded: true,
              lastUpdateTime: Moment(),
              weatherHistory: this.state.weatherHistory.concat({
                time: Moment(),
                temperature: result.main.temp
              })
            });
            console.log("Refreshed at " + Moment().format("h:mm:ss A"));
          }
          else {
            console.log("Error" + result.cod +" at " + Moment().format("h:mm:ss A"));
          }
        },
        (error) => {
          this.setState({
            currentLoaded: true,
            error
          });
        }
      );

    // Get 5 day forecast
    fetch('https://api.openweathermap.org/data/2.5/forecast?zip=15232,us&units=imperial&APPID=3cb6de73c631b0f4f5c720b82cbb6384')
      .then(res => res.json())
      .then(
        (result) => {
          if (result && result.cod && (result.cod === 200 || result.cod === "200")) {
            this.setState({
              forecast: result,
              forecastLoaded: true
            });
          }
        },
        (error) => {
          this.setState({
            forecastLoaded: true,
            error
          });
        }
      );

    // Get UV index
    fetch('https://api.openweathermap.org/data/2.5/uvi?appid=3cb6de73c631b0f4f5c720b82cbb6384&lat=40.457652&lon=-79.936219')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            uvIndex: result.value,
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  }
}

export default App;

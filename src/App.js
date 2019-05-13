import React, {Component} from 'react';
import './App.css';

import Time from './components/Time';
import Temperature from './components/Temperature';
import Humidity from './components/Humidity';
import Pressure from './components/Pressure';
import Wind from './components/Wind';
import TemperatureGraph from './components/TemperatureGraph';
import UVIndex from './components/UVIndex';

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
      error: null
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
    if (this.state.currentLoaded && this.state.forecastLoaded && !this.state.error)
      return (
        <div className="App">
          <Time></Time>
          <br></br>
          <Temperature currentTemp={this.state.currentWeather.main.temp} humidity={this.state.currentWeather.main.humidity} windSpeed={this.state.currentWeather.wind.speed} forecast={this.state.forecast.list}></Temperature>
          <br></br>
          <Humidity humidity={this.state.currentWeather.main.humidity}></Humidity>
          <br></br>
          <Pressure pressure={this.state.currentWeather.main.pressure}></Pressure>
          <br></br>
          <Wind speed={this.state.currentWeather.wind.speed} direction={this.state.currentWeather.wind.deg}></Wind>
          <br></br>
          <UVIndex uv={this.state.uvIndex}></UVIndex>
          <br></br>
          <TemperatureGraph history={this.state.weatherHistory} forecast={this.state.forecast}></TemperatureGraph>
        </div>
      );
    else return null;
  }

  updateData() {
    console.log("Refreshing");
    // Get current weather
    fetch('https://api.openweathermap.org/data/2.5/weather?zip=15232,us&units=imperial&APPID=3cb6de73c631b0f4f5c720b82cbb6384')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            currentWeather: result,
            currentLoaded: true
          });
          this.state.weatherHistory.push({temperature: result.main.temp})
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
          this.setState({
            forecast: result,
            forecastLoaded: true
          });
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

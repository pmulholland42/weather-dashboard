import React, {Component} from 'react';
import './App.css';

import Time from './components/Time';
import Temperature from './components/Temperature';
import Humidity from './components/Humidity';
import Pressure from './components/Pressure';
import Wind from './components/Wind';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
      loaded: false,
      error: null
    }
  }

  componentDidMount() {
    this.updateData();
    this.updateInterval = setInterval(() => this.updateData(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    if (this.state.loaded && !this.state.error)
      return (
        <div className="App">
          <Time></Time>
          <br></br>
          <Temperature currentTemp={this.state.weatherData.main.temp} humidity={this.state.weatherData.main.humidity} windSpeed={this.state.weatherData.wind.speed} highTemp={0} lowTemp={0}></Temperature>
          <br></br>
          <Humidity humidity={this.state.weatherData.main.humidity}></Humidity>
          <br></br>
          <Pressure pressure={this.state.weatherData.main.pressure}></Pressure>
          <br></br>
          <Wind speed={this.state.weatherData.wind.speed} direction={this.state.weatherData.wind.deg}></Wind>
        </div>
      );
    else return null;
  }

  updateData() {
    console.log("Refreshing");
    fetch('https://api.openweathermap.org/data/2.5/weather?zip=15232,us&units=imperial&APPID=3cb6de73c631b0f4f5c720b82cbb6384')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            weatherData: result,
            loaded: true
          });
        },
        (error) => {
          this.setState({
            loaded: true,
            error
          });
        }
      )
  }
}

export default App;

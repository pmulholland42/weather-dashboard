import React, {Component} from 'react';

export class Temperature extends Component {

    render() {
        const {currentTemp, humidity, windSpeed } = this.props;
        var fahrenheitTemp = currentTemp;
        var celciusTemp = (fahrenheitTemp - 32) * 5 / 9;

        var feelsLikeDiv = (<div></div>)
        if (fahrenheitTemp >= 80) {
            // This formula is copied from http://www.maineharbors.com/weather/convert3.htm
            var heatIndex = -42.379 + 2.04901523*fahrenheitTemp + 10.14333127*humidity
					- 0.22475541*fahrenheitTemp*humidity - 6.83783*Math.pow(10,-3)*fahrenheitTemp*fahrenheitTemp
					- 5.481717*Math.pow(10,-2)*humidity*humidity
					+ 1.22874*Math.pow(10,-3)*fahrenheitTemp*fahrenheitTemp*humidity
					+ 8.5282*Math.pow(10,-4)*fahrenheitTemp*humidity*humidity
					- 1.99*Math.pow(10,-6)*fahrenheitTemp*fahrenheitTemp*humidity*humidity;
            feelsLikeDiv = (
                <div>Heat index: {heatIndex}</div>
            );
        } else if (fahrenheitTemp <= 40) {
            // This formula is copied from https://en.wikipedia.org/wiki/Wind_chill
            var windChill = 35.74 + (0.6215 * fahrenheitTemp) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * fahrenheitTemp * Math.pow(windSpeed, 0.16));
            feelsLikeDiv = (
                <div>Wind chill: {windChill}</div>
            );
        }

        return (
            <div>
                <div>{Math.round(fahrenheitTemp)}° F / {Math.round(celciusTemp)}° C</div>
                {feelsLikeDiv}
            </div>
        );
    }
}

export default Temperature;


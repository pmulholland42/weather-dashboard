import React, {Component} from 'react';

export class WeatherDescription extends Component {

    /*emojis = {
        "01d": "☀️",
        "02d": "",
        "03d": "☁️",
        "04d": "",
        "09d": "",
        "10d": "",
        "11d": "",
        "13d": "❄️",
        "50d": "🌫️",
        "01n": "🌕",
        "02n": "",
        "03n": "☁️",
        "04n": "",
        "09n": "",
        "10n": "",
        "11n": "",
        "13n": "❄️",
        "50n": "🌫️",
    }*/

    render() {

        var imageSource = `https://openweathermap.org/img/wn/${this.props.iconId}@2x.png`;
        var uppercaseDescription = this.props.description.charAt(0).toUpperCase() + this.props.description.slice(1);

        return (
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <img src={imageSource} alt={this.props.iconId} height="50"/>
                {uppercaseDescription}
            </div>
        );
    }
}

export default WeatherDescription;
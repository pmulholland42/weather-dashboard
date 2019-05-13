import React, {Component} from 'react';

export class Temperature extends Component {
    render() {
        var fahrenheitTemp = this.props.currentTemp;
        var celciusTemp = Math.round((fahrenheitTemp - 32) * 5 / 9);
        return (
            <div>
                <div>{fahrenheitTemp}° F / {celciusTemp}° C</div>
                <div>Feels like {this.props.feelsLikeTemp}° F</div>
                <div>High: {this.props.highTemp}° F       Low {this.props.lowTemp}° F</div>
            </div>
        );
    }
}

export default Temperature;


import React, {Component} from 'react';
import Moment from 'moment';
import Graph from './Graph';

export class TemperatureGraph extends Component {

    render() {
        const {history, forecast} = this.props;

        var temperatureData = [];
        history.forEach(t => {
            if (temperatureData.length === 0 || temperatureData[temperatureData.length - 1].value !== t.temperature)
            {
                temperatureData.push({
                    time: t.time,
                    value: t.temperature
                });
            }
        });
        forecast.forEach(t => {
            temperatureData.push({
                time: Moment.unix(t.dt),
                value: t.main.temp
            })
        });

        return (
            <div>
                <Graph ref="graph" width={600} height={240} data={temperatureData} color="red" timeScale="day" yUnit="°"></Graph>
            </div>
        );
    }

}

export default TemperatureGraph;
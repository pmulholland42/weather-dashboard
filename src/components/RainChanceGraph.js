import React, {Component} from 'react';
import Moment from 'moment';
import Graph from './Graph';

export class RainChanceGraph extends Component {

    render() {
        const {history, forecast} = this.props;

        var rainData = [];
        /*history.forEach(t => {
            temperatureData.push({
                time: t.time,
                value: t.temperature
            });
        });*/
        forecast.forEach(t => {
            rainData.push({
                time: Moment.unix(t.dt),
                value: t.rain ? t.rain["3h"] : 0
            });
        });

        return (
            <div>
                <Graph ref="graph" width={600} height={240} data={rainData} color="blue" timeScale="day" yUnit="%" yMax={100} yMin={0}></Graph>
            </div>
        );
    }

}

export default RainChanceGraph;
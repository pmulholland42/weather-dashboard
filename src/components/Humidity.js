import React, {Component} from 'react';

export class Humidity extends Component {
    render() {
        return (
            <div>Humidity: {this.props.humidity}%</div>
        );
    }
}

export default Humidity;
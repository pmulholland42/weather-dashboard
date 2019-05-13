import React, {Component} from 'react';

export class Pressure extends Component {
    render() {
        return (
            <div>Pressure: {this.props.pressure} mb</div>
        );
    }
}

export default Pressure;
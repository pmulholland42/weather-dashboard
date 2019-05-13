import React, {Component} from 'react';

export class UVIndex extends Component {
    render() {
        const {uv} = this.props;
        var index = "Low";
        if (uv > 2.5) index = "Moderate";
        if (uv > 5.5) index = "High";
        if (uv > 7.5) index = "Very high";
        if (uv > 10.5) index = "Extreme";
        return (
            <div>UV Index: {uv} ({index})</div>
        );
    }
}

export default UVIndex;
import React, {Component} from 'react';

export class UVIndex extends Component {
    render() {
        const {uv} = this.props;
        var index = "low";
        if (uv > 2.5) index = "moderate";
        if (uv > 5.5) index = "high";
        if (uv > 7.5) index = "very high";
        if (uv > 10.5) index = "extreme";
        return (
            <div>
                <div>UV Index:</div>
                <div>{uv} ({index})</div>
            </div>
        );
    }
}

export default UVIndex;
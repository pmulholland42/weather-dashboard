import React, {Component} from 'react';

export class WeatherDescription extends Component {

    render() {

        var imageSource = `/icons/${this.props.iconId}.png`;
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
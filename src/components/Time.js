import React, {Component} from 'react';
import Moment from 'moment';

export class Time extends Component {
    constructor(props) {
        super(props);
        this.state = { now: Moment() }
    }

    componentDidMount() {
        this.updateInterval = setInterval(() => this.setState({ now: Moment() }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    render() {
        var now = this.state.now;
        return (
            <div>
                <div>{now.format('dddd, MMMM D')}</div>
                <div>{now.format('h:mm:ss A')}</div>
            </div>
        );
    }
}

export default Time;
import React, {Component} from 'react';
import Moment from 'moment';

export class Time extends Component {
    render() {
        var now = Moment();
        return (
            <div>
                <div>{now.format('dddd, MMMM D')}</div>
                <div>{now.format('h:mm A')}</div>
            </div>
        );
    }
}

export default Time;
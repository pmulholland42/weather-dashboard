import React, { Component } from "react";
import "../App.css";
import { format } from "date-fns";

export class Time extends Component {
  constructor(props) {
    super(props);
    this.state = { now: new Date() };
  }

  componentDidMount() {
    this.updateInterval = setInterval(
      () => this.setState({ now: new Date() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    const now = this.state.now;
    return (
      <div>
        <div>{format(now, "eeee, MMMM d")}</div>
        <div>{format(now, "h:mm:ss aa")}</div>
      </div>
    );
  }
}

export default Time;

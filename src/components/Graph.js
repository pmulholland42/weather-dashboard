import React, { Component } from "react";
import {
  isSameDay,
  startOfDay,
  differenceInMilliseconds,
  isAfter,
} from "date-fns";

export class Graph extends Component {
  componentDidUpdate() {
    const { width, height, color, timeScale, yUnit } = this.props;
    var data = this.props.data;

    const now = new Date();
    // Filter the data based on time
    data = data.filter((element) => {
      return isSameDay(element.time, now);
    });

    // Sort the data by time
    data.sort((a, b) => {
      return a.time.diff(b.time);
    });

    // Get the max and min Y values, if they are not specified
    var { yMax, yMin } = this.props;
    if (typeof yMax === "undefined") {
      yMax = Math.ceil(
        data
          .filter((element) => {
            return isSameDay(element.time, now);
          })
          .map((a) => a.value)
          .reduce((a, b) => {
            return Math.max(a, b);
          }, -Infinity)
      );
    }
    if (typeof yMin === "undefined") {
      yMin = Math.floor(
        data
          .filter((element) => {
            return isSameDay(element.time, now);
          })
          .map((a) => a.value)
          .reduce((a, b) => {
            return Math.min(a, b);
          }, Infinity)
      );
    }

    // Set up the canvas
    const canvas = this.refs.graphCanvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    const graphOffsetX = 28;
    const graphOffsetY = 28;
    const graphWidth = width - graphOffsetX;
    const graphHeight = height - graphOffsetY;

    ctx.fillStyle = "rgb(220, 220, 220)";
    ctx.fillRect(graphOffsetX, 0, width, graphHeight);
    ctx.fillStyle = "black";

    // Draw the borders of the graph
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(graphOffsetX, 0);
    ctx.lineTo(graphWidth + graphOffsetX, 0);
    ctx.lineTo(graphWidth + graphOffsetX, height - graphOffsetY);
    ctx.lineTo(graphOffsetX, height - graphOffsetY);
    ctx.lineTo(graphOffsetX, 0);
    ctx.stroke();

    // Display the max and min Y values
    ctx.font = "14px Arial";
    ctx.fillText(yMax + yUnit, 2, 15);
    ctx.fillText(yMin + yUnit, 2, height - graphOffsetY - 5);

    // Draw horizontal lines
    const yRange = yMax - yMin;
    ctx.strokeStyle = "rgba(100, 100, 100, 0.2)";
    for (let temp = yMin + 1; temp < yMax; temp++) {
      if (temp % 10 === 0) {
        let y = height - ((temp - yMin) / yRange) * height - graphOffsetY;
        ctx.beginPath();
        ctx.moveTo(graphOffsetX, y);
        ctx.lineTo(graphWidth + graphOffsetX, y);
        ctx.stroke();
        ctx.fillText(temp + yUnit, 2, y + 5);
      }
    }

    // Draw vertical lines
    for (let hour = 0; hour <= 24; hour++) {
      if (hour % 3 === 0) {
        let x = (hour / 24) * graphWidth;
        ctx.beginPath();
        ctx.moveTo(x + graphOffsetX, 0);
        ctx.lineTo(x + graphOffsetX, graphHeight);
        ctx.stroke();
        x -= 8;
        if (hour !== 0 && hour !== 24)
          ctx.fillText(
            (hour > 12 ? hour - 12 : hour) + ":00",
            x + graphOffsetX - 10,
            height - 10
          );
      }
    }

    // Draw a vertical line marking the current time
    const lengthOfGraph = 86400000;
    const startOfGraph = startOfDay(now);
    var currentTimeX =
      (differenceInMilliseconds(startOfGraph, now) / lengthOfGraph) *
      graphWidth;
    ctx.strokeStyle = "rgba(100, 100, 100, 0.7)";
    ctx.beginPath();
    ctx.moveTo(currentTimeX + graphOffsetX, 0);
    ctx.lineTo(currentTimeX + graphOffsetX, graphHeight);
    ctx.stroke();

    // Draw the line graph
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.font = "12px Arial";
    ctx.beginPath();
    ctx.moveTo(graphOffsetX, 0);
    var lineStarted = false;
    data.forEach((element) => {
      let y = (element.value - yMin) / yRange;
      let x =
        differenceInMilliseconds(element.time, startOfGraph) / lengthOfGraph;
      if (!lineStarted) {
        ctx.moveTo(
          x * graphWidth + graphOffsetX,
          height - y * graphHeight - graphOffsetY
        );
        lineStarted = true;
      } else {
        ctx.lineTo(
          x * graphWidth + graphOffsetX,
          height - y * graphHeight - graphOffsetY
        );
        if (isAfter(element.time, now)) {
          ctx.fillText(
            element.value,
            x * graphWidth + graphOffsetX - 40,
            height - y * graphHeight - graphOffsetY
          );
        }
      }
    });
    ctx.stroke();
  }

  render() {
    const { width, height } = this.props;
    return (
      <div>
        <canvas ref="graphCanvas" width={width} height={height}></canvas>
      </div>
    );
  }
}

export default Graph;

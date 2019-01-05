import React from 'react'
import { ResponsiveXYFrame } from 'semiotic';
import { curveCardinal } from "d3-shape";
import Nav from './Nav';

var lbs = require('../data/lbs.json');

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}`;
}

class Lbs extends React.Component {
  constructor(props) {
    super(props)
    this.recentDisplay = [];
    this.display = [];
    this.range = "";
    this.recentRange = "";
    this.process();
  }

  process() {
    var floating = [];
    var win = 7;

    for(var i=win; i<lbs.length; i++) {
      var value = 0;
      for(var j=win-1; j>=0; j--) {
        value += lbs[i-j].lbs;
      }
      floating.push({date: lbs[i].date, lbs: value/win});
    }

    var recentWindow = 128;
    var recentLbs = lbs.slice().splice(lbs.length-recentWindow,recentWindow);
    var recentFloating = floating.slice().splice(floating.length-recentWindow, recentWindow);

    this.display.push(
      {data: lbs, color: 'rgba(57,62,65,0.35)', strokeWidth: "1.5px"});
    this.display.push(
      {data: floating, color: 'rgba(57,62,65,1)', strokeWidth: "1.5px"});

    this.recentDisplay.push(
      {data: recentLbs, color: 'rgba(57,62,65,0.35)', strokeWidth: "1.5px"});
    this.recentDisplay.push(
      {data: recentFloating, color: 'rgba(57,62,65,1)', strokeWidth: "1.5px"});

    var recentFirst = recentLbs[0].date;
    var first = lbs[0].date;
    var last = lbs[lbs.length-1].date;

    this.recentRange = `${recentFirst} to ${last}`;
    this.range = `${first} to ${last}`;
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>Weight Over Time</h1>
        <h3>{this.recentRange}</h3>
        <ResponsiveXYFrame
          size={[300,250]}
          responsiveWidth={true}
          lines={this.recentDisplay}
          margin={{top: 5, bottom: 25, left: 25, right: 5}}
          lineDataAccessor={"data"}
          xAccessor={d => new Date(d.date)}
          yAccessor={d => d.lbs}
          hoverAnnotation={true}
          lineType={{ type: "line", interpolator: curveCardinal }}
          lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:d.opacity })}
          customLineType={{ type: "dividedLine"}}
          axes={[
            { orient: 'left', tickFormat: d => d, ticks: 10, className: 'normal'},
            { orient: 'bottom', tickFormat: d => formatDate(new Date(d)), ticks: 2, className: 'normal'}
          ]}
        />
        <br/>
        <h3>{this.range}</h3>
        <ResponsiveXYFrame
          size={[300,250]}
          responsiveWidth={true}
          lines={this.display}
          yExtent={[150]}
          margin={{top: 5, bottom: 25, left: 25, right: 5}}
          lineDataAccessor={d => d.data}
          xAccessor={d => new Date(d.date)}
          yAccessor={d => d.lbs}
          hoverAnnotation={true}
          lineType={{ type: "line", interpolator: curveCardinal }}
          lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:d.opacity })}
          customLineType={{ type: "dividedLine"}}
          axes={[
            { orient: 'left', tickFormat: d => d, ticks: 10, className: 'normal'},
            { orient: 'bottom', tickFormat: d => formatDate(new Date(d)), ticks: 2, className: 'normal'}
          ]}
        />
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>I've been keeping an irregulary updated tally of my weight in the iOS Notes app for a few years now. Maybe this isn't the world's healthiest behavior, but it's an easy biometric to track. The line chart uses a seven day floating average and gives visual priority to the smoothed out data.</p>
          <p>I scaled this up from 150lbs which <a href="https://twitter.com/bengarvey/status/474588920513314816">can be a controversial move</a>, but with weight data do you really want to ever hit zero?</p>
          <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, Notes, Google Sheets</p>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default Lbs

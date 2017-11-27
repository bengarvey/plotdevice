import React from 'react'
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';

var lbs = require('../data/lbs.json');

var floating = [];
var win = 7;

for(var i=win; i<lbs.length; i++) {
  var value = 0;
  for(var j=win-1; j>=0; j--) {
    value += lbs[i-j].lbs;
  }
  floating.push({date: lbs[i].date, lbs: value/win});
}

var display = [
  {data: lbs, color: '#393e41', opacity: 0.35, strokeWidth: "1px"},
  {data: floating, color: '#393e41', opacity: 1, strokeWidth: "1px"}
];

var first = lbs[0].date;
var last = lbs[lbs.length-1].date;

var range = `${first} to ${last}`;

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}`;
}

var Lbs = () => (
  <div className="chartContainer">
    <h1>Weight Over Time</h1>
    <h3>{range}</h3>
    <ResponsiveXYFrame
      size={[300,250]}
      responsiveWidth={true}
      lines={display}
      yExtent={[150]}
      margin={{top: 5, bottom: 25, left: 25, right: 5}}
      lineDataAccessor={d => d.data}
      xAccessor={d => new Date(d.date)}
      yAccessor={d => d.lbs}
      pieceHoverAnnotation={true}
      lineType={{ type: 'line'}}
      lineRenderMode={d => "sketchy"}
      lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:d.opacity })}
      customLineType={{ type: "dividedLine"}}
      axes={[
        { orient: 'left', tickFormat: d => d, ticks: 10},
        { orient: 'bottom', tickFormat: d => formatDate(new Date(d)), ticks: 2 }
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

export default Lbs

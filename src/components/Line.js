import React from 'react'
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';
import Pline from './Pline';

var lbs = require('../data/lbs.json');

var floating = [];
var win = 7;

for(var i=win; i<lbs.length; i++) {
  var value = 0;
  var max = {
    x: 0,
    y: null,
    label: "Max"
  };
  for(var j=win-1; j>=0; j--) {
    value += lbs[i-j].lbs;
  }
  if (max.x < lbs[i]) {
    max.x = lbs[i].lbs;
    max.y = lbs[i].date;
  }
  floating.push({date: lbs[i].date, lbs: value/win});
}

var recentWindow = 128;
var recentLbs = lbs.slice().splice(lbs.length-recentWindow,recentWindow);
var recentFloating = floating.slice().splice(floating.length-recentWindow, recentWindow);

var display = [
  {data: lbs, color: '#393e41', opacity: 0.35, strokeWidth: "1px"},
  {data: floating, color: '#393e41', opacity: 1, strokeWidth: "1px"}
];

var recentDisplay = [
  {data: recentLbs, color: '#393e41', opacity: 0.35, strokeWidth: "1px"},
  {data: recentFloating, color: '#393e41', opacity: 1, strokeWidth: "1px"}
];

var recentFirst = recentLbs[0].date;
var first = lbs[0].date;
var last = lbs[lbs.length-1].date;

var recentRange = `${recentFirst} to ${last}`;
var range = `${first} to ${last}`;

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}`;
}

var Line = () => (
  <div className="chartContainer">
    <h1>The Perfect Line Chart</h1>
    <h3>What makes a perfect line chart?</h3>
    <Pline
      yLabel={'Weight (lbs)'}
      xLabel={'Time'}
      max={max}
      display={recentDisplay}
    />
     <div className="notes nextReport">
      <h3>Notes and Sources</h3>
      <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, Notes, Google Sheets</p>
    </div>
    <Nav/>
  </div>
)

export default Line

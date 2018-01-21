import React from 'react'
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';

var steps = require('../data/steps.json');

var floating = [];
var win = 60;

for(var i=0; i<win; i++) {
  floating.push({date: steps[i].date, steps: null});
}

for(var i=win; i<steps.length; i++) {
  var value = 0;
  for(var j=win-1; j>=0; j--) {
    value += steps[i-j].steps;
  }
  floating.push({date: steps[i].date, steps: value/win});
}

var display = [
  {data: steps, color: '#393e41', opacity: 0.5, strokeWidth: "1px"},
  {data: floating, color: '#393e41', opacity: 0.85, strokeWidth: "1px"}
];

console.log(display);

var first = steps[0].date;
var last = steps[steps.length-1].date;

var range = `${first} to ${last}`;

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

var sharedProps = {
  size: [300,350],
  responsiveWidth: true,
  yExtent: [0,18000],
  margin: {top: 10, bottom: 25, left: 45, right: 5},
  hoverAnnotation: true,
}

var Steps = () => (
  <div className="chartContainer">
    <h1>Steps Per Day</h1>
    <h3>{range}</h3>
    <ResponsiveXYFrame
      {...sharedProps }
      defined={d => d.steps !== null}
      points={display[0].data}
      pointStyle={ d => ({fill: "#333", r: '1px'})}
      xAccessor={d => new Date(d.date)}
      yAccessor={d => d.steps}
      renderType={"sketchy"}
      axes={[
        { orient: 'left', tickFormat: d => d, ticks: 4},
        { orient: 'bottom', tickFormat: d => formatDate(new Date(d)), ticks: 4 }
      ]}
    />
   <div className="notes nextReport">
      <h3>Notes and Sources</h3>
      <p>This data came right out of the iOS Health app, which allows you to export a giant XML file of all your steps. I wrote a script to parse it and consolidate the data by day</p>
      <p>The point show raw data and the is a 60 day floating average. It's interesting that even at 60 days, it's still jagged.</p>
      <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, ios Health app</p>
    </div>
    <Nav/>
  </div>
)

export default Steps

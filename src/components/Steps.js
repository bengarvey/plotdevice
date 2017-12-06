import React from 'react'
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';

var steps = require('../data/steps.json');

var floating = [];
var win = 7;

for(var i=win; i<steps.length; i++) {
  var value = 0;
  for(var j=win-1; j>=0; j--) {
    value += steps[i-j].steps;
  }
  floating.push({date: steps[i].date, steps: value/win});
}

var display = [
  {data: steps, color: '#393e41', opacity: 0.35, strokeWidth: "1px"},
  {data: floating, color: '#393e41', opacity: 1, strokeWidth: "1px"}
];

var first = steps[0].date;
var last = steps[steps.length-1].date;

var range = `${first} to ${last}`;

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}`;
}

var sharedProps = {
  size: [300,350],
  responsiveWidth: true,
  yExtent: [0,18000],
  margin: {top: 10, bottom: 25, left: 45, right: 5},
  hoverAnnotation: true
}

var Steps = () => (
  <div className="chartContainer">
    <h1>Steps Per Day</h1>
    <h3>{range}</h3>
    <ResponsiveXYFrame
      {...sharedProps }
      lines={[display[1]]}
      lineDataAccessor={d => d.data}
      xAccessor={d => new Date(d.date)}
      yAccessor={d => d.steps}
      lineType={{ type: 'line'}}
      renderType={"sketchy"}
      lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:d.opacity })}
      axes={[
        { orient: 'left', tickFormat: d => d, ticks: 4},
        { orient: 'bottom', tickFormat: d => formatDate(new Date(d)), ticks: 2 }
      ]}
    />
    <div className='abChartContainer'>
    <ResponsiveXYFrame
      {...sharedProps }
      points={display[0].data}
      pointStyle={ d => ({fill: "#333", r: '1px'})}
      xAccessor={d => new Date(d.date)}
      yAccessor={d => d.steps}
      axes={[
        { orient: 'left', tickFormat: d => '', ticks: 4},
      ]}
    />
    </div>
   <div className="notes nextReport">
      <h3>Notes and Sources</h3>
      <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, ios Health app, DayStepper</p>
    </div>
    <Nav/>
  </div>
)

export default Steps

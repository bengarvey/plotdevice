import React from 'react'
import { ResponsiveORFrame } from 'semiotic';
import Nav from './Nav';

var steps = require('../data/steps.json');

const colors = {
  female: '#faa1c7',
  male: '#009ddc',
  unknown: '#666666',
  success: '#15b097',
  failure: '#da4167',
  neutral: '#999999',
  primary: '#000000'
}

console.log(steps);
var display = [];

steps.forEach( function(d) {
  var itemDate = new Date(d.date);
  var monthYear = `${itemDate.getMonth()+1}-${itemDate.getYear() + 1900}`;
  display.push({value: d.steps, name: monthYear});
});

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

function displayThing(d) {
  console.log(d);
  return d.data;
}

const leftAxis = {
    orient: 'left', 
    ticks: 3
};

console.log(display);
var Steps = () => (
  <div className="chartContainer">
    <h1>Steps Per Day</h1>
    <h3>How much am I walking?</h3>
    <ResponsiveORFrame
      size={[ 360, 500 ]}
      responsiveWidth={true}
      data={display}
      rAccessor={d => d.value}
      oAccessor={d => d.name}
      pieceHoverAnnotation={true}
      tooltipContent={ d => `${d.value} ${d.name}` }
      style={d => ({ fill: colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.4, strokeWidth: 1 })}
      summaryType={"boxplot"}
      type={"swarm"}
      axis={leftAxis}
      oLabel={(d, i) => (<text textAnchor="middle" transform="rotate(90)">{d}</text>)}
      margin={{ left: 30, top: 30, bottom: 30, right: 10 }}
      oPadding={10}
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

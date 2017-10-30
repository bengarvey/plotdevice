import React from 'react';
import ReactDOM from 'react-dom';
import { XYFrame, Mark } from 'semiotic';
import { curveBasis } from 'd3-shape';
import { scaleTime } from 'd3-scale';
var libs = [
  {name: "Auto Fatalities 1899 - 2015",   complex: 0.8, serious : 0.9, logo: "images/auto.png", url: "./auto"},
  {name: "Weight Trajectory",             complex: 0.2, serious : 0.2, logo: "images/lbs.png", url: "./lbs"},
  {name: "Chart Creation Technology",     complex: 0.5, serious : 0.2, logo: "images/libraries.png", url: "./libraries"},
  {name: "Pager Duty Incidents",          complex: 0.7, serious : 0.1, logo: "images/pagerduty.png", url: "./pagerduty"},
  {name: "US Tornado Deaths 1876 - 2107", complex: 0.2, serious : 0.9, logo: "images/tornadoes.png", url: "./tornadoes"},
];

var modified = {
  lib: []
};

libs.forEach( function(d) {
  modified.lib.push(
    {x: d.complex, y:d.serious, name: d.name, url: d.url, logo: d.logo, cy:-20});
 });

var display =
  {data: modified.lib, renderMode: "normal"};

var sharedProps = {
  size: [350, 600],
  xAccessor: "x",
  yAccessor: "y",
  hoverAnnotation: true,
  margin:{ left: 10, bottom: 30, right: 10, top: 10 }
};

const Home = () => (
  <div>
    <h1>Dots and Lines</h1>
    <h3>A collection of dataviz projects</h3>
    <XYFrame
      { ...sharedProps }
      yExtent={[0,1]}
      xExtent={[0,1]}
      points={display.data}
      pointStyle={ d => ({fill: "#666", r: '5px'})}
      tooltipContent={d => d.name}
      customHoverBehavior={ function(d) {document.body.style.cursor='pointer'}}
      customClickBehavior={ function(d) {window.location=d.url}}
      customPointMark={ ({d}) => ( <Mark markType="image" transform="translate(-20,-20)" height="40px" width="40px" type="image/svg+xml" xlinkHref={d.logo} className="clickable" stroke="#333" strokeWidth="1"/> ) }
      axes={[
        { orient: 'top', ticks: 5, tickFormat: d => '', label: "Serious"},
        { orient: 'right', ticks: 5, tickFormat: d => '', label: "Complex"},
        { orient: 'bottom', ticks: 5, tickFormat: d => '', label: "Fun"},
        { orient: 'left', ticks: 5, tickFormat: d => '', label: "Simple"}
      ]}
      margin={{ left: 60, bottom: 60, right: 60, top: 60 }}
    />
  </div>
);

export default Home

/*
import React from 'react'

const Home = () => (
  <div>
    <h1>Dots and Lines</h1>
    <h3>A collection of dataviz projects</h3>
    <ul class="list">
      <li class="list-item"><a href="auto">US Automobile Fatalities 1899 - 2015</a> - Annotations</li>
      <li class="list-item"><a href="lbs">Weight Trajectory</a> - Line chart with floating average</li>
      <li class="list-item"><a href="libraries">Chart Creation Technologies</a> - Scatter plot with custom markers</li>
      <li class="list-item"><a href="pagerduty">Pager Duty Incidents</a> - Heat map</li>
      <li class="list-item"><a href="tornadoes">US Tornado Deaths 1876 - 2017</a> - Line chart with floating average</li>
    </ul>
  </div>
)

export default Home
*/

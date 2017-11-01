import React from 'react';
import ReactDOM from 'react-dom';
import { ResponsiveXYFrame, Mark } from 'semiotic';
var libs = [
  {name: "Semiotic",    speed: 0.65, flex: 0.6, logo: "images/semiotic.png"},
  {name: "Vanilla JS",  speed: 0.10, flex: 0.90, logo: "images/js.png"},
  {name: "D3",          speed: 0.20, flex: 0.80, logo: "images/d3.png"},
  {name: "chart.js",    speed: 0.85, flex: 0.30, logo: "images/chartjs.svg"},
  {name: "Highcharts",  speed: 0.75, flex: 0.40, logo: "images/highcharts.png"},
  {name: "Plotly",      speed: 0.70, flex: 0.50, logo: "images/plotly.png"},
  {name: "Excel",       speed: 0.7, flex: 0.10, logo: "images/excel.png"},
  {name: "Google",      speed: 0.8, flex: 0.20, logo: "images/google.png"}
];

const colors = {
  lib: '#393e41',
  pop: '#da4167',
  miles: '#15b097',
  alc: '#fcde9c',
  nonAlc: '#f4d35e',
  annotationInfo: "#009ddc",
  annotation: "#666666",
  gasAdjusted: '#d86641'
}

var modified = {
  lib: []
};

libs.forEach( function(d) {
  modified.lib.push(
    {x: d.flex, y:d.speed, name: d.name, logo: d.logo, cy:-20});
 });

var display =
  {data: modified.lib, color: colors.lib, renderMode: "normal"};

var sharedProps = {
  size: [100, 350],
  xAccessor: "x",
  yAccessor: "y",
  hoverAnnotation: true,
  margin:{ left: 10, bottom: 30, right: 10, top: 10 }
};

const Libraries = () => (
  <div className="chartContainer">
    <h1>Charting Technolgies</h1>
    <h3>Tradeoff between speed and flexibility</h3>
    <ResponsiveXYFrame
      { ...sharedProps }
      responsiveWidth={true}
      yExtent={[0,1]}
      xExtent={[0,1]}
      points={display.data}
      pointStyle={ d => ({fill: "#666", r: '5px'})}
      tooltipContent={d => d.name}
      customPointMark={ ({d}) => ( <Mark markType="image" transform="translate(-20,-20)" height="20px" width="20px" type="image/svg+xml" xlinkHref={d.logo}/> ) }
      axes={[
        { orient: 'bottom', padding: 0, ticks: 5, tickFormat: d => ''},
        { orient: 'left', ticks: 5, tickFormat: d => ''}
      ]}
      margin={{ left: 10, bottom: 10, right: 10, top: 10 }}
    />
  </div>
);

export default Libraries

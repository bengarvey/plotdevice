import React from 'react';
import { ResponsiveXYFrame, Mark } from 'semiotic';
import Nav from './Nav';

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

const sharedProps = {
  size: [100, 350],
  xAccessor: "x",
  yAccessor: "y",
  hoverAnnotation: true,
  margin:{ left: 20, bottom: 40, right: 10, top: 10 }
};

class Libraries extends React.Component {
  constructor(props) {
    super(props);
    this.display = {};
    this.process();
  }

  process() {
    var modified = {
      lib: []
    };

    libs.forEach( function(d) {
      modified.lib.push(
        {x: d.flex, y:d.speed, name: d.name, logo: d.logo, cy:-20});
     });

    this.display = {
      data: modified.lib,
      color: colors.lib,
      renderMode: "normal"
    };
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>Charting Technolgies</h1>
        <h3>Tradeoff between speed and flexibility</h3>
        <ResponsiveXYFrame
          { ...sharedProps }
          responsiveWidth={true}
          yExtent={[0,1]}
          xExtent={[0,1]}
          points={this.display.data}
          pointStyle={ d => ({fill: "#666", r: '5px'})}
          tooltipContent={d => d.name}
          customPointMark={ ({d}) => ( <Mark markType="image" x={-10} y={-10} transform="translate(-20,-20)" height="20px" width="20px" type="image/svg+xml" xlinkHref={d.logo}/> ) }
          axes={[
            { orient: 'bottom', className: 'normal', label: {name:'Flexibility'}, padding: 0, ticks: 5, tickFormat: d => ''},
            { orient: 'left', className: 'normal', label: 'Speed', ticks: 5, tickFormat: d => '', padding: 0, dx: 20}
          ]}
          margin={{ left: 55, bottom: 55, right: 10, top: 10 }}
        />
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>This is a fun scatter plot I used in my <a href="https://docs.google.com/presentation/d/1OEHDz99ieT50piYyQRYx9msShZs1aQFVnOyRVMOJxVg/edit?usp=sharing">BarCampPhily slides</a> to illustrate where Semiotic fits in with other chart libraries like Highcharts, Plotly, D3, etc. The data is 100% made up by me.</p>
          <p>The point is that I can make a chart in Excel or Google Sheets quickly and it will be ugly and boring, or I can spent months hammering it out in D3 or vanilla Javascript and it will be beautiful. Semiotic cherry picks some of the cooler D3 chart types and makes them more accessible and easier to work with.</p>
          <p>Making this chart was hard, because I had no idea how to get the custom logos in there. I ended up filing a <a href="https://github.com/emeeks/semiotic/issues/64">Github issue about it</a> amd they helped me figure it out.</p>
          <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, GIMP</p>
        </div>
        <Nav/>
      </div>
    );
  }
}

export default Libraries

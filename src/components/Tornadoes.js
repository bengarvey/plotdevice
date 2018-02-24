import React from 'react';
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';
var deathsPerYear = require('../data/tornadoes.json');

function getFloating(items, window, key) {
  var floating = [];
  for(var i=window; i<items.length; i++) {
    var value = 0; 
    for(var j=window-1; j>=0; j--) {
      value += items[i-j][key];
    }
    floating.push({year: items[i].year, deaths:value/window});
  }
  return floating;
}

const annotations = [
  { type: 'x', year: 1948,
    note: { 
      label: "First early warning system",
      align: "left", wrap: 150
    },
    color: '#333', dy: 0, dx: 5, connector: { end: "none" }
  }
];

function yearToDate(year) {
  return new Date(`${year}-01-01T04:00:00Z`);
}

class Tornadoes extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.process();
  }

  process() {
    var floating = getFloating(deathsPerYear, 7, "deaths");
    this.display = [
      {data: deathsPerYear, opacity: 0.35},
      {data: floating, opacity: 1}
    ];
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>US Tornado Deaths 1875 - 2017</h1>
        <h3>What happened in 2011?</h3>
        <ResponsiveXYFrame
          size={[350, 200]}
          responsiveWidth={true}
          lines={this.display}
          defined={d => d.y !== null}
          lineDataAccessor={d => d.data}
          xAccessor={d => yearToDate(d.year)}
          yAccessor={d => d.deaths}
          lineType={{type:"line", interpolator: null}}
          lineStyle={(d) => ({ stroke: "#00a2ce", strokeWidth: "1px", opacity: d.opacity})}
          customLineType={{ type: "dividedLine"}}
          hoverAnnotation={true}
          axes={[
            { orient: 'left', tickFormat: d => d },
            { orient: 'bottom', ticks: 8, tickFormat: d => new Date(d).getFullYear() }
          ]}
          margin={{top: 10, left: 30, right: 0, bottom: 50}}
          annotations={annotations}
        />
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>This chart was a key part of my <a href="https://docs.google.com/presentation/d/1OEHDz99ieT50piYyQRYx9msShZs1aQFVnOyRVMOJxVg/edit?usp=sharing">BarCampPhily presentation</a>. <a href="https://en.wikipedia.org/wiki/Tornadoes_of_2011">Tornadoes were devastating in 2011</a> and I remember wondering whether this was normal, rare, or a sign of climate change. The data told an inspiring story of how much progress we've made. Maybe people are warned early enough, or buildings are stronger, or we just know how to predict them. Whatever it is, tornadoes are less of a threat than they were in the past. 2011 seems to be a modern anomaly.</p>
          <p>Once again, I used a floating average of 7 years to smooth the the noisy dataset. I love showing the raw and floating data together, but giving visual priority to the average value</p>
          <p>I visited Joplin, MO in 2012, the site of the worst tornadoes, and the town was mostly cleaned up but a lot of people had left. I still enjoyed working and meeting people there, and had an incredible chilli dog during my stay.</p>
          <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript</p>
          <p>Source: <a href="http://blog.nssl.noaa.gov/nsslnews/2009/03/us-annual-tornado-death-tolls-1875-present/">US Annual Tornado Death Tolls, 1875-present</a></p>
        </div>
        <Nav/>
      </div>
    );
  }
}

export default Tornadoes

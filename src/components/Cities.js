import React from 'react'
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';

var cities = require('../data/cities.json'); 


var lbs = require('../data/lbs.json');

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}`;
}

class Cities extends React.Component {
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
      {data: lbs, color: '#393e41', opacity: 0.35, strokeWidth: "1px"});
    this.display.push(
      {data: floating, color: '#393e41', opacity: 1, strokeWidth: "1px"});

    this.recentDisplay.push(
      {data: recentLbs, color: '#393e41', opacity: 0.35, strokeWidth: "1px"});
    this.recentDisplay.push(
      {data: recentFloating, color: '#393e41', opacity: 1, strokeWidth: "1px"});

    var recentFirst = recentLbs[0].date;
    var first = lbs[0].date;
    var last = lbs[lbs.length-1].date;

    this.recentRange = `${recentFirst} to ${last}`;
    this.range = `${first} to ${last}`;
    console.log(this.display);
    console.log(this.recentDisplay);
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>Sentiment by City</h1>
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
          lineType={{ type: 'line'}}
          lineRenderMode={d => "sketchy"}
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
          lineType={{ type: 'line'}}
          lineRenderMode={d => "sketchy"}
          lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:d.opacity })}
          customLineType={{ type: "dividedLine"}}
          axes={[
            { orient: 'left', tickFormat: d => d, ticks: 10, className: 'normal'},
            { orient: 'bottom', tickFormat: d => formatDate(new Date(d)), ticks: 2, className: 'normal'}
          ]}
        />
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, Notes, Google Sheets</p>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default Cities

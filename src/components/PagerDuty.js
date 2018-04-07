import React from 'react';
import { ResponsiveORFrame } from 'semiotic';
import { scaleLinear } from "d3-scale";
import Nav from './Nav';
var incidents = require('../data/pagerduty.json');

const heatScale = scaleLinear()
  .domain([0,5,10])
  .range(["#fbf7da", "red", "darkred"]).clamp(true);

const daysOfTheWeek = {
    1: "Mon",
    2: "Tues",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    7: "Sun",
}

const daysAxis = {
    orient: 'left', ticks: 7,
    tickFormat: d => daysOfTheWeek[d] ?
    <text className="normal" style={{ textAnchor: "end" }} fontSize="12px" y={5} x={2}>{daysOfTheWeek[d]}</text> : '' };

class PagerDuty extends React.Component {
  constructor(props) {
    super(props);
    this.modified = [];
    this.process();
  }

  process() {
    incidents.forEach( (d,i) => {
      var item = {
        date: d.date,
        value: d.incidents,
        step: i%42,
        day: new Date(d.date).getDay()
      };
      this.modified.push(item);
    });
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>Pagerduty Incidents</h1>
        <h3>Agghhh!</h3>
        <ResponsiveORFrame
          size={[ 360, 200 ]}
          responsiveWidth={true}
          data={this.modified}
          rAccessor={() => 1}
          oAccessor={d => d.step}
          style={d => ({ fill: heatScale(d.value), stroke: "#eeedcd", strokeOpacity: 1, strokeWidth: 2 })}
          type={"bar"}
          axis={daysAxis}
          oLabel={d => parseInt(d+1)%10 === 0 || d === 0 ? <text className='normal' transform="rotate(90)"  y={5} x={-8} fontSize="12px">Week {d+1}</text> : ''}
          margin={{ left: 30, top: 10, bottom: 80, right: 0 }}
          oPadding={0}
        />
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>Heatmaps are fun and picking out the color scheme is the trickiest part. Semiotic makes it very easy to build heatmaps like this, even though I don't quite have an intuitive understanding of the step calculations and logic. I end up playing withe numbers until they look good.</p>
          <p>The data comes from our actual PagerDuty data at MBI. Each rectangle is a day and the darker it is, the more alerts were sent out to our team. I'm in the process of trying to quiet these alarms down, so I wrote a <a href="https://github.com/bengarvey/tap-pagerduty">Singer.io tap</a> to scrape the data from the PagerDuty API.</p>
          <p>Tech: <a href="https://emeeks.github.io/semiotic/#/">Semiotic</a>, javascript, <a href="https://singer.io">Singer.io</a></p>
        </div>
        <Nav/>
      </div>
    );
  }
}

export default PagerDuty

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

const leftAxis = [{
    orient: 'left',
    ticks: 3,
    label: 'Steps'
  }
];

class Steps extends React.Component {
  constructor(props) {
    super(props)
    this.display = [];
  }

  processSteps() {
    steps.forEach( (d) => {
      var itemDate = new Date(d.date);
      var group = `${itemDate.toLocaleString('en-us', {month:'short'})}-${itemDate.getYear() + 1900}`;
      this.display.push({value: d.steps, name: group});
    });
  }

  componentDidMount() {
    this.processSteps();
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>My Steps</h1>
        <h3>How much am I walking per month?</h3>
        <ResponsiveORFrame
          size={[ 360, 750 ]}
          responsiveWidth={true}
          data={this.display}
          projection={"horizontal"}
          rAccessor={d => d.value}
          oAccessor={d => d.name}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.value} ${d.name}` }
          style={d => ({ fill: colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.3, height: "3px", width: "3px" })}
          summaryStyle={d => ({ fill: colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.2, height: "8px", y:"-5px", rx: "5px"})}
          summaryType={"boxplot"}
          type={"swarm"}
          axis={leftAxis}
          oLabel={(d, i) => (<text textAnchor="middle">{d}</text>)}
          margin={{ left: 30, top: 10, bottom: 100, right: 10 }}
          oPadding={10}
        />
       <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>This data came right out of the iOS Health app, which allows you to export a giant XML file of all your steps. I wrote a script to parse it and consolidate the data by day</p>
          <p>Each point represents an individual day and the boxplot summary shows the middle quartiles for each month.</p>
          <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, ios Health app</p>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default Steps

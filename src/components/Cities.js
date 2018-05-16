import React from 'react'
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';
import City from './City';

var cities = require('../data/cities.json'); 

var lbs = require('../data/lbs.json');

function getColor() {
  return `#333333`;
}

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

function getAvg(values) {
  return values.reduce(function (p, c) {
    return p + c;
  }) / values.length;
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

    var avg = {};
    var avgValues = [];
    cities.forEach( (city) => {
        var dates = city.score.date;
        city.score.avgValues = {};
        Object.keys(dates).forEach( (date) => {
            city.score.avgValues[date] = getAvg(city.score.date[date]);
          }
        );
        var plotData = [];
        var keys = Object.keys(city.score.avgValues);
        var overallAvg = 0;
        var temp = 0;
        keys.sort();
        for(var i=0; i<keys.length; i++) {
          plotData.push({date: `${keys[i]}`, value: city.score.avgValues[keys[i]]})
          temp += city.score.avgValues[keys[i]];
        }
        overallAvg = temp / keys.length;
        this.display.push(
          { data: plotData,
            color: getColor(),
            opacity: 0.8,
            strokeWidth: "1px",
            name: city[`name`],
            overallAvg: overallAvg }
        );

      }
    );
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>Sentiment by City</h1>
        <div className="smallMultiples">
          <City
            name={this.display[0].name}
            data={this.display[0]}
          />
          <City
            name={this.display[1].name}
            data={this.display[1]}
          />
          <City
            name={this.display[2].name}
            data={this.display[2]}
          />
          <City
            name={this.display[3].name}
            data={this.display[3]}
          />
          <City
            name={this.display[4].name}
            data={this.display[4]}
          />
          <City
            name={this.display[5].name}
            data={this.display[5]}
          />
          <City
            name={this.display[6].name}
            data={this.display[6]}
          />
        </div>
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

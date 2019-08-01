import React from 'react'
import { ResponsiveXYFrame, ResponsiveORFrame, ResponsiveNetworkFrame } from 'semiotic';
import Nav from './Nav';
import City from './City';
import uniq from "lodash.uniq";
import flatten from "lodash.flatten";
import { schemeCategory10 } from 'd3-scale-chromatic';
import { scaleOrdinal } from 'd3-scale';

const color = scaleOrdinal(schemeCategory10);
var cities = require('../data/cities/processed/cities.json');
var people = require('../data/cities/processed/people.json');
var philly = require('../data/cities/processed/philadelphia_all.json');
var newyork = require('../data/cities/processed/newyork_all.json');
var ben = require('../data/cities/processed/bengarvey.json');

function getColor(city, year) {
  if (typeof(city) === 'undefined' || city.name != 'Philadelphia') {
    return `#333333`;
  }
  else {
    return year === 2017 ? colors.philly : colors.phillyAlt;
  }
}

var cities2018 = [
  {id:"36061", name: "New York City", population: 8398748, budget: 82.2},
  {id:"06037", name: "Los Angeles", population: 3990456, budget: 8.75},
  {id:"17031", name: "Chicago", population: 2705994, budget: 9.81},
  {id:"48225", name: "Houston", population: 2325502, budget: 5.07},
  {id:"04013", name: "Phoenix", population: 1660272, budget: 4.1},
  {id:"48029", name: "San Antonio", population: 1532233, budget: 2.5},
  {id:"06073", name: "San Diego", population: 1532233, budget: 3.57},
  {id:"48113", name: "Dallas", population: 1345047, budget: 3.06},
  {id:"06085", name: "San Jose", population: 1030119, budget: 3.16},
  {id:"48015", name: "Austin", population: 964254, budget: 3.7},
  {id:"12031", name: "Jacksonville", population: 903889, budget: 2.2},
  {id:"06075", name: "San Francisco", population: 883305, budget: 9.7},
  {id:"42101", name: "Philadelphia", population: 1584138, budget: 4.2},
  {id:"48439", name: "Fort Worth", population: 895008, budget: 1.6},
  {id:"39049", name: "Columbus", population: 892533, budget: 1.76}
];
cities2018.sort( (a,b) => b.population - a.population);

const allFunds = 9097488000;
var allBudget = [
  { name: "General", percent: 0.481 },
  { name: "Water", percent: 0.091 },
  { name: "County Liquid Fuels Tax", percent: 0.001 },
  { name: "Special Gas Tax", percent: 0.004 },
  { name: "HealthChoices Behavioral Health", percent: 0.143 },
  { name: "Hotel Room Rental Tax", percent: 0.008 },
  { name: "Grants Revenue", percent: 0.185 },
  { name: "Aviation", percent: 0.053 },
  { name: "Community Development", percent: 0.009 },
  { name: "Car Rental Tax", percent: 0.001 }
];
allBudget.map( (b) => {
  b.value = b.percent * allFunds;
  return b;
});

allBudget = allBudget.sort( (a,b) => b.value - a.value);

var allBudgetTreemap = {
  name: "", children: allBudget.slice()
};

const colors = {
  female: '#faa1c7',
  male: '#009ddc',
  unknown: '#666666',
  success: '#15b097',
  failure: '#da4167',
  neutral: '#999999',
  primary: '#000000',
  negative: '#da4167',
  positive: '#15b097',
  philly: '#ff2222',
  phillyAlt: '#440000'
}

const axes = [{
    orient: 'bottom', ticks: 3,
    tickFormat: d => d ?
    <text className='normal' style={{ textAnchor: "end" }} fontSize="12px" y={5} x={10}>{(d/1000000).toFixed(1)}M</text> : '' 
  }
];

const bAxes = [{
    orient: 'bottom', ticks: 3,
    tickFormat: d => d ?
    <text className='normal' style={{ textAnchor: "end" }} fontSize="12px" y={5} x={10}>{(d/1).toFixed(2)}</text> : '' 
  }
];




const thousandsAxes = [{
    orient: 'bottom', ticks: 3,
    tickFormat: d => d ?
    <text className='normal' style={{ textAnchor: "end" }} fontSize="12px" y={5} x={10}>{(d/1000).toFixed(1)}K</text> : '' 
  }
];

const scoreAxes = [{
    orient: 'bottom', ticks: 4,
    tickFormat: d => d ?
    <text className='normal' style={{ textAnchor: "end" }} fontSize="12px" y={5} x={10}>{d}</text> : '' 
  }
];


function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

function getAvg(values) {
  return values.reduce(function (p, c) {
    return p + c;
  }) / values.length;
}

function getStackedItems(item) {
  var stacked = [];
  stacked[0] = {
    funnelKey: colors.negative,
    stepName: item.name,
    stepValue: item.score.percentNegative
  }
  stacked[1] = {
    funnelKey: colors.neutral,
    stepName: item.name,
    stepValue: item.score.percentNeutral
  }
  stacked[2] = {
    funnelKey: colors.positive,
    stepName: item.name,
    stepValue: item.score.percentPositive
  }
  return stacked;
}

function processCity(city) {
  var dates = city.score.date;
  city.score.avgValues = {};
  Object.keys(dates).forEach( (date) => {
      city.score.avgValues[date] = getAvg(city.score.date[date]);
    }
  );

  city.score.floatingValues = getFloating(city.score.avgValues, 10);

  var plotData17 = [];
  var plotData18 = [];
  var floatingData17 = [];
  var floatingData18 = [];
  var keys = Object.keys(city.score.avgValues);
  var overallAvg = 0;
  var temp = 0;
  var keyCount = 0;
  keys.sort();
  for(var i=0; i<keys.length; i++) {
    if (keys[i].match('2017')) {
      plotData17.push({date: `${keys[i]}`, value: city.score.avgValues[keys[i]]})
      floatingData17.push({date: `${keys[i]}`, value: city.score.floatingValues[keys[i]]})
      temp += city.score.avgValues[keys[i]];
      keyCount += 1;
    }
    else if (keys[i].match('2018')) {
      plotData18.push({date: `${keys[i]}`, value: city.score.avgValues[keys[i]]})
      floatingData18.push({date: `${keys[i]}`, value: city.score.floatingValues[keys[i]]})
      temp += city.score.avgValues[keys[i]];
      keyCount += 1;
    }

  }
  overallAvg = temp / keyCount;
  var processedData = [
      {
      data: plotData17,
      color: getColor(city, 2017),
      opacity: 0.3,
      strokeWidth: "1px",
      name: city[`name`],
      overallAvg: overallAvg,
      population: city[`population`],
      score: city.score },
      {
      data: floatingData17,
      color: getColor(city, 2017),
      opacity: 0.9,
      strokeWidth: "1px",
      name: city[`name`],
      overallAvg: overallAvg,
      population: city[`population`],
      score: city.score }
    ];

    if (plotData18.length > 0) {
      processedData.push(
        {data: plotData18,
        color: getColor(city, 2018),
        opacity: 0.3,
        strokeWidth: "1px",
        name: city[`name`],
        overallAvg: overallAvg,
        population: city[`population`],
        score: city.score}
      );
      processedData.push(
        {data: floatingData18,
        color: getColor(city, 2018),
        opacity: 0.9,
        strokeWidth: "1px",
        name: city[`name`],
        overallAvg: overallAvg,
        population: city[`population`],
        score: city.score }
      );
    }
    return processedData;
}

function getFloating(ob, window) {
  var floating = [];
  var dates = Object.keys(ob).sort();
  for(var x=0; x<window; x++) {
    floating[dates[x]] = null;
  }
  for(var i=window; i<dates.length; i++) {
    var value = 0;
    for(var j=window-1; j>=0; j--) {
      value += ob[dates[i-j]];
    }
    floating[dates[i]] = value/window;
  }
  return floating;
}

function removeFloating(display) {
  for(var i=0; i<display.length; i+=1) {
    display.splice(i+1,1);
  }
  return display;
}

class Cities extends React.Component {
  constructor(props) {
    super(props)
    this.recentDisplay = [];
    this.display = [];
    this.displayByScore = [];
    this.displayByPercent = [];
    this.displayByPop = [];
    this.displayByPercent = [];
    this.displayTweetss = [];
    this.displayNonNeutral = [];
    this.displayPhilly = [];
    this.displayNewYork = [];
    this.displayBen = [];
    this.displayPeople = [];
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
      this.display = this.display.concat(processCity(city));
    });

    this.displayPeople = people;

    var processedPhilly = processCity(philly);
    var processedNewYork = processCity(newyork);
    this.displayPhilly.push(processedPhilly);
    this.displayNewYork.push(processedNewYork);
    var processedBen = processCity(ben);
    this.displayBen.push(processedBen);
    this.displayPeople.sort( (a,b) => { return b.score.avgScore - a.score.avgScore } );

    this.displayByScore = this.display.slice();
    for(var i=this.displayByScore.length-1; i>=0; i-=2) {
      this.displayByScore.splice(i,1);
    }
    this.displayByPop = this.displayByScore.slice();
    this.displayByScore.sort( (a,b) => { return b.score.avgScore - a.score.avgScore } );
    this.displayByTweets = this.displayByScore.slice().sort( (a,b) => { return b.score.count - a.score.count });

    var displayPercent = this.displayByScore.slice();
    this.displayNonNeutral = this.displayByScore.slice();
    this.displayNonNeutral.sort( (a,b) => { return b.score.avgNonNeutralScore - a.score.avgNonNeutralScore } );

    var steps = ['percentNegative', 'percentNeutral', 'percentPositive'];
    var data = [];
    var key = "color";
    var extraKeys = [];
    displayPercent.forEach( (item, index) => {
      this.displayByPercent = this.displayByPercent.concat(getStackedItems(item));
    });

  }

  render() {
    return (
      <div className="chartContainer">
        <h1>Quantified Negadelphia</h1>
        <h3>Population by City</h3>
        <ResponsiveORFrame
          size={[ 360, 500 ]}
          responsiveWidth={true}
          data={cities2018}
          projection={'horizontal'}
          rAccessor={d => d.population}
          oAccessor={d => `${d.name} ${(d.population/1000000).toFixed(1)}M`}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name}: ${d.value.toLocaleString()}` }
          style={d => ({ fill:  d.name.match('Philadelphia') ? '#FF2222' : colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          axis={axes}
          oLabel={(d, i) => (<text x={-5} y={5} className="label-bold" textAnchor="end">{d}</text>)}
          margin={{ left: 130, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />

        <ResponsiveORFrame
          size={[ 360, 500 ]}
          responsiveWidth={true}
          data={cities2018}
          projection={'horizontal'}
          rAccessor={d => d.budget}
          oAccessor={d => `${d.name} ${(d.budget).toFixed(1)}B`}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name}: ${d.value.toLocaleString()}` }
          style={d => ({ fill:  d.name.match('Philadelphia') ? '#FF2222' : colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          axis={bAxes}
          oLabel={(d, i) => (<text x={-5} y={5} className="label-bold" textAnchor="end">{d}</text>)}
          margin={{ left: 130, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />

        <ResponsiveORFrame
          size={[ 360, 500 ]}
          responsiveWidth={true}
          data={cities2018}
          projection={'horizontal'}
          rAccessor={d => ((d.budget* 1000000000)/d.population).toFixed(2)}
          oAccessor={d => `${d.name} ${((d.budget * 10000000)/d.population).toFixed(0)}K`}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name}: ${d.value.toLocaleString()}` }
          style={d => ({ fill:  d.name.match('Philadelphia') ? '#FF2222' : colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          axis={bAxes}
          oLabel={(d, i) => (<text x={-5} y={5} className="label-bold" textAnchor="end">{d}</text>)}
          margin={{ left: 130, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />

        <ResponsiveORFrame
          size={[ 360, 400 ]}
          responsiveWidth={true}
          data={allBudget}
          projection={'horizontal'}
          rAccessor={d => (d.value/1000000000).toFixed(2)}
          oAccessor={d => `${d.name} ${(d.value/1000000000).toFixed(2)}B ${(d.percent*100).toFixed(1)}%`}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name}: ${d.value.toLocaleString()}` }
          style={d => ({ fill:  d.name.match('Philadelphia') ? '#FF2222' : color(d.name), stroke: color(d.name), strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          axis={bAxes}
          oLabel={(d, i) => (<text x={-5} y={5} className="label-bold" textAnchor="end">{d}</text>)}
          margin={{ left: 300, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />

        <ResponsiveNetworkFrame
          size={[ 360, 600 ]}
          responsiveWidth={true}
          networkType={{type: "treemap", padding: 0}}
          edges={allBudgetTreemap}
          nodeIDAccessor={"name"}
          nodeStyle={ d => ({
            fill: d.height === 0 ? color(d.name) : "none",
            fillOpacity: 0.5,
            stroke: color(d.name)
          })}
          nodeLabels={d => {
              return d.depth > 1 ? null : (
                <g transform="translate(0,5)">
                  <text
                    fontSize="36"
                    textAnchor="middle"
                    strokeWidth={2}
                  >
                  </text>
                </g>
              )
            }
          }
          margin={{ left: 10, top: 50, bottom: 50, right: 10 }}
        />

        <h3># of Tweets Scraped by City</h3>
        <ResponsiveORFrame
          size={[ 360, 500 ]}
          responsiveWidth={true}
          data={this.displayByTweets}
          projection={'horizontal'}
          rAccessor={d => d.score.count}
          oAccessor={d => `${d.name} ${(d.score.count/1000).toFixed(1)}K`}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name}: ${d.value.toLocaleString()}` }
          style={d => ({ fill:  d.name.match('Philadelphia') ? '#FF2222' : colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          axis={thousandsAxes}
          oLabel={(d, i) => (<text x={-5} y={5} className="label-bold" textAnchor="end">{d}</text>)}
          margin={{ left: 140, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />
        <h3>Average Tweet Sentiment per City 2017</h3>
        <ResponsiveORFrame
          size={[ 360, 500 ]}
          responsiveWidth={true}
          data={this.displayByScore}
          projection={'horizontal'}
          rAccessor={d => d.score.avgScore}
          oAccessor={d => `${d.name} ${d.score.avgScore.toFixed(2)}`}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name}: ${d.value}` }
          style={d => ({ fill: d.name.match('Philadelphia') ? '#FF2222' : colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          axis={scoreAxes}
          oLabel={(d, i) => (<text x={-5} y={5} className="label-bold" textAnchor="end">{d}</text>)}
          margin={{ left: 140, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />
        <h3>Tweet Sentiment by Type and City 2017</h3>
        <ResponsiveORFrame
          size={[ 360, 500 ]}
          responsiveWidth={true}
          data={this.displayByPercent}
          projection={'horizontal'}
          rAccessor={"stepValue"}
          oAccessor={"stepName"}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.funnelKey}: ${d.value}` }
          style={d => ({ fill: d.funnelKey, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.9, strokeWidth: 2 })}
          type={"bar"}
          axis={scoreAxes}
          oLabel={(d, i) => (<text x={-5} y={5} className="label-bold" textAnchor="end">{d}</text>)}
          margin={{ left: 140, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />
        <h3>Avg Non Neutral Sentiment by City 2017</h3>
        <ResponsiveORFrame
          size={[ 360, 500 ]}
          responsiveWidth={true}
          data={this.displayNonNeutral}
          projection={'horizontal'}
          rAccessor={d => d.score.avgNonNeutralScore}
          oAccessor={d => `${d.name} ${d.score.avgNonNeutralScore.toFixed(2)}`}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name}: ${d.value}` }
          style={d => ({ fill: d.name.match('Philadelphia') ? '#FF2222' : colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          axis={scoreAxes}
          oLabel={(d, i) => (<text x={-5} y={5} className="label-bold" textAnchor="end">{d}</text>)}
          margin={{ left: 140, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />
        <h3>Sentiment by City</h3>
        <div>
          <City
            name={this.display[0].name}
            data={this.display.slice(0,2)}
            yExtent={[0,2]}
            removeYear={false}
            showAnnotations={true}
          />
         <City
            name={this.display[2].name}
            data={this.display.slice(2,4)}
            yExtent={[0,2]}
            removeYear={false}
          />
         <City
            name={this.display[4].name}
            data={this.display.slice(4,6)}
            yExtent={[0,2]}
            removeYear={false}
          />
         <City
            name={this.display[6].name}
            data={this.display.slice(6,8)}
            yExtent={[0,2]}
            removeYear={false}
          />
         <City
            name={this.display[8].name}
            data={this.display.slice(8,10)}
            yExtent={[0,2]}
            removeYear={false}
          />
         <City
            name={this.display[10].name}
            data={this.display.slice(10,12)}
            yExtent={[0,2]}
            removeYear={false}
          />
         <City
            name={this.display[12].name}
            data={this.display.slice(12,14)}
            yExtent={[0,2]}
            removeYear={false}
          />
         <City
            name={this.display[14].name}
            data={this.display.slice(14,16)}
            yExtent={[0,2]}
            removeYear={false}
          />
         <City
            name={this.display[16].name}
            data={this.display.slice(16,18)}
            yExtent={[0,2]}
            removeYear={false}
          />
         <City
            name={this.display[18].name}
            data={this.display.slice(18,20)}
            yExtent={[0,2]}
            removeYear={false}
          />
         <City
            name={this.display[20].name}
            data={this.display.slice(20,22)}
            yExtent={[0,2]}
            removeYear={false}
          />
         <City
            name={this.display[22].name}
            data={this.display.slice(22,24)}
            yExtent={[0,2]}
            removeYear={false}
          />
         <City
            name={this.display[24].name}
            data={this.display.slice(24,26)}
            yExtent={[0,2]}
            removeYear={false}
          />
        <h3>Philadelphia 2017 and 2018</h3>
         <City
            name={"Philadelphia"}
            data={this.displayPhilly[0]}
            yExtent={[0,2]}
            removeYear={true}
            showAnnotations={false}
          />
        <h3>New York 2017 and 2018</h3>
         <City
            name={"New York"}
            data={this.displayNewYork[0]}
            yExtent={[0,2]}
            removeYear={true}
          />
        <h3>@bengarvey</h3>
         <City
            name={"@bengarvey"}
            data={this.displayBen[0]}
            yExtent={[-4,4]}
            removeYear={false}
          />

        </div>
        <h3>Average Tweet Sentiment by Person 2017</h3>
        <ResponsiveORFrame
          size={[ 360, 500 ]}
          responsiveWidth={true}
          data={this.displayPeople}
          projection={'horizontal'}
          rAccessor={d => d.score.avgScore}
          oAccessor={d => `${d.name} ${d.score.avgScore.toFixed(2)}`}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name}: ${d.value}` }
          style={d => ({ fill: d.name.match('Philadelphia') ? '#FF2222' : colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          axis={scoreAxes}
          oLabel={(d, i) => (<text x={-5} y={5} className="label-bold" textAnchor="end">{d}</text>)}
          margin={{ left: 160, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />

        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>Is Philadelphia a negative place compared to other cities? I created these charts for a presentation I gave at <a href="https://www.thedatalab.io/the-data-jawn/">Data Jawn 2018</a>. <a href="https://docs.google.com/presentation/d/1QoR-feuV10D-jr-7XEaUZ-hDayDguUpbUtgJz6pGQ_c/edit?usp=sharing">My slides</a>.</p>
          <p>This was a lot of data work to make some fairly straightforward charts. The only interesting stuff is the overlaying of 2018 data on top of 2017, which was surprinsgly easy in semiotic.</p>
          <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javacript, node, python, <a href="https://www.npmjs.com/package/sentiment">sentiment</a>, <a href="https://github.com/taspinar/twitterscraper">twitterscraper</a></p>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default Cities

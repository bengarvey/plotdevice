import React from 'react';
import { ResponsiveXYFrame } from 'semiotic';
import { ResponsiveORFrame, ORFrame } from 'semiotic';
import Nav from './Nav';
import { curveBasis } from 'd3-shape';
import { AnnotationLabel } from 'react-annotation';
import CategoryBar from './CategoryBar';
import PolarGrid from './PolarGrid';
import ImageGrid from './ImageGrid';
var transactions = require('../data/pizza/tidy_pizza.json');
var total = require('../data/pizza/calculated_pizza_total.json');
var user_stats = require('../data/pizza/pizza_user_stats.json');

const formatter = new Intl.DateTimeFormat("en", { year: "numeric" } );

var processed = [];

var annotations = [];
var bumpAnnotations = [];
var processed = [];

const colors = {
  carolyn_score: '#cb0000',
  benjamin_score: '#d99011',
  score: '#e3bf79'
}

const ratings = {
  opg: "Oil Puddle Goodness",
  first_bite: "First Bite Satisfaction",
  slices: "Slices Eaten",
  cheese: "Cheeeeeese",
  crust: "Crust"
}

function nanCheck(val) {
  return val || 0;
}

function yearToDate(year) {
  return new Date(`${year}-01-01T04:00:00Z`);
}

function formatDate(date) {
  return formatter.format(new Date(date));
}

const sharedProps = {
  size: [365,200],
  hoverAnnotation: true,
  margin:{ left: 0, bottom: 30, right: 10, top: 10 }
};

class Pizza extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.process();
  }

  process() {
    this.total = total;
    this.user_stats = user_stats;
    this.transactions = transactions;
    console.log(this.transactions);
    this.benjamin = [...total.sort( function(a,b) { return b.benjamin_score - a.benjamin_score } )];
    this.carolyn = [...total.sort( function(a,b) { return b.carolyn_score - a.carolyn_score } )];
    this.total = [...total.sort( function(a,b) { return b.score - a.score } )];
    this.example = [
      {name: "Example", attribute: "opg", value: 5, notes: "Benjamin", color: colors.benjamin_score},
      {name: "Example", attribute: "cheese", value: 5, notes: "Benjamin", color: colors.benjamin_score},
      {name: "Example", attribute: "slices", value: 5, notes: "Benjamin", color: colors.benjamin_score},
      {name: "Example", attribute: "first_bite", value: 5, notes: "Benjamin", color: colors.benjamin_score},
      {name: "Example", attribute: "crust", value: 5, notes: "Benjamin", color: colors.benjamin_score},
      {name: "Example", attribute: "opg", value: 4, notes: "Carolyn", color: colors.carolyn_score},
      {name: "Example", attribute: "cheese", value: 4, notes: "Carolyn", color: colors.carolyn_score},
      {name: "Example", attribute: "slices", value: 4, notes: "Carolyn", color: colors.carolyn_score},
      {name: "Example", attribute: "first_bite", value: 4, notes: "Carolyn", color: colors.carolyn_score},
      {name: "Example", attribute: "crust", value: 4, notes: "Carolyn", color:  colors.carolyn_score},
    ];

    this.display = [
      {data: processed, color: '#393e41', opacity: 0.7, strokeWidth: "2px"}
    ];
    this.display[0].data.sort( (a, b) => a.date - b.date );
    this.display[0].data.map( (item, i) => {item.id = i; return item;});
  }

  render() {
    return (
      <div>
        <div className="chartContainer overviewContainer">
          <div className="leftOverview">
            <ul className="list--plain">
              <li>
                <img src="../images/ben-fancy.jpg" height="150px" width="150px" className="avatar"/>
              </li>
              <li>
                <h2>Benjamin</h2>
              </li>
              <li><strong>{this.user_stats[0].total_slices} slices eaten</strong></li>
              <li><h3>Top 3</h3>
                <ol className="left-list">
                  <li>{this.benjamin[0].name}</li>
                  <li>{this.benjamin[1].name}</li>
                  <li>{this.benjamin[2].name}</li>
                </ol>
              </li>
            </ul>
          </div>

          <div className="rightOverview">
            <ul className="list--plain">
              <li>
                <img src="../images/carolyn-fancy.png" height="150px" width="150px" className="avatar"/>
              </li>
              <li>
                <h2>Carolyn</h2>
              </li>
              <li><strong>{this.user_stats[1].total_slices} slices eaten</strong></li>
              <li><h3>Top 3</h3>
                <ol className="right-list">
                <li>{this.carolyn[0].name}</li>
                <li>{this.carolyn[1].name}</li>
                <li>{this.carolyn[2].name}</li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
        <div className="chartContainer centeredChart">
        <h2>Rating System</h2>
        <ORFrame
          size={[ 350, 350 ]}
          data={this.example}
          rAccessor={d => d.value}
          rExtent={[0,5]}
          oAccessor={ d => `${d.attribute}` }
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name} ${d.attribute} ${d.value} ${d.notes}` }
          style={d => ({ fill: '#333333', stroke: '#333333', strokeOpacity: 0.0, fillOpacity: 0.0, strokeWidth: 1 })}
          type={"point"}
          projection={"radial"}
          connectorType={d => `${d.notes}`}
          connectorStyle={d => ({fill: d.source.color, stroke: "#666666", strokeOpacity: 0.5, fillOpacity: 0.6}) }
          oLabel={(d, i) => (<text x={ratings[d].length*4} y={3} className="large-text" textAnchor="end">{ratings[d]}</text>)}
          margin={{ left: 40, top: 30, bottom: 30, right: 40 }}
          oPadding={0}
          ordinalAlign={"center"}
          className={"centeredChart"}
          foregroundGraphics={[
              <g transform="translate(0, 200)" key="legend">
                <text key={1} fill={colors.benjamin_score} className='large-text'>
                  Benjamin
                </text>
                <text key={1} y={20} fill={colors.carolyn_score} className='large-text'>
                  Carolyn
                </text>
              </g>
          ]}
        />
        </div>
        <div className="chartContainer">
          <PolarGrid data={this.transactions}/>
        </div>
        <div className="chartContainer">
          <ImageGrid data={this.transactions}/>
        </div>
        <div className="chartContainer">
          <h1>Final rankings</h1>

          <ResponsiveORFrame
            size={[ 450, 550 ]}
            responsiveWidth={true}
            data={this.total}
            projection={'horizontal'}
            rAccessor={['score']}
            oAccessor={d => `${d.name}, ${d.location}`}
            pieceHoverAnnotation={true}
            tooltipContent={ d => `Carolyn: ${d.carolyn_score}, Benjamin: ${d.benjamin_score}, Average: ${d.score}` }
            style={d => ({ fill: colors[d.rName], stroke: '#333333', strokeOpacity: 0.0, fillOpacity: 1, strokeWidth: 2 })}
            type={"clusterbar"}
            oLabel={(d, i) => (<text x={0} y={3} className="large-text" textAnchor="end">{d}</text>)}
            margin={{ left: 240, top: 0, bottom: 50, right: 10 }}
            oPadding={8}
          />

          <div className="notes nextReport">
            <h3>Notes and Sources</h3>
            <p><a href="https://twitter.com/bengarvey/status/1159545686985080832">The only real super food is pizza</a>. Carolyn and I realized one day there were all these tiny pizza places around us we'd never been to. Also, why are my only choices to call the location where pizza is made a "pizza place" vs "pizza joint?" It's like I'm choosing to be in 4th grade forever or the charicature of a cool guy in a tv special. Anyway, we decided to embark on a journey to rate all these pizzas. I would love to say we had a lot of fun stories where we met crazy characters, or I was waiting and witnessed a robbery, or we met the owners, but no. The only specific stories I remember are when we forgot to take a pizza photo. I even went to Nicky B's twice without even realizing it! (we averaged their scores). The real story was us. Me and Carolyn. Building something together in a way that we had done before individually, or maybe with others, but in a way that felt like we were doing it with someone else in the specific way we would have done it alone. What a great project. </p>
            <p>As I mentioned, some places we went twice (Nicky B's and Brunos). When that happens, we average the scores between the pizzas from the same location. The rating methodology is wildly unscientific, especially because it contains at least one metric that is highly dependent on other factors: slices eaten. Some pizzas are more expensive and thicker and they lost a point or two becaue we couldn't eat 4 slices each. Oh well. Every pizza was a large cheese, so at least we controlled for that. It's likely this hurt speciality pizza places like Brooklyn Pizza or Tacconelli's. We skipped over places who are fancy pizza only like Pizza Crime in Haddonfield and Bricco in Haddon Township.</p>
            <p>I'm happy with the results. I used to live right near Antonino's so I'm not surprised at all with it sharing the top spot. ALL THE PIZZA WAS GOOD. There wasn't a single place where I thought the food was bad, but I do feel confident the top half of our list is better than the second half.</p>
            <p>If you want to read about how I do the data transformations for a project like this, read my post on <a href="https://bengarvey.com/2020/10/12/schmedium-data-building-small-data-pipelines-with-bash/">Schmedium Data</a>.</p>
            <p>Source: <a href="https://docs.google.com/spreadsheets/d/146xfQ0yq4UM4D3v-vHO3dFOA0_3V-wFbOvxHu9bTb5M/edit?usp=sharing">Google sheet of source data</a></p>
            <p>Tech: Semiotic, javascript, csvkit, bash, html, css, google sheets</p>
          </div>
          <Nav/>
        </div>
      </div>
    );
  }
}

export default Pizza

import React from 'react';
import { ResponsiveXYFrame } from 'semiotic';
import { ResponsiveORFrame } from 'semiotic';
import Nav from './Nav';
import { curveBasis } from 'd3-shape';
import { AnnotationLabel } from 'react-annotation';
import CategoryBar from './CategoryBar';
import PolarGrid from './PolarGrid';
var transactions = require('../data/pizza/tidy_pizza.json');
var total = require('../data/pizza/calculated_pizza_total.json');

const formatter = new Intl.DateTimeFormat("en", { year: "numeric" } );

var processed = [];

var annotations = [];
var bumpAnnotations = [];
var processed = [];

const colors = {
  carolyn_score: '#ff0000',
  benjamin_score: '#008000',
  score: '#666666'
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
    this.transactions = transactions;
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
                <h3>Benjamin</h3>
              </li>
              <li>51 Slices Eaten</li>
              <li>Top 3
                <ol className="left-list">
                  <li>Antonino's (Audubon)</li>
                  <li>Joe's (Pennsauken)</li>
                  <li>Tony's (Haddonfield)</li>
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
                <h3>Carolyn</h3>
              </li>
              <li>51 Slices Eaten</li>
              <li>Top 3
                <ol className="right-list">
                  <li>Antonino's (Audubon)</li>
                  <li>Joe's (Pennsauken)</li>
                  <li>Tony's (Haddonfield)</li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
        <div className="chartContainer">
          <PolarGrid data={this.transactions}/>
        </div>
        <div className="chartContainer">
          <h1>Final rankings</h1>

          <ResponsiveORFrame
            size={[ 350, 350 ]}
            responsiveWidth={true}
            data={this.total}
            projection={'horizontal'}
            rAccessor={['score']}
            oAccessor={d => `${d.name}, ${d.location}`}
            pieceHoverAnnotation={true}
            tooltipContent={ d => `Carolyn: ${d.carolyn_score}, Benjamin: ${d.benjamin_score}, Average: ${d.score}` }
            style={d => ({ fill: colors[d.rName], stroke: '#333333', strokeOpacity: 0.0, fillOpacity: 1, strokeWidth: 2 })}
            type={"clusterbar"}
            oLabel={(d, i) => (<text x={0} y={3} className={i[0].className} textAnchor="end">{d}</text>)}
            margin={{ left: 140, top: 0, bottom: 50, right: 10 }}
            oPadding={8}
          />

          <ResponsiveORFrame
            size={[ 350, 350 ]}
            responsiveWidth={true}
            data={this.total}
            projection={'horizontal'}
            rAccessor={['carolyn_score', 'benjamin_score']}
            oAccessor={d => `${d.name}, ${d.location}`}
            pieceHoverAnnotation={true}
            tooltipContent={ d => `Carolyn: ${d.carolyn_score}, Benjamin: ${d.benjamin_score}, Average: ${d.score}` }
            style={d => ({ fill: colors[d.rName], stroke: '#333333', strokeOpacity: 0.0, fillOpacity: 1, strokeWidth: 2 })}
            type={"clusterbar"}
            oLabel={(d, i) => (<text x={0} y={3} className={i[0].className} textAnchor="end">{d}</text>)}
            margin={{ left: 140, top: 0, bottom: 50, right: 10 }}
            oPadding={8}
          />

          <div className="notes nextReport">
            <h3>Notes and Sources</h3>
            <p>Some notes and link to Carolyn's blog.</p>
            <p>Source: <a href="https://docs.google.com/spreadsheets/d/1qMZzIS_gpV3Tw-sD1QKWmhwUgzdbbcW0hb2n2Iwdd4Y/edit?usp=sharing">Google sheet of sources</a></p>
            <p>Tech: Semiotic, javascript, csvkit, html, css</p>
          </div>
          <Nav/>
        </div>
      </div>
    );
  }
}

export default Pizza

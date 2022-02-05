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
            <p>This is an update to my previous <a href="http://plotdevice.bengarvey.com/auto">exploration of automobile deaths</a>, where I looked at various factors and made a case for why I think the reduction in alcohol related automobile deaths was the most important cause for the decline in overall deaths since 1971. We only have stats on this back to 1982, but I don't think it's a stretch to say this trend started earlier.</p>
            <p>These charts have 3 additional years of data and I did a better job at documenting my sources. See the google sheet below. The data from 1982 - 1994 required some transformation from the raw data as it was segmented by age. It's also not entirely clear to me whether they count non-passenger deaths (ie. pedestrians, bicyclists) in the 1982-1994 data.</p>
            <p>I did this update during the great COVID-19 quarantine of 2020, and it is surreal for someone like me who has looked at the horrific automobile deaths for so long and wondered why it wasn't a bigger issue, to now witness the deaths of over 150,000 Americans and there's almost no moment of collective grief we experience with a plane crash or even the death of a single beloved celebrity. I haven't done any COVID-19 related data projects, but I've admired the work others have done to communicate the reasons behind policy decisions (for the policy makers who listen). Maybe we'll offset some of them because of how much less we're driving this year.</p>
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

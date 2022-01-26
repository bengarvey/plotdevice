import React from 'react';
import { ResponsiveXYFrame } from 'semiotic';
import { ResponsiveORFrame } from 'semiotic';
import Nav from './Nav';
import { curveBasis } from 'd3-shape';
import { AnnotationLabel } from 'react-annotation';
var transactions = require('../data/autodeaths.json');

const formatter = new Intl.DateTimeFormat("en", { year: "numeric" } );

var processed = [];

const axes = [{
    orient: 'left', ticks: 3,
    tickFormat: d => d ?
    <text className='normal' style={{ textAnchor: "end" }} fontSize="12px" y={5} x={2}>{d}</text> : ''
  },
  {
    orient: 'bottom', ticks: -1,
    tickFormat: d => ''
  }
];

const deathAnnotations = [
  { type: "react-annotation", label: "Peak 54,589, 1971", y: 58500, x: 1974  },
  { type: "react-annotation", label: "36,560", y: 42000, x: 2018  }
]

const COLORS = {
  deaths: '#393e41',
  pop: '#da4167',
  miles: '#15b097',
  alc: '#fcde9c',
  nonAlc: '#f4d35e',
  annotationInfo: "#009ddc",
  annotation: "#666666",
  gasAdjusted: '#d86641'
}

function formatNumber(num) {
  if (num == null || typeof(num) === 'undefined') {
    return num;
  }
  return num.toLocaleString();
}

function nanCheck(val) {
  return val || 0;
}

function yearToDate(year) {
  if (typeof(year) == 'undefined') {
    debugger;
    return year;
  }
  return formatter.format(new Date(`${year}-01-01T00:00:00Z`));
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
    this.display = [
      { data: [] },
      { data: [] },
      { data: [] },
      { data: [] }
    ];
    this.process(transactions);
  }

  process(transactions) {
    let years = transactions;

    let ALL = 0;
    let ALLLINE = 1;
    let ALC = 2;
    let NONALC = 3;

    years.forEach( item => {
      this.display[ALL].data.push({deaths: parseInt(item.year) < 1982 ? parseInt(item.deaths) : null, year: item.year});
      this.display[ALLLINE].data.push({deaths: 0, year: item.year});
      this.display[NONALC].data.push({deaths: item.non_alcohol_related == "" ? null : parseInt(item.non_alcohol_related), year: item.year});
      this.display[ALC].data.push({deaths: item.alcohol_related == "" ? null : parseInt(item.alcohol_related), year: item.year});
    })

  }

  render() {
    return (
      <div>
        <div className="chartContainer overviewContainer">
          <div className="leftOverview">
            <ul className="list--plain">
              <li>
                <svg height="100" width="100">
                  <circle class="icon" cx="50" cy="50" dx="60" dy="60" r="10" stroke="white" stroke-width="3" fill="white" />
                </svg>
                Benjamin
              </li>
              <li>51 Slices Eaten</li>
              <li>Top 3
                <ol>
                  <li>Antonino's (Audubon)</li>
                  <li>Joe's (Pennsauken)</li>
                  <li>Tony's (Haddonfield)</li>
                </ol>
              </li>
            </ul>
          </div>

          <div className="rightOverview">
            <ul className="list--plain">
              <li className="list--plain">
                <svg height="100" width="100">
                  <circle class="icon" cx="50" cy="50" dx="60" dy="60" r="10" stroke="white" stroke-width="3" fill="white" />
                </svg>
                Carolyn
              </li>
              <li>51 Slices Eaten</li>
              <li>Top 3
                <ol>
                  <li>Antonino's (Audubon)</li>
                  <li>Joe's (Pennsauken)</li>
                  <li>Tony's (Haddonfield)</li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
        <div className="chartContainer">
          Grid of polar charts
        </div>
        <div className="chartContainer">
          <h1>Final rankings</h1>

          <ResponsiveXYFrame
            size={[350, 200]}
            responsiveWidth={true}
            lines={transactions}
            defined={d => d.deaths !== null}
            xAccessor={d => yearToDate(d.year)}
            yAccessor={d => d.deaths}
            lineType={{type:"line", interpolator: curveBasis}}
            yExtent={[0]}
            lineStyle={(d) => {
              return { stroke: COLORS.deaths, fill: d.color, strokeWidth: 2, opacity: 1 };
            }}
            hoverAnnotation={true}
            annotations={deathAnnotations}
            axes={[
              { orient: 'left', tickFormat: d => formatNumber(d), className: 'normal', ticks: 5},
              { orient: 'bottom', ticks: 5, className: 'normal', tickFormat: d => yearToDate(d) }
            ]}
            margin={{top: 10, left: 40, right: 30, bottom: 50}}
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

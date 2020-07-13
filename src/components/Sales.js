import React from 'react';
import { ResponsiveXYFrame } from 'semiotic';
import { ResponsiveORFrame } from 'semiotic';
import Nav from './Nav';
import { curveBasis } from 'd3-shape';
import { AnnotationLabel } from 'react-annotation';
var transactions = require('../data/da.json');

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

const orAnnotations = [
  { type: "or",
    label: "Launch",
    date: '2011-03-01',
    paid_quantity: 120},
  { type: "or",
    label: "Morning Adventure launch",
    date: '2014-09-01',
    paid_quantity: 50},
  { type: "or",
    label: "COVID-19 promo",
    date: '2020-03-01',
    paid_quantity: 220}

]

const COLORS = {
  paid_quantity: "#339966",
  free_quantity: "#3366cc"
}
const rAccessor = ["paid_quantity", "free_quantity"];

function processData(items) {
}

function nanCheck(val) {
  return val || 0;
}

function formatDate(date) {
  return formatter.format(new Date(date));
}

class Sales extends React.Component {
  constructor(props) {
    super(props);
    let paid = JSON.parse(JSON.stringify(transactions));
    let free = JSON.parse(JSON.stringify(transactions));
    paid = paid.map(d => {d.key = 'paid'; return d;});
    free = free.map(d => {d.key = 'free'; return d;});
    this.display = [
      { data: paid, color: '#339966' },
      { data: free, color: '#3366cc' }
    ];
    this.process();
  }

  process() {
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>Dungeon Adventure Sales</h1>
        <h3>2011 - 2020 Green paid, blue free</h3>
        <ResponsiveORFrame
          size={[ 350, 250 ]}
          responsiveWidth={true}
          data={this.display[0].data}
          projection={'vertical'}
          rAccessor={rAccessor}
          oAccessor={d => {
            return d.date;
          }}
          annotations={orAnnotations}
          pieceHoverAnnotation={true}
          tooltipContent={d => {
            return `${d.date}\n
              Paid: ${d.paid_quantity}\n
              Free: ${d.free_quantity}`;
          }}
          style={d => (
            { fill: COLORS[rAccessor[d.rIndex]], stroke: COLORS[rAccessor[d.rIndex]], strokeOpacity: 0.0, fillOpacity: 1, strokeWidth: 2 }
          )}
          type={"bar"}
          axis={axes}
          oLabel={(d, a, i) => {
            return  i % 12 == 0 ?
              (<text className="normal" textAnchor="right">{formatDate(`${d}`)}</text>)
            : '';
          }}
          margin={{ left: 35, top: 10, bottom: 40, right: 30 }}
          oPadding={0}
        />

        <h3>Cumulative sales count, includes coupons</h3>
        <ResponsiveXYFrame
          size={[350, 200]}
          responsiveWidth={true}
          lines={this.display}
          defined={d => d.paid_quantity !== null}
          lineDataAccessor={d => d.data}
          xAccessor={d => new Date(d.date)}
          yAccessor={d => d.paid_quantity}
          yExtent={[0]}
          lineStyle={(d) => ({ stroke: COLORS.paid_quantity, strokeWidth: 1, opacity: 1 })}
          lineType={{type:"cumulative"}}
          hoverAnnotation={true}
          axes={[
            { orient: 'left', tickFormat: d => d, className: 'normal'},
            { orient: 'bottom', ticks: 5, className: 'normal', tickFormat: d => formatDate(d) }
          ]}
          margin={{top: 10, left: 35, right: 30, bottom: 50}}
        />

        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>The pandemic seems to have broken all the charts and you can add sales of <a href="https://kidsdungeonadventure.com">Kids Dungeon Adventure</a> to that list. This is the <a href="https://bengarvey.com/2011/04/27/my-e-commerce-stack/">first time in a while</a> I've shared the sales numbers for my 2011 kids RPG. You see a spike at launch and when I released a second product called <a href="http://kidsmorningadventure.com">Kids Morning Adventure</a>, but I noticed an uptick in 2020 with everyone on lockdown. The last thing I want to be is a COVID-19 profiteer, so <a href="https://twitter.com/bengarvey/status/1240248928571965441">I generated a free coupon code</a> and donated the rest to charity. People used the code, but many paid full price so we ended up donating over $800 to the <a href="https://foodbanksj.org/">Food Bank of South Jersey</a>, which does contactless delivery of food to families in need.</p>
          <p>Source: A manual download from my e-junkie account</p>
          <p>Tech: Semiotic, javascript, csvkit, html, css</p>
        </div>
        <Nav/>
      </div>
    );
  }
}

export default Sales

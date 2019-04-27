import React from 'react';
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';
import { curveBasis } from 'd3-shape';
import { AnnotationLabel } from 'react-annotation';
import Categrid from './Categrid';
var transactions = require('../data/owenbudget.json');

const formatter = new Intl.DateTimeFormat("en", { month: "short" } );

var annotations = [];
var bumpAnnotations = [];
var processed = [];

function processData(items) {
    var result = items.map( (item, index) => {
      item.balance = parseFloat(item.balance.replace('$',''));
      item.date = new Date(item.date);
      return item;
    });
    return result;
}

function yearToDate(year) {
  return new Date(`${year}-01-01T04:00:00Z`);
}

function formatDate(date) {
  return formatter.format(new Date(date));
}

class Cafe extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.process();
  }

  process() {
    processed = processData(transactions);
    this.display = [
      {data: processed, color: '#393e41', opacity: 0.7, strokeWidth: "2px"}
    ];

    this.display[0].data.sort( (a, b) => a.date - b.date );
    this.display[0].data.map( (item, i) => {item.id = i; return item;});
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>Owen's Cafeteria Expenes</h1>
        <h3>Lunch expenses for 2018</h3>
        <ResponsiveXYFrame
          size={[350, 300]}
          responsiveWidth={true}
          lines={this.display}
          defined={d => d.balance !== null}
          lineDataAccessor={d => d.data}
          xAccessor={d => new Date(d.date)}
          yAccessor={d => d.balance}
          lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:d.opacity })}
          lineType={{type:"line"}}
          hoverAnnotation={true}
          axes={[
            { orient: 'left', tickFormat: d => d },
            { orient: 'bottom', ticks: 5, tickFormat: d => formatDate(d) }
          ]}
          margin={{top: 10, left: 30, right: 45, bottom: 50}}
          annotations={annotations}
        />
        <Categrid data={[5,10,1,3]} size={[500,500]}/>
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>This is my son's cafeteria transaction history so far for the 2018 school.</p>
          <p>Sources: The school lunch portal site</p>
          <p>Tech: Semiotic, javascript, html, css, Excel</p>
        </div>
        <Nav/>
      </div>
    );
  }
}

export default Cafe
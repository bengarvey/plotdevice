import React from 'react';
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';
import { curveBasis } from 'd3-shape';
import { AnnotationLabel } from 'react-annotation';
import Categrid from './Categrid';
import CategoryBar from './CategoryBar';
var transactions = require('../data/owenbudget.json');

const formatter = new Intl.DateTimeFormat("en", { month: "short" } );

var annotations = [];
var bumpAnnotations = [];
var processed = [];

function processData(items) {
    var result = items.map( (item, index) => {
      item.balance = parseFloat(item.balance.replace('$',''));
      item.item_amount = parseFloat(item['item amount'].replace('$',''));
      item.debit = nanCheck(parseFloat(item.debit.replace('$','')));
      item.credit = parseFloat(item.credit.replace('$',''));
      item.date = new Date(item.date);
      return item;
    });
    result = result.filter( (item) => {
      if (item.name == "deposit") {
        debugger;
        var x = 0;
      }
      return item.debit > 0 });
    return result;
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

class Cafe extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.process();
  }

  process() {
    processed = processData(transactions);
    this.cafeData = processed.sort( (a,b) => a.item - b.item );
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
        <h3>Balance for the 2018 - 2019 School Year</h3>
        <ResponsiveXYFrame
          size={[550, 300]}
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

        <h3>Cumulative Expenses for the 2018 - 2019 School Year</h3>
        <ResponsiveXYFrame
          size={[550, 300]}
          responsiveWidth={true}
          lines={this.display}
          defined={d => d.balance !== null}
          lineDataAccessor={d => d.data}
          xAccessor={d => new Date(d.date)}
          yAccessor={d => d.debit}
          lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:d.opacity })}
          lineType={{type:"cumulative"}}
          hoverAnnotation={true}
          axes={[
            { orient: 'left', tickFormat: d => d },
            { orient: 'bottom', ticks: 5, tickFormat: d => formatDate(d) }
          ]}
          margin={{top: 10, left: 30, right: 45, bottom: 50}}
          annotations={annotations}
        />

        <Categrid data={this.cafeData} size={[1000,200]} color="item" value="debit" title="Categrid of Expenses for the 2018 - 2019 School Year"/>

        <CategoryBar data={transactions} value="debit" category="item" color="item"/>

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

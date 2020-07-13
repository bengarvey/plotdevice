import React from 'react';
import { ResponsiveXYFrame, ResponsiveNetworkFrame } from 'semiotic';
import Nav from './Nav';
import { curveBasis } from 'd3-shape';
import { AnnotationLabel } from 'react-annotation';
import Categrid from './Categrid';
import CategoryBar from './CategoryBar';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { scaleOrdinal } from 'd3-scale';

const color = scaleOrdinal(schemeCategory10);


var transactions = require('../data/philly2017.json');
//transactions = transactions.slice(0,5000);

const formatter = new Intl.DateTimeFormat("en", { month: "short" } );

var annotations = [];
var bumpAnnotations = [];
var processed = [];

const levels = ["department_title", "doc_ref_no_prefix_definition", "vendor_name"];
const val = "transaction_amount";
const cat = levels[levels.length-1];

function processData(items) {
    var result = items.map( (item, index) => {
      item.transaction_amount = nanCheck(parseFloat(item.transaction_amount.replace('$','')));
      item.balance = 0;
      item.date = new Date(item.check_date);
      delete(item.check_date);
      return item;
    });
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

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function transformData(data) {
  var newData = { name :"root", children : [] };

  // For each data row, loop through the expected levels traversing the output tree
  data.forEach(function(d){
      // Keep this as a reference to the current level
      var depthCursor = newData.children;
      // Go down one level at a time
      levels.forEach(function( property, depth ){

          // Look to see if a branch has already been created
          var index;
          depthCursor.forEach(function(child,i){
              if ( d[property] == child.name ) index = i;
          });
          // Add a branch if it isn't there
          if ( isNaN(index) ) {
              depthCursor.push({ name : d[property], children : []});
              index = depthCursor.length - 1;
          }
          // Now reference the new child array as we go deeper into the tree
          depthCursor = depthCursor[index].children;
          // This is a leaf, so add the last element to the specified branch
          if ( depth === levels.length - 1 ) {
            if (depthCursor.length < 1) {
              depthCursor.push({ name : d[levels[levels.length-1]], value: d.transaction_amount });
            }
            else {
              depthCursor[0].value += d.transaction_amount;
            }
          }
      });
  });
  return newData;
}

class Philly extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.process();
  }

  process() {
    processed = processData(transactions);
    this.raised = transformData(processed);
    //this.cafeData = processed.sort( (a,b) => (a.vendor_name > b.vendor_name) ? 1 : -1 );
    this.cafeData = processed.sort( (a,b) => (b.date - a.date));
    const total = this.cafeData.reduce((prev, cur) => prev + cur.transaction_amount, 0);
    this.display = [
      {data: processed, color: '#393e41', opacity: 0.7, strokeWidth: "2px"}
    ];
    this.display[0].data.sort( (a, b) => a.date - b.date );
    this.display[0].data.map( (item, i) => {item.id = i; return item;});
  }

  render() {
    return (
      <div className="chartContainerWide">
        <h1>Philadelphia esxpenes</h1>
        <h3>2017</h3>
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
        <ResponsiveXYFrame
          size={[350, 300]}
          responsiveWidth={true}
          lines={this.display}
          defined={d => d.balance !== null}
          lineDataAccessor={d => d.data}
          xAccessor={d => new Date(d.date)}
          yAccessor={d => d.transaction_amount}
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

        <ResponsiveNetworkFrame
          size={[ 360, 700 ]}
          responsiveWidth={true}
          networkType={{type: "treemap", padding: 2, margin: 0}}
          edges={this.raised}
          nodeIDAccessor={"name"}
          nodeStyle={ d => ({
            fill: d.height === 0 ? color(d.name) : "none",
            fillOpacity: 0.5,
            stroke: d.height === 0 ? color(d.name) : 'rgba(0,0,0,0)'
          })}
          hoverAnnotation={[
            {
              type: "highlight",
              style: d => ({
                fill: color(d.depth),
                stroke: color(d.depth),
                fillOpacity: 0.6
              })
            },
            { type: "frame-hover" }
          ]}
          tooltipContent={ d => (
            <div className="tooltip-content">
              <p>{d.value}</p>
              {d.parent ? <p>{d.parent.data.name}</p> : undefined}
              {d.parent.parent ? <p>{d.parent.parent.data.name}</p> : undefined}
              <p>{d.data.name}</p>
            </div>)
          }
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

        <CategoryBar color={color} data={transactions} limit={16} value={val} category={cat}/>

        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>Sources: Open Data Philly</p>
          <p>Tech: Semiotic, javascript, html, css, Excel</p>
        </div>
        <Nav/>
      </div>
    );
  }
}

export default Philly

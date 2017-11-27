import React from 'react';
import { ResponsiveORFrame } from 'semiotic';
import Nav from './Nav';
import { Chance } from "chance";
import { scaleLinear } from "d3-scale";
import { sum, max } from "d3-array";
import { curveMonotoneX } from "d3-shape";
import PD from '../lib/pd.js';

var pd = new PD();
var chance = new Chance();

var total = 3000;
var items = [];

const axis = {
    orient: 'left',
    tickFormat: d => d
};

for(var i=0; i<total; i++) {
  items.push(getRandomDatum());
}

items.forEach( function(d) {
  var cid = d.client_id;
  var metric = d.metric;
  delete(d.metric);
  delete(d.client_id);
  var keys = Object.keys(d);
  //items = items.concat(processItems(cid, keys, d));
});

function processItems(cid, keys, d) {
  var items = [];
  keys.forEach( function(k) {
    var item = {
      value: d[k],
      cid: cid,
      date: k,
    };
    items.push(item);
  });
  return items;
}

function getRandomDatum() {
  return { value: chance.integer({min: 0, max: 300}),
           date: chance.date(),
           color: pd.getColor(),
           metric: "random",
           cid: chance.integer({"min": 1, "max": 30})
  };
}

var modified = [];
items.forEach( function(d, i) {
  var item = {
    date: d.date,
    value: d.value != "" ? d.value : null,
    cid: d.cid,
    month: new Date(d.date).getMonth(),
    day: new Date(d.date).getDay(),
    year: new Date(d.date).getYear(),
    ms: new Date(d.date).getTime(),
    color: d.color
  };
  modified.push(item);
});

modified.sort( function(a,b) { return a.cid - b.cid; } );

const Joy = () => (
  <div className="chartContainer">
    <h1>Joy Plot Example</h1>
    <h3>What can we do with joy plots?</h3>
    <ResponsiveORFrame
      size={[ 200, 550 ]}
      responsiveWidth={true}
      data={modified}
      type={"bar"}
      projection={"horizontal"}
      oAccessor={d => d.cid}
      rAccessor={d => d.ms}
      hoverAnnotations={true}
      summaryType={{ type: "joy", amplitude: 40, curve: curveMonotoneX, binValue: d => sum(d.map( p => p.value)) }}
      summaryStyle={d => ({
        fill: d.color,
        stroke: "rgba(0,0,0,0)",
        strokeWidth: 1,
        opacity: 1
      })}
      oLabel={d => <text  y={-5} x={-16} fontSize="12px">{d}</text>}
      margin={{ left: 20, top: 30, bottom: 0, right: 10 }}
      oPadding={20}
    />
    <div className="notes nextReport">
      <h3>Notes and Sources</h3>
      <p>Tech: <a href="https://emeeks.github.io/semiotic/#/">Semiotic</a>, javascript</p>
    </div>
    <Nav/>
  </div>
)

export default Joy

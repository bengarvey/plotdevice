import React from 'react';
import { XYFrame } from 'semiotic';
import { curveBasis } from 'd3-shape';
import AutoDescription from './AutoDescription';
import AutoLegend from './AutoLegend';
import AutoSketch from './AutoSketch';
const auto = require('../data/auto.json');

const colors = {
  deaths: '#393e41',
  pop: '#da4167',
  miles: '#15b097',
  alc: '#fcde9c',
  nonAlc: '#f4d35e',
  annotationInfo: "#009ddc",
  annotation: "#666666",
  gasAdjusted: '#d86641'
}

var modified = {
  deaths: [],
  deathsBeforeAlcData: [],
  alcohol: [],
  nonAlcohol: [],
  pop: [],
  miles: [],
  gasRaw: [],
  gasAdjusted: []
};


function calcNonAlcDeaths(deaths, alc) {
  if (alc == null) {
    return null;
  }
  else {
    return deaths - alc;
  }
}

function hideModernDeaths(deaths, alc, year) {
  return alc === null ? deaths : null;
}

auto.forEach( function(d) {
  modified.deaths.push(
    {y: d.Deaths, x: yearToDate(d.Year), type:'death'});
  modified.deathsBeforeAlcData.push(
    {y: hideModernDeaths(d.Deaths, d['Alcohol related deaths'], d.Year), x: yearToDate(d.Year), type:'death'});
  modified.alcohol.push(
    {y: d['Alcohol related deaths'], x: yearToDate(d.Year), type:'alcohol'});
  modified.nonAlcohol.push(
    {y: calcNonAlcDeaths(d.Deaths, d['Alcohol related deaths']), x: yearToDate(d.Year), type:'non-alcohol'});
  modified.pop.push(
    {y: d.Population, x: yearToDate(d.Year), type: 'pop'});
  modified.miles.push(
    {y: d['Vehicle miles travelled (billions)'], x: yearToDate(d.Year), type: 'miles'});
  modified.gasRaw.push(
    {y: d.gasPriceRaw, x: yearToDate(d.Year)}
  );
  modified.gasAdjusted.push(
    {y: d.gasPriceAdjusted, x: yearToDate(d.Year)}
  );
});

function yearToDate(year) {
  return new Date(`${year}-01-01T04:00:00Z`);
}

function createDate(str) {
  return new Date(`${str}T04:00:00Z`);
}

var deathDisplay = [
  {data: modified.deaths, color: colors.deaths, renderMode: "normal"}
];

var popDisplay = [
  {data: modified.pop, color: colors.pop}
];

var milesDisplay = [
  {data: modified.miles, color: colors.miles}
];

var gasDisplay = [
  {data: modified.gasAdjusted, color: colors.gasAdjusted}
];


var alcDisplay = [
  {data: modified.nonAlcohol, color: colors.nonAlc, fillOpacity: 0.9},
  {data: modified.alcohol, color: colors.alc, fillOpacity: 0.9}
];

const popAnnotations = [
  { type: 'x', x: yearToDate(1968),
    note: { label: "Seat belts req", align: "middle", wrap: 50},
    color: colors.annotation, dy: -10, dx: -10, connector: { end: "none" } },
  { type: "x", x: yearToDate(1984),
    note: { label: "NY seat belt law", align: "middle", wrap: 100},
    color: colors.annotation, dy: -5, dx: 0, connector: { end: "none" } },
  { type: "x", x: yearToDate(1994),
    note: { label: "Seat belt laws: 90% of states", align: "middle", wrap: 500},
    color: colors.annotation, dy: -20, dx: 7, connector: { end: "none" } },
  { type: "x", x: yearToDate(1998),
    note: { label: "Airbags req", align: "middle", wrap: 500},
    color: colors.annotation, dy: -5, dx: 35, connector: { end: "none" } },
  { type: "x", x: createDate("1945-08-15"),
    note: { label: "WW2 Ends", align: "middle", wrap: 500},
    color: colors.annotation, dy: -20, dx: 0, connector: { end: "none" } },
  { type: "x", x: createDate("1941-12-07"),
    note: { label: "WW2 Begins", align: "right", wrap: 500},
    color: colors.annotation, dy: -5, dx: 0, disable:["connector"] }
];

var sharedMileAnnotationProps = {
  dx: 65,
  dy: 150,
  color: '#aaa',
  className: 'recession'
}

var mileAnnotations = [
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("2007-12-01") }, { x: createDate("2009-06-01") }],
    label: "Great Recession"
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1929-04-01") }, { x: createDate("1933-03-01") }],
    label: "Great Depression",
    dy: 20,
    dx: -5,
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("2001-03-01") }, { x: createDate("2001-11-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1990-07-01") }, { x: createDate("1991-03-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1981-07-01") }, { x: createDate("1982-11-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1980-01-01") }, { x: createDate("1980-07-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1973-11-01") }, { x: createDate("1975-03-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1969-12-01") }, { x: createDate("1970-11-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1960-04-01") }, { x: createDate("1961-02-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1957-08-01") }, { x: createDate("1958-04-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1954-07-01") }, { x: createDate("1954-05-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1948-11-01") }, { x: createDate("1949-10-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1945-02-01") }, { x: createDate("1945-10-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1937-05-01") }, { x: createDate("1938-06-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1926-10-01") }, { x: createDate("1927-11-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1923-05-01") }, { x: createDate("1924-06-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1920-01-01") }, { x: createDate("1921-06-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1918-08-01") }, { x: createDate("1919-03-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1913-01-01") }, { x: createDate("1914-12-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1910-01-01") }, { x: createDate("1912-01-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1907-05-01") }, { x: createDate("1908-06-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1902-09-01") }, { x: createDate("1904-08-01") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: createDate("1899-06-01") }, { x: createDate("1900-12-01") }],
    disable:['connector','note']
  }
];

var sharedProps = {
  size: [365,200],
  xAccessor: "x",
  yAccessor: "y",
  lineDataAccessor: "data",
  hoverAnnotation: true,
  margin:{ left: 0, bottom: 30, right: 10, top: 10 }
};

const Auto = () => (
  <div className="chartContainerLeft">
    <h1>US Auto Fatalities 1899 - 2015</h1>
    <h3>Why have deaths decreased since 1972?</h3>
    <div className="container deathPopulation">
    <XYFrame
      { ...sharedProps }
      lines={deathDisplay}
      defined={d => d.y !== null}
      lineDataAccessor="data"
      lineType={{type:"line", interpolator: curveBasis}}
      lineRenderMode={d => d.renderMode}
      lineStyle={d => ({stroke: d.color, strokeWidth: "2px" })}
      customLineType={{ type: "dividedLine"}}
      axes={[
        { orient: 'bottom', ticks: 10, tickFormat: d => new Date(d).getFullYear() }
      ]}
      margin={{ left: 0, bottom: 30, right: 10, top: 40 }}
    />
    </div>

    <div className="container deathMiles">
    <XYFrame
      { ...sharedProps }
      lines={deathDisplay}
      defined={d => d.y !== null}
      lineDataAccessor="data"
      xAccessor="x"
      yAccessor="y"
      lineType={{type:"line", interpolator: curveBasis}}
      lineRenderMode={"normal"}
      lineStyle={d => ({stroke: d.color, strokeWidth: "2px" })}
      customLineType={{ type: "dividedLine"}}
      margin={{left: 0, bottom: 40, right: 10, top: 10}}
      axes={[
        { orient: 'bottom', ticks: 10, tickFormat: d => new Date(d).getFullYear()}
      ]}
    />
    </div>

    <div className="container population">
    <XYFrame
      { ...sharedProps }
      lines={popDisplay}
      defined={d => d.y !== null}
      lineDataAccessor="data"
      xAccessor="x"
      yAccessor="y"
      hoverAnnotation={true}
      lineRenderMode={"normal"}
      lineType={{type:"line", interpolator: curveBasis}}
      lineStyle={d => ({stroke: d.color, strokeWidth: "2px" })}
      customLineType={{ type: "dividedLine"}}
      axes={[
        { orient: 'bottom', ticks: 10, tickFormat: d => '' }
      ]}
      margin={{ left: 0, bottom: 30, right: 10, top: 40 }}
      annotations={popAnnotations}
    />
    </div>

    <div className="container miles">
    <XYFrame
      { ...sharedProps }
      size={[565, 200]}
      lines={milesDisplay}
      defined={d => d.y !== null}
      lineDataAccessor="data"
      xAccessor="x"
      yAccessor="y"
      hoverAnnotation={true}
      lineType={{type:"line", interpolator: curveBasis}}
      lineRenderMode={"normal"}
      lineStyle={d => ({stroke: d.color, strokeWidth: "2px" })}
      customLineType={{ type: "dividedLine"}}
      annotations={mileAnnotations}
      margin={{left: 0, bottom: 30, right: 210, top: 10}}
      axes={[
        { orient: 'bottom', ticks: 10, tickFormat: d => '', stroke: '#FFFFFF' }
      ]}

    />
    </div>

    <div className="container gas">
    <XYFrame
      { ...sharedProps }
      lines={gasDisplay}
      defined={d => d.y !== null}
      lineDataAccessor="data"
      xAccessor="x"
      yAccessor="y"
      hoverAnnotation={true}
      lineType={{type:"line", interpolator: curveBasis}}
      lineRenderMode={"normal"}
      lineStyle={d => ({stroke: d.color, strokeWidth: "2px" })}
      margin={{left: 0, bottom: 30, right: 10, top: 10}}
      axes={[
        { orient: 'bottom', ticks: 10, tickFormat: d => '', stroke: '#FFFFFF' }
      ]}
    />
    </div>
    <div className="container deathAlcohol">
    <XYFrame
      { ...sharedProps }
      lines={deathDisplay}
      defined={d => d.y !== null}
      yExtent={[0, 55000]}
      lineDataAccessor="data"
      lineType={{type:"line", interpolator: curveBasis}}
      xAccessor="x"
      yAccessor="y"
      hoverAnnotation={true}
      lineRenderMode={"normal"}
      lineStyle={d => ({stroke: d.color, strokeWidth: "2px" })}
      customLineType={{ type: "dividedLine"}}
      axes={[
        { orient: 'bottom', ticks: 10, tickFormat: d => new Date(d).getFullYear() }
      ]}
    />
    </div>

    <div className="container alcohol">
    <XYFrame
      { ...sharedProps }
      lines={alcDisplay}
      yExtent={[0, 55000]}
      lineDataAccessor="data"
      lineType={{type:"stackedarea", interpolator: curveBasis}}
      xAccessor="x"
      yAccessor="y"
      hoverAnnotation={true}
      lineRenderMode={"normal"}
      lineStyle={d => ({fill: d.color, fillOpacity: d.fillOpacity, strokeWidth: "2px" })}
      customLineType={{ type: "dividedLine"}}
      axes={[
        { orient: 'bottom', ticks: 10, tickFormat: d => '' }
      ]}
    />
    </div>
    <AutoDescription/>
    <AutoLegend/>
    <AutoSketch/>
    <div className="autoNav">
      <ul className="navList">
        <li className="navListItem"><a href="../">Home</a></li>
        <li className="navListItem"><a href="https://twitter.com/bengarvey">Twitter</a></li>
      </ul>
    </div>
  </div>
)

export default Auto

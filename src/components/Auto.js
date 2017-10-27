import React from 'react';
import ReactDOM from 'react-dom';
import { XYFrame, Legend } from 'semiotic';
import { curveBasis } from 'd3-shape';
import { scaleTime } from 'd3-scale';
import AutoDescription from './AutoDescription';
import AutoLegend from './AutoLegend';
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

const deathLegend = [
  {
    type: "line",
    styleFn: d => ({ stroke: d.color }),
    items: [
      { label: "US Auto Fatalities", color: colors.deaths },
      { label: "US Population", color: colors.pop }
    ]
  }
];

var display = {
  data: auto
};

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

var totalDeaths = 0;

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
 totalDeaths += d.Deaths;
});

function yearToDate(year) {
  return new Date(`${year}-01-01 00:00:00`);
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
    note: { label: "Seat belts required", align: "middle", wrap: 50},
    color: colors.annotation, dy: -10, dx: 0, connector: { end: "none" } },
  { type: "x", x: yearToDate(1984),
    note: { label: "NY seat belt law", align: "middle", wrap: 100},
    color: colors.annotation, dy: -5, dx: 0, connector: { end: "none" } },
  { type: "x", x: yearToDate(1994),
    note: { label: "Seat belt laws: 90% of states", align: "middle", wrap: 500},
    color: colors.annotation, dy: -20, dx: 0, connector: { end: "none" } },
  { type: "x", x: yearToDate(1998),
    note: { label: "Airbags required", align: "middle", wrap: 500},
    color: colors.annotation, dy: -5, dx: 35, connector: { end: "none" } },
  { type: "x", x: new Date("1945-08-15"),
    note: { label: "WW2 Ends", align: "middle", wrap: 500},
    color: colors.annotation, dy: -20, dx: 0, connector: { end: "none" } },
  { type: "x", x: new Date("1941-12-07"),
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
    bounds: [{ x: new Date("2007-12-01 00:00:00") }, { x: new Date("2009-06-01 00:00:00") }],
    label: "Great Recession"
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1929-04-01 00:00:00") }, { x: new Date("1933-03-01 00:00:00") }],
    label: "Great Depression",
    dy: 30,
    dx: -40
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("2001-03-01 00:00:00") }, { x: new Date("2001-11-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1990-07-01 00:00:00") }, { x: new Date("1991-03-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1981-07-01 00:00:00") }, { x: new Date("1982-11-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1980-01-01 00:00:00") }, { x: new Date("1980-07-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1973-11-01 00:00:00") }, { x: new Date("1975-03-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1969-12-01 00:00:00") }, { x: new Date("1970-11-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1960-04-01 00:00:00") }, { x: new Date("1961-02-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1957-08-01 00:00:00") }, { x: new Date("1958-04-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1954-07-01 00:00:00") }, { x: new Date("1954-05-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1948-11-01 00:00:00") }, { x: new Date("1949-10-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1945-02-01 00:00:00") }, { x: new Date("1945-10-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1937-05-01 00:00:00") }, { x: new Date("1938-06-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1926-10-01 00:00:00") }, { x: new Date("1927-11-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1923-05-01 00:00:00") }, { x: new Date("1924-06-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1920-01-01 00:00:00") }, { x: new Date("1921-06-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1918-08-01 00:00:00") }, { x: new Date("1919-03-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1913-01-01 00:00:00") }, { x: new Date("1914-12-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1910-01-01 00:00:00") }, { x: new Date("1912-01-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1907-05-01 00:00:00") }, { x: new Date("1908-06-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1902-09-01 00:00:00") }, { x: new Date("1904-08-01 00:00:00") }],
    disable:['connector','note']
  },
  {
    ...sharedMileAnnotationProps,
    type: "bounds",
    bounds: [{ x: new Date("1899-06-01 00:00:00") }, { x: new Date("1900-12-01 00:00:00") }],
    disable:['connector','note']
  }
];

var alcSharedProps = {
  type: "xy"
}

const alcAnnotations = [
  {
    ...alcSharedProps,
    label: "Non-Alcohol Related",
    x:yearToDate(1987), y:13000,
  },
  {
    ...alcSharedProps,
    label: "Alcohol Related",
    x:yearToDate(1987), y:34000,
  }
];

var sharedProps = {
  size: [500,200],
  xAccessor: "x",
  yAccessor: "y",
  lineDataAccessor: "data",
  hoverAnnotation: true,
  margin:{ left: 10, bottom: 30, right: 10, top: 10 }
};

const Auto = () => (
  <div>
    <h1>US Automobile Fatalities 1899 - 2015</h1>
    <h3>What have deaths decreased since 1972?</h3>
    <div class="container deathPopulation">
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
      margin={{ left: 10, bottom: 30, right: 10, top: 40 }}
    />
    </div>

    <div class="container deathMiles">
    <XYFrame
      { ...sharedProps }
      lines={deathDisplay}
      size={[700,200]}
      defined={d => d.y !== null}
      lineDataAccessor="data"
      xAccessor="x"
      yAccessor="y"
      lineType={{type:"line", interpolator: curveBasis}}
      lineRenderMode={"normal"}
      lineStyle={d => ({stroke: d.color, strokeWidth: "2px" })}
      customLineType={{ type: "dividedLine"}}
      margin={{left: 10, bottom: 30, right: 210, top: 10}}
      axes={[
        { orient: 'bottom', ticks: 10, tickFormat: d => new Date(d).getFullYear()}
      ]}
    />
    </div>

    <div class="container population">
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
      margin={{ left: 10, bottom: 30, right: 10, top: 40 }}
      annotations={popAnnotations}
    />
    </div>

    <div class="container miles">
    <XYFrame
      { ...sharedProps }
      size={[700,200]}
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
      margin={{left: 10, bottom: 30, right: 210, top: 10}}
      axes={[
        { orient: 'bottom', ticks: 10, tickFormat: d => '', stroke: '#FFFFFF' }
      ]}

    />
    </div>

    <div class="container gas">
    <XYFrame
      { ...sharedProps }
      size={[700,200]}
      lines={gasDisplay}
      defined={d => d.y !== null}
      lineDataAccessor="data"
      xAccessor="x"
      yAccessor="y"
      hoverAnnotation={true}
      lineType={{type:"line", interpolator: curveBasis}}
      lineRenderMode={"normal"}
      lineStyle={d => ({stroke: d.color, strokeWidth: "2px" })}
      margin={{left: 10, bottom: 30, right: 210, top: 10}}
      axes={[
        { orient: 'bottom', ticks: 10, tickFormat: d => '', stroke: '#FFFFFF' }
      ]}
    />
    </div>
    <div class="container deathAlcohol">
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
      lineType={{type:"line", interpolator: curveBasis}}
      lineRenderMode={"normal"}
      lineStyle={d => ({stroke: d.color, strokeWidth: "2px" })}
      customLineType={{ type: "dividedLine"}}
      axes={[
        { orient: 'bottom', ticks: 10, tickFormat: d => new Date(d).getFullYear() }
      ]}
    />
    </div>

    <div class="container alcohol">
    <XYFrame
      { ...sharedProps }
      lines={alcDisplay}
      defined={d => d.y !== null}
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
  </div>
)

export default Auto

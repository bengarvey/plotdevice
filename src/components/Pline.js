import React from 'react'
import { ResponsiveXYFrame } from 'semiotic';
import { scaleTime } from 'd3-scale'

function formatDate(date) {
  var month = date.getMonth() + 1;
  var displayMonth = month < 10 ? `0${month}` : month;
  return `${date.getFullYear()}-${displayMonth}-01`;
}

function toDate(year, month, day) {
  return new Date(`${year}-${month}-${day}T04:00:00Z`);
}

function createDate(str) {
  return new Date(`${str}T04:00:00Z`);
}

const annotations = [
  { type: 'x', x: '2017-05-15',
    note: { label: "Seat belts req", align: "middle", wrap: 50},
    color: '#000000', dy: 100, dx: 100 }
];

var Pline = props => (
  <ResponsiveXYFrame
    size={[300,200]}
    responsiveWidth={true}
    lines={props.display}
    margin={{top: 5, bottom: 55, left: 55, right: 5}}
    lineDataAccessor={d => d.data}
    xAccessor={d => new Date(d.date)}
    yAccessor={d => d.lbs}
    hoverAnnotation={true}
    lineType={{ type: 'line'}}
    lineRenderMode={d => "sketchy"}
    lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:d.opacity })}
    axes={[
      { orient: 'left', tickFormat: d => d, ticks: 7, label: props.yLabel },
      { orient: 'bottom', tickFormat: d => formatDate(new Date(d)), ticks: 4, label: props.xLabel }
    ]}
    annotations={annotations}
  />
)

export default Pline

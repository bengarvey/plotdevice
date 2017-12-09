import React from 'react'
import { ResponsiveXYFrame } from 'semiotic';

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}`;
}


var Pline = props => (
  <ResponsiveXYFrame
    size={[300,250]}
    responsiveWidth={true}
    lines={props.display}
    margin={{top: 5, bottom: 25, left: 25, right: 5}}
    lineDataAccessor={d => d.data}
    xAccessor={d => new Date(d.date)}
    yAccessor={d => d.value}
    hoverAnnotation={true}
    lineType={{ type: 'line'}}
    lineRenderMode={d => "sketchy"}
    lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:d.opacity })}
    axes={[
      { orient: 'left', tickFormat: d => d, ticks: 10},
      { orient: 'bottom', tickFormat: d => formatDate(new Date(d)), ticks: 2 }
    ]}
  />
)

export default Pline

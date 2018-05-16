import React from 'react'
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';

class City extends React.Component {
  constructor(props) {
    super(props)
    this.process();
    console.log(this.props);
  }

  process() {
  }

  render() {
    return (
      <div className="smallMultiple">
        <h3>{this.props.name} {this.props.data.overallAvg.toFixed(2)}</h3>
        <ResponsiveXYFrame
          size={[140,100]}
          yExtent={[-2,2]}
          responsiveWidth={true}
          responsiveHeight={true}
          lines={this.props.data}
          margin={{top: 0, bottom: 0, left: 0, right: 0}}
          lineDataAccessor={d => d.data}
          xAccessor={d => new Date(d.date)}
          yAccessor={d => d.value}
          hoverAnnotation={true}
          lineType={{ type: 'line'}}
          lineRenderMode={d => "sketchy"}
          lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:d.opacity })}
          customLineType={{ type: "dividedLine"}}
          axes={[
            { orient: 'left', tickFormat: d => '', ticks: 0, className: 'normal'},
          ]}
        />
      </div>
    )
  }
}

export default City

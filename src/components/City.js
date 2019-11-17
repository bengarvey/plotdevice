import React from 'react'
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';

const formatter = new Intl.DateTimeFormat("en", { month: "short" });

const customTooltip = d => <div className="tooltip-content">
    <p>{d.date}</p>
    <p>Avg Sentiment {d.value.toFixed(2)}</p>
    </div>

const annotations = [
  { type: 'x',
    x: new Date('2017-11-23T04:00:00Z'),
    note: { label: "Thanksgiving", align: "middle", wrap: 50},
    color: 'rgba(0,0,0,0.2)', dy: -10, dx: -20, connector: { end: "none" }
  },
  { type: 'x',
    x: new Date('2017-12-25T04:00:00Z'),
    note: { label: "Christmas", align: "middle", wrap: 50},
    color: 'rgba(0,0,0,0.2)', dy: -10, dx: 10, connector: { end: "none" }
  },
  { type: 'x',
    x: new Date('2018-02-04T04:00:00Z'),
    note: { label: "Super Bowl LII", align: "middle", wrap: 50},
    color: 'rgba(0,0,0,0.2)', dy: 0, dx: -20, connector: { end: "none" }
  },
  { type: 'x',
    x: new Date('2018-02-08T04:00:00Z'),
    note: { label: "Eagles Parade", align: "middle", wrap: 50},
    color: 'rgba(0,0,0,0.2)', dy: 0, dx: 20, connector: { end: "none" }
  }
]

function formatDate(date) {
  return formatter.format(new Date(date));
}

class City extends React.Component {
  constructor(props) {
    super(props)
    this.display = this.props.data;
    this.removeYear = this.props.removeYear;
    this.showAnnotations = this.props.showAnnotations;
    this.process();
  }

  process() {
  }

  render() {
    return (
      <div>
        <h3>{this.props.name} {this.props.data[0].overallAvg.toFixed(2)}</h3>
        <ResponsiveXYFrame
          size={[540,150]}
          yExtent={this.props.yExtent}
          responsiveWidth={true}
          lines={this.display}
          defined={d => d.value !== null}
          margin={{top: 0, bottom: 0, left: 0, right: 0}}
          lineDataAccessor={d => d.data}
          xAccessor={d => this.props.removeYear ? new Date('2018-' + d.date.substr(5,5)) : new Date(d.date)}
          yAccessor={d => d.value}
          hoverAnnotation={true}
          tooltipContent={customTooltip}
          annotations={this.props.showAnnotations ? annotations : []}
          lineType={{ type: 'line'}}
          lineRenderMode={d => "normal"}
          lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:d.opacity })}
          axes={[
            { orient: 'left', tickFormat: d => d, ticks: 4, className: 'normal'},
            { orient: 'bottom', tickFormat: d => formatDate(d), ticks: 5, className: 'normal'},
          ]}
          margin={{ left: 40, top: 10, bottom: 40, right: 10 }}
        />
      </div>
    )
  }
}

export default City

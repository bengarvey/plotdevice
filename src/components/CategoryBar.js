import React from 'react';
import { ResponsiveORFrame, ResponsiveXYFrame } from 'semiotic';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const color = scaleOrdinal(schemeCategory10);

class CategoryBar extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.process();
    this.renderChart = this.renderChart.bind(this);
  }

   componentDidMount() {
      this.renderChart()
   }
   componentDidUpdate() {
      this.renderChart();
   }

  process() {
    this.display = [];
    var sum = {};
    var count = {};
    this.props.data.forEach( (i) => {
      if (typeof(sum[i[this.props.category]]) === 'undefined') {
        sum[i[this.props.category]] = 0;
        count[i[this.props.category]] = 0;
      }
      sum[i[this.props.category]] += i[this.props.value];
      count[i[this.props.category]] += 1;
    });
    for (var key in sum) {
      var item = {value: sum[key], name: key, count: count[key]};
      this.display.push(item);
    }
    this.display = this.display.sort( (a, b) => { return b.value - a.value }).slice(0, 50);
  }

  renderChart() {
  }

  render() {
    return (
      <div>
        <h3>Which purchases were most frequent?</h3>
        <ResponsiveORFrame
          size={[ 350, 3000 ]}
          responsiveWidth={true}
          data={this.display}
          projection={'horizontal'}
          rAccessor={d => d.value}
          oAccessor={d => d.name}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `$${d.value} spent on ${d.name}` }
          style={d => ({ fill: '#333333', stroke: '#333333', strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          oLabel={(d, i) => (<text x={0} y={3} className={i[0].className} textAnchor="end">{d}</text>)}
          margin={{ left: 200, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />
        <ResponsiveORFrame
          size={[ 350, 3000 ]}
          responsiveWidth={true}
          data={this.display}
          projection={'horizontal'}
          rAccessor={d => d.count}
          oAccessor={d => d.name}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name} purchased ${d.count} times` }
          style={d => ({ fill: '#333333', stroke: '#333333', strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          oLabel={(d, i) => (<text x={0} y={3} className={i[0].className} textAnchor="end">{d}</text>)}
          margin={{ left: 200, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />

      </div>
    );
  }
}

export default CategoryBar

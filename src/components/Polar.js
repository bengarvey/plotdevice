import React from 'react';
import { ResponsiveORFrame, ResponsiveXYFrame } from 'semiotic';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const color = scaleOrdinal(schemeCategory10);

class Polar extends React.Component {
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
    this.display = this.props.data;
    var sum = {};
    var count = {};
  }

  renderChart() {
  }

  render() {
    return (
      <div>
        <ResponsiveORFrame
          size={[ 100, 100 ]}
          responsiveWidth={true}
          data={this.display}
          rAccessor={d => d.value}
          rExtent={[0,5]}
          oAccessor={d => d.attribute}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name} ${d.attribute} ${d.value}` }
          style={d => ({ fill: '#333333', stroke: '#333333', strokeOpacity: 0.5, fillOpacity: 0.5, strokeWidth: 1 })}
          type={"point"}
          projection={"radial"}
          connectorType={d => d.name}
          connectorStyle={d => {
            return {
              fill: "#333333",
              stroke: "#333333",
              strokeOpacity: 0.5,
              fillOpacity: 0.5
            }
          }}
          oLabel={(d, i) => (<text x={0} y={3} className={i[0].className} textAnchor="end">{d}</text>)}
          margin={{ left: 0, top: 0, bottom: 0, right: 0 }}
          oPadding={2}
          ordinalAlign={"center"}
        />
      </div>
    );
  }
}

export default Polar

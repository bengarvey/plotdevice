import React from 'react';
import { ORFrame } from 'semiotic';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const color = scaleOrdinal(schemeCategory10);

function getColor(item) {
  return item.color;
}

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
    this.title = this.props.data[0].name;
    var sum = {};
    var count = {};
  }

  renderChart() {

  }

  getColor(item) {
    //console.log(item.color);
    return item.color;
  }

  render() {
    return (
        <ORFrame
          size={[ 115, 215 ]}
          data={this.display}
          rAccessor={d => d.value}
          rExtent={[0,5]}
          oAccessor={ d => `${d.attribute}` }
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.name} ${d.attribute} ${d.value} ${d.notes}` }
          style={d => ({ fill: '#333333', stroke: '#333333', strokeOpacity: 0.0, fillOpacity: 0.0, strokeWidth: 1 })}
          type={"point"}
          projection={"radial"}
          connectorType={d => `${d.notes}`}
          title={this.title}
          connectorStyle={d => ({fill: d.source.color, stroke: "#666666", strokeOpacity: 0.5, fillOpacity: 0.5}) }
          //oLabel={(d, i) => (<text x={0} y={3} className={i[0].className} textAnchor="end">{d}</text>)}
          margin={{ left: 0, top: 0, bottom: 0, right: 0 }}
          oPadding={0}
          ordinalAlign={"center"}
        />
    );
  }
}

export default Polar

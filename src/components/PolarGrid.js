import React from 'react';
import { ResponsiveORFrame, ResponsiveXYFrame } from 'semiotic';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import Polar from './Polar';

const color = scaleOrdinal(schemeCategory10);

class PolarGrid extends React.Component {
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
    let data = this.props.data;
    let attr = ['opg', 'cheese', 'slices', 'first_bite', 'crust'];
    data.forEach( item => {
      attr.forEach( a => {
        this.display.push({
          name: item.name,
          value: item[a],
          attribute: a
          }
        )
      })
    });
    console.log(this.display);
  }

  renderChart() {
  }

  render() {
    return (
      <div>
        <Polar data={this.display.slice(0,4)}/>
        <Polar data={this.display.slice(5,9)}/>
        <Polar data={this.display.slice(10,14)}/>
        <Polar data={this.display.slice(15,19)}/>
      </div>
    );
  }
}

export default PolarGrid

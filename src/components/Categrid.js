import React from 'react';

import { max } from 'd3-array';
import { select } from 'd3-selection';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

class Categrid extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.createBarChart = this.createBarChart.bind(this);
    this.valuesPerRow = 10;
    this.process();
    window.onresize = this.createBarChart;
  }

   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart();
   }

  process() {
  }

  createBarChart() {
    const node = this.node
    const dataMax = max(this.props.data)
    const yScale = scaleLinear()
       .domain([0, dataMax])
       .range([0, this.props.size[1]]);

    const marginWidth = 20;
    const spacing = 30;
    const marginHeight = 40;
    this.valuesPerRow  = function() { return Math.floor((node.width.baseVal.value - marginWidth) / (spacing))};

    var color = scaleOrdinal(schemeCategory10);

    select(node)
      .selectAll('circle')
      .data(this.props.data)
      .enter()
      .append('circle')

    select(node)
      .selectAll('circle')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('circle')
      .data(this.props.data)
      .style('fill', (d) => color(d.item))
      .transition().duration(500)
      .attr('cx', (d,i) => (i % this.valuesPerRow()) * spacing + marginWidth)
      .attr('cy', (d,i) => Math.floor(i/this.valuesPerRow()) * spacing + marginHeight)
      .style('r', d => d.debit/0.25 + 3 + "px")
  }

  render() {
    return (
      <svg
      ref={node => this.node = node}
      width="100%" height={500}>
      </svg>
    );
  }
}

export default Categrid

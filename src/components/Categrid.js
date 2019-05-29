import React from 'react';

import { max } from 'd3-array';
import { select } from 'd3-selection';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const color = scaleOrdinal(schemeCategory10);
const marginWidth = 20;
const spacing = 30;
const marginHeight = 40;

class Categrid extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.keys = [];
    this.process();
    this.renderChart = this.renderChart.bind(this);
    this.valuesPerRow = 10;
    window.onresize = this.renderChart;
  }

   componentDidMount() {
      this.renderChart()
   }
   componentDidUpdate() {
      this.renderChart();
   }

  process() {
    var data = this.props.data;
    this.keys = Array.from(new Set(data
                  .filter( (i => i.debit > 0))
                  .map( (i) => i.item)));
  }

  renderChart() {
    const node = this.node
    const dataMax = max(this.props.data)
    const yScale = scaleLinear()
       .domain([0, dataMax])
       .range([0, this.props.size[1]]);

    const marginWidth = 20;
    const spacing = 30;
    const marginHeight = 40;

    this.valuesPerRow  = function() { return Math.floor((node.width.baseVal.value - marginWidth) / (spacing))};

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

    this.renderLegend();
  }

  renderLegend() {
    const node = this.legend
    select(node)
      .selectAll('circle')
      .data(this.keys)
      .enter()
      .append('circle')

    select(node)
      .selectAll('circle')
      .data(this.keys)
      .exit()
      .remove()

    select(node)
      .selectAll('circle')
      .data(this.keys)
      .style('fill', (d) => color(d))
      .transition().duration(500)
      .attr('cx', marginWidth)
      .attr('cy', (d,i) => 10 + i * 20)
      .style('r', "8px")

    select(node)
      .selectAll('text')
      .data(this.keys)
      .enter()
      .append('text')

    select(node)
      .selectAll('text')
      .data(this.keys)
      .exit()
      .remove()

    select(node)
      .selectAll('text')
      .data(this.keys)
      .transition().duration(500)
      .attr('x', marginWidth + 15)
      .attr('y', (d,i) => 13 + (i * 20))
      .text( (d) => d)

  }

  render() {
    return (
      <div>
        <svg
        ref={node => this.node = node}
        width="100%" height={650}>
        </svg>
        <svg
        ref={node => this.legend = node}
        width="100%" height={500}>
        </svg>
      </div>
    );
  }
}

export default Categrid

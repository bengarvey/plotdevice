import React from 'react';

import { max } from 'd3-array';
import { select } from 'd3-selection';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const color = scaleOrdinal(schemeCategory10);
const marginWidth = 20;
const spacing = 25;
const marginHeight = 40;
const type = 'grid';

function calcY(type, i, valuesPerRow, key, keys) {
  switch(type) {
    case 'grid':
      return grid.calcY(i, valuesPerRow);
      break;
    default:
      return grid.calcY(i, valuesPerRow);
  }
}

function calcX(type, i, valuesPerRow) {
  switch(type) {
    case 'grid':
      return grid.calcX(i, valuesPerRow);
      break;
    default:
      return grid.calcX(i, valuesPerRow);
  }
}

var grid = {
  calcX: function(i, valuesPerRow) {
    return (i % valuesPerRow) * spacing + marginWidth;
  },
  calcY: function(i, valuesPerRow) {
    return Math.floor(i/valuesPerRow) * spacing + marginHeight;
  }
}

var bar = {
  calcX: function(i) { return i * spacing + marginWidth; },
  calcY: function(categoryIndex) { return categoryIndex * spacing + marginHeight}
}

class Categrid extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.keys = [];
    this.process();
    this.renderChart = this.renderChart.bind(this);
    this.valuesPerRow = 10;
    this.svgHeight = 800;
    this.dataMax = 0;
    window.onresize = this.componentDidUpdate.bind(this);
  }

   componentDidMount() {
      this.renderChart();
   }
   componentDidUpdate() {
      this.renderChart();
   }

  process() {
    this.data = this.props.data.filter( (i => i[this.props.value] > 0));
    this.keys = Array.from(new Set(this.data
                  .filter( (i => i[this.props.value] > 0))
                  .map( (i) => i[this.props.color])));
  }

  renderChart() {
    const node = this.node
    this.dataMax = max(this.data)
    const yScale = scaleLinear()
       .domain([0, this.dataMax])
       .range([0, this.props.size[1]]);
    const marginWidth = 20;
    const marginHeight = 40;

    this.valuesPerRow  = function() {
      return Math.floor((node.width.baseVal.value - marginWidth) / (spacing))};

    select(node)
      .selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')

    select(node)
      .selectAll('circle')
      .data(this.data)
      .exit()
      .remove()

    select(node)
      .selectAll('circle')
      .data(this.data)
      .transition().duration(500)
      .style('fill', (d) => color(d[this.props.color]))
      .attr('cx', (d,i) => { return calcX(type, i, this.valuesPerRow());} )
      .attr('cy', (d,i) => { return calcY(type, i, this.valuesPerRow(), d[this.props.color], this.keys)})
      .style('r', d => ((d[this.props.value]/this.dataMax[this.props.value]) * 5) + 3 + "px")

    this.renderLegend(this.valuesPerRow());
  }

  renderLegend(valuesPerRow) {
    const node = this.node
    const legendOffset = calcY(type, this.data.length, valuesPerRow, this.keys[this.keys.length-1], this.keys) + 50;

    select(node)
      .selectAll('.legend')
      .data(this.keys)
      .enter()
      .append('circle').attr("class", "legend")

    select(node)
      .selectAll('.legend')
      .data(this.keys)
      .exit()
      .remove()

    select(node)
      .selectAll('.legend')
      .data(this.keys)
      .style('fill', (d) => color(d))
      .attr('cx', marginWidth)
      .attr('cy', (d,i) => legendOffset + i * 20)
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
      .attr('x', marginWidth + 15)
      .attr('y', (d,i) => legendOffset + 4 + (i * 20))
      .text( (d) => d)

    // resize svg to use only what we need after a window resize
    this.svgHeight = legendOffset + this.keys.length * 20;
    select('.categrid').attr("height", this.svgHeight);

  }

  render() {
    return (
      <>
      <h3>{this.props.title}</h3>
      <svg className="categrid"
      ref={node => this.node = node}
      width="100%" height={600}>
      </svg>
      </>
    );
  }
}

export default Categrid

import React from 'react';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import ImageGridImage from './ImageGridImage';

const color = scaleOrdinal(schemeCategory10);

class ImageGrid extends React.Component {
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
          attribute: a,
          notes: item.user,
          color: item.color,
          image: item.image
          }
        )
      })
    });
  }

  renderChart() {
  }


  render() {
    var items = [];
    for(let i=0; i<this.display.length; i+=10) {
      items.push(<ImageGridImage key={i} data={this.display[i]}/>)
    }
    return (
      <div className="wrap-grid">
        {items}
      </div>
    );
  }
}

export default ImageGrid

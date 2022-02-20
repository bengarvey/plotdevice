import React from 'react';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const color = scaleOrdinal(schemeCategory10);

class ImageGridImage extends React.Component {
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
  }

  renderChart() {
  }


  render() {
    var items = [];
    return (
      <div className="wrap-grid">
        <div style={{position: "relative"}}>
          <span style={{position: "absolute", left: 1, zIndex: 100, backgroundColor: "#000000", color: "#ffffff", fontSize: "12px", fontFamily: "Helvetica, Arial, sans-serif"}}>{this.display.name}</span>
          <img src={"../images/pizza/" + this.display.image} width="115" title={this.display.name}/>
        </div>
      </div>
    );
  }
}

export default ImageGridImage

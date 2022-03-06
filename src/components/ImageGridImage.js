import React from 'react';

class ImageGridImage extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.process();
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  process() {
    this.display = this.props.data;
  }

  render() {
    return (
      <div className="wrap-grid">
        <div style={{position: "relative"}}>
          <span style={{position: "absolute", left: 1, zIndex: 100, backgroundColor: "#000000", color: "#ffffff", fontSize: "12px", fontFamily: "Helvetica, Arial, sans-serif"}}>{this.display.name}</span>
          <img src={"../images/pizza/" + this.display.image} width="115" title={this.display.name} alt={"Photo of pizza from " + this.display.name}/>
        </div>
      </div>
    );
  }
}

export default ImageGridImage

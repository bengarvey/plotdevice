import React from 'react';
import ImageGridImage from './ImageGridImage';

class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.process();
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

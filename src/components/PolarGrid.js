import React from 'react';
import Polar from './Polar';

class PolarGrid extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.process();
  }

   componentDidMount() {
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
      items.push(<Polar key={i} data={this.display.slice(i,i+10)}/>)
    }
    return (
      <div className="wrap-grid">
        {items}
      </div>
    );
  }
}

export default PolarGrid

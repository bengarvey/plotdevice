import React from 'react';
import { ResponsiveNetworkFrame } from 'semiotic';
import Nav from './Nav';
var meetup = require('../data/meetup.json');

function buildData(list) {
  var modified = [];
  list.forEach( function(i) {
    var item = {
      name: i.lower_hex,
      value: i.count,
      color: i.lower_hex
    }
    modified.push(item);
  });
  return modified;
}

class Meetup extends React.Component {
  constructor(props) {
    super(props);
    this.meetup = meetup;
    this.process();
  }

  process() {
    this.meetup.shift();
    this.treeMapMeetup = buildData(this.meetup);
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>Most Popular Hex Colors</h1>
        <ResponsiveNetworkFrame
          nodes={[{ name: "colors" }]}
          edges={{name: "colors", children: this.treeMapMeetup}}
          size={[700,600]}
          margin={10}
          networkType={{ type: "treemap", padding: 2 }}
          nodeIDAccessor={"name"}
          nodeStyle={ d => ({
            fill: d.height === 0 ? d.color : "none",
            fillOpacity: 1,
            stroke: 2
          })}
          filterRenderedNodes={d => d.depth !== 0}
          hoverAnnotation={[
                 { type: "frame-hover" }
            ]}
          tooltipContent={ d => (
              <div className="tooltip-content">
                <p>Response: {d.data.name}</p>
                <p>Count: {d.data.value}</p>
              </div>)}
        />
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>Herb Lau and I co-organize the <a href='https://www.meetup.com/Philadelphia-Data-Visualization-Meetup'>Philadelphia Data Visualization meetup</a> and when you register for events, we can set it to ask attendees a question. For our February and April meetups we asked, 'What is your favorite hex color?' I've posted the seventh <a href='https://docs.google.com/presentation/d/1UHZk2csTayjqEBKWBmGdK81yGSb9_bVEpAE7VXxAWNI/edit?usp=sharing'>slide from my talk</a> below which explains what hex colors are. They're frequently used for definining colors because you can pack 16 million+ colors into 6 characters instead of just 1 million.</p>
          <p>
            <a href="images/slide-7-hex-colors.png">
              <img src="images/slide-7-hex-colors-300px.png"/>
            </a>
          </p>
          <p>I thought it would be interesting to visualize the reported data, mostly as-is and see how the web rendered it. Many of the responses were things like "red" or "yellow" which browsers know how to display. Some used the 3 character format, but most used the 6. #000000 was the most common response and the web renders anything it doesn't know as black, so you end up with this nice balance of black in the treemap visualization. Hover over the rectanges with your mouse to see the responses. I < a href="https://twitter.com/bengarvey/status/1262234965602971653">posted this tweet</a> and got some interesting replies.</p>
          <p>Sources: Meetup.com download</p>
          <p>Tech: Semiotic, javascript, html, css, csvkit, Google Sheets</p>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default Meetup

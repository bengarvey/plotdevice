import React from 'react';
import { ResponsiveNetworkFrame } from 'semiotic';
import { Legend } from 'semiotic';

import {
  forceSimulation,
  forceX,
  forceY,
  forceCollide,
  forceManyBody
} from "d3-force"

import Nav from './Nav';
var network = require('../data/wire.json');

const colors = {
  police: '#0077bb',
  politic: '#f1f441',
  street: "#393e41",
  school: "#22bb33",
  dock: "#22bbff",
  journalist: "#f48f42",
  greek: "#ff3366",
  edit: "#339900",
  reporter: "#22ff00",
  barksdale: "#00FF00",
  stanfield: "#FF0000",
  propjoe: "#0000FF",
  omar: "#00FFFF",
  carcetti: "#3099dd",
  royce: "#9930dd",
  church: "#dd3099",
  majorcrimes: "#33dd99",
  detective: "#dd9930",
  command: "#9900aa",
  davis: "#aaaaaa",
  killed: '#ff3333',
  trained: '#999999',
  family: '#00ffff',
  reports: 'rgba(0,0,0,0.1)',
  electiondefeat: 'rgba(0,0,0,1)',
  teaches: 'rgba(10,255,10,0.8)',
  informant: 'rgba(255,10,255,1)'
}

const legendGroups = [
 {  type: 'line',
    orientation: "horizontal",
    styleFn: d => (
      { stroke: d.color,
        strokeOpacity: 0.5,
        strokeWidth: "3px"
      }),
    items: [
      { label: "Family", color: colors.family },
      { label: "Killed", color: colors.killed },
      { label: "Reports To", color: colors.reports },
      { label: "Election Defeat", color: colors.electiondefeat },
      { label: "Teaches", color: colors.teaches },
      { label: "Informant", color: colors.informant },
    ]
 },
 { styleFn: d => (
      { fill: d.color,
        strokeOpacity: 0,
        fillOpacity: 1,
        type: 'circle'
      }),
    items: [
      { label: "The Police", color: colors.police },
      { label: "The Street", color: colors.street },
      { label: "The Politicians", color: colors.politic },
      { label: "The School", color: colors.school },
      { label: "The Docks", color: colors.dock },
      { label: "The Journalists", color: colors.journalist },
      { label: "The Greeks", color: colors.greek }
    ]
  }
]

function forceSim() {
  var cont = document.getElementById("container");
  var contStyle = window.getComputedStyle(cont);
  var currentWidth = contStyle.width;
  var maxWidth = currentWidth;
  var nextWidth = currentWidth == maxWidth ? addPxString(-1, maxWidth) : maxWidth;
  console.log(currentWidth == maxWidth, addPxString(-1, maxWidth), contStyle.width, maxWidth, currentWidth, nextWidth);
  cont.setAttribute("style", `width:${nextWidth}`);
}

function addPxString(op, string) {
  var value = parseInt(string.replace("px", "")) + op;
  return `${value}px`;
}

const customSimulation = forceSimulation().force(
  "charge",
  forceManyBody()
    .distanceMax(500)
    .strength(-100)
)

function getNodeStyle(d) {
  var nodeStyle = { width: 7, height: 7, fill: colors[d.type], strokeWidth: "1px"};
  return nodeStyle;
}

class TheWire extends React.Component {
  constructor(props) {
    super(props);
    this.network = network;
    var timerId = setInterval( function() { forceSim(); }, 650);
    setTimeout( () => {
      clearInterval(timerId);
    }, 10000);
  }

  render() {
    return (
      <div className="chartContainer" id="container">
        <h1>HBO's The Wire</h1>
        <h3>Network graph showing the complicated relationships of 200+ characters</h3>
          <ResponsiveNetworkFrame
              size={[ 300, 400 ]}
              responsiveWidth={true}
              edges={this.network.links}
              nodes={this.network.nodes}
              edgeStyle={(d) => ({ stroke: colors[d.relation], fill: colors[d.relation], opacity: 0.5, strokeWidth: '1' })}
              nodeStyle={d => getNodeStyle(d)}
              networkType={{ type: 'force', iterations: 200, edgeStrength:0.09 }}
              edgeType={'arrowhead'}
              nodeSizeAccessor={d => 4}
              zoomToFit={true}
              nodeIDAccessor={"id"}
              hoverAnnotation={true}
              tooltipContent={d =>
                <div className="tooltip-content">
                  <p>{d.id}</p>
                  <p>{d.name}</p>
                </div>
              }
              margin={{left: 5, top: 10, bottom: 0, right: 0}}
          />
        <svg style={{ height: "220px"}}>
          <g transform={"translate(0,0)"}>
            <Legend
              title={"Legend"}
              legendGroups={[legendGroups[0]]}
            />
          </g>
          <g transform={"translate(150,0)"}>
            <Legend
              title={""}
              legendGroups={[legendGroups[1]]}
            />
          </g>
        </svg>
        <div className="chartContainer">
          <div className="notes nextReport">
            <h3>Notes and Sources</h3>
            <p>If you had asked me how many characters were in HBO's The Wire, I would have said around 40 or 50, certainly not the 200+ I counted to make this network graph. It's one of the most ambitious and complicated shows ever made.</p>
            <p>Semiotic's support for network graphs is pretty good, but you don't get to see the graph live calculating like you can with other D3 graphs. If you resize the window 3 or 4 times it settles in nicely, so I trigger a resize of the continer div a few times.</p>
            <p>I'm sure some of my decisions about who reports to who are a little controversial, but I did the best I could. Feel free to make a pull request into the json file if you see any mistakes.</p>
            <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, <a href="https://en.wikipedia.org/wiki/List_of_The_Wire_characters">wikipedia</a>, <a href="https://thewire.fandom.com/wiki/The_Wire_on_HBO">fandom</a></p>
          </div>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default TheWire

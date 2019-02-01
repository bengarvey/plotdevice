import React from 'react';
import { ResponsiveNetworkFrame } from 'semiotic';
import { Legend } from 'semiotic';
import { Chance } from "chance";

import {
  forceSimulation,
  forceX,
  forceY,
  forceCollide,
  forceManyBody
} from "d3-force"

import Nav from './Nav';
var network = require('../data/wire.json');

var chance = new Chance;

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


const customSimulation = forceSimulation().force(
  "charge",
  forceManyBody()
    .distanceMax(500)
    .strength(-100)
)

function getXY(node) {
  var xy;
  switch(node.type) {
    case "street":
      xy = [rf(0.1,0.5), rf(0.1,0.5)];
      break;
    case "police":
      xy = [rf(0.5,0.9), rf(0.1,0.5)];
      break;
    case "politics":
      xy = [rf(0.1,0.5), rf(0.5,0.9)];
      break;
    default:
      xy = [rf(0.5,0.9), rf(0.5,0.9)];
  }
  return xy;
}

function rf(min,max) {
  return chance.floating({min: min, max: max});
}

function getNodeStyle(d) {
  var nodeStyle = { fill: colors[d.type], strokeWidth: "2px"};
  return nodeStyle;
}


class TheWire extends React.Component {
  constructor(props) {
    super(props);
    this.network = network;
  }

  render() {
    return (
      <div className="chartContainerWide">
        <h1>The Wire</h1>
        <h3>Way down in the hole</h3>
          <ResponsiveNetworkFrame
              size={[ 300, 700 ]}
              responsiveWidth={true}
              edges={this.network.links}
              nodes={this.network.nodes}
              edgeStyle={(d) => ({ stroke: colors[d.relation], fill: colors[d.relation], opacity: 0.5, strokeWidth: '1px' })}
              nodeStyle={d => getNodeStyle(d)}
              networkType={{ type: 'force', iterations: 50, edgeStrength:0.09 }}
              edgeType={'arrowhead'}
              nodeSizeAccessor={d => 6}
              zoomToFit={true}
              nodeIDAccessor={"id"}
              nodeLabels={d =>
                <text
                  x={((d.name.length/4) * -1) + "em"}
                  y="1.5em"
                  fill="gray"
                  style={{'fontSize': 9 + 'px'}}>
                  {d.name}
                </text>
              }
              hoverAnnotation={true}
              tooltipContent={d =>
                <div className="tooltip-content">
                  <p>{d.id}</p>
                  <p>{d.name}</p>
                </div>
              }
              legend={{legendGroups}}
              margin={{left: 25, top: 20, bottom: 20, right: 120}}
          />
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>This project took a lot longer than I anticipated.</p>
          <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, <a href="https://en.wikipedia.org/wiki/List_of_The_Wire_characters">wikipedia</a>, <a href="https://thewire.fandom.com/wiki/The_Wire_on_HBO">fandom</a></p>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default TheWire

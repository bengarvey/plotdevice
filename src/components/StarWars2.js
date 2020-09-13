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
var network = require('../data/starwars2.json');

const colors = {
  mother: '#faa1c7',
  father: '#009ddc',
  spouse: '#fcde9c',
  light: "#15b097",
  dark: "#393e41",
  neutral: "#aaaaaa",
  droid: "#f4d35e",
  killed: '#ff3333',
  trained: '#999999',
  became: '#111111',
  bff: '#229933',
  "republic/rebel": '#2a75bf',
  empire: '#aa6666'
}

const legendGroups = [
  { type: 'line',
    styleFn: d => (
      { stroke: d.color,
        strokeOpacity: 0.5,
        strokeWidth: "3px"
      }),
    items: [
      { label: "Mother", color: colors.mother },
      { label: "Father", color: colors.father },
      { label: "Trained", color: colors.trained },
      { label: "Killed", color: colors.killed },
      { label: "Married", color: colors.spouse },
      { label: "Became", color: colors.became }
    ]
  },
  { styleFn: d => (
      { fill: d.color,
        strokeOpacity: 0,
        fillOpacity: 1,
        type: 'circle'
      }),
    items: [
      { label: "Light Side", color: colors.light },
      { label: "Dark Side", color: colors.dark },
      { label: "Neutral", color: colors.neutral },
      { label: "Droid", color: colors.droid },
    ]
  }
]

function linkBy(people, center, side, relation) {
  let links = people.map( (person) => {
    if (person.side == side) {
      return {source: person.id, target: center.id, type: relation, opacity: 0.075};
    }
  }).filter(i => i != null);
  return links;
}

function forceSim() {
  var cont = document.getElementById("container");
  var contStyle = window.getComputedStyle(cont);
  var currentWidth = contStyle.width;
  var maxWidth = currentWidth;
  var nextWidth = currentWidth == maxWidth ? addPxString(-1, maxWidth) : maxWidth;
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
  var nodeStyle = { width: 12, height: 12, fill: colors[d.side], strokeWidth: "1px"};
  return nodeStyle;
}

class StarWars2 extends React.Component {
  constructor(props) {
    super(props);
    this.network = network;
    let lightUsers = linkBy(network.nodes, network.nodes[6],'light', 'lightSide');
    let darkUsers = linkBy(network.nodes, network.nodes[0],'dark', 'darkSide');
    let droidUsers = linkBy(network.nodes, network.nodes[8],'droid', 'droidSide');
    this.network.links.splice( this.network.links.length, 0, ...lightUsers);
    this.network.links.splice( this.network.links.length, 0, ...darkUsers);
    this.network.links.splice( this.network.links.length, 0, ...droidUsers);
    console.log(this.network.links);
    var timerId = setInterval( function() { forceSim(); }, 650);
    setTimeout( () => {
      clearInterval(timerId);
    }, 10000);
  }

  render() {
    return (
      <div className="chartContainer" id="container">
        <h1>Star Wars</h1>
        <h3>Force directed graph</h3>
          <ResponsiveNetworkFrame
              size={[ 300, 400 ]}
              responsiveWidth={true}
              edges={this.network.links}
              nodes={this.network.nodes}
              edgeStyle={(d) => ({ stroke: colors[d.relation], fill: colors[d.relation], opacity: d.opacity == null ? 0.3 : d.opacity, strokeWidth: '2'})}
              nodeStyle={d => getNodeStyle(d)}
              networkType={{ type: 'force', iterations: 200, edgeStrength:0.09 }}
              edgeType={'arrowhead'}
              nodeSizeAccessor={d => 4}
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
            <p>An update to the previous on I did just before the Last Jedi came out, but using my fancy mobile optimized code from my graph of HBO's the Wire.</p>
            <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, <a href="https://en.wikipedia.org/wiki/List_of_The_Wire_characters">wikipedia</a>, <a href="https://thewire.fandom.com/wiki/The_Wire_on_HBO">fandom</a></p>
          </div>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default StarWars2

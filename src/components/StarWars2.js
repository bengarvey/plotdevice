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
  parent: '#009ddc',
  spouse: '#fcde9c',
  light: "#15b097",
  dark: "#393e41",
  neutral: "#aaaaaa",
  droid: "#f4d35e",
  killed: '#ff3333',
  trained: '#999999',
  became: '#000000',
  bff: '#229933',
  "republic/rebel": '#2a75bf',
  empire: '#aa6666',
  squad: '#666666'
}

var legendGroups = [
  { type: 'line',
    styleFn: d => (
      { stroke: d.color,
        strokeOpacity: 0.5,
        strokeWidth: "3px"
      }),
    items: [
      { label: "Ancestor", color: colors.parent, onClick: () => { this.toggleRelationship('parent');} },
      { label: "Trained", color: colors.trained },
      { label: "Killed", color: colors.killed },
      { label: "Married", color: colors.spouse },
      { label: "Best Friends", color: colors.bff },
      { label: "Became", color: colors.became },
      { label: "Squad", color: colors.squad }
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
      { label: "Republic / Rebel", color: colors["republic/rebel"] },
      { label: "Empire", color: colors.empire },
    ]
  }
]

function linkBy(people, center, side, relation) {
  let links = people.map( (person) => {
    if (person.side == side) {
      return {source: person.id, target: center.id, type: relation, opacity: 0.1};
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


var relationships = ["squad", "killed", "trained", "became", "parent", "trained", "spouse"];



const customSimulation = forceSimulation().force(
  "charge",
  forceManyBody()
    .distanceMax(500)
    .strength(-100)
)

function getNodeStyle(d) {
  var nodeStyle = { width: 10, height: 10, fill: colors[d.side], strokeWidth: "1px"};
  return nodeStyle;
}

function getRelevantLinks(d, links) {
  let relevantLinks = links.filter(link => {
    return link.source == d.id || link.target == d.id }
  );
  return relevantLinks;
}



class StarWars2 extends React.Component {
  constructor(props) {
    super(props);
    this.network = network;
    var timerId = setInterval( function() { forceSim(); }, 650);
    setTimeout( () => {
      clearInterval(timerId);
    }, 10000);
 }

  toggleRelationship(rel) {
    let btn = document.getElementById(`${rel}Button`);
    if (relationships.includes(rel)) {
      relationships = relationships.filter( item => item !== rel);
      btn.className = "button off";
    }
    else {
      relationships.push(rel)
      btn.className = "button on";
    }
    console.log(this);
    this.forceUpdate();
  }

  render() {
    return (
      <div className="chartContainer" id="container">
        <h1>Star Wars</h1>
        <h3>Force directed graph</h3>
          <ResponsiveNetworkFrame
              size={[ 300, 400 ]}
              responsiveWidth={true}
              edges={this.network.links.filter( item => relationships.includes(item.relation))}
              nodes={this.network.nodes}
              edgeStyle={(d) => ({ stroke: colors[d.relation], fill: colors[d.relation], opacity: d.opacity == null ? 0.3 : d.opacity, strokeWidth: '2'})}
              nodeStyle={d => getNodeStyle(d)}
              networkType={{ type: 'force', iterations: 200, edgeStrength:0.09, zoon: true }}
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
        <ul className="list">
          <li><button className="button on" id="parentButton" onClick={() => this.toggleRelationship('parent')}>Toggle Ancestor</button></li>
          <li><button className="button on" id="killedButton" onClick={() => this.toggleRelationship('killed')}>Toggle Killed</button></li>
          <li><button className="button on" id="trainedButton" onClick={() => this.toggleRelationship('trained')}>Toggle Trained</button></li>
          <li><button className="button on" id="squadButton" onClick={() => this.toggleRelationship('squad')}>Toggle Squad</button></li>
          <li><button className="button on" id="becameButton" onClick={() => this.toggleRelationship('became')}>Toggle Became</button></li>
          <li><button className="button on" id="spouseButton" onClick={() => this.toggleRelationship('spouse')}>Toggle Married</button></li>
        </ul>
        <div className="chartContainer">
          <div className="notes nextReport">
            <h3>Notes and Sources</h3>
            <p>An update to the <a href="http://plotdevice.bengarvey.com/starwars">previous one</a> I did just before the Last Jedi came out, but using my fancy mobile optimized code from my graph of HBO's the Wire. This graph contains characters from the main 9 episodes and Rogue One.</p>
            <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, <a href="https://en.wikipedia.org/wiki/List_of_The_Wire_characters">wikipedia</a>, <a href="https://thewire.fandom.com/wiki/The_Wire_on_HBO">fandom</a></p>
          </div>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default StarWars2

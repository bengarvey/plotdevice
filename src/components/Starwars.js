import React from 'react';
import { ResponsiveNetworkFrame } from 'semiotic';
import { curveBasis } from 'd3-shape';
import { Chance } from "chance";
import Nav from './Nav';
var network = require('../data/starwars.json');

var chance = new Chance;

const colors = {
  mother: '#faa1c7',
  father: '#009ddc',
  spouse: '#fcde9c',
  light: "#15b097",
  dark: "#393e41",
  neutral: "#aaaaaa",
  droid: "#f4d35e",
  killed: '#ff3333',
  trained: '#999999'
}

function getEdgeStrength(type) {
  if (type == "mother" || type == "father" || type == "spouse") {
    return 0.2;
  }
  else {
    return 0.1;
  }
}

function getXY(node) {
  var xy;
  switch(node.side) {
    case "dark":
      xy = [rf(0.1,0.5), rf(0.1,0.5)];
      break;
    case "light":
      xy = [rf(0.5,0.9), rf(0.1,0.5)];
      break;
    case "droid":
      xy = [rf(0.1,0.5), rf(0.5,0.9)];
      break;
    default:
      xy = [rf(0.5,0.9), rf(0.5,0.9)];
  }
  return xy;
}

function getAdjustedXY(node) {
  var xy = getXY(node);
  xy = [Math.round(xy[0]*300), Math.round(xy[1]*500)];
  console.log(xy);
  return xy;
}

function rf(min,max) {
  return chance.floating({min: min, max: max});
}


class Starwars extends React.Component {
  constructor(props) {
    super(props);
    this.network = network;
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>Star Wars Network</h1>
        <h3>Force directed graph</h3>
          <ResponsiveNetworkFrame
              size={[ 300, 700 ]}
              responsiveWidth={true}
              edges={this.network.links}
              nodes={this.network.nodes}
              edgeStyle={(d) => ({ stroke: colors[d.relation], fill: colors[d.relation], opacity: 0.5, strokeWidth: '1px' })}
              nodeStyle={d => ({ fill: colors[d.side], r:"15px"})}
              networkType={{ type: 'force', iterations: 400, edgeStrength:0.09, multi:true }}
              edgeType={'arrowhead'}
              nodeSizeAccessor={d => 7}
              zoomToFit={true}
              nodeIDAccessor={"id"}
              nodeLabels={d => d.name}
              hoverAnnotation={true}
              tooltipContent={d => 
                <div className="tooltip-content" >
                  <p>{d.id}</p>
                  <p>{d.name}</p>
                  <p>Force Side: {d.side}</p>
                </div>
              }
              legend={{
                legendGroups: [
                 {  type: 'line',
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
                      { label: "Married", color: colors.spouse }
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
              }}
              margin={{left: 25, top: 20, bottom: 20, right: 120}}
          />
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>This doesn't contain any spoilers from The Last Jedi because I haven't watched it yet. Some of the relationships are loosely implied from the Force Awakens.</p>
          <p>Network diagrams are always a mess, but I saw a great talk about them at OpenVis Conf 2017 called <a href="https://openvisconf.com/#jgomez-video-item">Untangling the Hairball</a>. I might need to watch it again.</p>
          <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, an old VHS tape I watched hundreds of times, IMDB</p>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default Starwars

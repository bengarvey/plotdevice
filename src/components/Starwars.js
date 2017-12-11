import React from 'react';
import { ResponsiveNetworkFrame } from 'semiotic';
import { curveBasis } from 'd3-shape';
import { Chance } from "chance";
import Nav from './Nav';

var chance = new Chance;


var network = {
  "nodes": [{
    "id": 0,
    "name": "Palpatine",
    "gender": "M",
    "lastName": "Palpatine",
    "birthDate": "1875-01-01T00:00:00.000Z",
    "deathDate": "1983-01-01T00:00:00.000Z",
    "side": "dark"
  }, {
    "id": 1,
    "name": "Skywalker, Shmi",
    "gender": "F",
    "lastName": "Skywalker",
    "birthDate": "1905-01-01T00:00:00.000Z",
    "deathDate": "1955-01-01T00:00:00.000Z",
    "side": "neutral"
  }, {
    "id": 2,
    "name": "Skywalker, Anakin",
    "gender": "M",
    "lastName": "Skywalker",
    "birthDate": "1935-01-01T00:00:00.000Z",
    "deathDate": "1983-01-01T00:00:00.000Z",
    "side": "dark"
  }, {
    "id": 8,
    "name": "C3PO",
    "gender": "M",
    "lastName": "C3PO",
    "birthDate": "1940-01-01T00:00:00.000Z",
    "deathDate": "-01-01T00:00:00.000Z",
    "side": "droid"
  }, {
    "id": 3,
    "name": "Padme Amidala",
    "gender": "F",
    "lastName": "Amidala",
    "birthDate": "1925-01-01T00:00:00.000Z",
    "deathDate": "1960-01-01T00:00:00.000Z",
    "side": "neutral"
  }, {
    "id": 4,
    "name": "Luke Skywalker",
    "gender": "M",
    "lastName": "Skywalker",
    "birthDate": "1960-01-01T00:00:00.000Z",
    "deathDate": null,
    "side": "light"
  }, {
    "id": 5,
    "name": "Leia Organa",
    "gender": "F",
    "lastName": "Organa",
    "birthDate": "1960-01-01T00:00:00.000Z",
    "deathDate": null,
    "side": "light"
  }, {
    "id": 6,
    "name": "Yoda",
    "gender": "M",
    "lastName": "Yoda",
    "birthDate": "1083-01-01T00:00:00.000Z",
    "deathDate": "1983-01-01T00:00:00.000Z",
    "side": "light"
  }, {
    "id": 9,
    "name": "R2D2",
    "gender": "M",
    "lastName": "R2D2",
    "birthDate": "1940-01-01T00:00:00.000Z",
    "deathDate": "-01-01T00:00:00.000Z",
    "side": "droid"
  }, {
    "id": 10,
    "name": "Solo, Han",
    "gender": "M",
    "lastName": "Solo",
    "birthDate": "1942-01-01T00:00:00.000Z",
    "deathDate": "2015-01-01T00:00:00.000Z",
    "side": "neutral"
  }, {
    "id": 11,
    "name": "Chewbacca",
    "gender": "M",
    "lastName": "Chewbacca",
    "birthDate": "1777-01-01T00:00:00.000Z",
    "deathDate": null,
    "side": "neutral"
  }, {
    "id": 12,
    "name": "Solo, Ben",
    "gender": "M",
    "lastName": "Solo",
    "side": "dark"
  }, {
    "id": 13,
    "name": "Snoke",
    "gender": "M",
    "side": "dark"
  }, {
    "id": 14,
    "name": "Rey",
    "gender": "F",
    "side": "light"
  }, {
    "id": 15,
    "name": "Finn",
    "gender": "M",
    "side": "neutral"
  }, {
    "id": 16,
    "name": "Poe",
    "gender": "M",
    "side": "neutral"
  }, {
    "id": 17,
    "name": "BB-8",
    "side": "droid"
  }, {
    "id": 18,
    "name": "Obi-Wan Kenobi",
    "side": "light"
  }, {
    "id": 19,
    "name": "Sand People",
    "side": "neutral"
  }, {
    "id": 20,
    "name": "Darth Maul",
    "side": "dark"
  }, {
    "id": 21,
    "name": "Qui-Gon Jinn",
    "side": "light"
  }, {
    "id": 22,
    "name": "Jabba the Hut",
    "side": "neutral"
  }, {
    "id": 23,
    "name": "Greedo",
    "side": "neutral"
  }, {
    "id": 24,
    "name": "General Grevious",
    "side": "droid"
  }, {
    "id": 25,
    "name": "Count Dooku",
    "side": "dark"
  }



  ],
  "links": [{
    "source": 2,
    "target": 3,
    "color": "#CC0",
    "relation": "spouse"
  }, {
    "source": 1,
    "target": 2,
    "color": "#F39",
    "relation": "mother"
  }, {
    "source": 3,
    "target": 2,
    "color": "#CC0",
    "relation": "spouse"
  }, {
    "source": 3,
    "target": 4,
    "color": "#F39",
    "relation": "mother"
  }, {
    "source": 2,
    "target": 4,
    "color": "#39F",
    "relation": "father"
  }, {
    "source": 5,
    "target": 10,
    "color": "#CC0",
    "relation": "spouse"
  }, {
    "source": 3,
    "target": 5,
    "color": "#F39",
    "relation": "mother"
  }, {
    "source": 2,
    "target": 5,
    "color": "#39F",
    "relation": "father"
  }, {
    "source": 2,
    "target": 8,
    "color": "#39F",
    "relation": "father"
  }, {
    "source": 10,
    "target": 5,
    "color": "#CC0",
    "relation": "spouse"
  }, {
    "source": 5,
    "target": 12,
    "color": "#F39",
    "relation": "mother"
  }, {
    "source": 10,
    "target": 12,
    "color": "#39F",
    "relation": "father"
  }, {
    "source": 2,
    "target": 0,
    "relation": "killed"
  }, {
    "source": 2,
    "target": 18,
    "relation": "killed"
  }, {
    "source": 2,
    "target": 19,
    "relation": "killed"
  }, {
    "source": 19,
    "target": 1,
    "relation": "killed"
  }, {
    "source": 18,
    "target": 20,
    "relation": "killed"
  }, {
    "source": 20,
    "target": 21,
    "relation": "killed"
  }, {
    "source": 10,
    "target": 23,
    "relation": "killed"
  }, {
    "source": 5,
    "target": 22,
    "relation": "killed"
  }, {
    "source": 18,
    "target": 24,
    "relation": "killed"
  }, {
    "source": 2,
    "target": 25,
    "relation": "killed"
  }, {
    "source": 12,
    "target": 10,
    "relation": "killed"
  }, {
    "source": 18,
    "target": 2,
    "relation": "trained"
  }, {
    "source": 21,
    "target": 18,
    "relation": "trained"
  }, {
    "source": 4,
    "target": 12,
    "relation": "trained"
  }, {
    "source": 6,
    "target": 4,
    "relation": "trained"
  }, {
    "source": 13,
    "target": 12,
    "relation": "trained"
  }, {
    "source": 0,
    "target": 20,
    "relation": "trained"
  }

  ]
};


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


const Starwars = () => (
  <div className="chartContainer">
    <h1>Star Wars Network</h1>
    <h3>Force directed graph</h3>
      <ResponsiveNetworkFrame
          size={[ 300, 700 ]}
          responsiveWidth={true}
          edges={network.links}
          nodes={network.nodes}
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
                  { label: "Normal", color: colors.neutral },
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
);

export default Starwars

import React from 'react';
import { ResponsiveNetworkFrame } from 'semiotic';
import Nav from './Nav';
var companyData = require('../data/rj.json');

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

const annoSettings = {
  layout: {
    orient: 'right',
    textPadding: 38,
    marginOffset: 50
  },
  x: 50
};

class Rj extends React.Component {
  constructor(props) {
    super(props);
    this.network = {};
    this.process();
  }

  process() {
    this.network = {
      nodes: [{
        id: 0,
        name: "RJMetrics",
        size: 176,
        fill: 'orange',
        stroke: 'orange'
      }],
      links: []
    }

    companyData.forEach( (company, index) => {
      var node = {
        id: index + 1,
        name: company.name,
        size: company.size,
        fill: company.fill,
        stroke: company.stroke
      };
      var link = {
        source: 0,
        target: index + 1,
        value: company.size,
        fill: company.fill,
        stroke: company.stroke
      };
      this.network.nodes.push(node);
      this.network.links.push(link);
    });
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>RJMetrics</h1>
        <h3>Where are they now?</h3>
        <ResponsiveNetworkFrame
            size={[360, 700 ]}
            responsiveWidth={true}
            edges={this.network.links}
            nodes={this.network.nodes}
            nodeStyle={d => ({
              fill: d.fill,
              stroke: d.stroke
            })}
            edgeStyle={(d) => ({ stroke: d.stroke, fill: d.fill, opacity: 0.5, strokeWidth: '1px' })}
            networkType={{ type: 'sankey', orient: 'justify', iterations: 500, nodeWidth: 100, nodePadding: 22}}
            nodeIDAccessor={"id"}
            zoomToFit={true}
            nodeLabels={d => d.name}
            sourceAccessor={"source"}
            targetAccessor={"target"}
            nodeSizeAccessor={d => d.size}
            margin={{left: 25, top: 20, bottom: 20, right: 25}}
        />
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>This sankey diagram shows where people went after RJMetrics.</p>
          <p>I worked there from 3/13 until it was <a href="https://technical.ly/philly/2016/08/01/rjmetrics-magento-acquisition-stitch-cloudbi-pipeline/">acquired by Magento</a> 7/16. Seeing it go from 20 people to 140+ was exhilarating. Sometimes I get nostalgic and think about all the smart people I worked with and what we could have done differently, but I hope it was a positive experience for everyone.</p>
          <p>Someone accused me once of <a href="https://twitter.com/bengarvey/status/962124327213846528">drinking the kool aid</a> and it made me laugh. I was surrounded by scores of smart 20-somethings in their first job who didn't realize this might be the best one of their lives.</p>
          <p>Not everyone's experience was as good as mine and sure, some people were treated unfairly but I loved RJMetrics and did my best work there. <a href="https://www.linkedin.com/search/results/index/?keywords=rjmetrics&origin=GLOBAL_SEARCH_HEADER">RIP</a></p>
          <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, a spreadsheet maintained by Bob Moore and K Rich</p>
        </div>
        <Nav/>
      </div>
    );
  }
}

export default Rj

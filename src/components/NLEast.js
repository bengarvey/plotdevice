import React from 'react';
import { ResponsiveXYFrame } from 'semiotic';
import Nav from './Nav';
import { curveBasis } from 'd3-shape';
import { AnnotationLabel } from 'react-annotation';
var teams = require('../data/nleast.json');

var annotations = [];
var bumpAnnotations = [];

function processData() {
  teams.forEach( (team, index) => {
    var total = team.gamesAbove.length;
    var final = team.gamesAbove[total-1];
    final = final > 0 ? `+${final}` : final;
    annotations.push(
      { type: 'react-annotation',
        x:total, y: team.gamesAbove[total-1]+2,
        color: team.color,
        note: {label: `${final} ${team.name}`, align: 'left', color: team.color}
      }
    );
    bumpAnnotations.push(
      { type: 'react-annotation',
        x:total-1,
        y: index,
        dy: 11,
        dx: 5,
        color: team.color,
        disable: 'connector',
        note: {
          label: team.name, align: 'left',
          color: team.color
        }
      }
    );
  });

  annotations.push(
    { type: 'react-annotation',
      x: 161,
      y: 16,
      dx: 10,
      dy: -30,
      color: '#999999',
      note: {
        label: "Phillies beat the Nats 6-1,  Mets lose to Marlins 1-8 in the last games of the season",
        color: '#aa0000',
        wrap: 90
      }
    }
  );

  annotations.push(
    { type: 'react-annotation',
      x: 162,
      y: 1,
      dx: 0,
      dy: 0,
      color: '#999999',
      connector: "disabled",
      note: {
        label: "Wins above 50%",
        color: '#999999',
        wrap: 200,
        align: 'right'
      }
    }
  );

  bumpAnnotations.push(
    { type: 'react-annotation',
      x: 40,
      y: 0,
      color: '#0000aa',
      note: {
        label: "Mets in first place 118 games in a row",
        wrap: "200",
        align: 'left'
      },
      source: {x1:40,x2:158}
    }
  );
}

function yearToDate(year) {
  return new Date(`${year}-01-01T04:00:00Z`);
}

teams.forEach( (team) => {team.opacity = 0.8} );

class NLEast extends React.Component {
  constructor(props) {
    super(props);
    this.display = [];
    this.process();
  }

  process() {
    this.display = [
      {data: teams[0], opacity: 0.5}
    ];
    processData();
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>NLEast 2007</h1>
        <h3>How did the Phillies win?</h3>
        <ResponsiveXYFrame
          size={[350, 300]}
          responsiveWidth={true}
          lines={teams}
          defined={d => d.y !== null}
          lineDataAccessor={d => d.gamesAbove}
          xAccessor={(d,i) => i}
          yAccessor={d => d}
          lineRenderMode={d => "normal"}
          lineType={{type:"line", interpolator: curveBasis}}
          lineStyle={(d) => ({ stroke: d.color, strokeWidth: "2px", opacity: d.opacity})}
          customLineType={{ type: "dividedLine"}}
          hoverAnnotation={true}
          axes={[
            { orient: 'left', tickFormat: d => d },
            { orient: 'bottom', ticks: 8, tickFormat: d => d }
          ]}
          margin={{top: 10, left: 30, right: 45, bottom: 50}}
          annotations={annotations}
        />
        <h3>Standings throughout the season</h3>
        <ResponsiveXYFrame
          size={[350, 150]}
          responsiveWidth={true}
          lines={teams}
          defined={d => d.y !== null}
          lineDataAccessor={d => d.gamesAbove}
          xAccessor={(d,i) => i}
          yAccessor={(d,i) => 4 - d}
          lineRenderMode={d => "normal"}
          lineType={{type:"bumpline", interpolator: curveBasis}}
          lineStyle={(d) => ({ stroke: d.color, strokeWidth: "2px", opacity: d.opacity})}
          customLineType={{ type: "bumpline"}}
          hoverAnnotation={true}
          axes={[
            { orient: 'left', tickFormat: d => d },
            { orient: 'bottom', ticks: 8, tickFormat: d => d }
          ]}
          margin={{top: 15, left: 30, right: 45, bottom: 50}}
          annotations={bumpAnnotations}
        />
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>This <a href="https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0001lh">Tufte style whisker sparkline</a> of the 2007 NL East is one of my all time favorite charts. It captures the euphoria in the Phillies remarkable and unlikely comeback and the heartbreak Mets fans must have felt as their fantastic season collapsed at just the wrong time.
          </p>
          <p>I've recreated it a few times (and even put it on a t-shirt once!), but this is the first time I've paired it with a bump chart since Semiotic makes it easy.
          </p>
          <p>I used Semiotic's interface into <a href="http://react-annotation.susielu.com/">react-annotation</a> for this and I don't think I'll ever use anything else from now on. It's easier to work with than Semiotic's native annotation api.</p>
          <p>Sources: I scraped this data a long time ago from <a href="https://www.baseball-reference.com/teams/PHI/2007-schedule-scores.shtml">baseball-reference.com</a>.</p>
          <p>Tech: Semiotic, javascript, html, css</p>
        </div>
        <Nav/>
      </div>
    );
  }
}

export default NLEast

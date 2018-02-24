import React from 'react'
import { Mark, ResponsiveORFrame, ResponsiveXYFrame } from 'semiotic'
import TPFanFavorites from './TPFanFavorites'
import TPNoShows from './TPNoShows'
import TPRare from './TPRare'
import TPMyCostumes from './TPMyCostumes'
import flatten from "lodash.flatten";
import uniq from "lodash.uniq";
import Nav from './Nav';
var items = require('../data/cooplovescostumes.json');

const colors = {
  primary: 'rgba(0,0,0,0.1)',
  fbi: 'rgba(0,0,50,0.2)',
  evil: 'rgba(60,0,0,0.5)',
  dougie: 'rgba(162,171,53,0.8)',
  dress: 'rgba(0,0,50,0.6)',
  plastic: 'rgba(230,230,255,0.7)'
}

function cmp(a,b) {
  return getTotal(b) - getTotal(a);
}

function getEpisodeTotal(item) {
  var eps = item.episodesOriginal + item.episodesReturn + (item.fwwm*4);
  return eps;
}

function getTotal(item) {
  if (item.name === "Dale Cooper") {
    return item.dougie + item.fbi + item.evil;
  }
  else if (item.name === "Laura") {
    return item.plastic + item.dress;
  }
  else {
    return item.total;
  }
}

const axis = [{
  orient: "right",
  tickFormat: d => d,
  ticks: 4,
  label: {
    name: "axis label",
    position: { anchor: "middle" },
  }}
];

var sharedProps = {
  responsiveWidth: true
};

function customFunnelize({ data, steps, key, extraKeys }) {
  const funnelData = [];
  if (!Array.isArray(data)) {
    data = [data];
  }
  if (!steps) {
    steps = uniq(flatten(data.map(d => Object.keys(d))));
  }

  data.forEach((datum, i) => {
    const datumKey = key ? datum[key] : i;
    steps.forEach(step => {
      const funnelDatum = { funnelKey: datumKey };
      funnelDatum.stepName = step;
      funnelDatum.image = datum.image;
      funnelDatum.stepValue = datum[step] ? datum[step] : 0;
      funnelData.push(funnelDatum);
    });
  });

  return funnelData;
}

function getScatterSize(total) {
  if (total > 100) {
    return 70;
  }
  else if (total > 50) {
    return 50;
  }
  else if (total > 40) {
    return 50;
  }
  else if (total > 20) {
    return 50;
  }
  else {
    return 45;
  }
}

class CoopLovesCostumes extends React.Component {
  constructor(props) {
    super(props);
    this.scatterItems = [];
    this.process();
  }

  process() {
    var stackedItems = [];

    stackedItems.push({color: colors.primary, fillOpacity:0.1});
    var steps = [];

    items = items.sort(cmp);

    items.forEach( (item) => {
      if (getTotal(item) > 5 && !item.hide) {
        item.color = colors.primary;
        stackedItems[0][item.name] = item.total;
        steps.push(item.name);

        if (item.name === "Dale Cooper") {
          stackedItems[1] = {
            image: 'coop',
            color: colors.fbi,
            "Dale Cooper": item.fbi,
          }
          stackedItems[2] = {
            image: 'dougie',
            color: colors.dougie,
            "Dale Cooper": item.dougie,
          }
          stackedItems[3] = {
            image: 'evil',
            color: colors.evil,
            "Dale Cooper": item.evil,
          }
       }
       else if (item.name === "Laura") {
          stackedItems[4] = {
            color: colors.plastic,
            "Laura": item.plastic,
          }
          stackedItems[5] = {
            color: colors.dress,
            "Laura": item.dress
          }
        }
      }

      if (item.total > 3) {
        this.scatterItems.push(item);
      }

    });

    this.display = customFunnelize({
      data: stackedItems,
      steps: steps,
      key: "color",
      extraKeys: ["name", "image"]
    });
  }

  render() {
    return (
      <div>
        <div className="chartContainer">
          <h1>#CoopLovesCostumes</h1>
          <h3>Which Twin Peaks costumes were the most popular?</h3>
          <ul className="characterList">
             <li className="characterListItem"><img alt="Agent Cooper" src="images/coop.png"/></li>
             <li className="characterListItem"><img alt="Dougie Jones" src="images/dougie.png"/></li>
             <li className="characterListItem"><img alt="Evil Dale" src="images/evil.png"/></li>
           </ul>
          <p>On October 23rd, 2017 Kyle MacLachlan announced a Twin Peaks Halloween costume <a href="https://www.instagram.com/p/BamuMivAZko/?hl=en&taken-by=kyle_maclachlan">contest on Instagram</a>. To be eligible, you had to tag your costume with <a href="https://www.instagram.com/explore/tags/cooplovescostumes/">#CoopLovesCostumes</a> and omg the feed of costumes is incredible. But which characters were the most popular? To answer this question I scraped 2300+ photos and meta data from Instagram and so far have tagged over 700 photos. Here are the results so far</p>
          <ResponsiveORFrame
            { ...sharedProps }
            projection={'horizontal'}
            size={[300,700]}
            responsiveWidth={true}
            type={{
              type: "bar",
              customMark: (d, i, xy) => [
                <rect
                  style={{ fill: d.funnelKey, fillOpacity: d.fillOpacity }}
                  x={0}
                  width={xy.width}
                  height={xy.height}
                />,
                <image
                  href={d.stepValue > 0 ? `./images/${d.image}.png` : ''}
                  height="30px"
                  y={0}
                  x={xy.width-30}
                />
              ]
            }}
            defined={d => d.total > 10}
            data={this.display}
            margin={{top: 5, bottom: 25, left: 5, right: 5}}
            oAccessor={"stepName"}
            rAccessor={"stepValue"}
            oPadding={5}
            renderMode={d => "normal"}
            oLabel={ d => <text y={5} x={9} className="barText">{d}</text> }
            style={d => {return { fill: d.funnelKey, fillOpacity: d.fillOpacity}}}
            axis={axis}
          />
        </div>
        <div className="chartContainer">
          <h1 className="nextReport">Popularity vs Episode Freq</h1>
          <h3>Does the frequency of a character influence their costume popularity?</h3>
          <ResponsiveXYFrame
            { ...sharedProps }
            points={this.scatterItems}
            size={[300,700]}
            yExtent={[0,165]}
            xExtent={[0,45]}
            hoverAnnotation={true}
            defined={d => d.total > 2}
            xAccessor={ d => getEpisodeTotal(d) }
            yAccessor={ d => d.total }
            tooltipContent={ d => `${d.name} ${d.total} costumes ${d.episodesTotal} espisodes` }
            pointStyle={ d => ({fill: "#666", r: '5px'})}
            customPointMark={ ({d}) => ( <Mark markType="image" transform="translate(0,0)" x={getScatterSize(d.total, d.name)/-2} y={getScatterSize(d.total, d.name)/-2} height={getScatterSize(d.total, d.name)+"px"} width={getScatterSize(d.total, d.name)+"px"} type="image/svg+xml" xlinkHref={`images/${d.image}.png`}/> ) }
            axes={[
              { orient: 'bottom', padding: 0, ticks: 5, tickFormat: d => d, label:'Episode Appearances + FWWM'},
              { orient: 'left', ticks: 7, tickFormat: d => d, label:'Costume Popularity'}
            ]}
            margin={{ left: 55, bottom: 100, right: 10, top: 30 }}
          />
        </div>
        <div>
          <TPFanFavorites/>
          <TPRare/>
          <TPNoShows/>
          <TPMyCostumes/>
        <div className="notes nextReport chartContainer">
          <h3>Notes and Sources</h3>
          <p>I'm a huge Twin Peaks fan, so this was a labor of love. And it was lot of labor going through and tagging each photo. I found an open source library to scrape the photos and meta data from a public feed. </p>
          <p>The standouts (fan favorites, no shows, etc.) are hard coded but are based on a few derived metrics: popfrequency and unpopfrequency. It's the % of total costumes dvided by the number of episodes they appeared in. Appearing in the Twin Peaks film, Fire Walk with Me, counts as being in four episodes, which sounds about right to me.</p>
          <p>Semiotic really delivers here on the promise of reusability, as I took my <a href="libraries">Charting Technolgies</a> scatter plot and repurposed it here with minimal changes.</p> 
          <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, Instagram scraper, Google Sheets, GIMP</p>
        </div>
        </div>
        <Nav/>
     </div>
    )
  }
}

export default CoopLovesCostumes

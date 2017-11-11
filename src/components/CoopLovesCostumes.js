import React from 'react'
import { Mark, funnelize, ResponsiveORFrame, ResponsiveXYFrame } from 'semiotic'
import TPFanFavorites from './TPFanFavorites'
import TPNoShows from './TPNoShows'
import flatten from "lodash.flatten";
import uniq from "lodash.uniq";

var scatterHover = null;

const colors = {
  primary: 'rgba(0,0,0,0.1)',
  fbi: 'rgba(0,0,50,0.2)',
  evil: 'rgba(60,0,0,0.5)',
  dougie: 'rgba(162,171,53,0.8)',
  dress: 'rgba(0,0,50,0.6)',
  plastic: 'rgba(230,230,255,0.7)'
}

var items =
[
 {
   "name": "Dale Cooper",
   "total": 0,
   "fbi": 159,
   "evil": 50,
   "dougie": 63,
   "episodesOriginal": 30,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 52,
   "image": "coop"
 },
 {
   "name": "Dale Cooper",
   "total": 159,
   "episodesOriginal": 30,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 52,
   "image": "coop",
   "hide": true
 },
 {
   "name": "Evil Dale",
   "total": 50,
   "episodesOriginal": 30,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 52,
   "image": "evil",
   "hide": true
 },
 {
   "name": "Dougie Jones",
   "total": 63,
   "episodesOriginal": 30,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 52,
   "image": "dougie",
   "hide": true
 },
 {
   "name": "Laura",
   "total": 0,
   "dress": 35,
   "prom": 6,
   "plastic": 46,
   "episodesOriginal": 18,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 40,
   "image": "laura",
   "hide": false
 },
 {
   "name": "Laura (black dress)",
   "total": 35,
   "episodesOriginal": 18,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 40,
   "image": "dress",
   "hide": true
 },
 {
   "name": "Laura (prom photo)",
   "total": 6,
   "episodesOriginal": 18,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 40,
   "image": "prom",
   "hide": true
 },
 {
   "name": "Laura (plastic wrap)",
   "total": 46,
   "episodesOriginal": 18,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 40,
   "image": "laura",
   "hide": true
 },
 {
   "name": "Diane",
   "total": 130,
   "episodesOriginal": 0,
   "episodesReturn": 9,
   "fwwm": 0,
   "episodesTotal": 9,
   "image": "diane"
 },
 {
   "name": "Log Lady",
   "total": 125,
   "episodesOriginal": 12,
   "episodesReturn": 5,
   "fwwm": 1,
   "episodesTotal": 21,
   "image": "loglady"
 },
 {
   "name": "BOB",
   "total": 30,
   "episodesOriginal": 11,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 15,
   "image": "bob"
 },
 {
   "name": "Shelly",
   "total": 55,
   "episodesOriginal": 30,
   "episodesReturn": 7,
   "fwwm": 1,
   "episodesTotal": 41,
   "image": "shelly"
 },
 {
   "name": "Naido",
   "total": 4,
   "episodesOriginal": 0,
   "episodesReturn": 4,
   "fwwm": 0,
   "episodesTotal": 4,
   "image": "naido"
 },
 {
   "name": "A blue rose",
   "total": 2,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 0,
   "image": ""
 },
 {
   "name": "Audrey Horne",
   "total": 82,
   "episodesOriginal": 30,
   "episodesReturn": 4,
   "fwwm": 1,
   "episodesTotal": 38,
   "image": "audrey"
 },
 {
   "name": "Ronette Pulaski",
   "total": 2,
   "episodesOriginal": 5,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 9,
   "image": "ronette"
 },
 {
   "name": "Josie Packard",
   "total": 2,
   "episodesOriginal": 30,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 30,
   "image": "josie"
 },
 {
   "name": "Nadine",
   "total": 20,
   "episodesOriginal": 22,
   "episodesReturn": 5,
   "fwwm": 0,
   "episodesTotal": 27,
   "image": "nadine"
 },
 {
   "name": "Lucy",
   "total": 8,
   "episodesOriginal": 29,
   "episodesReturn": 10,
   "fwwm": 0,
   "episodesTotal": 39,
   "image": "lucy"
 },
 {
   "name": "Andy",
   "total": 7,
   "episodesOriginal": 26,
   "episodesReturn": 9,
   "fwwm": 0,
   "episodesTotal": 35,
   "image": "andy"
 },
 {
   "name": "Senorita Dido",
   "total": 12,
   "episodesOriginal": 0,
   "episodesReturn": 1,
   "fwwm": 0,
   "episodesTotal": 1,
   "image": "dido"
 },
 {
   "name": "Candie, Sandie, and Mandie",
   "total": 14,
   "episodesOriginal": 0,
   "episodesReturn": 6,
   "fwwm": 0,
   "episodesTotal": 6,
   "image": "csm"
 },
 {
   "name": "Dr Jacoby",
   "total": 28,
   "episodesOriginal": 16,
   "episodesReturn": 6,
   "fwwm": 0,
   "episodesTotal": 22,
   "image": "jacoby"
 },
 {
   "name": "Man from Another Place",
   "total": 12,
   "episodesOriginal": 5,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 9,
   "image": "mfap"
 },
 {
   "name": "The Black Lodge",
   "total": 27,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 0,
   "image": "lodge"
 },
 {
   "name": "Denise Bryson",
   "total": 1,
   "episodesOriginal": 3,
   "episodesReturn": 1,
   "fwwm": 0,
   "episodesTotal": 4,
   "image": "denise"
 },
 {
   "name": "Gordon Cole",
   "total": 22,
   "episodesOriginal": 7,
   "episodesReturn": 11,
   "fwwm": 1,
   "episodesTotal": 22,
   "image": "gordon"
 },
 {
   "name": "Woodsman",
   "total": 25,
   "episodesOriginal": 0,
   "episodesReturn": 4,
   "fwwm": 1,
   "episodesTotal": 8,
   "image": "woodsman"
 },
 {
   "name": "A character from the black lodge?",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 1,
   "fwwm": 0,
   "episodesTotal": 1,
   "image": ""
 },
 {
   "name": "Jerry Horne",
   "total": 0,
   "episodesOriginal": 9,
   "episodesReturn": 7,
   "fwwm": 0,
   "episodesTotal": 16,
   "image": "jerry"
 },
 {
   "name": "Bobby Briggs",
   "total": 4,
   "episodesOriginal": 30,
   "episodesReturn": 7,
   "fwwm": 1,
   "episodesTotal": 41,
   "image": "bobby"
 },
 {
   "name": "Pete Martell",
   "total": 4,
   "episodesOriginal": 30,
   "episodesReturn": 1,
   "fwwm": 0,
   "episodesTotal": 31,
   "image": "pete"
 },
 {
   "name": "Sheriff Truman",
   "total": 10,
   "episodesOriginal": 30,
   "episodesReturn": 10,
   "fwwm": 0,
   "episodesTotal": 40,
   "image": "harry"
 },
 {
   "name": "Freddie Sykes",
   "total": 9,
   "episodesOriginal": 0,
   "episodesReturn": 4,
   "fwwm": 0,
   "episodesTotal": 4,
   "image": "freddie"
 },
 {
   "name": "Slice of cherry pie",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 0,
   "image": "pie"
 },
 {
   "name": "Phillip Jeffries",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 3,
   "fwwm": 1,
   "episodesTotal": 7,
   "image": "jeffries"
 },
 {
   "name": "An owl",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 0,
   "image": ""
 },
 {
   "name": "Wally Brando",
   "total": 5,
   "episodesOriginal": 0,
   "episodesReturn": 1,
   "fwwm": 0,
   "episodesTotal": 1,
   "image": "wally"
 },
 {
   "name": "Norma Jennings",
   "total": 5,
   "episodesOriginal": 30,
   "episodesReturn": 5,
   "fwwm": 1,
   "episodesTotal": 39,
   "image": "norma"
 },
 {
   "name": "Philip Gerard",
   "total": 4,
   "episodesOriginal": 10,
   "episodesReturn": 9,
   "fwwm": 1,
   "episodesTotal": 23,
   "image": "philip"
 },
 {
   "name": "Hastings' paranornal website?",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 0,
   "image": ""
 },
 {
   "name": "Janey-E Jones",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 10,
   "fwwm": 0,
   "episodesTotal": 10,
   "image": "janey"
 },
 {
   "name": "Leo Johnson",
   "total": 4,
   "episodesOriginal": 24,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 28,
   "image": "leo"
 },
 {
   "name": "Lil the Dancer",
   "total": 5,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 4,
   "image": "lil"
 },
 {
   "name": "Tammy Palmer",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 11,
   "fwwm": 0,
   "episodesTotal": 11,
   "image": "tammy"
 },
 {
   "name": "Donna Hayward",
   "total": 2,
   "episodesOriginal": 30,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 34,
   "image": "donna"
 },
 {
   "name": "Ed Hurley",
   "total": 3,
   "episodesOriginal": 30,
   "episodesReturn": 2,
   "fwwm": 0,
   "episodesTotal": 32,
   "image": "ed"
 },
 {
   "name": "Maddie Fergeson",
   "total": 1,
   "episodesOriginal": 6,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 6,
   "image": "maddie"
 },
 {
   "name": "Alice Tremond",
   "total": 1,
   "episodesOriginal": 1,
   "episodesReturn": 2,
   "fwwm": 0,
   "episodesTotal": 3,
   "image": "alice"
 },
 {
   "name": "The Giant",
   "total": 1,
   "episodesOriginal": 5,
   "episodesReturn": 4,
   "fwwm": 0,
   "episodesTotal": 9,
   "image": "giant"
 },
 {
   "name": "One Eyed Jacks Girls",
   "total": 2,
   "episodesOriginal": 7,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 11,
   "image": "jacks"
 },
 {
   "name": "Sarah Palmer",
   "total": 1,
   "episodesOriginal": 13,
   "episodesReturn": 6,
   "fwwm": 1,
   "episodesTotal": 23,
   "image": "sarah"
 }
];


var stackedItems = [];
var scatterItems = [];

stackedItems.push({color: colors.primary, fillOpacity:0.1});
var steps = [];

items = items.sort(cmp);

items.forEach( function(item) {
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
    scatterItems.push(item);
  }

});

var display = customFunnelize({
  data: stackedItems,
  steps: steps,
  key: "color",
  extraKeys: ["name", "image"]
});

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
    return 40;
  }
  else if (total > 20) {
    return 30;
  }
  else {
    return 25;
  }
}

function hoverScatter(d) {
  scatterHover = d != null ? d.name : null;
}

var CoopLovesCostumes = () => (
  <div>
    <div className="chartContainer">
      <h1>#CoopLovesCostumes</h1>
      <h3>Which Twin Peaks costumes were the most popular?</h3>
      <p>On October 23rd, 2017 Kyle MacLachlan announced a Twin Peaks Halloween costume <a href="https://www.instagram.com/p/BamuMivAZko/?hl=en&taken-by=kyle_maclachlan">contest on Instagram</a>. To be eligible, you had to tag your costume with <a href="https://www.instagram.com/explore/tags/cooplovescostumes/">#CoopLovesCostumes</a> and omg the feed of costumes is incredible. But which characters were the most popular? To answer this question I scraped 2300+ photos and meta data from Instagram and so far have tagged around 200 photos. Here are the results so far</p>
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
        data={display}
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
    <div className="chartContainerWide">
      <h1 className="nextReport">Popularity vs Episode Freq</h1>
      <h3>Does the frequency of a character influence their costume popularity?</h3>
      <ResponsiveXYFrame
        { ...sharedProps }
        points={scatterItems}
        size={[300,700]}
        yExtent={[0,160]}
        xExtent={[0,60]}
        customHoverBehavior={d => hoverScatter(this, d)}
        hoverAnnotation={true}
        defined={d => d.total > 2}
        xAccessor={ d => getEpisodeTotal(d) }
        yAccessor={ d => d.total }
        tooltipContent={ d => `${d.name} ${d.total} costumes ${d.episodesTotal} espisodes` }
        pointStyle={ d => ({fill: "#666", r: '5px'})}
        customPointMark={ ({d}) => ( <Mark markType="image" transform="translate(0,0)" x={getScatterSize(d.total, d.name)/-2} y={getScatterSize(d.total, d.name)/-2} height={getScatterSize(d.total, d.name)+"px"} type="image/svg+xml" xlinkHref={`images/${d.image}.png`}/> ) }
        axes={[
          { orient: 'bottom', padding: 0, ticks: 5, tickFormat: d => d, label:'Episode Appearances + FWWM'},
          { orient: 'left', ticks: 5, tickFormat: d => d, label:'Costume Popularity'}
        ]}
        margin={{ left: 55, bottom: 100, right: 10, top: 30 }}
      />
    </div>
    <div>
      <TPFanFavorites/>
      <TPNoShows/>
    <div className="notes nextReport">
      <h3>Notes and Sources</h3>
      <p>I'm a huge Twin Peaks fan, so this was a labor of love. And it was lot of labor going through and tagging each photo. I found an open source library to scrape the photos and meta data from a public feed. </p>
      <p>The standouts (fan favorites, no shows, etc.) are hard coded but are based on a few derived metrics: popfrequency and unpopfrequency. It's the % of total costumes dvided by the number of episodes they appeared in. Appearing in the Twin Peaks film, Fire Walk with Me, counts as being in four episodes, which sounds about right to me.</p>
      <p>I've been BOB, Dale Cooper, and Evil Dale for Halloween.</p>
      <p>Semiotic really delivers here on the promise of reusability, as I took my <a href="libraries">Charting Technolgies</a> scatter plot and repurposed it here with minimal changes.</p> 
      <p>Tech: <a href="https://emeeks.github.io/semiotic">Semiotic</a>, javascript, Instagram scraper, Google Sheets, GIMP</p>
    </div>
    </div>
  </div>
)

export default CoopLovesCostumes

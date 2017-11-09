import React from 'react'
import { Mark, funnelize, ResponsiveORFrame, ResponsiveXYFrame } from 'semiotic'
import TPFanFavorites from './TPFanFavorites'
import TPNoShows from './TPNoShows'

const colors = {
  primary: 'rgba(0,0,0,0.1)',
  fbi: 'rgba(0,0,50,0.2)',
  evil: 'rgba(60,0,0,0.5)',
  dougie: 'rgba(162,171,53,0.8)',
  dress: 'rgba(0,0,50,0.6)',
  plastic: 'rgba(230,230,255,0.7)'
}

var items = [
 {
   "id": 1,
   "name": "Dale Cooper",
   "total": 0,
   "fbi": 64,
   "evil": 22,
   "dougie": 26,
   "episodesOriginal": 30,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 52,
   "image": "coop"
 },
 {
   "id": 1,
   "name": "Dale Cooper",
   "total": 64,
   "episodesOriginal": 30,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 52,
   "image": "coop",
   "hide": true
 },
 {
   "id": 2,
   "name": "Evil Dale",
   "total": 22,
   "episodesOriginal": 30,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 52,
   "image": "evil",
   "hide": true
 },
 {
   "id": 3,
   "name": "Dougie Jones",
   "total": 26,
   "episodesOriginal": 30,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 52,
   "image": "dougie",
   "hide": true
 },
 {
   "id": 4,
   "name": "Laura Palmer",
   "total": 0,
   "dress": 16,
   "prom": 1,
   "plastic": 30,
   "episodesOriginal": 18,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 40,
   "image": "dress",
 },
 {
   "id": 4,
   "name": "Laura (black dress)",
   "total": 16,
   "episodesOriginal": 18,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 40,
   "image": "dress",
   "hide": true
 },
 {
   "id": 5,
   "name": "Laura (prom photo)",
   "total": 1,
   "episodesOriginal": 18,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 40,
   "image": "prom",
   "hide": true
 },
 {
   "id": 6,
   "name": "Laura (plastic wrap)",
   "total": 30,
   "episodesOriginal": 18,
   "episodesReturn": 18,
   "fwwm": 1,
   "episodesTotal": 40,
   "image": "laura",
   "hide": true
 },
 {
   "id": 7,
   "name": "Diane",
   "total": 58,
   "episodesOriginal": 0,
   "episodesReturn": 9,
   "fwwm": 0,
   "episodesTotal": 9,
   "image": "diane"
 },
 {
   "id": 8,
   "name": "Log Lady",
   "total": 49,
   "episodesOriginal": 12,
   "episodesReturn": 5,
   "fwwm": 1,
   "episodesTotal": 21,
   "image": "loglady"
 },
 {
   "id": 9,
   "name": "BOB",
   "total": 18,
   "episodesOriginal": 11,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 15,
   "image": "bob"
 },
 {
   "id": 10,
   "name": "Shelly",
   "total": 17,
   "episodesOriginal": 30,
   "episodesReturn": 7,
   "fwwm": 1,
   "episodesTotal": 41,
   "image": "shelly"
 },
 {
   "id": 12,
   "name": "Naido",
   "total": 2,
   "episodesOriginal": 0,
   "episodesReturn": 4,
   "fwwm": 0,
   "episodesTotal": 4,
   "image": "naido"
 },
 {
   "id": 13,
   "name": "A blue rose",
   "total": 2,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 0,
   "image": ""
 },
 {
   "id": 14,
   "name": "Audrey Horne",
   "total": 45,
   "episodesOriginal": 30,
   "episodesReturn": 4,
   "fwwm": 1,
   "episodesTotal": 38,
   "image": "audrey"
 },
 {
   "id": 15,
   "name": "Ronette Pulaski",
   "total": 2,
   "episodesOriginal": 5,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 9,
   "image": "ronette"
 },
 {
   "id": 16,
   "name": "Josie Packard",
   "total": 2,
   "episodesOriginal": 30,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 30,
   "image": "josie"
 },
 {
   "id": 17,
   "name": "Nadine",
   "total": 11,
   "episodesOriginal": 22,
   "episodesReturn": 5,
   "fwwm": 0,
   "episodesTotal": 27,
   "image": "nadine"
 },
 {
   "id": 18,
   "name": "Lucy",
   "total": 6,
   "episodesOriginal": 29,
   "episodesReturn": 10,
   "fwwm": 0,
   "episodesTotal": 39,
   "image": "lucy"
 },
 {
   "id": 19,
   "name": "Andy",
   "total": 6,
   "episodesOriginal": 26,
   "episodesReturn": 9,
   "fwwm": 0,
   "episodesTotal": 35,
   "image": "andy"
 },
 {
   "id": 20,
   "name": "Senorita Dido",
   "total": 10,
   "episodesOriginal": 0,
   "episodesReturn": 1,
   "fwwm": 0,
   "episodesTotal": 1,
   "image": "dido"
 },
 {
   "id": 21,
   "name": "Candie, Sandie, and Mandie",
   "total": 10,
   "episodesOriginal": 0,
   "episodesReturn": 6,
   "fwwm": 0,
   "episodesTotal": 6,
   "image": "csm"
 },
 {
   "id": 22,
   "name": "Dr Jacoby",
   "total": 12,
   "episodesOriginal": 16,
   "episodesReturn": 6,
   "fwwm": 0,
   "episodesTotal": 22,
   "image": "jacoby"
 },
 {
   "id": 23,
   "name": "Man from Another Place",
   "total": 9,
   "episodesOriginal": 5,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 9,
   "image": "mfap"
 },
 {
   "id": 24,
   "name": "The Black Lodge",
   "total": 10,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 0,
   "image": "lodge"
 },
 {
   "id": 25,
   "name": "Denise Bryson",
   "total": 1,
   "episodesOriginal": 3,
   "episodesReturn": 1,
   "fwwm": 0,
   "episodesTotal": 4,
   "image": "denise"
 },
 {
   "id": 26,
   "name": "Gordon Cole",
   "total": 8,
   "episodesOriginal": 7,
   "episodesReturn": 11,
   "fwwm": 1,
   "episodesTotal": 22,
   "image": "gordon"
 },
 {
   "id": 27,
   "name": "Woodsman",
   "total": 11,
   "episodesOriginal": 0,
   "episodesReturn": 4,
   "fwwm": 1,
   "episodesTotal": 8,
   "image": "woodsman"
 },
 {
   "id": 28,
   "name": "A character from the black lodge?",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 1,
   "fwwm": 0,
   "episodesTotal": 1,
   "image": ""
 },
 {
   "id": 29,
   "name": "Jerry Horne",
   "total": 0,
   "episodesOriginal": 9,
   "episodesReturn": 7,
   "fwwm": 0,
   "episodesTotal": 16,
   "image": "jerry"
 },
 {
   "id": 30,
   "name": "Bobby Briggs",
   "total": 2,
   "episodesOriginal": 30,
   "episodesReturn": 7,
   "fwwm": 1,
   "episodesTotal": 41,
   "image": "bobby"
 },
 {
   "id": 31,
   "name": "Pete Martell",
   "total": 3,
   "episodesOriginal": 30,
   "episodesReturn": 1,
   "fwwm": 0,
   "episodesTotal": 31,
   "image": "pete"
 },
 {
   "id": 32,
   "name": "Sheriff Truman",
   "total": 3,
   "episodesOriginal": 30,
   "episodesReturn": 10,
   "fwwm": 0,
   "episodesTotal": 40,
   "image": "truman"
 },
 {
   "id": 33,
   "name": "Freddie Sykes",
   "total": 2,
   "episodesOriginal": 0,
   "episodesReturn": 4,
   "fwwm": 0,
   "episodesTotal": 4,
   "image": "freddie"
 },
 {
   "id": 34,
   "name": "Slice of cherry pie",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 0,
   "image": "pie"
 },
 {
   "id": 35,
   "name": "Phillip Jeffries",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 3,
   "fwwm": 1,
   "episodesTotal": 7,
   "image": "jeffries"
 },
 {
   "id": 36,
   "name": "An owl",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 0,
   "image": ""
 },
 {
   "id": 37,
   "name": "Wally Brando",
   "total": 4,
   "episodesOriginal": 0,
   "episodesReturn": 1,
   "fwwm": 0,
   "episodesTotal": 1,
   "image": "wally"
 },
 {
   "id": 38,
   "name": "Norma",
   "total": 4,
   "episodesOriginal": 30,
   "episodesReturn": 5,
   "fwwm": 1,
   "episodesTotal": 39,
   "image": "norma"
 },
 {
   "id": 39,
   "name": "Philip Gerard",
   "total": 3,
   "episodesOriginal": 10,
   "episodesReturn": 9,
   "fwwm": 1,
   "episodesTotal": 23,
   "image": "philip"
 },
 {
   "id": 40,
   "name": "Hastings' paranornal website?",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 0,
   "episodesTotal": 0,
   "image": ""
 },
 {
   "id": 41,
   "name": "Janey-E Jones",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 10,
   "fwwm": 0,
   "episodesTotal": 10,
   "image": "janey"
 },
 {
   "id": 42,
   "name": "Leo Johnson",
   "total": 4,
   "episodesOriginal": 24,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 28,
   "image": "leo"
 },
 {
   "id": 43,
   "name": "Lil the Dancer",
   "total": 2,
   "episodesOriginal": 0,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 4,
   "image": "lil"
 },
 {
   "id": 44,
   "name": "Tammy Palmer",
   "total": 1,
   "episodesOriginal": 0,
   "episodesReturn": 11,
   "fwwm": 0,
   "episodesTotal": 11,
   "image": "tammy"
 },
 {
   "id": 45,
   "name": "Donna Hayward",
   "total": 2,
   "episodesOriginal": 30,
   "episodesReturn": 0,
   "fwwm": 1,
   "episodesTotal": 34,
   "image": "donna"
 },
 {
   "id": 46,
   "name": "Ed Hurley",
   "total": 1,
   "episodesOriginal": 30,
   "episodesReturn": 2,
   "fwwm": 0,
   "episodesTotal": 32,
   "image": "ed"
 },
 {
   "id": 47,
   "name": "Maddie Fergeson",
   "total": 1,
   "episodesOriginal": 30,
   "episodesReturn": 2,
   "fwwm": 0,
   "episodesTotal": 32,
   "image": "maddie"
 },
 {
   "id": 48,
   "name": "Alice Tremond",
   "total": 1,
   "episodesOriginal": 30,
   "episodesReturn": 2,
   "fwwm": 0,
   "episodesTotal": 32,
   "image": "alice"
 }
];


var stackedItems = [];
var scatterItems = [];

stackedItems.push({color: colors.primary, fillOpacity:0.1});
var steps = [];

items = items.sort(cmp);

items.forEach( function(item) {
  if (getTotal(item) > 3 && !item.hide) {
    item.color = colors.primary;
    stackedItems[0][item.name] = item.total;
    steps.push(item.name);

    if (item.name === "Dale Cooper") {
      stackedItems[1] = {
        color: colors.fbi,
        "Dale Cooper": item.fbi,
      }
      stackedItems[2] = {
        color: colors.dougie,
        "Dale Cooper": item.dougie,
      }
      stackedItems[3] = {
        color: colors.evil,
        "Dale Cooper": item.evil,
      }
   }
   else if (item.name === "Laura Palmer") {
      stackedItems[4] = {
        color: colors.plastic,
        "Laura Palmer": item.plastic,
      }
      stackedItems[5] = {
        color: colors.dress,
        "Laura Palmer": item.dress
      }
    }
  }

  if (item.total > 3) {
    scatterItems.push(item);
  }

});

var display = funnelize({
  data: stackedItems,
  steps: steps,
  key: "color"
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
  else if (item.name === "Laura Palmer") {
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
  responsiveWidth: true,
  hoverAnnotation: true
};


var CoopLovesCostumes = () => (
  <div>
    <div className="chartContainer">
      <h1>#CoopLovesCostumes</h1>
      <h3>Which Twin Peaks costumes were the most popular?</h3>
      <ul className="characterList">
        <li className="characterListItem"><img alt="Agent Cooper" src="images/coop.png"/></li>
        <li className="characterListItem"><img alt="Dougie Jones" src="images/dougie.png"/></li>
        <li className="characterListItem"><img alt="Evil Dale" src="images/evil.png"/></li>
      </ul>
      <p>On October 23rd, 2017 Kyle MacLachlan announced a Twin Peaks Halloween costume <a href="https://www.instagram.com/p/BamuMivAZko/?hl=en&taken-by=kyle_maclachlan">contest on Instagram</a>. To be eligible, you had to tag your costume with <a href="https://www.instagram.com/explore/tags/cooplovescostumes/">#CoopLovesCostumes</a> and omg the feed of costumes is incredible. But which characters were the most popular? To answer this question I scraped 2300+ photos and meta data from Instagram and so far have tagged around 200 photos. Here are the results so far</p>
      <ResponsiveORFrame
        { ...sharedProps }
        projection={'horizontal'}
        size={[300,700]}
        responsiveWidth={true}
        type={'bar'}
        defined={d => d.total > 5}
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
        yExtent={[0,65]}
        xExtent={[0,60]}
        defined={d => d.total > 2}
        xAccessor={ d => getEpisodeTotal(d) }
        yAccessor={ d => d.total }
        pointStyle={ d => ({fill: "#666", r: '5px'})}
        customPointMark={ ({d}) => ( <Mark markType="image" transform="translate(-20,-20)" height="50px" width="50px" type="image/svg+xml" xlinkHref={`images/${d.image}.png`}/> ) }
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

import React from 'react';
import { ResponsiveORFrame, ResponsiveXYFrame } from 'semiotic';
import { scaleLinear } from "d3-scale";
import Nav from './Nav';

const colors = {
  female: '#faa1c7',
  male: '#009ddc',
  unknown: '#666666'
}

var movies = require('../data/topmovies.json');

movies.forEach((m) => {
  Object.keys(m.rank).forEach((key) => {
    m.rank[key] = m.rank[key] == 0 || m.rank[key] > 100 ? null : parseInt(m.rank[key]);
  });
});

var sortedMovies09 = movies.slice();
sortedMovies09.sort((a,b) => {return sortByRank(a,b,"2009")});
var sortedMovies18 = movies.slice();
sortedMovies18.sort((a,b) => {return sortByRank(a,b,"2018")});

function sortByRank(x,y,key) {
  var a = x.rank[key];
  var b = y.rank[key];
  return (a === null) - (b === null) || +(a > b) || -(a < b);
}

console.log(sortedMovies09);
console.log(sortedMovies18);

movies = movies.splice(0,99);
const heatScale = scaleLinear()
  .domain([0,5,10])
  .range(["#fbf7da", "red", "darkred"]).clamp(true);

const daysAxis = {
    orient: 'left', ticks: 7,
    tickFormat: d => d ?
    <text style={{ textAnchor: "end" }} fontSize="12px" y={5} x={2}>{d}</text> : '' };

var decades = {};
var directors = {};
var genders = {};

movies.forEach( function(d, i) {
  var decade = Math.floor( (new Date(d.release_date).getYear()/10) )*10 + 1900;
  decades[decade] = increment(decades, decade);
  if (d.director === null) {
    d.director = {};
  }
  directors[d.director.name] = increment(directors, d.director.name);
  genders[d.director.name] = d.director.gender;
});

delete directors["undefined"];

var modDecades = buildData(decades);
var modDirectors = buildData(directors).sort(sortByValueDesc);

function buildData(list) {
  var modified = [];
  Object.keys(list).forEach( function(key,i) {
    var item = {
      name: key,
      value: list[key],
      className: genders[key] == 1 ? 'female'
        : 'male'
    }
    modified.push(item);
  });
  return modified;
}

function increment(list, key) {
  var value = 0;
  if (key !== null && key !== '') {
    value = typeof(list[key]) === "undefined" ? list[key] = 1 : list[key] + 1;
  }
  return value;
}

function sortByValueAsc(a,b) {
  return a.value - b.value;
}

function sortByValueDesc(a,b) {
  return b.value - a.value;
}

function getGenderClassName(crew) {
  if (typeof(crew) === 'undefined') {
    crew = {};
  }
  return crew.gender == 1 ? 'female' : 'male';
}

function obToArray(ob) {
  var arr = [];
  Object.keys(ob).forEach( function(key) {
    arr.push(parseInt(ob[key]));
  });
  return arr;
}

var display = {
  data: []
};

var slope = [
];
var movieNames = [];

movies.forEach( function(m, i) {
  var item = {
    'rank': m.rank,
    'vote_average': m.vote_average,
    'name': m.title,
    'director': m.director, 
    'color': m.genre_ids[0]
  };
  display.data.push(item);

  var line = [
    {value: parseInt(m.rank['2009']), date: 2009, name: m.title},
    {value: parseInt(m.rank['2018']), date: 2018, name: m.title}
  ];

  var slopeItem = [
    {data: line, name: m.title}
  ];

  slope.push(slopeItem);
  movieNames.push(m.title);
});

/*
var display = {
  data: [
    {'rank2018': "0.5", vote_average: 0.3, name: "Ben"},
    {'rank2018': "0.2", vote_average: 0.7, name: "Sasha"},
    {'rank2018': "0.9", vote_average: 0.9, name: "Owen"}
  ]
};
*/

display.data.forEach( function(m) {
  //console.log(m.rank['2018'], m.vote_average);
});

function getName(index, lookup) {
  var title = index >= 100 ? index : lookup[index].title;
  return title.length > 17 ? title.substr(0,15) + '...' : title;
}

console.log(slope);

const Movies = () => (
  <div className="chartContainer">
    <h1>My Top 100 Movies</h1>
    <h3>When were they made?</h3>
    <ResponsiveORFrame
      size={[ 360, 200 ]}
      responsiveWidth={true}
      data={modDecades}
      projection={'vertical'}
      rAccessor={d => d.value}
      oAccessor={d => d.name}
      hoverAnnotation={true}
      style={d => ({ fill: '#000000', stroke: "#000000", strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
      type={"bar"}
      axis={daysAxis}
      oLabel={(d) => (<text textAnchor="middle">{d}'s</text>)}
      margin={{ left: 30, top: 10, bottom: 30, right: 10 }}
      oPadding={5}
    />
    <h3>Who directed them?</h3>
    <ResponsiveORFrame
      size={[ 360, 1000 ]}
      responsiveWidth={true}
      data={modDirectors}
      projection={'horizontal'}
      rAccessor={d => d.value}
      oAccessor={d => d.name}
      hoverAnnotation={true}
      style={d => ({ fill: '#000000', stroke: "#000000", strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
      type={"bar"}
      axis={daysAxis}
      oLabel={(d, i) => (<text x={0} y={3} className={i[0].className} textAnchor="end">{d}</text>)}
      margin={{ left: 130, top: 10, bottom: 50, right: 10 }}
      oPadding={2}
    />
    <h3>How have my choices changed since 2009</h3>
    <ResponsiveXYFrame
      size={[360,1200]}
      lines={slope}
      responsiveWidth={true}
      yExtent={[100,1]}
      lineDataAccessor={d => d[0].data}
      yAccessor={"value"}
      xAccessor={"date"}
      lineType={{type: 'line'}}
      hoverAnnotation={true}
      tooltipContent={ d => `${d.value} ${d.name}` }
      lineStyle={(d) => ({ stroke: '#000', strokeWidth: '1px', opacity:'0.3' })}
      margin={{"top":10,"bottom":40,"left":100,"right":100}}
      axes={[
    { className: 'slopeTick', orient: 'left', tickFormat: d =>  getName(d-1, sortedMovies09).substr(0,40), ticks: 100},
    { clssName: 'slopeTick', orient: 'right', tickFormat: d => getName(d-1, sortedMovies18).substr(0,40), ticks: 100},
    { className: 'slopeTick', orient: 'bottom', tickFormat: d => d }
      ]}
      hoverAnnotation={true}
    />
    <div className="notes nextReport">
      <h3>Notes and Sources</h3>
      <p>Tech: <a href="https://emeeks.github.io/semiotic/#/">Semiotic</a>, javascript, <a href="themoviedb.org">TheMovieDB.org</a></p>
    </div>
    <Nav/>
  </div>
)

export default Movies

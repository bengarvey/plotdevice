import React from 'react';
import { ResponsiveORFrame } from 'semiotic';
import { ResponsiveXYFrame } from 'semiotic';
import { scaleLinear } from "d3-scale";
import Nav from './Nav';

const colors = {
  female: '#faa1c7',
  male: '#009ddc',
  unknown: '#666666'
}

var movies = require('../data/topmovies.json');
movies = movies.splice(0,100);

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

console.log(movies);
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
  console.log(crew);
  if (typeof(crew) === 'undefined') {
    crew = {};
  }
  return crew.gender == 1 ? 'female' : 'male';
}

var display = {
  data: []
};
movies.forEach( function(m) {
  var item = {
    'rank2018': m['rank2018'],
    'vote_average': m.vote_average,
    'name': m.title,
    'director': m.director
  };
  display.data.push(item);
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
  console.log(m['rank2018'], m.vote_average);
});


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
    <h3>How do my rankings compare with others?</h3>
    <ResponsiveXYFrame
      points={display.data}
      size={[360,700]}
      responsiveWidth={true}
      yExtent={[6,9]}
      xExtent={[100,0]}
      hoverAnnotation={true}
      xAccessor={ 'rank2018' }
      yAccessor={ 'vote_average' }
      pointStyle={ d => ({fill: "#666", r: '2px'})}
      tooltipContent={ d => `${d.name} by ${d.director.name} Rank: ${d['rank2018']} Rating: ${d.vote_average}` }
      axes={[
        { orient: 'bottom', padding: 0, ticks: 5, tickFormat: d => d, label:'My Ranking'},
        { orient: 'left', ticks: 7, tickFormat: d => d, label:'TheMovieDB Rating'}
      ]}
      margin={{ left: 55, bottom: 100, right: 10, top: 30 }}
    />
    <div className="notes nextReport">
      <h3>Notes and Sources</h3>
      <p>Tech: <a href="https://emeeks.github.io/semiotic/#/">Semiotic</a>, javascript, TheMovieDB.org</p>
    </div>
    <Nav/>
  </div>
)

export default Movies

import React from 'react';
import { ResponsiveORFrame, ResponsiveXYFrame } from 'semiotic';
import { scaleLinear } from "d3-scale";
import Nav from './Nav';
var movies = require('../data/topmovies.json');

const colors = {
  female: '#faa1c7',
  male: '#009ddc',
  unknown: '#666666',
  success: '#15b097',
  failure: '#da4167',
  neutral: '#999999',
  primary: '#000000'
}

const axes = [{
    orient: 'left', ticks: 7,
    tickFormat: d => d ?
    <text className='normal' style={{ textAnchor: "end" }} fontSize="12px" y={5} x={2}>{d}</text> : ''
  },
  {
    orient: 'bottom', ticks: 7,
    tickFormat: d => d ?
    <text className='normal' style={{ textAnchor: "end" }} fontSize="12px" y={5} x={2}>{d}</text> : '' 
  }
];
var decades = {};
var directors = {};
var genders = {};

function sortByRank(x,y,key) {
  var a = x.rank[key];
  var b = y.rank[key];
  return (a === null) - (b === null) || +(a > b) || -(a < b);
}

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

function getName(index, lookup) {
  if (isNaN(index)) { return 'unknown'; };
  var title = index >= 100 ? index : lookup[index].title;
  return (title.length > 17 ? title.substr(0,15) + '...' : title);
}

function getColor(index, lookup, year) {
  return year === '2018' ? getColorLeft(index, lookup, year) : getColorRight(index, lookup, year);
}

function getColorLeft(index, lookup, year) {
  console.log(lookup, index);
  return isNaN(index) || lookup[index].rank[year] == null ? colors.failure : colors.neutral;
}

function getColorRight(index, lookup, year) {
  return lookup[index].rank[year] == null ? colors.success : colors.neutral;
}

function getAxisClass(d, year) {
  return year === 2009 ? getAxisClassLeft(d, year) : getAxisClassRight(d, year);
}

function getAxisClassLeft(d, year) {
  return d.rank[year] === null ? 'failure' : '';
}

function getAxisClassRight(d, year) {
  return d.rank[year] === null ? 'success' : '';
}

function showLine(d) {
  return !isNaN(d.value);
}

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.modDecades = [];
    this.modDirectors = [];
    this.slope = [];
    this.sortedMovies09 = [];
    this.sortedMovies18 = [];
    this.process();
  }

  process() {
    movies.forEach((m) => {
      Object.keys(m.rank).forEach((key) => {
        m.rank[key] = m.rank[key] == 0 || m.rank[key] > 100 ? null : parseInt(m.rank[key]);
      });
    });

    this.sortedMovies09 = movies.slice();
    this.sortedMovies09.sort((a,b) => {return sortByRank(a,b,"2009")});
    this.sortedMovies18 = movies.slice();
    this.sortedMovies18.sort((a,b) => {return sortByRank(a,b,"2018")});

    movies = movies.splice(0,99);

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

    this.modDecades = buildData(decades);
    this.modDirectors = buildData(directors).sort(sortByValueDesc);
    var display = {
      data: []
    };

    this.slope = [
    ];

    var movieNames = [];
    var maxGain = {
      diff: 0,
      index: 0
    };

    var maxLoss = {
      diff: 100,
      index: 0
    };

    movies.forEach( (m, i) => {
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

      if (m.rank["2009"] != null && m.rank["2018"] != null) {
        var diff = parseInt(m.rank['2009'] - m.rank['2018']);

        if (maxGain.diff < diff) {
          maxGain = {
            diff: diff,
            index: i
          };
        };

        if (maxLoss.diff > diff) {
          maxLoss = {
            diff: diff,
            index: i
          };
        };
      }

      var slopeItem = {
        data: line
      };

      slopeItem.color = colors.neutral;
      slopeItem.strokeWidth = '1px';
      slopeItem.name = m.title;

      this.slope.push(slopeItem);
      movieNames.push(m.title);
    });

    this.slope[maxGain.index].color = colors.success;
    this.slope[maxGain.index].strokeWidth = '3px';
    this.slope[maxLoss.index].color = colors.failure;
    this.slope[maxLoss.index].strokeWidth = '3px';
  }

  render() {
    return (
      <div className="chartContainer">
        <h1>My Top 100 Favorite Movies</h1>
        <h3>When were they made?</h3>
        <ResponsiveORFrame
          size={[ 360, 200 ]}
          responsiveWidth={true}
          data={this.modDecades}
          projection={'vertical'}
          rAccessor={d => d.value}
          oAccessor={d => d.name}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.value} ${d.name}'s films` }
          style={d => ({ fill: colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          axis={axes}
          oLabel={(d) => (<text className="normal" textAnchor="middle">{d}'s</text>)}
          margin={{ left: 30, top: 10, bottom: 30, right: 10 }}
          oPadding={5}
        />
        <h3>Who directed them?</h3>
        <ResponsiveORFrame
          size={[ 360, 1000 ]}
          responsiveWidth={true}
          data={this.modDirectors}
          projection={'horizontal'}
          rAccessor={d => d.value}
          oAccessor={d => d.name}
          pieceHoverAnnotation={true}
          tooltipContent={ d => `${d.value} filmss by ${d.name}` }
          style={d => ({ fill: colors.primary, stroke: colors.primary, strokeOpacity: 0.0, fillOpacity: 0.5, strokeWidth: 2 })}
          type={"bar"}
          axis={axes}
          oLabel={(d, i) => (<text x={0} y={3} className={i[0].className} textAnchor="end">{d}</text>)}
          margin={{ left: 130, top: 0, bottom: 50, right: 10 }}
          oPadding={2}
        />
        <h3>How have my choices changed since 2009</h3>
        <ResponsiveXYFrame
          size={[360,1200]}
          lines={this.slope}
          responsiveWidth={true}
          defined={d => showLine(d)}
          yExtent={[100,1]}
          lineDataAccessor={"data"}
          yAccessor={d => d.value}
          xAccessor={d => d.date}
          lineType={{type: 'line'}}
          hoverAnnotation={true}
          tooltipContent={ d => `${d.value} ${d.name}` }
          lineStyle={(d) => ({ stroke: d.color, strokeWidth: d.strokeWidth, opacity:'0.3' })}
          margin={{"top":10,"bottom":40,"left":100,"right":100}}
          axes={[
            { className: 'slopeTick', orient: 'left', tickFormat: d => <text textAnchor="end" style={{fill: getColor(d-1, this.sortedMovies09, '2018')}}>{getName(d-1, this.sortedMovies09).substr(0,40)}</text>, ticks: 100},
            { className: 'slopeTick', orient: 'right', tickFormat: d => <text style={{fill: getColor(d-1, this.sortedMovies18, '2009')}}>{getName(d-1, this.sortedMovies18).substr(0,40)}</text>, ticks: 100},
            { className: 'slopeTick normal', orient: 'bottom', tickFormat: d => d }
          ]}
          hoverAnnotation={true}
        />
        <div className="notes nextReport">
          <h3>Notes and Sources</h3>
          <p>Way back in <a href="http://bengarvey.com/2009/06/21/Ben-Garveys-100-Greatest-Movies-of-all-Time/">2009</a> I made a list of my top 100 favorite movies. I recently rewrote the list for <a href="http://bengarvey.com/2018/01/14/top-100-movies/">2018</a> and wanted to run some stats on it and build a <a href="https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0003nk">Tufte stype slopegraph</a> to show the changes. Coloring the axis tick labels was the toughest part of the whole project and required me to file a <a href="https://github.com/emeeks/semiotic/issues/128">github issue</a> about it. Red movies fell off the list and green ones were added.</p>
          <p>I grew up in the 80s and 90s, so it's surprising to me the 70s fared better than the 80s. I blame recency bias for how well the 00s are represented. At some point I should add an annotation for my favorite film from each decade.</p>
          <p>All the meta data comes from a great API called <a href="https://themoviedb.org">TheMovieDB.org</a>. I'll include the scripts I used to scrape the data in a future pull request. At one point my script pulled information from a different Life is Beautiful and mixed up the LEGO movie with the Lego Ninjago Movie, which I haven't seen but I'm sure is not as good as the LEGO movie.</p>
          <p>Tech: <a href="https://emeeks.github.io/semiotic/#/">Semiotic</a>, My top 100 movies from <a href="http://bengarvey.com/2009/06/21/Ben-Garveys-100-Greatest-Movies-of-all-Time/">2009</a> and <a href="http://bengarvey.com/2018/01/14/top-100-movies/">2018</a>, javascript, <a href="https://themoviedb.org">TheMovieDB.org</a></p>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default Movies

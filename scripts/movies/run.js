const https = require('https');
var readline = require('readline');
var config = require('./config.json');

const key = config.key;
const path = 'https://api.themoviedb.org/3/search/movie';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(search){
    var showHeader = search.match('SHOW_HEADER') ? true : false;
    search = search.replace('SHOW_HEADER', '');
    var rank2018 = search.match(/\d+/g)[0];
    var rank2009 = search.match(/\d+/g)[1];
    search = search.replace(`${rank2018} `, '');
    search = search.replace(`${rank2009} `, '');
    rank = {
      "2018": rank2018,
      "2009": rank2009
    };
    getData(search, showHeader, rank);
})

function getData(search, showHeader, rank) {
  https.get(`${path}?query=${search}&api_key=${key}`, (res) => {
    var response = "";
    res.on('data', (d) => {
      response += d;
    });

    res.on('end', (d) => {
      var data = JSON.parse(response);
      if (data.total_results > 0) {
        getCrew(data.results[0], search, showHeader, rank);
      } else {
        //printFilm({});
      }
    });

  }).on('error', (e) => {
    console.error(e);
  });

}

function getCrew(film, search, showHeader, rank) {
  var id = film.id;
  film.search = search;
  film.director = '';
  film.rank = rank;
  if (showHeader) {
    console.log(getCsvHeader(film));
  }
  https.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`, (res) => {
    var resp = "";
    res.on('data', (d) => {
      resp += d;
    });

    res.on('end', (d) => {
      var data = JSON.parse(resp);
      if (typeof(data.crew) !== "undefined" &&  data.crew.length > 0) {
        film.director = findDirector(data.crew);
      } else {
        film.director = null;
      }
      printFilm(film);
    });

  }).on('error', (e) => {
    console.error(e);
  });

}

function findDirector(crew) {
  for(var i=0; i<crew.length; i++) {
    if (crew[i].job == "Director") {
      return crew[i];
      break;
    }
  }
  return null;
}

function printFilm(film) {
  console.log(`${JSON.stringify(film)},`);
  //console.log(convertToCsv(film));
}

function convertArrayToCsv(arr) {
  let csv = `${getCsvHeader(arr[0])}\n`;
  for (let item of Array.from(arr)) {
    csv += `${convertToCsv(item)}\n`;
  }
  return csv.slice(0,-1);
};

function getCsvHeader(object) {
  let header = '';
  for (let key in object) {
    const value = object[key];
    if (!Array.isArray(value)) {
      header += `\"${escapeQuotesForCsv(key)}\",`;
    }
  }
  return header.slice(0,-1);
};

function convertToCsv(object) {
  let csv = '';
  for (let key in object) {
    // Write null values as real nulls
    const value = object[key];
    if (!Array.isArray(value)) {
      csv += (value != null) ? `\"${escapeQuotesForCsv(value)}\",` : ",";
    }
  }
  return csv.slice(0,-1);
};

function escapeQuotesForCsv(str) {
  if (typeof str === 'string') {
    return str.replace('"','""');
  } else {
    return str;
  }
};

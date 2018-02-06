var current = require('./ranks.json');
var delay = 0;
var requestCount = 0;
var start = Date.now();
var debug = false;
if (debug) {
  current = current.splice(140);
}
current.forEach( (film) => {
    setTimeout( () => {
      console.log(`${film.rank2018} ${film.rank2009} ${film.title}`);
      requestCount += 1;
      if (requestCount >= current.length) {
        //printTime();
      }
    }, delay);
    delay += 600;
});

function printTime() {
  console.log(`Requests per second: ${requestCount / ((Date.now() - start)/1000)}`);
}

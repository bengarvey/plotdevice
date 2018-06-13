var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var result = sentiment.analyze('I hate a "what I do" ass mother fucker. For starters you\'re an inconsistent ass son of a bitch.');

console.log(result);



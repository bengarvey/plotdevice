var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var fs = require('fs');

var cities = [
  { name: "New York",
    file: "newyork",
    rank: 1,
    population: 8622698
  },
  { name: "Los Angeles",
    file: "losangeles",
    rank: 2,
    population: 3999759
  },
  { name: "Chicago",
    file: "chicago",
    rank: 3,
    population: 2716450
  },
  { name: "Houston",
    file: "houston",
    rank: 4,
    population: 2312717
  },
  { name: "Phoenix",
    file: "phoenix",
    rank: 5,
    population: 1626078
  },
  { name: "Philadelphia",
    file: "philadelphia",
    rank: 6,
    population: 1580863
  },
  { name: "San Antonio",
    file: "sanantonio",
    rank: 7,
    population: 1511946
  },
  { name: "San Diego",
    file: "sandiego",
    rank: 8,
    population: 1419516
  },
  { name: "Dallas",
    file: "dallas",
    rank: 9,
    population: 1341075
  },
  { name: "San Jose",
    file: "sanjose",
    rank: 10,
    population: 1035317
  },
  { name: "Austin",
    file: "austin",
    rank: 11,
    population: 950715
  },
  { name: "Jacksonville",
    file: "jacksonville",
    rank: 12,
    population: 892062
  },
  { name: "San Francisco",
    file: "sanfrancisco",
    rank: 13,
    population: 884363
  }
];

var people = [
  { name: "Ben Garvey", file: "bengarvey" },
  { name: "Elea McDonnell Feit", file: "eleafeit" },
  { name: "Michael Draugelis", file: "mdraugelis" },
  { name: "Corey Chivers", file: "CjBayesian" },
  { name: "Bruce Marable", file: "BruceMarable" },
  { name: "Randy Zwitch", file: "randyzwitch" },
  { name: "Donald Trump", file: "realdonaldtrump" },
  { name: "Vicki Boykis", file: "vboykis" },
  { name: "Robert Moore", file: "robertjmoore" },
  { name: "Jim Kenny", file: "JimFKenney" },
  { name: "Anita Andrews", file: "agarimella" },
  { name: "Dan Larson", file: "datadanlarson" },
  { name: "Patrick Callahan", file: "biggreenbox" }
];


var ben = {
  name: "Ben Garvey",
  file: "bengarvey",
  rank: 0,
  population: 1
};


var data = {};
var score = {};

cityIndex = process.argv[2];
cityIndex = cityIndex < 0 || cityIndex > cities.length-1 ? 0 : cityIndex;

//consolidate(cities[cityIndex]);
//consolidate(ben);
consolidate(people[cityIndex])

function consolidate(city) {
  data[city.name] = [];
  for(var year=2017; year<2018; year++) {
      for(var i=1; (i<13 && year<2018) || i<5; i++) {
        var path = `src/data/cities2/${city.file}-${year}-${i}.json`;
        if (fs.existsSync(path)) {
          data[city.name] = data[city.name].concat(require(`../../${path}`));
        }
      }
    }
  city.score = calculateSentiment(data[city.name]);
  console.log(JSON.stringify(city));
}

function calculateSentiment(data) {
  var cumulativeSentiment = 0;
  var score = {
    cumulative: 0,
    nonNeutralCumulative: 0,
    avgScore: 0,
    avgNonNeutralScore: 0,
    positiveCount: 0,
    negativeCount: 0,
    neutralCount: 0,
    count: 0,
    percentPositive: 0,
    percentNegative: 0,
    percentNeutral: 0,
    min: {
      score: 0,
      text: ""
    },
    max: {
      score: 0,
      text: ""
    },
    superNegatives: [],
    superPositives: [],
    date: {}
  }

  data.forEach( (tweet, index) => {
      var result = sentiment.analyze(tweet.text);
      score.cumulative += result.score;
      score.nonNeutralCumulative += result.score != 0 ? result.score : 0;
      score.positiveCount += result.score > 0 ? 1 : 0;
      score.negativeCount += result.score < 0 ? 1 : 0;
      score.neutralCount += result.score === 0 ? 1 : 0;
      score.count += 1;
      score.min = result.score < score.min.score ? getSavedTweet(tweet, result.score) : score.min;
      score.max = result.score > score.max.score ? getSavedTweet(tweet, result.score) : score.max;

      if (result.score < -10) {
        score.superNegatives.push(getUrl(tweet));
      }
      else if (result.score > 10) {
        score.superPositives.push(getUrl(tweet));
      }

      var day = tweet.timestamp.substring(0,10);

      if (typeof(score.date[day]) !== 'undefined') {
        score.date[day].push(result.score);
      }
      else {
        score.date[day] = [result.score];
      }
    }
  );

  score.avgScore = score.cumulative / score.count;
  score.avgNonNeutralScore = score.nonNeutralCumulative / (score.negativeCount + score.positiveCount);
  score.percentPositive = score.positiveCount / score.count;
  score.percentNegative = score.negativeCount / score.count;
  score.percentNeutral = score.neutralCount / score.count;
  return score;
}

function getUrl(tweet) {
  return `https://twitter.com/${tweet.user}/status/${tweet.id}`;

}

function getSavedTweet(tweet, score) {
  return {
    score: score,
    text: tweet.text,
    username: tweet.user,
    id: tweet.id,
    date: tweet.timestamp,
    url: getUrl(tweet)
  };
}




var files = [
  'newyork.json',
  'losangeles.json',
  'chicago.json',
  'houston.json',
  'phoenix.json',
  'philadelphia.json',
  'sanantonio.json',
  'sandiego.json',
  'dallas.json',
  'sanjose.json',
  'austin.json',
  'jacksonville.json',
  'sanfrancisco.json'
];

var people = [
  'bengarvey.json',
  'eleafeit.json',
  'mdraugelis.json',
  'CjBayesian.json',
  'BruceMarable.json',
  'randyzwitch.json',
  'realdonaldtrump.json',
  'vboykis.json',
  'robertjmoore.json',
  'JimFKenney.json',
  'agarimella.json',
  'datadanlarson.json',
  'biggreenbox.json'
];

var consolidated = [];
var type = process.argv[2];

if (type === 'people') {
  people.forEach( (file) => {
    consolidated = consolidated.concat(require(`../../src/data/cities/processed/${file}`));
  });
}
else {
  files.forEach( (file) => {
    consolidatedPeople = consolidated.concat(require(`../../src/data/cities/processed/${file}`));
  });
}

console.log(JSON.stringify(consolidated));

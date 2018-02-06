## themoviedb.org meta data script
by Ben Garvey
ben@bengarvey.com

##### Description

This script accepts a json array called ranks.json and passes information through stdout to another script called run.js. run.js uses TheMovieDB.org to fetch meta data about the movie and puts it into a file called topmovies.json. I wrote this script to get the data I needed for my top 100 movies data visualization.

##### Running the script

Run `cp sample-config.json config.json`

Get an API key from theMovieDB.org and add your api key to config.json

Modify ranks.json for your own ranking

```
node list.js | run.js >> topmovis.json
```

##### Troubleshooting

The script searches for the film based on the title and blindly chooses the first result. This sometimes result in it choosing a different movie with the same name. I've found including the year the movie was made in the search string helps (eg. "LIfe is Beautiful 1997" instead of "Life is Beautiful")

There is a constant in run.js that determines the wait time between each movie. During that time the script makes two http request, one for the movie and another for the crew (to find the director). If you make more than 40 requests in 10 seconds, the API will reject your requests so modify this if you need to make additional requests.


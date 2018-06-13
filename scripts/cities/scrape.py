from subprocess import call
import calendar
import time

city = "Philadelphia, PA"
fileCity = "philadelphia"

for x in range(0, 12):
  year = 2017
  month = x + 1
  lastDay = calendar.monthrange(year, month)[1]
  bd = str(year) + "-" + '%02d' % month + "-01"
  ed = str(year) + "-" + '%02d' % month + "-" + str(lastDay)
  print(bd)
  print(ed)
  output = "src/data/cities/" + fileCity + "-" + str(year) + "-" + str(x+1) + ".json"
  print(output)
  location = 'near:"' + city + '" within:10mi'
  #location = 'from:bengarvey'
  print(location)
  call(["twitterscraper",
        location,
        "-bd", bd,
        "-ed", ed,
        "--lang", "en",
        "-o", output,
        "--poolsize", "200",
        "-l", "10000"])
  time.sleep(20)


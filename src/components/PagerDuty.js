import React from 'react';
import ReactDOM from 'react-dom';
import { ORFrame } from 'semiotic';
import { scaleLinear } from "d3-scale";

const heatScale = scaleLinear()
  .domain([0,5,10])
  .range(["#fbf7da", "red", "darkred"]).clamp(true);
  //.range(["#dbd7ba", "#ED9797", "#7F5151", "#931313", "#230707"]).clamp(true);

const daysOfTheWeek = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
}


const daysAxis = {
    orient: 'left', ticks: 7,
    tickFormat: d => daysOfTheWeek[d] ?
    <text style={{ textAnchor: "end" }} fontSize="12px" y={5} x={2}>{daysOfTheWeek[d]}</text> : '' };

var incidents = [
 {
   "date": "2016-12-19 00:00:00",
   "incidents": 0
 },
 {
   "date": "2016-12-20 00:00:00",
   "incidents": 2
 },
 {
   "date": "2016-12-21 00:00:00",
   "incidents": 4
 },
 {
   "date": "2016-12-22 00:00:00",
   "incidents": 1
 },
 {
   "date": "2016-12-23 00:00:00",
   "incidents": 0
 },
 {
   "date": "2016-12-24 00:00:00",
   "incidents": 2
 },
 {
   "date": "2016-12-25 00:00:00",
   "incidents": 0
 },
 {
   "date": "2016-12-26 00:00:00",
   "incidents": 2
 },
 {
   "date": "2016-12-27 00:00:00",
   "incidents": 0
 },
 {
   "date": "2016-12-28 00:00:00",
   "incidents": 4
 },
 {
   "date": "2016-12-29 00:00:00",
   "incidents": 1
 },
 {
   "date": "2016-12-30 00:00:00",
   "incidents": 1
 },
 {
   "date": "2016-12-31 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-01 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-02 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-03 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-04 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-05 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-06 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-01-07 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-08 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-09 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-10 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-01-11 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-01-12 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-01-13 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-01-14 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-15 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-16 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-17 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-18 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-01-19 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-01-20 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-01-21 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-22 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-01-23 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-01-24 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-25 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-01-26 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-27 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-28 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-29 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-01-30 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-01-31 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-01 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-02 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-02-03 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-04 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-05 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-06 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-02-07 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-08 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-09 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-10 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-11 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-12 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-02-13 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-02-14 00:00:00",
   "incidents": 8
 },
 {
   "date": "2017-02-15 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-16 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-02-17 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-18 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-19 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-20 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-21 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-22 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-02-23 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-24 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-25 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-26 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-02-27 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-02-28 00:00:00",
   "incidents": 11
 },
 {
   "date": "2017-03-01 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-03-02 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-03-03 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-03-04 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-03-05 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-03-06 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-03-07 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-03-08 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-03-09 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-03-10 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-03-11 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-03-12 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-03-13 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-03-14 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-03-15 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-03-16 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-03-17 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-03-18 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-03-19 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-03-20 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-03-21 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-03-22 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-03-23 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-03-24 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-03-25 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-03-26 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-03-27 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-03-28 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-03-29 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-03-30 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-03-31 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-04-01 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-04-02 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-04-03 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-04-04 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-04-05 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-04-06 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-04-07 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-04-08 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-04-09 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-04-10 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-04-11 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-04-12 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-04-13 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-04-14 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-04-15 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-04-16 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-04-17 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-04-18 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-04-19 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-04-20 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-04-21 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-04-22 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-04-23 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-04-24 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-04-25 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-04-26 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-04-27 00:00:00",
   "incidents": 7
 },
 {
   "date": "2017-04-28 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-04-29 00:00:00",
   "incidents": 17
 },
 {
   "date": "2017-04-30 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-05-01 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-05-02 00:00:00",
   "incidents": 7
 },
 {
   "date": "2017-05-03 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-05-04 00:00:00",
   "incidents": 16
 },
 {
   "date": "2017-05-05 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-05-06 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-05-07 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-05-08 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-05-09 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-05-10 00:00:00",
   "incidents": 8
 },
 {
   "date": "2017-05-11 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-05-12 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-05-13 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-05-14 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-05-15 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-05-16 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-05-17 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-05-18 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-05-19 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-05-20 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-05-21 00:00:00",
   "incidents": 7
 },
 {
   "date": "2017-05-22 00:00:00",
   "incidents": 8
 },
 {
   "date": "2017-05-23 00:00:00",
   "incidents": 9
 },
 {
   "date": "2017-05-24 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-05-25 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-05-26 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-05-27 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-05-28 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-05-29 00:00:00",
   "incidents": 7
 },
 {
   "date": "2017-05-30 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-05-31 00:00:00",
   "incidents": 8
 },
 {
   "date": "2017-06-01 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-06-02 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-06-03 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-06-04 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-06-05 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-06-06 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-06-07 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-06-08 00:00:00",
   "incidents": 7
 },
 {
   "date": "2017-06-09 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-06-10 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-06-11 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-06-12 00:00:00",
   "incidents": 7
 },
 {
   "date": "2017-06-13 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-06-14 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-06-15 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-06-16 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-06-17 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-06-18 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-06-19 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-06-20 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-06-21 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-06-22 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-06-23 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-06-24 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-06-25 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-06-26 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-06-27 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-06-28 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-06-29 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-06-30 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-07-01 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-07-02 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-07-03 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-04 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-07-05 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-07-06 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-07-07 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-07-08 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-07-09 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-07-10 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-11 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-07-12 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-13 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-14 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-15 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-16 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-17 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-07-18 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-19 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-20 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-07-21 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-07-22 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-23 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-24 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-07-25 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-07-26 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-07-27 00:00:00",
   "incidents": 7
 },
 {
   "date": "2017-07-28 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-07-29 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-07-30 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-07-31 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-08-01 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-08-02 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-08-03 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-08-04 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-08-05 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-08-06 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-08-07 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-08-08 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-08-09 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-08-10 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-08-11 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-08-12 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-08-13 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-08-14 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-08-15 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-08-16 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-08-17 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-08-18 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-08-19 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-08-20 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-08-21 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-08-22 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-08-23 00:00:00",
   "incidents": 3
 },
 {
   "date": "2017-08-24 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-08-25 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-08-26 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-08-27 00:00:00",
   "incidents": 11
 },
 {
   "date": "2017-08-28 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-08-29 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-08-30 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-08-31 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-09-01 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-09-02 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-09-03 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-09-04 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-09-05 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-09-06 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-09-07 00:00:00",
   "incidents": 8
 },
 {
   "date": "2017-09-08 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-09-09 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-09-10 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-09-11 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-09-12 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-09-13 00:00:00",
   "incidents": 6
 },
 {
   "date": "2017-09-14 00:00:00",
   "incidents": 7
 },
 {
   "date": "2017-09-15 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-09-16 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-09-17 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-09-18 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-09-19 00:00:00",
   "incidents": 4
 },
 {
   "date": "2017-09-20 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-09-21 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-09-22 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-09-23 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-09-24 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-09-25 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-09-26 00:00:00",
   "incidents": 5
 },
 {
   "date": "2017-09-27 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-09-28 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-09-29 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-09-30 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-10-01 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-10-02 00:00:00",
   "incidents": 2
 },
 {
   "date": "2017-10-03 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-10-04 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-10-05 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-10-06 00:00:00",
   "incidents": 1
 },
 {
   "date": "2017-10-07 00:00:00",
   "incidents": 0
 },
 {
   "date": "2017-10-08 00:00:00",
   "incidents": 0
 }

];

var modified = [];
incidents.forEach( function(d, i) {
  var item = {
    date: d.date,
    value: d.incidents,
    step: i%42,
    day: new Date(d.date).getDay()
  };
  modified.push(item);
});

const colors = {
  incident: '#da4167',
}

const PagerDuty = () => (
  <div>
    <h1>Pagerduty Incidents</h1>
    <h3>Agghhh!</h3>
    <ORFrame
      size={[ 650, 200 ]}
      data={modified}
      rAccessor={() => 1}
      oAccessor={d => d.step}
      style={d => ({ fill: heatScale(d.value), stroke: "#eeedcd", strokeOpacity: 1, strokeWidth: 2 })}
      type={"bar"}
      axis={daysAxis}
      hoverAnnotation={true}
      pieceHoverAnnotation={true}
      oLabel={d => parseInt(d+1)%10 === 0 || d === 0? <text transform="rotate(90)" y={5} x={-8} fontSize="12px">Week {d+1}</text> : ''}
      margin={{ left: 100, top: 10, bottom: 80, right: 50 }}
      oPadding={0}
    />
  </div>
)

export default PagerDuty

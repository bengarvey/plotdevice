import React from 'react'

const Home = () => (
  <div className="chartContainer">
    <h1>Plot Device</h1>
    <h3>A collection of dataviz projects</h3>
    <ul class="list">
      <li class="list-item"><a href="auto">US Automobile Fatalities 1899 - 2015</a> - Annotations</li>
      <li class="list-item"><a href="lbs">Weight Over Time</a> - Line chart with floating average</li>
      <li class="list-item"><a href="libraries">Chart Creation Technologies</a> - Scatter plot with custom markers</li>
      <li class="list-item"><a href="pagerduty">Pager Duty Incidents</a> - Heat map</li>
      <li class="list-item"><a href="tornadoes">US Tornado Deaths 1876 - 2017</a> - Line chart with floating average</li>
      <li class="list-item"><a href="cooplovescostumes">#CoopLovesCostumes</a> - Stacked bar chart and scatter plot</li>
    </ul>
  </div>
)

export default Home

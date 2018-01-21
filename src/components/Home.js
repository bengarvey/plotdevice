import React from 'react'

const Home = () => (
  <div className="chartContainer">
    <h1>Plot Device</h1>
    <h3>A collection of dataviz projects by <a href="http://bengarvey.com">Ben Garvey</a></h3>
    <ul className="list">
      <li className="list-item"><a href="auto">US Automobile Fatalities 1899 - 2015</a></li>
      <li className="list-item"><a href="lbs">Weight Over Time</a></li>
      <li className="list-item"><a href="libraries">Chart Creation Technologies</a></li>
      <li className="list-item"><a href="pagerduty">Pager Duty Incidents</a></li>
      <li className="list-item"><a href="tornadoes">US Tornado Deaths 1875 - 2017</a></li>
      <li className="list-item"><a href="cooplovescostumes">#CoopLovesCostumes</a></li>
      <li className="list-item"><a href="starwars">Star Wars Network (No Last Jedi Spoilers)</a></li>
    </ul>
    <div>
      <ul className="navList">
        <li className="navListItem"><a href="mailto:ben@bengarveycom">Contact</a></li>
        <li className="navListItem"><a href="https://twitter.com/bengarvey">Twitter</a></li>
      </ul>
    </div>
  </div>
)

export default Home

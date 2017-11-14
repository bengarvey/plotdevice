import React from 'react'

const TPMyCostumes = () => (
  <div className="nextReport annotationBlock">
    <h1>My Costumes</h1>
    <h3>Of course, I've been Twin Peaks characters for three of the last four years</h3>
    <ul className="characterList">
      <li className="characterListItem">
        <img alt="Ben as Bob" src="images/benbob.png" width="100px"/>
        <div className="characterTitle">BOB</div>
        <div>2014</div>
      </li>
      <li className="characterListItem">
        <img alt="Ben as Cooper" src="images/bencoop.png" width="100px"/>
        <div className="characterTitle">Agent Cooper</div>
        <div>2016</div>
      </li>
      <li className="characterListItem">
        <img alt="Ben as Evil Dale" src="images/benevil.png" width="100px"/>
        <div className="characterTitle">Evil Dale</div>
        <div>2017</div>
      </li>
    </ul>
  </div>
)

export default TPMyCostumes

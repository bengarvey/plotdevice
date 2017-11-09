import React from 'react'

const TPNoShows = () => (
  <div className="nextReport annotationBlock">
    <h1>No Shows</h1>
    <h3>Frequently on the show, but didn't catch on for Halloween</h3>
    <ul className="characterList">
      <li className="characterListItem">
        <img alt="Bobby Briggs" src="images/bobby.png" width="100px"/>
        <div className="characterTitle">Bobby Briggs</div>
        <div>Appears in 41 episodes and I could only find 1 costume.</div>
      </li>
      <li className="characterListItem">
        <img alt="Donna Hayward" src="images/donna.png" width="100px"/>
        <div className="characterTitle">Donna Hayward</div>
        <div>34 episodes and I only found 1 costume (and even that was debatable)</div>
      </li>
      <li className="characterListItem">
        <img alt="Sheriff Truman" src="images/harry.png" width="100px"/>
        <div className="characterTitle">Sherrif Truman</div>
        <div>Harry and Frank were in 40 episodes, but only a handful of costumes</div>
      </li>
    </ul>
  </div>
)

export default TPNoShows

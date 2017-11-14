import React from 'react'

const TPRare = () => (
  <div className="nextReport annotationBlock">
    <h1>Rare Costumes</h1>
    <h3>Frequently on the show, but didn't catch on for Halloween</h3>
    <ul className="characterList">
      <li className="characterListItem">
        <img alt="Donna Hayward" src="images/donna.png" width="100px"/>
        <div className="characterTitle">Donna Hayward</div>
        <div>34 episodes and I only found 2 costumes (and one was debatable)</div>
      </li>
      <li className="characterListItem">
        <img alt="Sarah Palmer" src="images/sarah.png" width="100px"/>
        <div className="characterTitle">Sarah Palmer</div>
        <div>Appears in 23 episodes, but only one costume</div>
      </li>
      <li className="characterListItem">
        <img alt="Josie Packard" src="images/josie.png" width="100px"/>
        <div className="characterTitle">Josie Packard</div>
        <div>30 episodes, but I only found two Josie costumes</div>
      </li>
    </ul>
  </div>
)

export default TPRare

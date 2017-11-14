import React from 'react'

const TPFanFavorites = () => (
  <div className="annotationBlock">
    <h1>Fan Favorites</h1>
    <h3>Few appearances but high popularity</h3>
    <ul className="characterList">
      <li className="characterListItem">
        <img alt="Senorita Dido" src="images/dido.png" width="100px"/>
        <div className="characterTitle">Senorita Dido</div>
        <div>Only appeared in one episode, but what an episode!</div>
      </li>
      <li className="characterListItem">
        <img alt="Diane" src="images/diane.png" width="100px"/>
        <div className="characterTitle">Diane</div>
        <div>Clearly the most popular new character from season 3.</div>
      </li>
      <li className="characterListItem">
        <img alt="Log Lady" src="images/loglady.png" width="100px"/>
        <div className="characterTitle">The Log Lady</div>
        <div>Everyone dressed as Magaret: Men, women, kids, the elderly, and even pets</div>
      </li>
    </ul>
  </div>
)

export default TPFanFavorites

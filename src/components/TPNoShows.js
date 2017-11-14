import React from 'react'

const TPNoShows = () => (
  <div className="nextReport annotationBlock">
    <h1>No Shows!</h1>
    <h3>I didn't find a single person dressed up as any of these major characters</h3>
    <ul className="characterList">
      <li className="characterListItem">
        <img alt="Ben & Jerry Horne" src="images/benjerry.png" width="100px"/>
        <div className="characterTitle">Ben & Jerry Horne</div>
        <div>Life is tough if you're the 2nd most famous Ben & Jerry</div>
      </li>
      <li className="characterListItem">
        <img alt="James Hurley" src="images/james.png" width="100px"/>
        <div className="characterTitle">Sarah Palmer</div>
        <div>He never recovered his cool after <a href="https://www.youtube.com/watch?v=rq8bHVSCqN0">this</a>. Laura was right about you, James.</div>
      </li>
      <li className="characterListItem">
        <img alt="Hawk" src="images/hawk.png" width="100px"/>
        <div className="characterTitle">Hawk</div>
        <div>Someone had to be Hawk for Halloween, but I haven't found it yet.</div>
      </li>
    </ul>
  </div>
)

export default TPNoShows

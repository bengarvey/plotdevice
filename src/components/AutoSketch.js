import React from 'react'

const AutoSketch = () => (
  <div className="autoSketch">
    <h3>Sketches</h3>
    <ul className="list--plain">
      <li className="sketchListItem">
        <a href="images/autosketch1.jpg">
          <img className="sketch" src="images/autosketch1.jpg"/>
        </a></li>
      <li className="sketchListItem"><a href="images/autosketch2.jpg">
        <img className="sketch" src="images/autosketch2.jpg"/>
      </a></li>
    </ul>
  </div>
)

export default AutoSketch

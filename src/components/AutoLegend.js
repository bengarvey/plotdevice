import React from 'react'

const AutoLegend = () => (
  <div>
    <div className="container legend deathLegend">US Auto Fatalities 35,092</div>
    <div className="container legend popLegend">US Population 321,370,000</div>
    <div className="container legend gasLegend">Adjusted US Gas Prices $2.45</div>
    <div className="container legend milesLegend">
      <div>US Vehicle Miles Traveled</div>
      <div>3,147,800,000,000</div>
    </div>
    <div className="container legend alcLegend">Alcohol Related 10,265</div>
    <div className="container legend nonAlcLegend">Non-Alcohol Related 24,827</div>
  </div>
)

export default AutoLegend

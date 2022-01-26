import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Auto from './components/Auto'
import Lbs from './components/Lbs'
import Libraries from './components/Libraries'
import PagerDuty from './components/PagerDuty'
import Tornadoes from './components/Tornadoes'
import CoopLovesCostumes from './components/CoopLovesCostumes'
import Starwars from './components/Starwars'
import Steps from './components/Steps'
import Line from './components/Line'
import Movies from './components/Movies'
import Rj from './components/Rj'
import NLEast from './components/NLEast'
import Cities from './components/Cities'
import TheWire from './components/TheWire'
import Cafe from './components/Cafe'
import Meetup from './components/Meetup'
import Sales from './components/Sales'
import AutoDeaths from './components/AutoDeaths'
import StarWars2 from './components/StarWars2'
import Pizza from './components/Pizza'

var App = () => (
  <div className="main">
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/auto' component={Auto}/>
        <Route path='/lbs' component={Lbs}/>
        <Route path='/libraries' component={Libraries}/>
        <Route path='/pagerduty' component={PagerDuty}/>
        <Route path='/tornadoes' component={Tornadoes}/>
        <Route path='/cooplovescostumes' component={CoopLovesCostumes}/>
        <Route path='/starwars' component={Starwars}/>
        <Route path='/steps' component={Steps}/>
        <Route path='/line' component={Line}/>
        <Route path='/movies' component={Movies}/>
        <Route path='/rj' component={Rj}/>
        <Route path='/nleast' component={NLEast}/>
        <Route path='/cities' component={Cities}/>
        <Route path='/wire' component={TheWire}/>
        <Route path='/cafe' component={Cafe}/>
        <Route path='/meetup' component={Meetup}/>
        <Route path='/dungeonadventure' component={Sales}/>
        <Route path='/autodeaths' component={AutoDeaths}/>
        <Route path='/starwars2' component={StarWars2}/>
        <Route path='/pizza' component={Pizza}/>
      </Switch>
    </BrowserRouter>
  </div>
)

export default App

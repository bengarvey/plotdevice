import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import Auto from './components/Auto'
import Lbs from './components/Lbs'
import Libraries from './components/Libraries'
import PagerDuty from './components/PagerDuty'
import Tornadoes from './components/Tornadoes'
import CoopLovesCostumes from './components/CoopLovesCostumes'
import Joy from './components/Joy'
import Starwars from './components/Starwars'
import Steps from './components/Steps'
import Line from './components/Line'
import Pline from './components/Pline'
import Movies from './components/Movies'
import Rj from './components/Rj'

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
        <Route path='/joy' component={Joy}/>
        <Route path='/starwars' component={Starwars}/>
        <Route path='/steps' component={Steps}/>
        <Route path='/line' component={Line}/>
        <Route path='/movies' component={Movies}/>
        <Route path='/rj' component={Rj}/>
      </Switch>
    </BrowserRouter>
  </div>
)

export default App

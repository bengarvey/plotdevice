// pd.js is a collection of helper function for plot device

import { Chance } from "chance";

const PD = function() {
  var chance = new Chance();

  var pd = {};

  pd.getColor = function() {
    return `rgba(${get8bit()},${get8bit()},${get8bit()},0.4)`;
  }

  function get8bit(){
    return chance.integer({min: 0, max: 255});
  }

  return pd;
}

export default PD;

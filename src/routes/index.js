import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Landing from '../screens/Landing';
import AddNewTrip from '../screens/AddNewTrip';
import Edit_Trip from "../screens/Edit_Trip";

function Routes() {
  return (
    <Switch>
      <Route path="/landing" exact component={Landing} />
      <Route path="/add" exact component={AddNewTrip}/>
      <Route path="/edit-trip" exact component={Edit_Trip} />
     
      {/* Automatically go to Landing */}
      <Route component={Landing} />

    </Switch>
  )
}

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Landing from '../screens/Landing';
import AddNewTrip from '../screens/AddNewTrip';


function Routes() {
  return (
    <Switch>
      <Route path="/landing" exact component={Landing} />
      <Route path="/add" exact component={AddNewTrip}/>
     
      {/* Automatically go to Landing */}
      <Route component={Landing} />

    </Switch>
  )
}

export default Routes;

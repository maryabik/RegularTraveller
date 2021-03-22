import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Landing from '../screens/Landing';
import AddNewTrip from '../screens/AddNewTrip';
import Edit_Trip from "../screens/Edit_Trip";
import Template_Details from "../screens/Template_Details";
import View_trip from "../screens/ViewTrip";

function Routes() {
  return (
    <Switch>
      <Route path="/landing" exact component={Landing} />
      <Route path="/add" exact component={AddNewTrip}/>
      <Route path="/edit-trip" exact component={Edit_Trip} />
      <Route path="/template-details" exact component={Template_Details} />
      <Route path="/view-trip" exact component={View_trip} />
     
      {/* Automatically go to Landing */}
      <Route component={Landing} />

    </Switch>
  )
}

export default Routes;

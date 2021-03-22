import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Edit_Trip from "../screens/Edit_Trip/edit_trip";

function Routes() {
  return (
    <Switch>
      <Route path="/edit-trip" exact component={Edit_Trip} />
      <Route component={Edit_Trip} />

    </Switch>
  )
}

export default Routes;

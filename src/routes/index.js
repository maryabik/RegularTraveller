import React, { useContext, useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import { UserContext } from '../services/UserProvider';
import { auth } from "../services/firebase.js";

import Landing from '../screens/Landing';
import Home from '../screens/Home';
import Edit_Trip from "../screens/Edit_Trip";
import Template_Details from "../screens/Template_Details";
import View_trip from "../screens/ViewTrip";
import Add from "../screens/Add";
import Duplicate from '../screens/Duplicate';
import SegmentScreen from '../screens/ViewEditSegment';
import TripDetail from '../screens/TripDetails';

function Routes() {
  const { user, setUser } = useContext(UserContext);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (user) {
    return(
      <Switch>
        <Route path="/home" exact component={Home}/>
        <Route path="/edit-trip" exact component={Edit_Trip} />
        <Route path="/trip-details" exact component={TripDetail} />
        <Route path="/view-trip" exact component={View_trip} />
        <Route path="/addnew" exact component={Add} />
        <Route path='/duplicate' exact component={Duplicate}/>
        <Route path='/segment' exact component={SegmentScreen}/>
      </Switch>
    );
  } else {
    return(
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    );
  }

}

export default Routes;

import logo from './logo.svg';
import './App.css';

import React from "react";
import { Router } from "react-router-dom";
import Routes from './routes';
import { createBrowserHistory } from "history";

let history = createBrowserHistory();

function App() {

  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;

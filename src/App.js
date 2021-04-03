import './App.css';
import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import Routes from './routes';
import { createBrowserHistory } from "history";
import { UserProvider } from './services/UserProvider.js';
import history from './history';

export function App() {

  return (
    <UserProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </UserProvider>
  );
}

export default App;

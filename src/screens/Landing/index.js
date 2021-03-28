import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../services/UserProvider';
import { ReactComponent as LandingIcon } from '../../assets/Landing-Icon.svg';
import { ReactComponent as GoogleIcon } from '../../assets/GoogleIcon.svg';
import './index.css';

function Landing() {
  const { login } = useContext(UserContext);

  return(
    <div className="landingBody">
      <h2 className="landingTitle">Regular</h2>
      <h2 className="landingTitle">Traveller</h2>
      <div style={{height: '5vh'}} />
      <LandingIcon />
      <div style={{height: '10vh'}} />
      <div className="googleButton" onClick={() => login()}>
        <GoogleIcon />
        <p style={{fontSize: '20px'}}>Log In</p>
      </div>
    </div>
  );
}

export default Landing;

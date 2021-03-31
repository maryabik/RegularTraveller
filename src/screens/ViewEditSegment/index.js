// view and edit segment screen
import React from 'react';
import './index.css';
import { ReactComponent as ArrowBack } from '../../assets/arrowBack.svg';

function SegmentScreen() {
  return(
    <div className="segmentScreenContent">
      <div className="segmentTitleContainer">
        <ArrowBack onClick={() => window.location.href = "./view-trip"}/>
        <h1 className="segmentScreenTitle">Trip Plan</h1>
      </div>
      <div className="segmentInputFields">
        <div className="segmentInputRow">
          <p><strong>From:</strong></p>
        </div>
      </div>
    </div>
  );
}

export default SegmentScreen;

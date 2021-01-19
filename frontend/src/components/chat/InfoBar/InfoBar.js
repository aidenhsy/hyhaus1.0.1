import React from 'react';

import onlineIcon from '../../../assets/icons/onlineIcon.png';
import closeIcon from '../../../assets/icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ receiverUsername }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{receiverUsername}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/dashboard">
        <img src={closeIcon} alt="close icon" />
      </a>
    </div>
  </div>
);

export default InfoBar;

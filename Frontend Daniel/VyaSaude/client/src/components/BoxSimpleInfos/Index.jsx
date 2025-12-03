import React from 'react';
import { Link } from 'react-router-dom';
import './Index.css';

const BoxSimpleInfos = ({ title, icon, description, linkTo, buttonText, className }) => {
  return (
    <div className={`boxSimpleInfos ${className || ''}`}>
      <div className="headerLine">
        <h5><b>{title}</b></h5>
        <img src={icon} className="headerImage" />
      </div>
      <div className="mainLine">
        {description}
      </div>
      <div className="buttonLine">
        <Link to={linkTo} className="buttonB">{buttonText}</Link>
      </div>
    </div>
  );
};

export default BoxSimpleInfos;

import React from 'react';
import '../CSS/Background.css';

const Background = ({ children }) => {
    return (
        <div className="background-container">
          <div className="background-image"></div>
          <div className="overlay-content">
            {children}
          </div>
        </div>
    )
};

export default Background;
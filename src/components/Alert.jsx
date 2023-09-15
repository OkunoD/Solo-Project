import React from 'react';

const Alert = ({ message }) => {
  return (
    <div className="alert">
      <div className="alert-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;

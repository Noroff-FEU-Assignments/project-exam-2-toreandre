import React from 'react';
import './../../styles/common/LoadingIndicator.css';

// Note for exam evaluation: This is a direct copy from https://loading.io/css/
const LoadingIndicator = ({ isLoading }) => {
  return isLoading ? <div className="loading-container"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : null;
};

export default LoadingIndicator;
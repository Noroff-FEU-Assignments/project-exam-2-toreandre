// src/components/OperatorToggle.js
import React from 'react';
import { useMap } from '../../contexts/MapContext';

const OperatorToggle = () => {
  const { operators, toggleOperatorActive } = useMap();

  return (
    <div className="operator-toggle-container">
      {operators.map(operator => (
        <button
          key={operator.id}
          onClick={() => toggleOperatorActive(operator.id)}
          className={`toggle-btn ${operator.active ? 'active' : ''}`}
        >
          {operator.shortname}
        </button>
      ))}
    </div>
  );
};

export default OperatorToggle;

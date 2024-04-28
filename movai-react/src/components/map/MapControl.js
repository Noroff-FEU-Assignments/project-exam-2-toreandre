import React from 'react';
import { useMap } from '../../contexts/MapContext';

const MapControl = () => {
  const { map } = useMap();

  const zoomIn = () => map?.zoomIn();
  const zoomOut = () => map?.zoomOut();

  return (
    <div className="map-controls">
      <button onClick={zoomIn}>+</button>
      <button onClick={zoomOut}>-</button>
    </div>
  );
};

export default MapControl;

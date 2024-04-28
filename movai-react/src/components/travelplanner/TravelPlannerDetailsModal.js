import React from 'react';
import ReactDOM from 'react-dom';
import './../../styles/travelplanner/Modal.css';

const TravelPlannerDetailsModal = ({ isOpen, children, onClose }) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className="modal-overlay">
			<div className="modal-content">
				{children}
				<button onClick={onClose}>Lukk</button>
			</div>
		</div>,
		document.body
	);
};

export default TravelPlannerDetailsModal;

import React, { createContext, useContext, useState } from 'react';
import Popup from '../components/common/Popup';
import errorMessages from '../text/errorMessages';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [popupProps, setPopupProps] = useState({});

	const showPopup = (errorCode) => {
		const messageDetails = errorMessages[errorCode] || {
			title: "Unknown Error",
			bodyText: "An unknown error occurred. Please contact support.",
			reportIssue: true
		};
		setPopupProps({
			...messageDetails,
			onClose: () => setIsOpen(false)
		});
		setIsOpen(true);
	};

	return (
		<PopupContext.Provider value={{ showPopup }}>
		{children}
		{isOpen && <Popup {...popupProps} />}
		</PopupContext.Provider>
	);
};

export default PopupContext;
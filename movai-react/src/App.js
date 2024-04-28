import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import TravelPlannerPage from './pages/TravelPlannerPage';
import MapPage from './pages/MapPage'; 
import DepartureBoardPage from './pages/DepartureBoardPage';
import DepartureBoard from './components/departureBoard/DepartureBoard';
import { AuthProvider } from './auth/AuthContext';
import BackendDashboard from './components/dashboard/BackendDashboard';
import LoginPage from './pages/Login';
import ProtectedRoute from './components/login/ProtectedRoute';
import { PopupProvider } from './context/PopupContext';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

function App() {
  	return (
     	<Router>
			<AuthProvider>
				<PopupProvider>
					<Routes>
						<Route path="/" element={<TravelPlannerPage />} />
						<Route path="/kart" element={<MapPage />} /> 
						<Route path="/avgangsskilt" element={<DepartureBoardPage />} />
						<Route path="/om-movai" element={<AboutPage />} />
						<Route path="/avganger" element={<DepartureBoard />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/dashboard" element={<ProtectedRoute><BackendDashboard /></ProtectedRoute>} />
					</Routes>
				</PopupProvider>
			</AuthProvider>
    	</Router>
  	);
}

export default App;

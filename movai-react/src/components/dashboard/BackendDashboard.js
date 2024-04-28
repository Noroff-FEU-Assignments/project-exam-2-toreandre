import React from 'react';
import ChartCard from './BackendChart';
import './../../styles/backend/backend.css';
import DashboardMap from './BackendMap';
import BackendMessageContainer from './BackendMessageContainer';
import BackendHeader from './BackendHeader';
import BikeChartCard from './BackendBikeChart';

function Dashboard() {
	return (
		<div className="backend-container">
			<BackendHeader />

			<div className="backend-item-container">
				<div className="chart-row">
					<div className="chart-item">
						<ChartCard title="Sparkesykler" chartId="myChart" />
						<BikeChartCard title="Bysykler" chartId="myChart" />
					</div>
					<div className="chart-item">
						<DashboardMap />
					</div>
				</div>
				<div className="chart-row">
					<div className="chart-item">
						<BackendMessageContainer />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;

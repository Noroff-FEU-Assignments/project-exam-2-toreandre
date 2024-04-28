import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend
);

function ChartCard({ title }) {
	// Define the maximum number of data points to display on the chart
	const maxDataPoints = 5;

	const [chartData, setChartData] = useState({
		labels: [], // Initialize an empty labels array
		datasets: [
			{ label: 'Bolt', data: [], borderColor: 'rgb(255, 99, 132)', tension: 0.1, fill: false },
			{ label: 'Voi', data: [], borderColor: 'rgb(54, 162, 235)', tension: 0.1, fill: false },
			{ label: 'Ryde', data: [], borderColor: 'rgb(75, 192, 192)', tension: 0.1, fill: false }
		]
	});

	useEffect(() => {
		const urls = [
			'./../cr-data/boltStats.json',
			'./../cr-data/voiStats.json',
			'./../cr-data/rydeStats.json'
		];

		const fetchData = async () => {
			const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
			const newData = responses.map(item => item.bikes);
			const newLabel = new Date().toLocaleTimeString(); // Use the current time as the new label

			setChartData(prev => {
				const newLabels = [...prev.labels, newLabel];

				const newDatasets = prev.datasets.map((dataset, index) => ({
					...dataset,
					data: [...dataset.data, newData[index]]
				}));

				// Trim data and labels to only kepp the latest entries
				if(newLabels.length > maxDataPoints) {
					newLabels.shift();
					newDatasets.forEach(dataset => dataset.data.shift());
				}

				return { ...prev, labels: newLabels, datasets: newDatasets };
			});
		};

		// Fetch data immediately and then every 60 seconds
		fetchData();

		// Set up an interval to fetch new data every 60 seconds
		const intervalId = setInterval(fetchData, 60000);

		return () => clearInterval(intervalId);

  	}, []);

	return (
		<div className="chart-card">
			<div className="chart-card-content">
				<h5 className="chart-card-title">{title}</h5>
				<Line data={chartData} />
			</div>
		</div>
	);
}

export default ChartCard;

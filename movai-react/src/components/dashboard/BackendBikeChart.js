import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function BikeChartCard({ title }) {
	const maxDataPoints = 5;

	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{ label: 'Oslobysykkel', data: [], borderColor: 'rgb(255, 99, 132)', tension: 0.1, fill: false }
			
		]
	});

	useEffect(() => {
		const urls = [
		'./../cr-data/citybikeStats.json'
	];

    const fetchData = async () => {
		const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
		const newData = responses.map(item => item.total_bikes);
		const newLabel = new Date().toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });

		setChartData(prev => {
			const newLabels = [...prev.labels, newLabel];
			const newDatasets = prev.datasets.map((dataset, index) => ({
			...dataset,
			data: [...dataset.data, newData[index]]
			}));

			// Trim data and labels to maintain only the latest maxDataPoints entries
			if (newLabels.length > maxDataPoints) {
			newLabels.shift(); // Remove the oldest label
			newDatasets.forEach(dataset => dataset.data.shift()); // Remove the oldest data point from each dataset
			}

			return { ...prev, labels: newLabels, datasets: newDatasets };
		});
    };

    fetchData();
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

export default BikeChartCard;

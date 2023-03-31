import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js';

const ResultChart = ({ results }) => {
  const chartRef = useRef(null);

  const timeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const getAverageTime = () => {
    const sum = results.reduce((total, result) => total + timeToSeconds(result.time), 0);
    return sum / results.length;
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const maxTime = Math.max(...results.map((result) => timeToSeconds(result.time)));
      const averageTime = getAverageTime();

      const chartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: results.map((result) => result.user_name),
          datasets: [
            {
              label: 'Participant Results',
              data: results.map((result) => timeToSeconds(result.time)),
              backgroundColor: 'rgba(255, 193, 7, 0.5)',
              borderColor: '#333',
              borderWidth: 1,
            },
            {
              type: 'line',
              label: 'Average Time',
              data: Array(results.length).fill(averageTime),
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Participants',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Time',
              },
              min: 0,
              max: maxTime,
              ticks: {
                callback: function (value) {
                  return new Date(value * 1000).toISOString().substr(11, 12);
                },
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const time = new Date(context.raw * 1000).toISOString().substr(11, 12);
                  return context.dataset.label + ': ' + time;
                },
              },
            },
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [chartRef, results]);

  return <canvas ref={chartRef} />;
};

export default ResultChart;

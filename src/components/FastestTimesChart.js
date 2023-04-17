import { useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Tooltip } from 'chart.js';

function FastestTimesChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/events')
      .then(response => {
        const data = response.data;

        // Extract the fastest time for each event
        const fastestTimes = data.map(event => {
          const sortedTimes = event.results.map(result => result.time).sort();
          return { name: event.name, time: sortedTimes[0] };
        });

        // Sort events by fastest time
        fastestTimes.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));

        // Create a new Chart object
        const chart = new Chart(canvasRef.current, {
          type: 'horizontalBar',
          data: {
            labels: fastestTimes.map(event => event.name),
            datasets: [{
              data: fastestTimes.map(event => event.time),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                  beginAtZero: true
                }
              },
              y: {
                type: 'category',
                position: 'left',
                ticks: {
                  reverse: true
                }
              }
            },
            plugins: {
              tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  label: function(context) {
                    return context.dataset.label + ': ' + context.formattedValue;
                  }
                }
              }
            }
          }
        });

        // Return a cleanup function that destroys the chart when the component unmounts
        return () => chart.destroy();
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return <canvas ref={canvasRef} />;
}

export default FastestTimesChart;

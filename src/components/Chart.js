import { Line } from 'react-chartjs-2';

function MyChart() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My Dataset',
        data: [12, 19, 3, 5, 2, 3, 9],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <h2>My Chart</h2>
      <Line data={data} />
    </div>
  );
}

export default MyChart;
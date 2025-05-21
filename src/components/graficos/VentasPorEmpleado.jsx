import { Card } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const VentasPorEmpleado = ({ empleados, totales_Ventas }) => {
  const data = {
    labels: empleados, //Nombres de los meses
    datasets: [
      {
        label: 'Ventas(C$)',
        data: totales_Ventas, //total de ventas por empleado
        backgroundColor: 'rgba(192, 0, 0, 0.5)',
        bolderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Córdobas (C$)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Empleados',
        },
      },
    },
  };


return (
  <Card style={{ height: "100%" }}>
    <Card.Body>
      <Card.Title>Ventas por Empleado</Card.Title>
      <div style={{ height: "100%", position: "relative" }}>
        <Bar data={data} options={options} />
      </div>
    </Card.Body>
  </Card>
);
};
export default VentasPorEmpleado;
import { Card } from "react-bootstrap";
import { Pie } from 'react-chartjs-2';

const VentasPorEmpleado = ({ empleados, totales_Ventas }) => {
  const data = {
    labels: empleados, //Nombres de los meses
    datasets: [
      {
        label: 'Ventas(C$)',
        data: totales_Ventas, //total de ventas por empleado
        backgroundColor: [
        'rgba(255, 99, 132, 1)',  
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],

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
    <Card>
      <Card.Body>
        <Card.Title>Ventas por empleado</Card.Title>
        <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Pie data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};
export default VentasPorEmpleado;
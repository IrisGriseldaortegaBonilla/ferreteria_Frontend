import { Card } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';

const ClientesFrecuentes = ({ clientes, cantidades }) => {
  // 1. Combinar clientes y cantidades
  const clientesConCantidad = clientes.map((cliente, index) => ({
    cliente,
    cantidad: cantidades[index],
  }));

  // 2. Ordenar DESCENDENTEMENTE por cantidad y tomar los 6 primeros
  const topClientes = clientesConCantidad
    .sort((a, b) => b.cantidad - a.cantidad) // Descendente
    .slice(0, 6); // Top 6

  // 3. Extraer nombres y cantidades ya ordenados
  const topNombres = topClientes.map(item => item.cliente);
  const topCantidades = topClientes.map(item => item.cantidad);

  const data = {
    labels: topNombres, // ya en orden descendente
    datasets: [
      {
        label: 'Cantidad de Compras',
        data: topCantidades,
        backgroundColor: [
          'rgba(52, 73, 94, 0.8)',   
          'rgba(231, 76, 60, 0.8)',   
          'rgba(244, 208, 63, 0.8)', 
          'rgba(46, 204, 113, 0.8)',  
          'rgba(155, 89, 182, 0.8)',  
          'rgba(241, 148, 138, 0.8)', 
        ],
        borderColor: [
          'rgba(52, 73, 94, 1)',
          'rgba(231, 76, 60, 1)',
          'rgba(244, 208, 63, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(155, 89, 182, 1)',
          'rgba(241, 148, 138, 1)',
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
          text: 'Cantidad de compras',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Clientes',
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Clientes Frecuentes</Card.Title>
        <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClientesFrecuentes;

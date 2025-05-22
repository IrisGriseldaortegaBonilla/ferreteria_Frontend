import { Card } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';

const VentasPorCategorias = ({ categorias, totales_por_categoria }) => {


  
  const data = {
    labels: categorias,
    datasets: [
      {
        label: 'Ventas(C$)', 
        data: totales_por_categoria,
        backgroundColor: [
          'rgb(70, 255, 147)',
          'rgb(151, 54, 235)',
          'rgb(207, 255, 86)',
          'rgb(192, 75, 79)',
          'rgb(237, 102, 255)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: [
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
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
  };

  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Ventas Por Categoría</Card.Title>
        <div style={{ height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default VentasPorCategorias;







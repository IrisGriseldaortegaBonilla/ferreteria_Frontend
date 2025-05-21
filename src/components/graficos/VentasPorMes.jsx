import { Card } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Chart, { plugins, scales } from 'chart.js/auto';
import { data } from "react-router-dom";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";


const VentasPorMes = ({ meses, totales_por_mes }) => {


const data = {
  labels: meses, //Nombre de los meses
  datasets: [
    {
      label: 'Ventas(C$)', 
      data: totales_por_mes,//Total de ventas por mes
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    },
  ],
};

const options = {
    responsive: true,
    plugins: {
      legend:{
        position: 'top',
      }
    },
    scales: {
      y:{
        begingAtZero: true,
        tittle: {
        display: true,
        text: 'Cordobas (C$)',
      },
    },
    x:{
      tittle: {
        display: true,
        text: 'Meses',
      },
    },
  },
};

return(
  <Card  style={{height: "100%"}}>
  <Card.Body>
    <Card.Title>Ventas Por Mes</Card.Title>
    <div style={{height: "100%", position: "relative"}}>
      <Bar data={data} options={options}/>
   </div>
  </Card.Body>
 </Card>
)
};

export default VentasPorMes;
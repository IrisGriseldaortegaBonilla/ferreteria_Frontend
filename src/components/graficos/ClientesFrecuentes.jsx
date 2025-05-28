import { Card, Button } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  const chartRef = useRef(null); // REFERENCIA para acceder al canvas del gráfico
  // Función para generar PDF
  const generarPDF = () => {
    const doc = new jsPDF();

    // Encabezado
    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("Reporte de Clientes Frecuentes", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

    // Captura del gráfico
    const chartInstance = chartRef.current;
    const chartCanvas = chartInstance?.canvas;
    const chartImage = chartCanvas?.toDataURL("image/png", 1.0);

    if (chartImage) {
      doc.addImage(chartImage, "PNG", 14, 40, 180, 100);
    }

    // Tabla de datos
    const columnas = ["Cliente", "Cantidad de Compras"];
    const filas = topNombres.map((nombre, index) => [nombre, topCantidades[index]]);

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 150,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { top: 20, left: 14, right: 14 },
    });

    // Nombre del archivo dinámico
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const nombreArchivo = `ClientesFrecuentes_${dia}_${mes}_${anio}.pdf`;

    doc.save(nombreArchivo);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Clientes Frecuentes</Card.Title>
        <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Bar ref={chartRef} data={data} options={options} />
        </div>
        <Button className="btn btn-primary mt-3" onClick={generarPDF}>
          Generar Reporte <i className="bi bi-download"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClientesFrecuentes;

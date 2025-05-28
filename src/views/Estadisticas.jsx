import React, { useState, useEffect } from 'react';
import VentasPorMes from '../components/graficos/VentasPorMes';
import VentasPorEmpleado from '../components/graficos/VentasPorEmpleado';
import VentasPorCategorias from '../components/graficos/VentasPorCategorias';
import ClientesFrecuentes from '../components/graficos/ClientesFrecuentes';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ChatIA from '../components/chat/ChatIA';

const Estadisticas = () => {

  const [meses, setMeses] = useState([]);
  const [totalesPorMes, setTotalesPorMes] = useState([]);

  const [empleados, setEmpleados] = useState([]);
  const [totales_Ventas, setTotalVentas] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [totalesPorCategoria, setTotalesPorCategoria] = useState([]);

  const [clientes, setClientes] = useState([]);
  const [cantidadCompras, setCantidadCompras] = useState([]);

  useEffect(() => {
    cargaVentasPorMes();
    cargaVentasPorEmpleado();
    cargarVentasPorCategoria();
    cargaClientesFrecuentes();
  }, []); 

  const cargaVentasPorMes = async () => {
  try{
    const response = await fetch('http://localhost:3000/api/totalventaspormes');
    const data = await response.json();

    setMeses(data.map(item => item.mes));
    setTotalesPorMes(data.map(item => item.total_ventas));
  } catch (error) {
    console.error('Error al cargar ventas:', error);
    alert('Error al cargar ventas: ' + error.message);
  }
  };

    const cargaVentasPorEmpleado = async () => {
  try{
    const response = await fetch('http://localhost:3000/api/totalventasporempleado');
    const data = await response.json();

    setEmpleados(data.map(item => item.primer_nombre + ' ' + item.segundo_nombre + ' ' + item.primer_apellido));
    setTotalVentas(data.map(item => item.total_ventas));
  } catch (error) {
    console.error('Error al cargar ventas por empleado:', error);
    alert('Error al cargar ventas por empleado: ' + error.message);
  }
  };

    const cargarVentasPorCategoria = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/totalventasporcategorias');
    const data = await response.json();

    // Usamos 'nombre_categoria' como etiqueta
    setCategorias(data.map(item => item.nombre_categoria));

    // Total de ventas por cada categoría
    setTotalesPorCategoria(data.map(item => item.total_ventas));
  } catch (error) {
    console.error('Error al cargar ventas por categoría:', error);
    alert('Error al cargar ventas por categoría: ' + error.message);
  }
};

const [mostrarChatModal, setMostrarChatModal] = useState(false); // Estado para el modal

const cargaClientesFrecuentes = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/clientesfrecuentes');
    const data = await response.json();

    setClientes(data.map(item => item.primer_nombre + ' ' + item.primer_apellido));
    setCantidadCompras(data.map(item => item.cantidad_compras));
  } catch (error) {
    console.error('Error al cargar clientes frecuentes:', error);
    alert('Error al cargar clientes frecuentes: ' + error.message);

  }
};

  return(
    <Container className='mt-5'>
      <br />
      <h4>Estadísticas</h4>
       <Button 
          variant="primary" 
          className="mb-4"
          onClick={() => setMostrarChatModal(true)}
        >
          Consultar con IA
        </Button>
        <ChatIA mostrarChatModal={mostrarChatModal} setMostrarChatModal={setMostrarChatModal} />
      <Row className='mt-4'>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
         <VentasPorMes meses={meses} totales_por_mes={totalesPorMes} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
          <VentasPorEmpleado empleados={empleados} totales_Ventas={totales_Ventas} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
          <VentasPorCategorias categorias={categorias} totales_por_categoria={totalesPorCategoria} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
          <ClientesFrecuentes clientes={clientes} cantidades={cantidadCompras} />
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;
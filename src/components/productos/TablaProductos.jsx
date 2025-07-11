import React from 'react';
import { Table, Button } from 'react-bootstrap';
import Paginacion from "../ordenamiento/Paginacion";
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaProductos = ({
  productos, 
  cargando, 
  error,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
  abrirModalEliminacion,
  abrirModalEdicion,
  generarPDFDetalleProducto
}) => {

  if (cargando) {
    return <div>Cargando productos...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Nombre Producto</th>
            <th>Descripción</th>
            <th>ID Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto}>
              <td>{producto.id_producto}</td>
              <td>{producto.nombre_producto}</td>
              <td>{producto.descripcion_producto}</td>
              <td>{producto.id_categoria}</td>
              <td>{producto.precio_unitario}</td>
              <td>{producto.stock}</td>
              <td>
                {producto.imagen ? (
                  <img
                    src={`data:image/png;base64,${producto.imagen}`}
                    alt={producto.nombre_producto}
                    style={{ maxWidth: '100px' }}
                  />
                ) : 'Sin imagen'}
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEliminacion(producto)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => generarPDFDetalleProducto(producto)}
                >
                  <i className="bi bi-filetype-pdf"></i>
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => abrirModalEdicion(producto)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </>
  );
};

export default TablaProductos;

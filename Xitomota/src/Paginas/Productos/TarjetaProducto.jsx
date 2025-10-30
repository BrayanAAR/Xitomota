import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Función para formatear el precio
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio);
};

// --- Componente de Tarjeta Reutilizable ---
export default function TarjetaProducto({ producto, mostrarCategoria = true }) {  

    const [cantidad, setCantidad] = React.useState(1);
    const imagenUrl = `http://localhost:8080/images/${producto.imagen}`;

    // --- Lógica de "Agregar al Carrito" ---
    const handleAgregarAlCarrito = async () => { 
      const cartId = localStorage.getItem('cartId');

      if (!cartId) {
        alert("Error, no se pudo encontrar el carrito. Visita la página del carrito primero.");
        return;
      }

      if (cantidad > producto.stock) {
        alert(`No hay suficiente stock. Stock disponible: ${producto.stock}`);
        return;
      }

      if (producto.stock <= 0) {
        alert("No hay stock disponible.");
        return;
      }

      try {
        await axios.post(`http://localhost:8080/api/v1/carrito/${cartId}/add/${producto.id}`, null, {
          params: { cantidad: cantidad } 
        });
        alert(`¡${cantidad} ${producto.nombre} agregado al carrito!`);
        setCantidad(1);
      } catch (error) {
        console.error("Error al agregar al carrito:", error);
        alert("No se pudo agregar el producto.");
      }
    };

    const handleCantidadCambiar = (e) => {
      let nuevaCantidad = Math.max(1, parseInt(e.target.value) || 1);

      if (nuevaCantidad < 1) nuevaCantidad = 1;
      
      if (nuevaCantidad > producto.stock) {
        nuevaCantidad = producto.stock;
        alert(`No puedes seleccionar más que el stock disponible: ${producto.stock}`);
      }
      setCantidad(nuevaCantidad);
    };

    return (
          <div className="producto-item" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <Link to={`/productos/${producto.id}`}>
                <img 
                    src={imagenUrl} 
                    alt={producto.nombre} 
                    style={{ width: '100%', cursor: 'pointer' }}
                />
            </Link>
            <div className="producto-info">
              <h3 className="producto-nombre">{producto.nombre}</h3>
              {mostrarCategoria && producto.categoria && (
                <p>Categoría: {producto.categoria.nombre}</p>
              )}
              <p className="producto-precio">{formatearPrecio(producto.precio)}</p>
            </div>
            {producto.stock > 10 ? (
              <p className="producto-stock stock-disponible">Stock disponible: {producto.stock}</p>
            ) : (
              producto.stock > 0 ? (
                <p className="producto-stock stock-critico">¡Últimas {producto.stock} unidades!</p>
              ) : (
                <p className="producto-stock stock-agotado">AGOTADO</p>
              )
            )}
            <div className="producto-acciones-footer">
              {producto.stock > 0 ? (
                <>
                  <input
                    type="number"
                    id={`cantidad-${producto.id}`}
                    value={cantidad}
                    onChange={handleCantidadCambiar}
                    min="1"
                    title='Cantidad'
                  />
                  <button onClick={handleAgregarAlCarrito} className="btn-agregar-carrito">
                    Agregar al Carrito
                  </button>
                </>
              ) : (
                <button className="btn-agregar-carrito" disabled>
                  AGOTADO
                </button>
              )}
              
            </div>

          </div>
    );
};
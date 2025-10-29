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
// Acepta el 'producto' y una prop 'mostrarCategoria'
export default function TarjetaProducto({ producto, mostrarCategoria = true }) {  
    const imagenUrl = `http://localhost:8080/images/${producto.imagen}`;

    // --- Lógica de "Agregar al Carrito" ---
    const handleAgregarAlCarrito = async () => { 
      const cartId = localStorage.getItem('cartId');

      if (!cartId) {
        alert("Error, no se pudo encontrar el carrito. Visita la página del carrito primero.");
        return;
      }

      try {
        await axios.post(`http://localhost:8080/api/v1/carrito/${cartId}/add/${producto.id}`, null, {
          params: { cantidad: 1 } 
        });
        alert("¡Producto agregado al carrito!");
      } catch (error) {
        console.error("Error al agregar al carrito:", error);
        alert("No se pudo agregar el producto.");
      }
    };

    return (
        // Usa las clases CSS que ya tenías (ej: "producto-item")
          <div className="producto-item" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <Link to={`/productos/${producto.id}`}>
                <img 
                    src={imagenUrl} 
                    alt={producto.nombre} 
                    style={{ width: '100%', cursor: 'pointer' }} // Añadimos cursor:pointer
                />
            </Link>
            <div className="producto-info">
              <h3 className="producto-nombre">{producto.nombre}</h3>
              {mostrarCategoria && producto.categoria && (
                <p>Categoría: {producto.categoria.nombre}</p>
              )}
              <p className="producto-precio">{formatearPrecio(producto.precio)}</p>
            </div>
            {/* --- El Botón --- */}
            <button onClick={handleAgregarAlCarrito} className="btn-agregar-carrito">
              Agregar al Carrito
            </button>
          </div>
    );
};
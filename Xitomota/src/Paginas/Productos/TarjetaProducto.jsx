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
        // 1. Intentamos obtener el ID existente
        let cartId = localStorage.getItem('cartId');

        try {
            // 2. Si NO existe, lo creamos primero
            if (!cartId) {
                const responseCrear = await axios.post('http://localhost:8080/api/v1/carrito/crear');
                cartId = responseCrear.data.id; // Obtenemos el nuevo ID
                localStorage.setItem('cartId', cartId); // Lo guardamos para el futuro
            }

            // 3. Validaciones de stock (tu código existente)
            if (cantidad > producto.stock) {
                alert(`Error: Solo quedan ${producto.stock} unidades disponibles.`);
                return;
            }
            if (producto.stock <= 0) {
                alert("Este producto está agotado.");
                return;
            }

            // 4. Ahora sí, agregamos el producto usando el ID (viejo o nuevo)
            await axios.post(`http://localhost:8080/api/v1/carrito/${cartId}/add/${producto.id}`, null, {
                params: { cantidad: cantidad } 
            });
            
            alert(`¡${cantidad} ${producto.nombre}(s) agregado(s) al carrito!`);
            setCantidad(1); 

        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            if (error.response && error.response.status === 400) {
                 alert(error.response.data); // Muestra error de stock del backend
            } else {
                 alert("No se pudo agregar el producto. Intenta nuevamente.");
            }
        }
    };

    const handleCantidadCambiar = (e) => {
      let nuevaCantidad = Math.max(1, parseInt(e.target.value) || 1);
      
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
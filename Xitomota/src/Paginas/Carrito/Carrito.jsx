import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio);
};

export default function Carrito() {
  const [CarritoItems, setCarritoItems] = useState([]);
  const [cartId, setCartId] = useState(localStorage.getItem('cartId'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getOrCreateCart = async () => {
      setIsLoading(true);
      let currentCartId = localStorage.getItem('cartId');

      try {
        if (currentCartId) {
          const response = await axios.get(`http://localhost:8080/api/v1/carrito/${currentCartId}`);
          setCarritoItems(response.data.items || []); 
          setCartId(currentCartId);
        } else {
          const response = await axios.post('http://localhost:8080/api/v1/carrito/crear');
          const newCartId = response.data.id;
          localStorage.setItem('cartId', newCartId); 
          setCartId(newCartId);
          setCarritoItems([]);
        }
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
        if (error.response && error.response.status === 404) {
          localStorage.removeItem('cartId'); 
          getOrCreateCart();
        }
      } finally {
        setIsLoading(false);
      }
    };

    getOrCreateCart();
  }, []); 

  const recargarCarrito = async () => {
    if (!cartId) return; 
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/carrito/${cartId}`);
      setCarritoItems(response.data.items || []);
    } catch (error) {
      console.error("Error al recargar el carrito:", error);
    }
  };

  const cambiarCantidad = async (itemId, delta) => {
    const item = CarritoItems.find(i => i.id === itemId);
    if (!item) return;
    
    const nuevaCantidad = Math.max(1, item.cantidad + delta); 

    try {
      await axios.put(`http://localhost:8080/api/v1/carrito/item/${itemId}`, null, {
        params: { cantidad: nuevaCantidad }
      });
      recargarCarrito();
    } catch (error) {
      console.error("Error al cambiar la cantidad:", error);
    }
};

  const eliminarItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/carrito/item/${itemId}`);
      recargarCarrito();
    } catch (error) {
      console.error("Error al eliminar el item:", error);
    }
  };

  const limpiarCarrito = async () => {
    try {
      await Promise.all(
        CarritoItems.map(item => 
          axios.delete(`http://localhost:8080/api/v1/carrito/item/${item.id}`)
        )
      );
      setCarritoItems([]);
    } catch (error) {
      console.error("Error al limpiar el carrito:", error);
    }
  };

  const calcularSubtotal = (precio, cantidad) => {
    return precio * cantidad;
  };

  const calcularTotal = () => {
    return CarritoItems.reduce((total, item) => 
      total + (item.producto.precio * item.cantidad), 0
    );
  };

  const totalCarrito = calcularTotal();

  if (isLoading) {
    return <div className="carrito-container"><h2>Cargando Carrito...</h2></div>
  }
   
  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      <div className="carrito-wrapper">
        {/* Encabezado */}
        <div className="carrito-header">...</div>

        {/* Lista de items */}
        <div className="carrito-items-lista">
          {CarritoItems.length === 0 ? (
            <p className="carrito-vacio">El carrito está vacío.</p>
          ) : (
            CarritoItems.map(item => { 
              const subtotal = calcularSubtotal(item.producto.precio, item.cantidad);
            const imagenUrl = `http://localhost:8080/images/${item.producto.imagen}`;

              return (
                <div key={item.id} className="carrito-item">
                  <div className="item-img-nombre">
                    <div className="img-placeholder-carrito">
                      <img src={imagenUrl} alt={item.producto.nombre} />
                    </div>
                  <span>{item.producto.nombre}</span>
                  </div>
                  <div className="item-precio">{formatearPrecio(item.producto.precio)}</div>
                  <div className="item-cantidad">
                    <button onClick={() => cambiarCantidad(item.id, -1)}>-</button>
                    <input type="number" value={item.cantidad} readOnly />
                    <button onClick={() => cambiarCantidad(item.id, 1)}>+</button>
                  </div>
                  <div className="item-subtotal">{formatearPrecio(subtotal)}</div>
                  <div className="item-acciones">
                    <button 
                      className="btn-eliminar"
                      onClick={() => eliminarItem(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/*  Footer del carrito */}
        {CarritoItems.length > 0 && (
          <div className="carrito-footer">
            <div className="footer-total">
              <strong>Total: {formatearPrecio(totalCarrito)}</strong>
            </div>
            <div className="footer-botones">
              <button className="btn-limpiar" onClick={limpiarCarrito}>
                Limpiar
              </button>
              <Link to="/checkout" className="btn-comprar">
                Comprar ahora
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importar Link para la navegación

// Función para formatear el precio (se queda igual)
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio);
};

export default function Carrito() {
  // --- 3. ESTADO ---
  // El carrito empieza vacío y guardamos el ID
  const [CarritoItems, setCarritoItems] = useState([]);
  const [cartId, setCartId] = useState(localStorage.getItem('cartId'));
  // Estado para saber cuándo estamos cargando
  const [isLoading, setIsLoading] = useState(true);

  // --- 4. USEEFFECT (LÓGICA DE CARGA) ---
  useEffect(() => {
    // Función para obtener/crear el carrito
    const getOrCreateCart = async () => {
      setIsLoading(true);
      let currentCartId = localStorage.getItem('cartId');

      try {
        if (currentCartId) {
          // Si tenemos un ID, traemos ese carrito
          const response = await axios.get(`http://localhost:8080/api/v1/carrito/${currentCartId}`);
          setCarritoItems(response.data.items || []); // API devuelve { id: 1, items: [...] }
          setCartId(currentCartId);
        } else {
          // Si no hay ID, creamos un carrito nuevo
          const response = await axios.post('http://localhost:8080/api/v1/carrito/crear');
          const newCartId = response.data.id;
          localStorage.setItem('cartId', newCartId); // Guardamos el new ID en localStorage
          setCartId(newCartId);
          setCarritoItems([]); // El carrito nuevo está vacío
        }
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
        // Si el cartId guardado es inválido (ej: borrado de la BD), creamos uno nuevo
        if (error.response && error.response.status === 404) {
          localStorage.removeItem('cartId'); // Limpiamos el ID malo
          // Volvemos a intentar (esta vez creará uno nuevo)
          getOrCreateCart();
        }
      } finally {
        setIsLoading(false);
      }
    };

    getOrCreateCart();
  }, []); // El [] asegura que solo se ejecute al cargar el componente

  // --- 5. LÓGICA DEL CARRITO (CONECTADA A LA API) ---

  // Función genérica para recargar los datos del carrito
  const recargarCarrito = async () => {
    if (!cartId) return; // No hacer nada si aún no hay carrito
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/carrito/${cartId}`);
      setCarritoItems(response.data.items || []);
    } catch (error) {
      console.error("Error al recargar el carrito:", error);
    }
  };

  // Función para cambiar la cantidad
  const cambiarCantidad = async (itemId, delta) => {
    // Buscamos el item actual para saber su cantidad
    const item = CarritoItems.find(i => i.id === itemId);
    if (!item) return;
    
    const nuevaCantidad = Math.max(1, item.cantidad + delta); // No bajar de 1

    try {
      // Llamamos al endpoint del backend (fíjate que usamos 'itemId', el ID del CarritoItem)
      await axios.put(`http://localhost:8080/api/v1/carrito/item/${itemId}`, null, {
        params: { cantidad: nuevaCantidad }
      });
      // Recargamos el carrito para ver los cambios
      recargarCarrito();
    } catch (error) {
      console.error("Error al cambiar la cantidad:", error);
    }
  };

  // Función para eliminar un item
  const eliminarItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/carrito/item/${itemId}`);
      // Recargamos el carrito para ver los cambios
      recargarCarrito();
    } catch (error) {
      console.error("Error al eliminar el item:", error);
    }
  };

  // Función para vaciar el carrito
  const limpiarCarrito = async () => {
    try {
      // No tenemos un endpoint "limpiar", así que borramos cada item uno por uno
      // (Sería mejor crear un endpoint /api/v1/carrito/{cartId}/limpiar en el backend)
      await Promise.all(
        CarritoItems.map(item => 
          axios.delete(`http://localhost:8080/api/v1/carrito/item/${item.id}`)
        )
      );
      // Recargamos (o simplemente vaciamos el estado)
      setCarritoItems([]);
    } catch (error) {
      console.error("Error al limpiar el carrito:", error);
    }
  };

  // --- CÁLCULOS ---
  // El backend ahora nos da un objeto { id, producto, cantidad }
  // Así que los cálculos deben acceder a 'item.producto.precio'
  const calcularSubtotal = (precio, cantidad) => {
    return precio * cantidad;
  };

  const calcularTotal = () => {
    return CarritoItems.reduce((total, item) => 
      total + (item.producto.precio * item.cantidad), 0 // <--- Cambio aquí
    );
  };

  const totalCarrito = calcularTotal();

  // --- RENDERIZADO ---
  if (isLoading) {
    return <div className="carrito-container"><h2>Cargando Carrito...</h2></div>
  }
  
  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      
      <div className="carrito-wrapper">
        
        {/* Encabezado (igual) */}
        <div className="carrito-header">...</div>

        {/* --- Lista de items --- */}
        <div className="carrito-items-lista">
        {/* --- 6. CAMBIOS EN EL RENDER --- */}
          {CarritoItems.length === 0 ? (
            <p className="carrito-vacio">El carrito está vacío.</p>
          ) : (
            CarritoItems.map(item => { // 'item' ahora es un CarritoItem
            // El precio y nombre están dentro del objeto 'producto'
              const subtotal = calcularSubtotal(item.producto.precio, item.cantidad);
              // Construimos la URL de la imagen como en las otras páginas
            const imagenUrl = `http://localhost:8080/images/${item.producto.imagen}`;

              return (
                <div key={item.id} className="carrito-item"> {/* key es item.id (ID del CarritoItem) */}
                  <div className="item-img-nombre">
                    <div className="img-placeholder-carrito">
                        <img src={imagenUrl} alt={item.producto.nombre} />
                    </div>
                    <span>{item.producto.nombre}</span> {/* item.producto.nombre */}
                  </div>
                  
                  <div className="item-precio">{formatearPrecio(item.producto.precio)}</div>
                  
                  <div className="item-cantidad">
                    {/* Pasamos el ID del CarritoItem (item.id) */}
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

        {/* --- Footer del carrito (sin cambios de lógica) --- */}
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
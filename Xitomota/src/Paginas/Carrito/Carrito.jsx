import React, { useState } from 'react';

import fPoleraML from '../../img/poleras.jpg';
import fPantalon from '../../img/pantalones.jpg';
import fChaqueta from '../../img/chaquetas.jpg';
import fCamisa from '../../img/camisas.jpg';
import fBuzo from '../../img/buzos.jpg';
import fPoleron from '../../img/polerones.jpg';

// --- DATOS DE EJEMPLO ---
// En un proyecto real, esto vendría de un "contexto" (Context API) 
// o un estado global, no estaría definido aquí.
const itemsIniciales = [
  { id: 1, nombre: 'Polera Manga Larga', precio: 3999, cantidad: 1, img: fPoleraML },
  { id: 2, nombre: 'Pantalon', precio: 5999, cantidad: 1, img: fPantalon },
  { id: 3, nombre: 'Chaqueta', precio: 5999, cantidad: 3, img: fChaqueta },
  { id: 4, nombre: 'Camisa', precio: 1999, cantidad: 2, img: fCamisa },
  { id: 5, nombre: 'Buzo', precio: 5999, cantidad: 1, img: fBuzo },
  { id: 6, nombre: 'Poleron', precio: 0, cantidad: 1, img: fPoleron },
];
// -------------------------

// Función para formatear el precio
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio);
};

export default function Carrito() {
  // Estado para manejar los items del carrito
  const [itemsCarrito, setItemsCarrito] = useState(itemsIniciales);

  // --- LÓGICA DEL CARRITO ---

  // Función para cambiar la cantidad
  const cambiarCantidad = (id, delta) => {
    setItemsCarrito(itemsActuales =>
      itemsActuales.map(item =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } // Math.max para no bajar de 1
          : item
      )
    );
  };

  // Función para eliminar un item
  const eliminarItem = (id) => {
    setItemsCarrito(itemsActuales =>
      itemsActuales.filter(item => item.id !== id)
    );
  };

  // Función para vaciar el carrito
  const limpiarCarrito = () => {
    setItemsCarrito([]);
  };

  // --- CÁLCULOS ---
  
  // Calcula el subtotal de cada item
  const calcularSubtotal = (precio, cantidad) => {
    return precio * cantidad;
  };

  // Calcula el total de todo el carrito
  const calcularTotal = () => {
    return itemsCarrito.reduce((total, item) => 
      total + (item.precio * item.cantidad), 0
    );
  };

  const totalCarrito = calcularTotal();

  
  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      
      <div className="carrito-wrapper">
        
        {/* --- Encabezado de la tabla --- */}
        <div className="carrito-header">
          <div className="header-img">Imagen</div>
          <div className="header-nombre">Nombre</div>
          <div className="header-precio">Precio</div>
          <div className="header-cantidad">Cantidad</div>
          <div className="header-subtotal">Subtotal</div>
          <div className="header-acciones">Acciones</div>
        </div>

        {/* --- Lista de items --- */}
        <div className="carrito-items-lista">
          {itemsCarrito.length === 0 ? (
            <p className="carrito-vacio">El carrito está vacío.</p>
          ) : (
            itemsCarrito.map(item => {
              const subtotal = calcularSubtotal(item.precio, item.cantidad);
              return (
                <div key={item.id} className="carrito-item">
                  
                  <div className="item-img-nombre">
                    {/* Placeholder para la imagen */}
                    <div className="img-placeholder-carrito">
                        <img src={item.img} alt={item.nombre} />
                    </div>
                    <span>{item.nombre}</span>
                  </div>
                  
                  <div className="item-precio">{formatearPrecio(item.precio)}</div>
                  
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

        {/* --- Footer del carrito --- */}
        {itemsCarrito.length > 0 && (
          <div className="carrito-footer">
            <div className="footer-total">
              <strong>Total: {formatearPrecio(totalCarrito)}</strong>
            </div>
            <div className="footer-botones">
              <button className="btn-limpiar" onClick={limpiarCarrito}>
                Limpiar
              </button>
              <button className="btn-comprar">
                Comprar ahora
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
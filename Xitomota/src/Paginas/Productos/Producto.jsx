import React, {useEffect, useState} from 'react';
import axios from 'axios';

// Función para formatear el precio (¡La usaremos ahora!)
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio);
};


// --- TarjetaProducto (Componente Hijo) ---
// Ahora la tarjeta maneja su propio botón de "Agregar"
const TarjetaProducto = ({ producto }) => { 
    
    const imagenUrl = `http://localhost:8080/images/${producto.imagen}`;

    // --- 1. LÓGICA DE AGREGAR ---
    // Movemos la lógica de "Agregar" AQUÍ DENTRO
    // Ahora tiene acceso directo a 'producto.id' desde las props
    const handleAgregarAlCarrito = async () => { 
      const cartId = localStorage.getItem('cartId');

      if (!cartId) {
        alert("Error, no se pudo encontrar el carrito. Refresca la página.");
        return;
      }

      try {
        // Usamos el ID del producto que recibimos por props
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
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <img src={imagenUrl} alt={producto.nombre} style={{ width: '100%' }} />
            <h4>{producto.nombre}</h4>
            <p>Categoría: {producto.categoria}</p>
            {/* --- 2. PRECIO FORMATEADO --- */}
            <p>Precio: {formatearPrecio(producto.precio)}</p>
            
            {/* --- 3. BOTÓN DENTRO DE LA TARJETA --- */}
            <button onClick={handleAgregarAlCarrito}>
              Agregar al Carrito
            </button>
        </div>
    );
};
    

// --- Productos (Componente Padre) ---
export default function Productos() {

  const [productos, setProductos] = useState([]);

    useEffect(() => {
      const fetchProductos = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/productos');
          setProductos(response.data);
        } catch (error) {
          console.error("Error al obtener los productos:", error);
        }
      };

      fetchProductos();
    }, []);

    return (
      <div>
          <h2 style={{textAlign: 'center'}}>Todos los productos</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              
            {/* Ahora el .map() solo se preocupa de renderizar las tarjetas.
              El botón y su lógica están DENTRO de cada tarjeta.
            */}
            {productos.map(producto => (
                <TarjetaProducto key={producto.id} producto={producto} />
            ))}
            
            {/* El botón que estaba aquí se eliminó */}

          </div>
      </div>
    );
}
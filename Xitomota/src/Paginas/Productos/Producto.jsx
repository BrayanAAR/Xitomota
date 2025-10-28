import React, {useEffect, useState} from 'react';
import axios from 'axios';


const TarjetaProducto = ({ producto }) => {
    
    // Construimos la URL completa de la imagen.
    // Asumimos que tu backend las sirve desde http://localhost:8080/images/
    const imagenUrl = `http://localhost:8080/images/${producto.imagen}`;

    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            
            {/* Mostramos la imagen */}
            <img src={imagenUrl} alt={producto.nombre} style={{ width: '100%' }} />
            
            <h4>{producto.nombre}</h4>
            <p>Categoría: {producto.categoria}</p>
            <p>Precio: ${producto.precio}</p>
        </div>
    );
};
    
// Función para formatear el precio
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio);
};

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
          <h2>Productos Actuales en Stock</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              
              {productos.map(producto => (
                  <TarjetaProducto key={producto.id} producto={producto} />
              ))}

          </div>
      </div>
    );
}

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TarjetaProducto from './TarjetaProducto';

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
            {productos.map(producto => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
        </div>
      </div>
    );
}
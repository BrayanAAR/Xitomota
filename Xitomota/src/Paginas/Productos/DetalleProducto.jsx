import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // <-- Hook para leer el ID de la URL

// Función para formatear el precio (puedes importarla si la tienes en un archivo separado)
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio || 0);
};

export default function DetalleProducto() {
    // 1. Leemos el parámetro 'id' de la URL (de /producto/:id)
    const { id } = useParams(); 
    
    const [producto, setProducto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 2. Usamos useEffect para buscar el producto al cargar
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                // Llamamos al nuevo endpoint del backend
                const response = await axios.get(`http://localhost:8080/api/v1/productos/${id}`);
                setProducto(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al cargar el producto:", error);
                setIsLoading(false);
            }
        };

        fetchProducto();
    }, [id]); // Se vuelve a ejecutar si el ID de la URL cambia

    // 3. (Opcional) Lógica para agregar al carrito (igual que en la tarjeta)
    const handleAgregarAlCarrito = async () => { 
        const cartId = localStorage.getItem('cartId');
        if (!cartId) { /* ...manejo de error... */ return; }
        try {
            await axios.post(`http://localhost:8080/api/v1/carrito/${cartId}/add/${producto.id}`, null, {
                params: { cantidad: 1 } 
            });
            alert("¡Producto agregado al carrito!");
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
        }
    };

    if (isLoading) {
        return <div>Cargando producto...</div>;
    }

    if (!producto) {
        return <div>Producto no encontrado.</div>;
    }

    // 4. Renderizamos los detalles del producto
    return (
        <div className="detalle-producto-container" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            {/* Columna de la Imagen */}
            <div className="detalle-imagen" style={{ flex: 1 }}>
                <img 
                    src={`http://localhost:8080/images/${producto.imagen}`} 
                    alt={producto.nombre}
                    style={{ width: '100%', borderRadius: '8px' }}
                />
            </div>

            {/* Columna de la Información */}
            <div className="detalle-info" style={{ flex: 1 }}>
                <h1>{producto.nombre}</h1>
                <p style={{ fontSize: '1.2rem', color: '#555' }}>Categoría: {producto.categoria}</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '20px 0' }}>
                    {formatearPrecio(producto.precio)}
                </p>
                
                {/* Puedes agregar una descripción si la tienes en la BD */}
                <p>Aquí puedes poner una descripción larga del producto si la tienes en tu base de datos (ej: producto.descripcion).</p>
                
                <button onClick={handleAgregarAlCarrito} className="btn-agregar-carrito" style={{ marginTop: '20px' }}>
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Función para formatear el precio 
const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio || 0);
};

export default function DetalleProducto() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    // useEffect para buscar el producto al cargar
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                // Llamamos al nuevo endpoint del backend
                const response = await axios.get(`http://localhost:8080/api/v1/productos/${id}`);
                setProducto(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al cargar el producto:", error);
                setError("No se pudo cargar la información del producto.");
                setIsLoading(false);
            }
        };

        fetchProducto();
    }, [id]); // Se vuelve a ejecutar si el ID de la URL cambia

    // Lógica para agregar al carrito
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

    const handleCantidadCambiar = async (e) => {
        let nuevaCantidad = Math.max(1, parseInt(e.target.value) || 1);
        if (nuevaCantidad < 1) nuevaCantidad = 1;

        if (producto && nuevaCantidad > producto.stock) {
            nuevaCantidad = producto.stock;
            alert(`No puedes seleccionar más que el stock disponible: ${producto.stock}`);
        }
        setCantidad(nuevaCantidad);
    }

    if (isLoading) {
        return <div className="detalle-producto-container">Cargando producto...</div>;
    }

    if (!producto) {
        return <div className="detalle-producto-container not-found">Producto no encontrado.</div>;
    }

    if (error) {
        return <div className="detalle-producto-container error-message">Error: {error}</div>;
    }

    const imagen = `http://localhost:8080/images/${producto.imagen}`;

    return (
        <div className="detalle-producto-container">
            <div className="detalle-imagen" style={{ flex: 1 }}>
                <img 
                    src={imagen}
                    alt={producto.nombre}
                />
            </div>

            <div className="detalle-info">
                <h1>{producto.nombre}</h1>
                <p className="categoria-detalle">Categoría: {producto.categoria?.nombre || 'Sin categoría'}</p>
                <p className="precio-detalle">
                    {formatearPrecio(producto.precio)}
                </p>
                {producto.stock > 10 ? (
                    <p className="producto-stock stock-disponible">Stock disponible: {producto.stock}</p>
                ) : (
                    producto.stock > 0 ? (
                        <p className="producto-stock stock-critico">¡Últimas {producto.stock} unidades!</p>
                    ) : (
                        <p className="producto-stock stock-agotado">AGOTADO</p>
                    )
                )}
                {producto.stock > 0 ? (
                    <>
                        <div className="detalle-cantidad-selector">
                            <label htmlFor={"cantidad-producto"}>Cantidad:</label>
                            <input
                                type="number"
                                id="cantidad-producto"
                                value={cantidad}
                                onChange={handleCantidadCambiar}
                                min="1"
                            />
                        </div>
                        
                        <p className='detalle-descripcion'>Aquí puedes poner una descripción larga del producto si la tienes en tu base de datos (ej: producto.descripcion).</p>
                        
                        <button onClick={handleAgregarAlCarrito} className="btn-agregar-carrito" style={{ marginTop: '20px' }}>
                            Agregar al Carrito
                        </button>
                    </>
                ) : (
                    <button className="btn-agregar-carrito" disabled style={{ marginTop: '20px' }}>
                        AGOTADO
                    </button>
                )}
                
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Para los botones
// (Importa aquí tu CSS de admin, ej: import '../../css/HomeAdmin.css')

// Función para formatear el precio (copiada de tus otros componentes)
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio || 0);
};

export default function Inventario() {
    // 1. Estado para guardar la lista de productos
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    // 2. Función para cargar los productos desde la API
    const fetchProductos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/productos');
            setProductos(response.data);
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    };

    // 3. useEffect para cargar los datos cuando el componente se monta
    useEffect(() => {
        fetchProductos();
    }, []); // El array vacío [] asegura que se ejecute solo una vez

    // 4. Función para manejar el botón "Eliminar"
    const handleEliminar = async (id) => {
        // Pedimos confirmación
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                // Llamamos al nuevo endpoint DELETE
                await axios.delete(`http://localhost:8080/api/v1/productos/${id}`);
                // Si sale bien, refrescamos la lista de productos
                fetchProductos();
                alert("Producto eliminado exitosamente.");
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                alert("Error al eliminar el producto.");
            }
        }
    };

    // 5. JSX (tu HTML convertido)
    return (
        <main className="main"> {/* Esto se renderizará dentro de tu <Outlet> */}
            <h1>Inventario de Productos</h1>
            
            {/* El botón ahora usa 'navigate' de React Router */}
            <button 
                onClick={() => navigate('/admin/productos/nuevo')} 
                className="btnNuevo"
            >
                NUEVO PRODUCTO
            </button>
            
            <div className="tabla-contenedor">
                <table id="tablaProductos">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 6. Renderizado dinámico de la tabla */}
                        {productos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{formatearPrecio(producto.precio)}</td>
                                <td>{producto.stock || 0}</td> {/* Muestra 0 si el stock es null */}
                                <td>{producto.categoria}</td>
                                <td className="acciones-tabla">
                                    {/* Link para editar (te llevará a una futura pág.) */}
                                    <Link 
                                        to={`/admin/productos/editar/${producto.id}`}
                                        className="btn-editar"
                                    >
                                        Editar
                                    </Link>
                                    
                                    {/* Botón para eliminar */}
                                    <button 
                                        onClick={() => handleEliminar(producto.id)}
                                        className="btn-eliminar"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* (Puedes dejar la paginación estática por ahora) */}
            <div className="paginacion">
                <button>«</button>
                <button>‹</button>
                <button className="activo">1</button>
                <button>›</button>
                <button>»</button>
            </div>
        </main>
    );
}
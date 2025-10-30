import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio || 0);
};

const PAGE_SIZE = 10;

export default function Inventario() {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    const fetchProductos = async (pageToFetch = 0) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/productos`, {
                params: {
                    page: pageToFetch,
                    size: PAGE_SIZE,
                    sort: 'id,asc'
                }
            });
            setProductos(response.data.content); 
            setCurrentPage(response.data.number); 
            setTotalPages(response.data.totalPages); 
            setTotalElements(response.data.totalElements); 

        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    };

    useEffect(() => {
        fetchProductos(0);
    }, [location.pathname]);

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/productos/${id}`);
                alert("Producto eliminado exitosamente.");
                fetchProductos(currentPage);
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                alert("Error al eliminar el producto.");
            }
        }
    };

    const goToPage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            fetchProductos(pageNumber);
        }
    };

    const goToFirstPage = () => goToPage(0);
    const goToLastPage = () => goToPage(totalPages - 1);
    const goToNextPage = () => goToPage(currentPage + 1);
    const goToPreviousPage = () => goToPage(currentPage - 1);
    
    return (
        <main className="main"> 
            <div className="main-header">
                <h1>Inventario de Productos</h1>
                
                <div className="inventario-acciones-header">
                    <Link to="/admin/stock-critico" className="btn-header btn-critico">
                        Stock Crítico
                    </Link>
                    <Link to="/admin/reportes" className="btn-header btn-reporte" >
                        Reportes
                    </Link>
                    <button 
                    onClick={() => navigate('/admin/productos/nuevo')} 
                        className="btn-header btn-nuevo"
                    >
                        NUEVO PRODUCTO
                    </button>
                </div>
            </div>
            
            {/* TABLA PRINCIPAL DE PRODUCTOS */}
            <h2 style={{ paddingTop: '20px' }}>Inventario</h2>
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
                        {productos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{formatearPrecio(producto.precio)}</td>
                                <td>{producto.stock || 0}</td> 
                                <td>{producto.categoria?.nombre}</td>
                                <td className="acciones-tabla">
                                    <Link 
                                        to={`/admin/productos/${producto.id}`}
                                        className="btn-editar"
                                    >
                                        Editar
                                    </Link>
                                    
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

            {/* . PAGINACIÓN DINÁMICA */}
            <div className="paginacion">
                {/* Botón Primera Página */}
                <button onClick={goToFirstPage} disabled={currentPage === 0}>
                    «
                </button>
                {/* Botón Anterior */}
                <button onClick={goToPreviousPage} disabled={currentPage === 0}>
                    ‹
                </button>

                {[...Array(totalPages).keys()].map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        className={pageNumber === currentPage ? 'activo' : ''}
                    >
                        {pageNumber + 1}
                    </button>
                ))}

                {/* Botón Siguiente */}
                <button onClick={goToNextPage} disabled={currentPage >= totalPages - 1}>
                    ›
                </button>
                {/* Botón Última Página */}
                <button onClick={goToLastPage} disabled={currentPage >= totalPages - 1}>
                    »
                </button>
            </div>
        </main>
    );
}
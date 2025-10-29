import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// (Importa aquí tu CSS de admin, ej: import '../../css/HomeAdmin.css')

// Función para formatear el precio
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio || 0);
};

// Función para formatear la fecha (opcional pero útil)
const formatearFecha = (fechaString) => {
    if (!fechaString) return 'N/A';
    const fecha = new Date(fechaString);
    return fecha.toLocaleString('es-CL'); // Formato local de Chile
};

export default function ListadoOrdenes() {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                // Llamamos a nuestro nuevo endpoint GET /api/v1/orden
                const response = await axios.get('http://localhost:8080/api/v1/orden');
                setOrdenes(response.data);
            } catch (error) {
                console.error("Error al cargar las órdenes:", error);
            }
        };
        fetchOrdenes();
    }, []);

    return (
        <main className="main">
            <h1>Órdenes de Compra</h1>
            
            <div className="tabla-contenedor">
                <table id="tablaProductos"> {/* Reutilizamos los estilos de tabla de inventario */}
                    <thead>
                        <tr>
                            <th>Nro. Orden</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Correo</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map(orden => (
                            <tr key={orden.id}>
                                <td>#{orden.id}</td>
                                <td>{formatearFecha(orden.fechaCreacion)}</td>
                                <td>{orden.nombre} {orden.apellidos}</td>
                                <td>{orden.correo}</td>
                                <td>{formatearPrecio(orden.total)}</td>
                                <td className="acciones-tabla">
                                    <Link 
                                        to={`/admin/ordenes/${orden.id}`} // Link al detalle
                                        className="btn-editar" // Reutilizamos estilo (azul)
                                    >
                                        Ver Detalle
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
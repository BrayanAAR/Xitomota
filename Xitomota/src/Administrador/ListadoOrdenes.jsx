import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio || 0);
};

const formatearFecha = (fechaString) => {
    if (!fechaString) return 'N/A';
    const fecha = new Date(fechaString);
    return fecha.toLocaleString('es-CL');
};

export default function ListadoOrdenes() {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
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
                <table id="tablaProductos">
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
                                        to={`/admin/ordenes/${orden.id}`}
                                        className="btn-editar"
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
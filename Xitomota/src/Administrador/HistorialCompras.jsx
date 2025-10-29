import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// (Copia tus funciones formatearPrecio y formatearFecha aquí)
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio || 0);
};

const formatearFecha = (fecha) => {
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(fecha));
};

export default function HistorialCompras() {
    const { email } = useParams(); // Leemos el email de la URL
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                // Usamos el nuevo endpoint del OrdenController
                const response = await axios.get(`http://localhost:8080/api/v1/orden/por-correo/${email}`);
                setOrdenes(response.data);
            } catch (error) {
                console.error("Error al cargar el historial:", error);
            }
        };
        fetchHistorial();
    }, [email]);

    return (
        <main className="main">
            <div className="main-header">
                <h1>Historial de Compras de: {email}</h1>
                <Link to="/admin/usuarios" className="btn-volver-inventario">Volver a Usuarios</Link>
            </div>
            
            <div className="tabla-contenedor">
                <table id="tablaProductos">
                    <thead>
                        <tr>
                            <th>Nro. Orden</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map(orden => (
                            <tr key={orden.id}>
                                <td>#{orden.id}</td>
                                <td>{/* {formatearFecha(orden.fechaCreacion)} */} {orden.fechaCreacion}</td>
                                <td>{/* {formatearPrecio(orden.total)} */} ${orden.total}</td>
                                <td className="acciones-tabla">
                                    {/* Link para ver el mismo detalle de orden */}
                                    <Link to={`/admin/ordenes/${orden.id}`} className="btn-editar">
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
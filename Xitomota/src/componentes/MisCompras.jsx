import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// (Tu función formatearPrecio)
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precio || 0);
};

// Función para fecha
const formatearFecha = (fechaString) => {
    if (!fechaString) return '';
    return new Date(fechaString).toLocaleDateString('es-CL', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });
};

export default function MisCompras() {
    const [ordenes, setOrdenes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const emailUsuario = localStorage.getItem('usuarioLogueado');

    useEffect(() => {
        if (!emailUsuario) {
            alert("Debes iniciar sesión para ver tus compras.");
            navigate('/iniciar-sesion');
            return;
        }

        const fetchMisCompras = async () => {
            try {
                // Usamos el endpoint que busca por correo
                const response = await axios.get(`http://localhost:8080/api/v1/orden/por-correo/${emailUsuario}`);
                setOrdenes(response.data);
            } catch (error) {
                console.error("Error al cargar compras:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMisCompras();
    }, [emailUsuario, navigate]);

    if (isLoading) return <div className="container mt-5">Cargando historial...</div>;

    return (
        <div className="container mt-5" style={{ minHeight: '60vh' }}>
            <h2 className="mb-4">Mis Compras</h2>
            
            {ordenes.length === 0 ? (
                <div className="alert alert-info">Aún no has realizado ninguna compra.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>N° Orden</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenes.map(orden => (
                                <tr key={orden.id}>
                                    <td>#{orden.id}</td>
                                    <td>{formatearFecha(orden.fechaCreacion)}</td>
                                    <td>{formatearPrecio(orden.total)}</td>
                                    <td>
                                        <Link to={`/boleta/${orden.id}`} className="btn btn-primary btn-sm">
                                            Ver Boleta
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
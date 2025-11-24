import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// (Copia aquí tu función formatearPrecio)
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precio || 0);
};

export default function Boleta() {
    const { id } = useParams(); 
    const [orden, setOrden] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrden = async () => {
            try {
                // Reutilizamos el endpoint de obtener orden por ID
                const response = await axios.get(`http://localhost:8080/api/v1/orden/${id}`);
                setOrden(response.data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrden();
    }, [id]);

    if (isLoading) return <div>Cargando boleta...</div>;
    if (!orden) return <div>Orden no encontrada.</div>;

    // Reutilizamos el diseño de checkout/pago realizado
    return (
        <div className="checkout-grid-container boleta-container" style={{ marginTop: '40px' }}> 
            <div className="checkout-form-column boleta-paper">

                <div className="confirmacion-header text-center">
                    {/* --- TÍTULO DE BOLETA --- */}
                    <h2>🧾 Boleta Electrónica N° {orden.id}</h2>
                    <p className="text-muted">Fecha de emisión: {new Date(orden.fechaCreacion).toLocaleDateString()}</p>
                    <Link to="/mis-compras" className="btn btn-secondary mb-3">Volver al Historial</Link>
                </div>

                {/* --- DATOS DEL CLIENTE (Reutiliza tu JSX de PagoRealizado) --- */}
                <section className="checkout-section">
                    <h3>Datos del Cliente</h3>
                    <p><strong>Nombre:</strong> {orden.nombre} {orden.apellidos}</p>
                    <p><strong>Correo:</strong> {orden.correo}</p>
                    <p><strong>Dirección:</strong> {orden.calle} {orden.departamento ? `, Depto ${orden.departamento}` : ''}, {orden.comuna}, {orden.region}</p>
                </section>

                {/* --- DETALLE DE PRODUCTOS --- */}
                <section className="checkout-section">
                    <h3>Detalle de Productos</h3>
                    <div className="resumen-carrito-table">
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio Unit.</th>
                                    <th>Cant.</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orden.items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.nombreProducto}</td>
                                        <td>{formatearPrecio(item.precioUnitario)}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{formatearPrecio(item.precioUnitario * item.cantidad)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="confirmacion-footer">
                    <h3>Total Pagado: {formatearPrecio(orden.total)}</h3>
                    <button className="btn-imprimir" onClick={() => window.print()}>Imprimir Boleta</button>
                </div>

            </div>
        </div>
    );
}
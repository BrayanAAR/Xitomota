import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link} from 'react-router-dom'; // Hook para leer el ID de la URL
/* import './TuArchivoDeEstilos.css'; */ // Asegúrate de importar tu CSS

// Función para formatear el precio
const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio);
};

export default function DetalleOrden() {
    // 1. Obtenemos el 'ordenId' de la URL (ej: /detalleorden/7)
    const { ordenId } = useParams();
    const [orden, setOrden] = useState(null); // Estado para guardar la orden
    const [isLoading, setIsLoading] = useState(true);

    // 2. Usamos useEffect para buscar la orden al cargar
    useEffect(() => {
        const fetchOrden = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/orden/${ordenId}`);
                setOrden(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al cargar la orden:", error);
                setIsLoading(false);
                // Aquí podrías redirigir a una página de error
            }
        };

        if (ordenId) {
            fetchOrden();
        }
    }, [ordenId]); // Se ejecuta cada vez que el ordenId cambie

    if (isLoading) {
        return <div>Cargando confirmación...</div>;
    }

    if (!orden) {
        return <div>Error: No se pudo encontrar la orden.</div>;
    }

    // 3. Renderizamos el JSX con los datos de la orden
    return (
        // Puedes usar las mismas clases CSS de 'checkout'
        <div className="checkout-grid-container" style={{ gridTemplateColumns: '1fr' }}> 
            <div className="checkout-form-column">

                <div className="confirmacion-header">
                    <h2>Detalle de la Orden #{orden.id}</h2>
                    <p>Detalle de compra</p>
                    <Link to="/admin/ordenes" className="btn-volver-pago">VOLVER AL LISTADO</Link>
                </div>

                {/* --- Sección Info Cliente --- */}
                <section className="checkout-section">
                    <h3>Información del cliente</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre*</label>
                            <input type="text" value={orden.nombre} readOnly disabled />
                        </div>
                        <div className="form-group">
                            <label>Apellidos*</label>
                            <input type="text" value={orden.apellidos} readOnly disabled />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Correo*</label>
                            <input type="email" value={orden.correo} readOnly disabled />
                        </div>
                    </div>
                </section>

                {/* --- Sección Dirección --- */}
                <section className="checkout-section">
                    <h3>Dirección de entrega de los productos</h3>
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 2 }}>
                            <label>Calle*</label>
                            <input type="text" value={orden.calle} readOnly disabled />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Departamento (opcional)</label>
                            <input type="text" value={orden.departamento} readOnly disabled />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Región*</label>
                            <input type="text" value={orden.region} readOnly disabled />
                        </div>
                        <div className="form-group">
                            <label>Comuna*</label>
                            <input type="text" value={orden.comuna} readOnly disabled />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Indicaciones (opcional)</label>
                            <textarea rows="3" value={orden.indicaciones} readOnly disabled></textarea>
                        </div>
                    </div>
                </section>

                {/* --- Resumen de la Orden --- */}
                <section className="checkout-section">
                    <div className="resumen-carrito-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orden.items.map(item => {
                                    // --- 1. CONSTRUYE LA URL ---
                                    const imagen = `http://localhost:8080/images/${item.imagen}`;
                                    
                                    return (
                                    <tr key={item.id}>
                                        {/* --- 2. REEMPLAZA EL DIV POR UN IMG --- */}
                                        <td>
                                            <img 
                                                src={imagen} 
                                                alt={item.nombreProducto} 
                                                className="summary-img" // Usamos la clase CSS que ya existe
                                            />
                                        </td>
                                        <td>{item.nombreProducto}</td>
                                        <td>{formatearPrecio(item.precioUnitario)}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{formatearPrecio(item.precioUnitario * item.cantidad)}</td>
                                    </tr>
                                    );
                                })}     
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* --- Total y Botones --- */}
                <div className="confirmacion-footer">
                    <h3>Total pagado: {formatearPrecio(orden.total)}</h3>
                    <div className="confirmacion-botones">
                        <button className="btn-imprimir">Imprimir boleta en PDF</button>
                        <button className="btn-enviar-email">Enviar boleta por email</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
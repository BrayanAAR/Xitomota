import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio);
};

export default function PagoRealizado() {
    const { ordenId } = useParams(); 
    
    const [orden, setOrden] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrden = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/orden/${ordenId}`);
                setOrden(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al cargar la orden:", error);
                setIsLoading(false);
               
            }
        };

        if (ordenId) {
            fetchOrden();
        }
    }, [ordenId]); 

    if (isLoading) {
        return <div>Cargando confirmación...</div>;
    }

    if (!orden) {
        return <div>Error: No se pudo encontrar la orden.</div>;
    }

    return (
        <div className="checkout-grid-container" style={{ gridTemplateColumns: '1fr' }}> 
            <div className="checkout-form-column">

                <div className="confirmacion-header">
                    <h2><span style={{color: 'green'}}>✓</span> Se ha realizado la compra. nro #{orden.id}</h2>
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
                                    const imagen = `http://localhost:8080/images/${item.imagen}`;
                                    
                                    return (
                                    <tr key={item.id}>
                                        <td>
                                            <img 
                                                src={imagen} 
                                                alt={item.nombreProducto} 
                                                className="summary-img" 
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
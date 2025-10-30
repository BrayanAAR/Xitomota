import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 

const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio);
};

export default function PagoFallido() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { formData, items, total } = location.state || {};

    const handleVolver = () => {
        navigate('/checkout');
    };

    if (!formData || !items) {
        return (
            <div className="checkout-grid-container" style={{ gridTemplateColumns: '1fr' }}>
                <div className="checkout-form-column">
                    <h2>Error</h2>
                    <p>No hay información de pago para mostrar.</p>
                    <button onClick={() => navigate('/carrito')} className="btn-enviar-email">Volver al Carrito</button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-grid-container" style={{ gridTemplateColumns: '1fr' }}> 
            <div className="checkout-form-column">

                {/* --- Encabezado de Error --- */}
                <div className="confirmacion-header error-pago">
                    <h2><span style={{color: '#dc3545'}}>X</span> No se pudo realizar el pago.</h2>
                    <p>Detalle de compra</p>
                    <button onClick={handleVolver} className="btn-volver-pago">
                        VOLVER A REALIZAR EL PAGO
                    </button>
                </div>

                {/* --- Sección Info Cliente --- */}
                <section className="checkout-section">
                    <h3>Información del cliente</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre*</label>
                            <input type="text" value={formData.nombre} readOnly disabled />
                        </div>
                        <div className="form-group">
                            <label>Apellidos*</label>
                            <input type="text" value={formData.apellidos} readOnly disabled />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Correo*</label>
                            <input type="email" value={formData.correo} readOnly disabled />
                        </div>
                    </div>
                </section>

                {/* --- Sección Dirección --- */}
                <section className="checkout-section">
                    <h3>Dirección de entrega de los productos</h3>
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 2 }}>
                            <label>Calle*</label>
                            <input type="text" value={formData.calle} readOnly disabled />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Departamento (opcional)</label>
                            <input type="text" value={formData.departamento} readOnly disabled />
                        </div>
                    </div>
                     <div className="form-row">
                        <div className="form-group">
                            <label>Región*</label>
                            <input type="text" value={formData.region} readOnly disabled />
                        </div>
                        <div className="form-group">
                            <label>Comuna*</label>
                            <input type="text" value={formData.comuna} readOnly disabled />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Indicaciones (opcional)</label>
                            <textarea rows="3" value={formData.indicaciones} readOnly disabled></textarea>
                        </div>
                    </div>
                </section>

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
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <img 
                                                src={`http://localhost:8080/images/${item.producto.imagen}`} 
                                                alt={item.producto.nombre} 
                                                className="summary-img"
                                            />
                                        </td>
                                        <td>{item.producto.nombre}</td>
                                        <td>{formatearPrecio(item.producto.precio)}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{formatearPrecio(item.producto.precio * item.cantidad)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* --- Total--- */}
                <div className="confirmacion-footer">
                    <h3>Total pagado: {formatearPrecio(total)}</h3>
                </div>
            </div>
        </div>
    );
}
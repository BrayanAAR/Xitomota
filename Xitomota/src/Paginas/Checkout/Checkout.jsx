import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio);
};

export default function Checkout() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        correo: '',
        calle: '',
        departamento: '',
        region: 'Región Metropolitana de Santiago',
        comuna: 'Cerrillos',
        indicaciones: ''
    });

    const [itemsCarrito, setItemsCarrito] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const cartId = localStorage.getItem('cartId');
    const navigate = useNavigate();

    useEffect(() => {
        if (!cartId) {
            alert("Tu carrito está vacío.");
            navigate('/carrito');
            return;
        }
        const fetchCarrito = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/carrito/${cartId}`);
                setItemsCarrito(response.data.items || []);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al cargar el carrito:", error);
                setIsLoading(false);
            }
        };
        fetchCarrito();
    }, [cartId, navigate]);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePagarAhora = async () => {
        if (!formData.nombre || !formData.correo || !formData.calle) {
            alert('Por favor, completa los campos obligatorios.');
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:8080/api/v1/orden/crear/${cartId}`,
                formData
            );
            localStorage.removeItem('cartId');
            navigate(`/pagorealizado/${response.data.id}`);
        } catch (error) {
            console.error("Error al crear la orden:", error);

            if (error.response) {
                if (error.response.status === 400) {
                    alert(`Error ${error.response.data}`);
                } else {
                    navigate('/pagofallido', {
                        state: { formData, items: itemsCarrito, total: totalCarrito }
                    });
                }
            } else {
                alert("Error de red. Por favor, intenta nuevamente.");
            }
        }
    };

    const totalCarrito = itemsCarrito.reduce((total, item) => 
        total + (item.producto.precio * item.cantidad), 0
    );

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        
        <div className="checkout-grid-container">
            
            
            <div className="checkout-form-column">
                
                {/* --- Sección Info Cliente --- */}
                <section className="checkout-section">
                    <h3>Información del cliente</h3>
                    <p>Completa la siguiente información</p>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre*</label>
                            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleFormChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos*</label>
                            <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleFormChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="correo">Correo*</label>
                            <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleFormChange} />
                        </div>
                    </div>
                </section>

                {/* --- Sección Dirección --- */}
                <section className="checkout-section">
                    <h3>Dirección de entrega de los productos</h3>
                    <p>Ingrese direccion de forma detallada</p>
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 2 }}> 
                            <label htmlFor="calle">Calle*</label>
                            <input type="text" id="calle" name="calle" value={formData.calle} onChange={handleFormChange} />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}> 
                            <label htmlFor="departamento">Departamento (opcional)</label>
                            <input type="text" id="departamento" name="departamento" placeholder="Ej: 603" value={formData.departamento} onChange={handleFormChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="region">Región*</label>
                            <select id="region" name="region" value={formData.region} onChange={handleFormChange}>
                                <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                                <option value="Región de Valparaíso">Región de Valparaíso</option>
                                <option value="Región del Biobío">Región del Biobío</option>
                                <option value="Región de La Araucanía">Región de La Araucanía</option>
                                <option value="Región de Los Lagos">Región de Los Lagos</option>
                                <option value="Región de Aysén">Región de Aysén</option>
                                <option value="Región de Magallanes">Región de Magallanes</option>
                                <option value="Región de Arica y Parinacota">Región de Arica y Parinacota</option>
                                <option value="Región de Los Ríos">Región de Los Ríos</option>
                                {/* Agrega más regiones si es necesario */}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comuna">Comuna*</label>
                            <select id="comuna" name="comuna" value={formData.comuna} onChange={handleFormChange}>
                                <option value="Cerrillos">Cerrillos</option>
                                <option value="Maipú">Maipú</option>
                                <option value="La Florida">La Florida</option>
                                <option value="Providencia">Providencia</option>
                                <option value="Las Condes">Las Condes</option>
                                <option value="Puente Alto">Puente Alto</option>
                                <option value="San Bernardo">San Bernardo</option>
                                <option value="Renca">Renca</option>
                                {/* Agrega más comunas */}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="indicaciones">Indicaciones (opcional)</label>
                            <textarea id="indicaciones" name="indicaciones" rows="3" placeholder="Ej: Entre calles, color del edificio, no tiene timbre." value={formData.indicaciones} onChange={handleFormChange}></textarea>
                        </div>
                    </div>
                </section>
            </div>

            {/* --- COLUMNA DERECHA: RESUMEN --- */}
            <div className="checkout-summary-column">
                <div className="total-button-top">
                    <button>Total a pagar: {formatearPrecio(totalCarrito)}</button>
                </div>

                <h2>Carrito de compra</h2>

                {/* --- Tabla de Resumen --- */}
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
                            {itemsCarrito.map(item => {
                                const imagenUrl = `http://localhost:8080/images/${item.producto.imagen}`;
                                return (
                                    <tr key={item.id}>
                                        <td><img src={imagenUrl} alt={item.producto.nombre} className="summary-img" /></td>
                                        <td>{item.producto.nombre}</td>
                                        <td>{formatearPrecio(item.producto.precio)}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{formatearPrecio(item.producto.precio * item.cantidad)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="pagar-button-container">
                    <button onClick={handlePagarAhora} className="btn-pagar-final">
                        Pagar ahora {formatearPrecio(totalCarrito)}
                    </button>
                </div>
            </div>

        </div>
    );
}
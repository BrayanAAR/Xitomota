import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function StockCritico() {
    const [productosCriticos, setProductosCriticos] = useState([]);

    useEffect(() => {
        const fetchProductosCriticos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/productos/criticos');
                setProductosCriticos(response.data);
            } catch (error) {
                console.error("Error al cargar productos críticos:", error);
            }
        };
        fetchProductosCriticos();
    }, []);

    return (
        <main className="main">
            <h1>Productos con Stock Crítico (5 o menos)</h1>
            <Link to="/admin/inventario" className="btn-volver-inventario">
                Volver al Inventario
            </Link>

            <div className="tabla-contenedor stock-critico">
                <table id="tablaStockCritico">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Stock Actual</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosCriticos.length > 0 ? (
                            productosCriticos.map(producto => (
                                <tr key={producto.id} style={{ backgroundColor: '#fff5f5' }}>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td className="stock-critico-valor">{producto.stock}</td>
                                    <td className="acciones-tabla">
                                        <Link 
                                            to={`/admin/productos/${producto.id}`}
                                            className="btn-editar"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>¡No hay productos con stock crítico!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
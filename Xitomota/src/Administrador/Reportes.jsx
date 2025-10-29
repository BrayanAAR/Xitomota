import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Reportes() {
    const [topProductos, setTopProductos] = useState([]);

    useEffect(() => {
        const fetchTopProductos = async () => {
            try {
                // Llama al endpoint de reportes que ya creamos
                const response = await axios.get('http://localhost:8080/api/v1/orden/reportes/top-productos');
                setTopProductos(response.data);
            } catch (error) {
                console.error("Error al cargar top productos:", error);
            }
        };
        fetchTopProductos();
    }, []);

    return (
        <main className="main">
            <h1>Reportes de Ventas</h1>
            
            <div className="tabla-contenedor" style={{ marginTop: '20px' }}>
                <table id="tablaReportes">
                    <caption>Top Productos Más Vendidos</caption>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Total Unidades Vendidas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topProductos.length > 0 ? (
                            topProductos.slice(0, 5).map((item, index) => (
                                <tr key={index}>
                                    <td>{item[0]}</td> {/* nombreProducto */}
                                    <td>{item[1]}</td> {/* totalVendido */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" style={{ textAlign: 'center' }}>Aún no hay datos de ventas para mostrar.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// (Importa aquí los íconos que necesites de 'react-icons' o similar)

export default function HomeAdmin() {
    
    // 1. Estado para guardar las métricas
    const [stats, setStats] = useState({
        compras: 0,
        productos: 0,
        usuarios: 0
    });

    // En HomeAdmin.jsx

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // 1. Llamamos a nuestro nuevo endpoint
                const response = await axios.get('http://localhost:8080/api/v1/admin/stats');
                
                // 2. Guardamos los números en el estado
                setStats({
                    compras: response.data.totalCompras,
                    productos: response.data.totalProductos,
                    usuarios: response.data.totalUsuarios
                });
                
            } catch (error) {
                console.error("Error al cargar las estadísticas:", error);
            }
        };

        fetchStats();
    }, []); // El array vacío [] asegura que se ejecute solo 1 vez

    return (
        // Esto se renderizará dentro del <Outlet>
        <main className="main-dashboard">
            <h2>Dashboard</h2>
            <p>Resumen de las actividades diarias</p>

            {/* --- 3. Tarjetas de Métricas (Stats) --- */}
            {/* Estas SÍ cargarán datos de la BD */}
            <div className="stats-cards-container">
                <div className="stat-card compras">
                    <h3>Compras</h3>
                    <p className="stat-number">{stats.compras}</p>
                </div>
                <div className="stat-card productos">
                    <h3>Productos</h3>
                    <p className="stat-number">{stats.productos}</p>
                </div>
                <div className="stat-card usuarios">
                    <h3>Usuarios</h3>
                    <p className="stat-number">{stats.usuarios}</p>
                </div>
            </div>

            {/* --- 4. Tarjetas de Navegación (Links) --- */}
            {/* Estas son solo links visuales */}
            <div className="nav-cards-container">
                <Link to="/admin" className="nav-card">
                    <h4>Dashboard</h4>
                    <p>Visión general de todas las métricas.</p>
                </Link>
                <Link to="/admin/ordenes" className="nav-card">
                    <h4>Órdenes</h4>
                    <p>Gestión y seguimiento de las órdenes.</p>
                </Link>
                <Link to="/admin/inventario" className="nav-card">
                    <h4>Inventario</h4>
                    <p>Administrar inventario y detalles.</p>
                </Link>
                <Link to="/admin/categorias" className="nav-card">
                    <h4>Categorías</h4>
                    <p>Organizar productos en categorías.</p>
                </Link>
                <Link to="/admin/usuarios" className="nav-card">
                    <h4>Usuarios</h4>
                    <p>Gestión de cuentas de usuario y roles.</p>
                </Link>
                <Link to="/admin/reportes" className="nav-card">
                    <h4>Reportes</h4>
                    <p>Generación de informes detallados.</p>
                </Link>
                {/* ... etc ... */}
            </div>
        </main>
    );
}
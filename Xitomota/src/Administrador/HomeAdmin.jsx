import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function HomeAdmin() {
    
    const [stats, setStats] = useState({
        compras: 0,
        productos: 0,
        usuarios: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/admin/stats');
                
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
    }, []);
    return (
        <main className="main-dashboard">
            <h2>Dashboard</h2>
            <p>Resumen de las actividades diarias</p>

            {/* Tarjetas de Métricas (Stats) */}
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

            {/* Tarjetas de Navegación (Links) */}
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
            </div>
        </main>
    );
}
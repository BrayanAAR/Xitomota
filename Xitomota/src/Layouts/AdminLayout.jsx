import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import '../Admin.css'; // Asegúrate de que la ruta al CSS sea correcta

export default function AdminLayout() {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            localStorage.removeItem("usuarioLogueado");
            localStorage.removeItem("rolUsuario");
            alert("✅ Sesión cerrada exitosamente");
            navigate("/login");
        }
    };

    return (
        // Usamos CSS Grid o Flexbox para crear el layout de 2 columnas
        <div className="admin-layout"> 
            
            {/* --- Sidebar (El Layout) --- */}
            <aside className="sidebar">
                <div>
                    <div className="logo">Xitomota</div>
                    <ul className="menu">
                        {/* Los links ahora apuntan a las rutas anidadas */}
                        <li className="home"><Link to="/admin">Dashboard</Link></li>
                        <li><Link to="/admin/ordenes">Órdenes</Link></li>
                        <li><Link to="/admin/inventario">Productos</Link></li>
                        <li><Link to="/admin/categorias">Categorías</Link></li>
                        <li><Link to="/admin/usuarios">Usuarios</Link></li>
                        <li><Link to="/admin/reportes">Reportes</Link></li>
                        <li style={{ marginTop: '30px' }}><Link to="/admin/perfil">Perfil</Link></li>
                        <li><Link to="/">Ver Tienda</Link></li>
                        <li><a href="#!" onClick={cerrarSesion}>Cerrar Sesión</a></li>
                    </ul>
                </div>
                <div className="sidebar-footer">⚙ Settings</div>
            </aside>

            {/* --- Área de Contenido Principal --- */}
            <div className="admin-main-content">
                {/* (Aquí iría tu barra superior/topbar si la tuvieras) */}
                
                {/* ¡LO MÁS IMPORTANTE! 
                  Aquí es donde se renderizarán HomeAdmin, ListadoUsuarios, etc.
                */}
                <Outlet />
            </div>

        </div>
    );
}
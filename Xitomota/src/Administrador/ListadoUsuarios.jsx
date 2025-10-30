import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function ListadoUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleEliminar = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/usuarios/${id}`);
                fetchUsuarios();
                alert("Usuario eliminado.");
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    return (
        <main className="main">
            <div className="main-header">
                <h1>Gestión de Usuarios</h1>
                <div className="inventario-acciones-header">
                    <button onClick={() => navigate('/admin/usuarios/nuevo')} className="btn-header btn-nuevo">
                        Nuevo Usuario
                    </button>
                </div>
            </div>
            
            <div className="tabla-contenedor">
                <table id="tablaProductos">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nombre} {user.apellidos}</td>
                                <td>{user.email}</td>
                                <td>{user.rol}</td>
                                <td className="acciones-tabla">
                                    <Link to={`/admin/usuarios/editar/${user.id}`} className="btn-editar">
                                        Editar
                                    </Link>
                                    <Link to={`/admin/usuarios/historial/${user.email}`} className="btn-editar">
                                        Historial
                                    </Link>
                                    <button onClick={() => handleEliminar(user.id)} className="btn-eliminar">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
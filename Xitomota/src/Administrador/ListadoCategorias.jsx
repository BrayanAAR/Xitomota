import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function ListadoCategorias() {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    const handleEliminar = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar esta categoría?")) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/categorias/${id}`);
                fetchCategorias(); // Refresca
                alert("Categoría eliminada.");
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("Error al eliminar. Puede que haya productos asociados.");
            }
        }
    };

    return (
        <main className="main">
            <div className="main-header">
                <h1>Gestión de Categorías</h1>
                <div className="inventario-acciones-header">
                    <button onClick={() => navigate('/admin/categorias/nuevo')} className="btn-header btn-nuevo">
                        Nueva Categoría
                    </button>
                </div>
            </div>
            
            <div className="tabla-contenedor">
                <table id="tablaProductos"> {/* Reutiliza estilos */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map(cat => (
                            <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.nombre}</td>
                                <td className="acciones-tabla">
                                    <Link to={`/admin/categorias/editar/${cat.id}`} className="btn-editar">
                                        Editar
                                    </Link>
                                    <button onClick={() => handleEliminar(cat.id)} className="btn-eliminar">
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function FormularioCategoria() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [titulo, setTitulo] = useState('Nueva Categoría');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setTitulo('Editar Categoría');
            setIsLoading(true);
            axios.get(`http://localhost:8080/api/v1/categorias/${id}`)
                .then(response => {
                    setNombre(response.data.nombre || '');
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error al cargar categoría:", error);
                    setIsLoading(false);
                });
        } else {
            setTitulo('Nueva Categoría');
            setNombre('');
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoriaData = { nombre };
        try {
            if (id) {
                await axios.put(`http://localhost:8080/api/v1/categorias/${id}`, categoriaData);
                alert("Categoría actualizada");
            } else {
                await axios.post('http://localhost:8080/api/v1/categorias', categoriaData);
                alert("Categoría creada");
            }
            navigate('/admin/categorias');
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al guardar categoría (quizás el nombre ya existe).");
        }
    };

    if (isLoading) return <main className="main"><h1>Cargando...</h1></main>;

    return (
        <main className="main admin-form-container">
            <h1>{titulo}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre de la Categoría</label>
                    <input 
                        type="text" 
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-header btn-nuevo">Guardar Categoría</button>
                    <Link to="/admin/categorias" className="btn-cancelar">Cancelar</Link>
                </div>
            </form>
        </main>
    );
}
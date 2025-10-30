import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const usuarioVacio = { nombre: '', apellidos: '', email: '', password: '', rol: 'Cliente' };

export default function FormularioUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('Nuevo Usuario');
    const [usuario, setUsuario] = useState(usuarioVacio);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (id) {
            setTitulo('Editar Usuario');
            axios.get(`http://localhost:8080/api/v1/usuarios/${id}`)
                .then(response => {
                    const data = response.data;
                    setUsuario({
                        nombre: data.nombre || '',
                        apellidos: data.apellidos || '',
                        email: data.email || '',
                        rol: data.rol || 'Cliente',
                        password: ''
                    });
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error al cargar usuario:", error);
                    setIsLoading(false);
                });
        } else {
            setTitulo('Nuevo Usuario');
            setUsuario(usuarioVacio);
            setIsLoading(false);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:8080/api/v1/usuarios/${id}`, usuario);
                alert("Usuario actualizado");
            } else {
                await axios.post('http://localhost:8080/api/v1/usuarios', usuario);
                alert("Usuario creado");
            }
            navigate('/admin/usuarios');
        } catch (error) {
            console.error("Error al guardar usuario:", error);
            alert("Error al guardar.");
        }
    };

    if (isLoading) return <main className="main"><h1>Cargando...</h1></main>;

    return (
        <main className="main admin-form-container">
            <h1>{titulo}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group"><label>Nombre</label><input type="text" name="nombre" value={usuario.nombre} onChange={handleChange} required /></div>
                    <div className="form-group"><label>Apellidos</label><input type="text" name="apellidos" value={usuario.apellidos} onChange={handleChange} required /></div>
                </div>
                <div className="form-group"><label>Email</label><input type="email" name="email" value={usuario.email} onChange={handleChange} required /></div>
                <div className="form-group"><label>Contraseña</label><input type="password" name="password" value={usuario.password} onChange={handleChange} placeholder={id ? "(Dejar en blanco para no cambiar)" : "Requerida"} required={!id} /></div>
                <div className="form-group">
                    <label>Rol</label>
                    <select name="rol" value={usuario.rol} onChange={handleChange}>
                        <option value="Cliente">Cliente</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-header btn-nuevo">Guardar Usuario</button>
                    <Link to="/admin/usuarios" className="btn-cancelar">Cancelar</Link>
                </div>
            </form>
        </main>
    );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
    const navigate = useNavigate();
    const adminEmail = localStorage.getItem('usuarioLogueado'); // Obtenemos el email del admin logueado

    // Estados para los datos del perfil y las contraseñas
    const [perfil, setPerfil] = useState({ nombre: '', apellidos: '', email: '' });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Cargar datos del perfil al montar
    useEffect(() => {
        if (!adminEmail) {
            // Si no hay email en localStorage, algo raro pasó, redirigir al login
            navigate('/iniciar-sesion');
            return;
        }

        const fetchPerfil = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/usuarios/por-email/${adminEmail}`);
                setPerfil({
                    nombre: response.data.nombre || '',
                    apellidos: response.data.apellidos || '',
                    email: response.data.email || ''
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                setError("No se pudo cargar la información del perfil.");
                setIsLoading(false);
            }
        };
        fetchPerfil();
    }, [adminEmail, navigate]);

    // Manejar cambios en los inputs del perfil
    const handleProfileChange = (e) => {
        setPerfil({ ...perfil, [e.target.name]: e.target.value });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validación de nueva contraseña (si se intenta cambiar)
        if (newPassword && newPassword !== confirmPassword) {
            setError("Las nuevas contraseñas no coinciden.");
            return;
        }
        if (newPassword && !currentPassword) {
            setError("Debes ingresar tu contraseña actual para cambiarla.");
            return;
        }

        // Datos a enviar al backend
        const updateData = {
            nombre: perfil.nombre,
            apellidos: perfil.apellidos
        };

        // Incluir contraseñas solo si se proporcionaron
        if (currentPassword && newPassword) {
            updateData.currentPassword = currentPassword;
            updateData.newPassword = newPassword;
        }

        try {
            // Llamamos al endpoint PUT /perfil/{email}
            await axios.put(`http://localhost:8080/api/v1/perfil/${adminEmail}`, updateData);
            setSuccess("¡Perfil actualizado exitosamente!");
            // Limpiamos los campos de contraseña después de guardar
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            if (error.response && error.response.status === 400) {
                 setError("La contraseña actual es incorrecta.");
            } else {
                 setError("Hubo un error al actualizar el perfil.");
            }
        }
    };

    if (isLoading) {
        return <main className="main"><h1>Cargando perfil...</h1></main>;
    }

    return (
        <main className="main admin-form-container"> {/* Reutiliza estilos de formulario */}
            <h1>Mi Perfil</h1>
            
            <form onSubmit={handleSubmit}>
                {error && <p className="auth-error">{error}</p>}
                {success && <p style={{ color: 'green', marginBottom: '15px' }}>{success}</p>}

                {/* --- Datos Básicos --- */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" value={perfil.nombre} onChange={handleProfileChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" id="apellidos" name="apellidos" value={perfil.apellidos} onChange={handleProfileChange} required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={perfil.email} readOnly disabled /> 
                    {/* El email no se puede cambiar */}
                </div>

                <hr style={{ margin: '30px 0' }}/>

                {/* --- Cambio de Contraseña --- */}
                <h3>Cambiar Contraseña (Opcional)</h3>
                <div className="form-group">
                    <label htmlFor="currentPassword">Contraseña Actual</label>
                    <input 
                        type="password" 
                        id="currentPassword" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña actual" 
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="newPassword">Nueva Contraseña</label>
                        <input 
                            type="password" 
                            id="newPassword" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Mínimo 6 caracteres" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repite la nueva contraseña" 
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-header btn-nuevo">Guardar Cambios</button>
                </div>
            </form>
        </main>
    );
}
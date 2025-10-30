import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegistroUsuario() {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        if (password.length < 6) {
             setError('La contraseña debe tener al menos 6 caracteres.');
             return;
        }

        const nuevoUsuario = {
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            password: password,
            rol: 'Cliente'
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/usuarios', nuevoUsuario);
            
            alert(`✅ ¡Usuario ${response.data.nombre} registrado exitosamente! Ahora puedes iniciar sesión.`);
            
            setNombre('');
            setApellidos('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            
            navigate('/login');

        } catch (err) {
            console.error("Error al registrar el usuario:", err);
            if (err.response && err.response.data && err.response.data.message) {
                 setError(err.response.data.message);
            } else {
                 setError('Hubo un error al registrar el usuario. Inténtalo de nuevo.');
            }
        }
    };

    return (
        <div className="auth-container"> 
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                {error && <p className="auth-error">{error}</p>} 
                
                {/* Campos del formulario vinculados al estado */}
                <div className="auth-input-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        type="text" 
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required 
                    />
                </div>
                <div className="auth-input-group">
                    <label htmlFor="apellidos">Apellidos:</label>
                    <input 
                        type="text" 
                        id="apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required 
                    />
                </div>
                <div className="auth-input-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <div className="auth-input-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <div className="auth-input-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                </div>
                
                <button type="submit" className="auth-button">Registrar</button>
            </form>
        </div>
    );
}
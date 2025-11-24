import React, { useState } from 'react';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';

export default function IniciarSesion() { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleLogin = async (e) => { 
        e.preventDefault();
        setError(''); 

        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', loginData);
            
            const userData = response.data; 
            localStorage.setItem('token', userData.token);
            localStorage.setItem('usuarioLogueado', userData.email);
            localStorage.setItem('rolUsuario', userData.rol);
            
            alert(`✅ ¡Bienvenido ${userData.email}!`);
            
            if (userData.rol === 'Administrador') {
                navigate('/admin'); 
            } else {
                navigate('/');
            }

        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            if (err.response && err.response.status === 401) {
                setError("Credenciales inválidas. Verifica tu email y contraseña.");
            } else {
                setError("Hubo un error al intentar iniciar sesión. Inténtalo de nuevo.");
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="auth-form">
                {error && <p className="auth-error">{error}</p>} 
                
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
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Entrar</button>
            </form>

            <div className="auth-link">
                ¿No tienes cuenta?{' '}
                <Link to="/registro">
                    Regístrate aquí
                </Link>
            </div>
        </div>
    );
}
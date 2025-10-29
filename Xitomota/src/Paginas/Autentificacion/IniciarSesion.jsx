import React, { useState } from 'react';
import axios from 'axios'; // <-- Asegúrate de importar axios
import { Link, useNavigate } from 'react-router-dom';
// import '../css/Login.css'; // (Tu CSS de login)

export default function IniciarSesion() { // Cambiado 'Login' a 'IniciarSesion' si así se llama tu archivo
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Cambiado 'pass' a 'password'
    const [error, setError] = useState(''); // Estado para mensajes de error
    const navigate = useNavigate();

    const handleLogin = async (e) => { // La función ahora es async
        e.preventDefault();
        setError(''); // Limpia errores previos

        // 1. Creamos el objeto para enviar al backend
        const loginData = {
            email: email,
            password: password
        };

        try {
            // 2. Llamamos al nuevo endpoint del backend
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', loginData);
            
            // 3. ¡Éxito! El backend devolvió los datos del usuario
            const userData = response.data; // { email: '...', rol: '...' }

            // 4. Guardamos en localStorage
            localStorage.setItem('usuarioLogueado', userData.email);
            localStorage.setItem('rolUsuario', userData.rol);
            
            alert(`✅ ¡Bienvenido ${userData.email}!`);
            
            // 5. Redirigimos según el rol
            if (userData.rol === 'Administrador') {
                navigate('/admin'); // Al dashboard de admin
            } else {
                navigate('/'); // Al inicio de la tienda para Clientes
            }

        } catch (err) {
            // 6. Manejo de Errores (ej: 401 Unauthorized)
            console.error("Error al iniciar sesión:", err);
            if (err.response && err.response.status === 401) {
                setError("Credenciales inválidas. Verifica tu email y contraseña.");
            } else {
                setError("Hubo un error al intentar iniciar sesión. Inténtalo de nuevo.");
            }
        }
    };

    // 7. El formulario JSX (cambiado 'pass' por 'password')
    return (
        <div className="auth-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="auth-form">
                {error && <p className="auth-error">{error}</p>} {/* Muestra errores */}
                
                <div className="auth-input-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required // Agregamos required
                    />
                </div>
                <div className="auth-input-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" // Cambiado id a 'password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required // Agregamos required
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
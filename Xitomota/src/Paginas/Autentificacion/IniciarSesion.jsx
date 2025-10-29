import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// (Puedes importar tu CSS de login aquí si tienes uno)
// import '../css/Login.css'; 

export default function Login() {
    // 1. Estados para guardar lo que el usuario escribe
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    // 2. Función que se ejecuta al apretar el botón
    const handleLogin = (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // 3. Verificamos las credenciales predeterminadas
        if (email === 'admin@admin.cl' && pass === 'admin') {
            
            // 4. ¡Éxito! Guardamos los datos en localStorage
            // (Tu HomeAdmin.jsx busca estos datos)
            localStorage.setItem('usuarioLogueado', email);
            localStorage.setItem('rolUsuario', 'Administrador');
            
            alert('✅ ¡Bienvenido Admin!');
            
            // 5. Redirigimos al panel de admin
            navigate('/admin'); // (Ajusta esta ruta si es diferente)

        } else {
            // Error
            alert('❌ Credenciales incorrectas');
        }
    };

    // 6. El formulario (JSX)
    return (
        <div className="login-container" style={styles.container}>
            <h2>Iniciar Sesión (Prueba)</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="pass">Password:</label>
                    <input 
                        type="password" 
                        id="pass"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Entrar</button>
            </form>
        </div>
    );
}

// --- Estilos básicos (puedes moverlos a tu CSS) ---
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
    input: {
        padding: '8px',
        width: '250px'
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};
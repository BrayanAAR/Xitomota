import axios from 'axios';

// Configuración base
axios.defaults.baseURL = 'http://localhost:8080/api/v1';

// Interceptor de Solicitud (Request)
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Si hay token, agrégalo al header
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de Respuesta (Response) - Para manejar expiración
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Si el token expiró o es inválido
            localStorage.clear(); // Borra todo
            alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            window.location.href = '/iniciar-sesion'; // Redirige a login
        }
        return Promise.reject(error);
    }
);

export default axios;
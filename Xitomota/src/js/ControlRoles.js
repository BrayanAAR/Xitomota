// Sistema común de verificación de roles para todas las páginas
function verificarAcceso(rolesPermitidos = []) {
    const rolUsuario = localStorage.getItem("rolUsuario");
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    // Verificar si hay usuario logueado
    if (!usuarioLogueado) {
        alert("❌ Debes iniciar sesión para acceder.");
        window.location.href = "../Tienda/IniciarSesion.html";
        return false;
    }

    // Verificar si el rol está permitido
    if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(rolUsuario)) {
        alert(`❌ Acceso denegado. Solo ${rolesPermitidos.join(' y ')} pueden acceder a esta página.`);
        // Redirigir según el rol actual
        switch(rolUsuario) {
            case "Administrador":
                window.location.href = "../Administrador/HomeAdmin.html";
                break;
            case "Vendedor":
                window.location.href = "../Administrador/VendedorDashboard.html";
                break;
            case "Cliente":
                window.location.href = "../Tienda/Home.html";
                break;
            default:
                window.location.href = "../Tienda/IniciarSesion.html";
        }
        return false;
    }

    return true;
}

function cerrarSesion() {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
        localStorage.removeItem("usuarioLogueado");
        localStorage.removeItem("rolUsuario");
        alert("✅ Sesión cerrada exitosamente");
        window.location.href = "../Tienda/IniciarSesion.html";
    }
}

function configurarMenuSegunRol() {
    const rolUsuario = localStorage.getItem("rolUsuario");
    const menuItems = document.querySelectorAll('.menu li');
    
    if (rolUsuario === "Vendedor") {
        // Ocultar opciones de administrador para vendedores
        menuItems.forEach(item => {
            const enlace = item.querySelector('a');
            if (enlace) {
                const href = enlace.getAttribute('href');
                const texto = enlace.textContent.toLowerCase();
                
                // Ocultar enlaces de administración para vendedores
                if (texto.includes('usuario') && !texto.includes('listado') ||
                    texto.includes('nuevo') ||
                    href.includes('NuevoUsuario') ||
                    href.includes('NuevoProducto')) {
                    item.style.display = 'none';
                }
            }
        });
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    configurarMenuSegunRol();
});
// Cargar al iniciar
document.addEventListener('DOMContentLoaded', function() {
  // Verificar acceso - solo administradores pueden gestionar usuarios
  const rolUsuario = localStorage.getItem("rolUsuario");
  const usuarioLogueado = localStorage.getItem("usuarioLogueado");

  if (!usuarioLogueado) {
    alert("❌ Debes iniciar sesión para acceder.");
    window.location.href = "../Tienda/IniciarSesion.html";
    return;
  }

  if (rolUsuario !== "Administrador") {
    alert("❌ Acceso denegado. Solo administradores pueden gestionar usuarios.");
    // Redirigir según el rol
    if (rolUsuario === "Vendedor") {
      window.location.href = "VendedorDashboard.html";
    } else {
      window.location.href = "../Tienda/Home.html";
    }
    return;
  }

  // Si llegamos aquí, el usuario está autorizado
  cargarUsuarios();
});

function cargarUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let tbody = document.querySelector("#tablaUsuarios tbody");
  tbody.innerHTML = "";

  usuarios.forEach((usuario, index) => {
    let fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${usuario.run}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td>${usuario.region}</td>
      <td>${usuario.rol || 'Usuario'}</td>
      <td>
        <button onclick="editarUsuario(${index})" class="btn-editar">Editar</button>
        <button onclick="eliminarUsuario(${index})" class="btn-eliminar">Eliminar</button>
      </td>
    `;

    tbody.appendChild(fila);
  });
}



function editarUsuario(index) {
  // Verificar que el usuario existe
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios[index]) {
    // Redirigir a la página de nuevo usuario con el parámetro de edición
    window.location.href = `NuevoUsuario.html?edit=${index}`;
  } else {
    alert("Usuario no encontrado");
  }
}

function eliminarUsuario(index) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios[index]) {
    // Mostrar información del usuario a eliminar
    const usuario = usuarios[index];
    const mensaje = `¿Estás seguro de que deseas eliminar al siguiente usuario?\n\nNombre: ${usuario.nombre}\nRUN: ${usuario.run}\nEmail: ${usuario.email}`;
    
    if (confirm(mensaje)) {
      // Eliminar el usuario en la posición index
      usuarios.splice(index, 1);
      
      // Guardar la lista actualizada en localStorage
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      
      // Recargar la tabla para mostrar los cambios
      cargarUsuarios();
      
      alert("✅ Usuario eliminado correctamente");
    }
  } else {
    alert("❌ Usuario no encontrado");
  }
}

function cerrarSesion() {
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("rolUsuario");
    alert("✅ Sesión cerrada exitosamente");
    window.location.href = "../Tienda/IniciarSesion.html";
  }
}

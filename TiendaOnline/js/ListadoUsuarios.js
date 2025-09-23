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
      </td>
    `;

    tbody.appendChild(fila);
  });
}



function editarUsuario(index) {
  // Botón sin funcionalidad - solo está presente visualmente
  // No hace nada cuando se hace clic
}

// Cargar al iniciar
document.addEventListener("DOMContentLoaded", cargarUsuarios);

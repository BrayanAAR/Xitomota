function cargarProductos() {
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  let tbody = document.querySelector("#tablaProductos tbody");
  tbody.innerHTML = "";

  if (productos.length === 0) {
    tbody.innerHTML = "<tr><td colspan='6'>No hay productos registrados.</td></tr>";
    return;
  }

  productos.forEach((producto, index) => {
    let fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${producto.codigo || 'N/A'}</td>
      <td>${producto.nombre || 'N/A'}</td>
      <td>$${producto.precio ? parseFloat(producto.precio).toLocaleString() : '0'}</td>
      <td>${producto.stock || '0'}</td>
      <td>${producto.categoria || 'Sin categoría'}</td>
      <td>
        <button onclick="editarProducto(${index})" class="btn-editar">Editar</button>
        <button onclick="eliminarProducto(${index})" class="btn-eliminar">Eliminar</button>
      </td>
    `;

    tbody.appendChild(fila);
  });
}

function editarProducto(index) {
  // Verificar que el producto existe
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  if (productos[index]) {
    // Redirigir a la página de nuevo producto con el parámetro de edición
    window.location.href = `NuevoProducto.html?edit=${index}`;
  } else {
    alert("Producto no encontrado");
  }
}

function eliminarProducto(index) {
  let productos = JSON.parse(localStorage.getItem("productos")) || [];

  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    productos.splice(index, 1); // elimina el producto en la posición index
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos(); // refresca la tabla
    alert("Producto eliminado correctamente");
  }
}

// Cargar al iniciar
document.addEventListener("DOMContentLoaded", cargarProductos);
// Producto actual (puedes cargarlo dinámicamente si quieres)
const productoActual = {
  id: 1,
  nombre: "Poleron",
  precio: 30000,
  imagen: "../img/Producto1.jpg",
  descripcion: "Experimenta la máxima comodidad con nuestro polerón de 100% algodón con cierre completo..."
};

// Inicializar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para actualizar contador en header
function actualizarCarrito() {
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = total;
}

// Agregar producto desde detalle
document.getElementById("agregar-carrito").addEventListener("click", () => {
  const cantidad = parseInt(document.getElementById("cantidad").value) || 1;
  const existe = carrito.find(item => item.id === productoActual.id);

  if (existe) {
    existe.cantidad += cantidad;
  } else {
    carrito.push({ ...productoActual, cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
  alert(`${productoActual.nombre} añadido al carrito (${cantidad})`);
});

// Inicializar contador al cargar la página
actualizarCarrito();

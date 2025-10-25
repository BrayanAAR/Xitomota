// Arreglo de productos
const productos = [
  { id: 1, nombre: "Poleron", precio: 30000, imagen: "../img/Producto1.jpg", descripcion: "Poleron de Primavera, muy abrigador." },
  { id: 2, nombre: "Buzo Deportivo", precio: 20000, imagen: "../img/Producto2.jpg", descripcion: "Ideal para entrenar y salir a correr." },
  { id: 3, nombre: "Chaqueta de salir", precio: 15000, imagen: "../img/Producto3.jpg", descripcion: "Ideal para reuniones formales." },
  { id: 4, nombre: "Conjunto deportivo", precio: 17000, imagen: "../img/Producto4.jpg", descripcion: "Ideal para entrenar y salir a correr." },
  { id: 5, nombre: "Chaqueta Aviadora", precio: 25000, imagen: "../img/Producto5.jpg", descripcion: "Chaqueta clásica con estilo retro." },
  { id: 6, nombre: "Chaqueta jeans", precio: 18000, imagen: "../img/Producto6.jpg", descripcion: "Chaqueta clásica con estilo Urbano, rapero de los 80's new york." }
];

// Carrito (cargar desde localStorage si existe)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Selecciono el contenedor de productos
const contenedor = document.querySelector(".container_5a");

// Mostrar productos dinámicamente
function mostrarProductos() {
  contenedor.innerHTML = "";
  productos.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("producto-card");
    card.innerHTML = `
      <img class="foto_promocional" src="${p.imagen}" alt="${p.nombre}">
      <h4>${p.nombre}</h4>
      <p>$${p.precio.toLocaleString()}</p>
      <p>${p.descripcion}</p>
      <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

// Añadir producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existe = carrito.find(item => item.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  // Guardar en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito(); // actualizar contador
  alert(`${producto.nombre} añadido al carrito`);
}

// Actualizar contador en el carrito del header
function actualizarCarrito() {
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = total;
}

// Inicializar al cargar la página
mostrarProductos();
actualizarCarrito();

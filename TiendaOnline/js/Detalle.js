// Obtener id del producto de la URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// Buscar producto
const productos = JSON.parse(localStorage.getItem("productos")) || [
  { id: 1, nombre: "Chaqueta", precio: 1800, img: "../img/Producto3.jpg" },
  { id: 2, nombre: "Celular", precio: 400, img: "img/celular.jpg" },
  { id: 3, nombre: "Audífonos", precio: 50, img: "img/audifonos.jpg" }
];

const producto = productos.find(p => p.id === id);
const detalle = document.getElementById("detalleProducto");

if (producto) {
  detalle.innerHTML = `
    <img src="${producto.img}" alt="${producto.nombre}">
    <h2>${producto.nombre}</h2>
    <p>Precio: $${producto.precio}</p>
    <button onclick="añadirCarrito(${producto.id})">Añadir al carrito</button>
  `;
}

function añadirCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} añadido al carrito ✅`);
}

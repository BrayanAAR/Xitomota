document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valido = true;

      const codigo = document.getElementById("codigo");
      const nombre = document.getElementById("nombre");
      const precio = document.getElementById("precio");
      const stock = document.getElementById("stock");
      const categoria = document.getElementById("categoria");
      const descripcion = document.getElementById("descripcion");

      // Validación código
      if (codigo && (codigo.value.trim() === "" || codigo.value.length > 20)) {
        codigo.style.borderColor = "red";
        valido = false;
      } else if (codigo) {
        codigo.style.borderColor = "";
      }

      // Validación nombre
      if (nombre && (nombre.value.trim() === "" || nombre.value.length > 100)) {
        nombre.style.borderColor = "red";
        valido = false;
      } else if (nombre) {
        nombre.style.borderColor = "";
      }

      // Validación precio
      if (precio && (precio.value.trim() === "" || isNaN(precio.value) || parseFloat(precio.value) <= 0)) {
        precio.style.borderColor = "red";
        valido = false;
      } else if (precio) {
        precio.style.borderColor = "";
      }

      // Validación stock
      if (stock && (stock.value.trim() === "" || isNaN(stock.value) || parseInt(stock.value) < 0)) {
        stock.style.borderColor = "red";
        valido = false;
      } else if (stock) {
        stock.style.borderColor = "";
      }

      // Validación categoría
      if (categoria && categoria.value.trim() === "") {
        categoria.style.borderColor = "red";
        valido = false;
      } else if (categoria) {
        categoria.style.borderColor = "";
      }

      if (valido) {
        // Recuperar productos existentes o crear lista vacía
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        
        // Crear objeto producto nuevo
        const nuevoProducto = {
          codigo: codigo ? codigo.value : '',
          nombre: nombre ? nombre.value : '',
          precio: precio ? parseFloat(precio.value) : 0,
          stock: stock ? parseInt(stock.value) : 0,
          categoria: categoria ? categoria.value : '',
          descripcion: descripcion ? descripcion.value : '',
          fechaCreacion: new Date().toLocaleDateString()
        };

        // Agregar nuevo producto a la lista
        productos.push(nuevoProducto);
        localStorage.setItem("productos", JSON.stringify(productos));

        alert("✅ Producto registrado correctamente");
        form.reset();
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");
  
  // Verificar si estamos editando un producto
  const urlParams = new URLSearchParams(window.location.search);
  const editIndex = urlParams.get('edit');
  let productoEditando = null;
  
  if (editIndex !== null) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    productoEditando = productos[parseInt(editIndex)];
    
    if (productoEditando) {
      document.getElementById('titulo-form').textContent = 'Editar Producto';
      cargarDatosProducto(productoEditando);
    }
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valido = true;

      const codigo = document.getElementById("codigo");
      const nombre = document.getElementById("nombre");
      const descripcion = document.getElementById("descripcion");
      const precio = document.getElementById("precio");
      const stock = document.getElementById("stock");
      const stockCritico = document.getElementById("stockCritico");
      const categoria = document.getElementById("categoria");
      const imagen = document.getElementById("imagen");

      // Validación código del producto
      if (!codigo.value.trim() || codigo.value.length < 3) {
        codigo.style.borderColor = "red";
        valido = false;
        mostrarError("El código del producto es requerido y debe tener mínimo 3 caracteres");
      } else {
        codigo.style.borderColor = "";
      }

      // Validación nombre
      if (!nombre.value.trim() || nombre.value.length > 100) {
        nombre.style.borderColor = "red";
        valido = false;
        mostrarError("El nombre es requerido y no debe exceder 100 caracteres");
      } else {
        nombre.style.borderColor = "";
      }

      // Validación descripción (opcional)
      if (descripcion.value.length > 500) {
        descripcion.style.borderColor = "red";
        valido = false;
        mostrarError("La descripción no debe exceder 500 caracteres");
      } else {
        descripcion.style.borderColor = "";
      }

      // Validación precio
      if (!precio.value.trim() || isNaN(precio.value) || parseFloat(precio.value) < 0) {
        precio.style.borderColor = "red";
        valido = false;
        mostrarError("El precio es requerido y debe ser mayor o igual a 0");
      } else {
        precio.style.borderColor = "";
      }

      // Validación stock
      if (!stock.value.trim() || isNaN(stock.value) || parseInt(stock.value) < 0 || !Number.isInteger(parseFloat(stock.value))) {
        stock.style.borderColor = "red";
        valido = false;
        mostrarError("El stock es requerido, debe ser un número entero mayor o igual a 0");
      } else {
        stock.style.borderColor = "";
      }

      // Validación stock crítico (opcional)
      if (stockCritico.value.trim() !== "" && (isNaN(stockCritico.value) || parseInt(stockCritico.value) < 0 || !Number.isInteger(parseFloat(stockCritico.value)))) {
        stockCritico.style.borderColor = "red";
        valido = false;
        mostrarError("El stock crítico debe ser un número entero mayor o igual a 0");
      } else {
        stockCritico.style.borderColor = "";
      }

      // Validación categoría
      if (!categoria.value.trim()) {
        categoria.style.borderColor = "red";
        valido = false;
        mostrarError("La categoría es requerida");
      } else {
        categoria.style.borderColor = "";
      }

      if (valido) {
        // Recuperar productos existentes o crear lista vacía
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        
        // Crear objeto producto
        const datosProducto = {
          codigo: codigo.value.trim(),
          nombre: nombre.value.trim(),
          descripcion: descripcion.value.trim(),
          precio: parseFloat(precio.value),
          stock: parseInt(stock.value),
          stockCritico: stockCritico.value.trim() ? parseInt(stockCritico.value) : null,
          categoria: categoria.value,
          imagen: imagen.files[0] ? imagen.files[0].name : null,
          fechaCreacion: productoEditando ? productoEditando.fechaCreacion : new Date().toLocaleDateString(),
          fechaModificacion: new Date().toLocaleDateString()
        };

        // Verificar stock crítico
        if (datosProducto.stockCritico !== null && datosProducto.stock <= datosProducto.stockCritico) {
          alert("⚠️ ALERTA: El stock actual está en nivel crítico o por debajo del stock crítico establecido!");
        }

        if (editIndex !== null && productoEditando) {
          // Editar producto existente
          productos[parseInt(editIndex)] = datosProducto;
          localStorage.setItem("productos", JSON.stringify(productos));
          
          alert("✅ Producto actualizado correctamente");
          window.location.href = "Inventario.html";
        } else {
          // Crear nuevo producto
          productos.push(datosProducto);
          localStorage.setItem("productos", JSON.stringify(productos));
          
          alert("✅ Producto registrado correctamente");
          form.reset();
        }
      }
    });

  }

  // Función para mostrar errores
  function mostrarError(mensaje) {
    // Solo mostrar el primer error encontrado
    if (document.querySelectorAll('input[style*="red"], select[style*="red"], textarea[style*="red"]').length === 1) {
      alert("❌ " + mensaje);
    }
  }

  // Función para cargar datos del producto en el formulario (para edición)
  function cargarDatosProducto(producto) {
    document.getElementById("codigo").value = producto.codigo || '';
    document.getElementById("nombre").value = producto.nombre || '';
    document.getElementById("descripcion").value = producto.descripcion || '';
    document.getElementById("precio").value = producto.precio || '';
    document.getElementById("stock").value = producto.stock || '';
    document.getElementById("stockCritico").value = producto.stockCritico || '';
    document.getElementById("categoria").value = producto.categoria || '';
  }
});

function cerrarSesion() {
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("rolUsuario");
    alert("✅ Sesión cerrada exitosamente");
    window.location.href = "../Tienda/IniciarSesion.html";
  }
}
// Verificación de acceso y carga inicial
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que vendedores y administradores puedan acceder
    const rolUsuario = localStorage.getItem("rolUsuario");
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (!usuarioLogueado) {
        alert("❌ Debes iniciar sesión para acceder.");
        window.location.href = "../Tienda/IniciarSesion.html";
        return;
    }

    if (rolUsuario !== "Vendedor" && rolUsuario !== "Administrador") {
        alert("❌ Acceso denegado. Solo vendedores y administradores pueden acceder.");
        window.location.href = "../Tienda/Home.html";
        return;
    }

    // Cargar productos
    cargarProductos();
});

function cargarProductos() {
    try {
        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        const tbody = document.getElementById("cuerpoTablaProductos");
        
        if (!tbody) {
            console.error("No se encontró la tabla de productos");
            return;
        }

        tbody.innerHTML = "";

        if (productos.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 20px; color: #666;">
                        📦 No hay productos registrados
                    </td>
                </tr>
            `;
            return;
        }

        productos.forEach((producto, index) => {
            const fila = document.createElement("tr");
            
            // Determinar estado del stock
            const stock = parseInt(producto.stock) || 0;
            let estadoStock = "";
            let claseStock = "";
            
            if (stock === 0) {
                estadoStock = "Agotado";
                claseStock = "stock-agotado";
            } else if (stock <= 5) {
                estadoStock = "Stock Crítico";
                claseStock = "stock-critico";
            } else {
                estadoStock = "En Stock";
                claseStock = "stock-normal";
            }

            fila.innerHTML = `
                <td>${producto.nombre || 'Sin nombre'}</td>
                <td>${producto.categoria || 'Sin categoría'}</td>
                <td>$${parseInt(producto.precio || 0).toLocaleString()}</td>
                <td class="${claseStock}">${stock}</td>
                <td class="${claseStock}">${estadoStock}</td>
                <td>
                    <button class="btn-ver" onclick="verDetalles(${index})">Ver Detalles</button>
                </td>
            `;

            tbody.appendChild(fila);
        });

        console.log(`✅ Se cargaron ${productos.length} productos`);

    } catch (error) {
        console.error("❌ Error al cargar productos:", error);
        const tbody = document.getElementById("cuerpoTablaProductos");
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 20px; color: #dc3545;">
                        ❌ Error al cargar productos
                    </td>
                </tr>
            `;
        }
    }
}

function verDetalles(index) {
    try {
        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        const producto = productos[index];

        if (!producto) {
            alert("❌ Producto no encontrado");
            return;
        }

        const modal = document.getElementById("modalDetalle");
        const detalleDiv = document.getElementById("detalleProducto");

        if (!modal || !detalleDiv) {
            alert("❌ Error en la interfaz del modal");
            return;
        }

        // Determinar estado del stock
        const stock = parseInt(producto.stock) || 0;
        let estadoStock = "";
        let claseStock = "";
        
        if (stock === 0) {
            estadoStock = "Agotado";
            claseStock = "stock-agotado";
        } else if (stock <= 5) {
            estadoStock = "Stock Crítico";
            claseStock = "stock-critico";
        } else {
            estadoStock = "En Stock";
            claseStock = "stock-normal";
        }

        detalleDiv.innerHTML = `
            <div style="display: grid; gap: 15px;">
                <div><strong>Nombre:</strong> ${producto.nombre || 'Sin nombre'}</div>
                <div><strong>Categoría:</strong> ${producto.categoria || 'Sin categoría'}</div>
                <div><strong>Precio:</strong> $${parseInt(producto.precio || 0).toLocaleString()}</div>
                <div><strong>Stock:</strong> <span class="${claseStock}">${stock} unidades</span></div>
                <div><strong>Estado:</strong> <span class="${claseStock}">${estadoStock}</span></div>
                <div><strong>Descripción:</strong> ${producto.descripcion || 'Sin descripción'}</div>
                ${producto.imagen ? `<div><strong>Imagen:</strong> ${producto.imagen}</div>` : ''}
                <div><strong>Fecha de registro:</strong> ${producto.fechaRegistro || 'No disponible'}</div>
            </div>
        `;

        modal.style.display = "block";

    } catch (error) {
        console.error("❌ Error al mostrar detalles:", error);
        alert("❌ Error al cargar los detalles del producto");
    }
}

function cerrarModal() {
    const modal = document.getElementById("modalDetalle");
    if (modal) {
        modal.style.display = "none";
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

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById("modalDetalle");
    if (event.target === modal) {
        cerrarModal();
    }
}

// Actualizar productos cada 30 segundos
setInterval(cargarProductos, 30000);
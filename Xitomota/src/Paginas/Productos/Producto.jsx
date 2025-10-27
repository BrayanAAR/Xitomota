import React from 'react';
import fPoleras from '../../img/poleras.jpg';
import fPantalones from '../../img/pantalones.jpg';
import fChaquetas from '../../img/chaquetas.jpg';
import fCamisas from '../../img/camisas.jpg';
import fBuzos from '../../img/buzos.jpg';
import fPolerones from '../../img/polerones.jpg';
    
    // --- ESTO ES SOLO UN EJEMPLO DE DATOS ---
    // En un caso real, esto vendría de una API o un archivo JSON
const listaDeProductos = [
// Buzos
  { id: 1, nombre: 'Buzo Básico Algodón', categoria: 'Buzos', precio: 12990, imagen: fBuzos },
  { id: 2, nombre: 'Buzo Estampado Gráfico', categoria: 'Buzos', precio: 15990, imagen: fBuzos },
  { id: 3, nombre: 'Buzo Manga Larga', categoria: 'Buzos', precio: 17990, imagen: fBuzos },
  { id: 4, nombre: 'Buzo Deportivo Transpirable', categoria: 'Buzos', precio: 19990, imagen: fBuzos },

  // Polerones
  { id: 5, nombre: 'Poleron Básica Algodón', categoria: 'Polerones', precio: 12990, imagen: fPolerones },
  { id: 6, nombre: 'Poleron Estampado Gráfico', categoria: 'Polerones', precio: 15990, imagen: fPolerones },
  { id: 7, nombre: 'Poleron Manga Larga', categoria: 'Polerones', precio: 17990, imagen: fPolerones },
  { id: 8, nombre: 'Poleron Deportivo Transpirable', categoria: 'Polerones', precio: 19990, imagen: fPolerones },

  // Poleras
  { id: 9, nombre: 'Polera Básica Algodón', categoria: 'Poleras', precio: 12990, imagen: fPoleras },
  { id: 10, nombre: 'Polera Estampado Gráfico', categoria: 'Poleras', precio: 15990, imagen: fPoleras },
  { id: 11, nombre: 'Polera Manga Larga', categoria: 'Poleras', precio: 17990, imagen: fPoleras },
  { id: 12, nombre: 'Polera Deportiva Transpirable', categoria: 'Poleras', precio: 19990, imagen: fPoleras },

  // Pantalones
  { id: 13, nombre: 'Pantalón Básico Algodón', categoria: 'Pantalones', precio: 12990, imagen: fPantalones },
  { id: 14, nombre: 'Pantalón Estampado Gráfico', categoria: 'Pantalones', precio: 15990, imagen: fPantalones },
  { id: 15, nombre: 'Pantalón Manga Larga', categoria: 'Pantalones', precio: 17990, imagen: fPantalones },
  { id: 16, nombre: 'Pantalón Deportivo Transpirable', categoria: 'Pantalones', precio: 19990, imagen: fPantalones },

  // Chaquetas
  { id: 17, nombre: 'Chaqueta Básica Algodón', categoria: 'Chaquetas', precio: 12990, imagen: fChaquetas },
  { id: 18, nombre: 'Chaqueta Estampado Gráfico', categoria: 'Chaquetas', precio: 15990, imagen: fChaquetas },
  { id: 19, nombre: 'Chaqueta Manga Larga', categoria: 'Chaquetas', precio: 17990, imagen: fChaquetas },
  { id: 20, nombre: 'Chaqueta Deportiva Transpirable', categoria: 'Chaquetas', precio: 19990, imagen: fChaquetas },

  // Camisas
  { id: 21, nombre: 'Camisa Básica Algodón', categoria: 'Camisas', precio: 12990, imagen: fCamisas },
  { id: 22, nombre: 'Camisa Estampado Gráfico', categoria: 'Camisas', precio: 15990, imagen: fCamisas },
  { id: 23, nombre: 'Camisa Manga Larga', categoria: 'Camisas', precio: 17990, imagen: fCamisas },
  { id: 24, nombre: 'Camisa Deportiva Transpirable', categoria: 'Camisas', precio: 19990, imagen: fCamisas },
];
    // -----------------------------------------
    
    
    // Un componente simple para mostrar un producto
const TarjetaProducto = ({ producto }) => (
  <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
    <h4>{producto.nombre}</h4>
    <p>Categoría: {producto.categoria}</p>
  </div>
);
    
    
    // Función para formatear el precio
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio);
};

export default function Productos() {
  return (
    // 'productos-pagina' tendrá el fondo degradado
    <main className="productos-pagina">
      
      {/* Contenedor para centrar el contenido */}
      <div className="productos-container">
        
        <h1 className="productos-titulo">Todos los Productos</h1>
        
        {/* --- LA GRILLA DE PRODUCTOS --- */}
        <div className="productos-grid">
          
          {/* Iteramos sobre la lista de productos */}
          {listaDeProductos.map((producto) => (
            
            // Esta es la "Tarjeta" individual
            <div key={producto.id} className="producto-card">
              
              {/* 1. La Imagen (con un placeholder) */}
              <div className="producto-imagen">
                {producto.imagen ? (
                  <img src={producto.imagen} alt={producto.nombre} />
                ) : (
                  <div className="img-placeholder"><span>Imagen</span></div>
                )}
              </div>

              {/* 2. La Información del producto */}
              <div className="producto-info">
                <h3 className="producto-nombre">{producto.nombre}</h3>
                <p className="producto-categoria">{producto.categoria}</p>
                <p className="producto-precio">{formatearPrecio(producto.precio)}</p>
                
                {/* 3. El Botón */}
                <button className="btn-anadir-carrito">
                  Añadir al carrito
                </button>
              </div>

            </div>
          ))} {/* Fin del .map() */}

        </div> {/* Fin de .productos-grid */}
      </div> {/* Fin de .productos-container */}
    </main>
  );
}


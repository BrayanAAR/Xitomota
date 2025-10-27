/* import React from "react"
import './Producto.css';
import foto_prom2 from '../../img/Producto2.jpg';
import foto_prom5 from '../../img/Producto5.jpg';
import { Link } from "react-router-dom";

export default function Producto() {
    return (
        <>
            <main className="producto-main">
                <div className="container_5">
                    <div className="container_5a">
                        <div className="container_5a1">
                            <Link to="/productos/1">
                                <img className="foto_promocional" src={foto_prom2} alt="" />
                            </Link>
                            <h4>Chaqueta</h4>
                            <p className="container_5">$30.000</p>
                        </div>
                        <div className="container_5a2"> 
                            <Link to="../Tienda/Producto2.html">
                                <img className="foto_prom2" src={foto_prom2} alt="foto" />
                            </Link>
                            <h4>Conjunto Deportivo</h4>
                            <p className="container_5">$200.00</p>
                        </div>
                        <div className="container_5a3">
                            <Link to="../Tienda/Producto5.html">
                                <img className="foto_promocional" src={foto_prom5} alt="" />
                            </Link>
                            <h4>Gorra Vintage</h4>
                            <p className="container_5">$15.000</p>
                        </div>
                    </div>
                </div>     
            </main>
                <script src="../js/productos.js"></script>
        </>
    );
} */

    // En un archivo nuevo: /pages/PaginaProductos.jsx
    
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
    
    // --- ESTO ES SOLO UN EJEMPLO DE DATOS ---
    // En un caso real, esto vendría de una API o un archivo JSON
    const todosLosProductos = [
      { id: 1, nombre: 'Polera Básica Negra', categoria: 'Poleras' },
      { id: 2, nombre: 'Polera Estampada', categoria: 'Poleras' },
      { id: 3, nombre: 'Camisa de Lino', categoria: 'Camisas' },
      { id: 4, nombre: 'Jean Clásico', categoria: 'Pantalones' },
      { id: 5, nombre: 'Polerón Canguro', categoria: 'Polerones' },
      // ... más productos
    ];
    // -----------------------------------------
    
    
    // Un componente simple para mostrar un producto
    const TarjetaProducto = ({ producto }) => (
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <h4>{producto.nombre}</h4>
        <p>Categoría: {producto.categoria}</p>
      </div>
    );
    
    
    // --- EL COMPONENTE PRINCIPAL ---
    const PaginaProductos = () => {
      // 1. Hook para leer los parámetros de la URL
      const [searchParams] = useSearchParams();
    
      // 2. Obtenemos el valor del parámetro "category"
      // Si la URL es /productos?category=Poleras, la variable 'categoria' será "Poleras"
      // Si la URL es /productos, la variable 'categoria' será null
      const categoria = searchParams.get('category');
    
      // 3. Estado para guardar los productos que vamos a mostrar
      const [productosFiltrados, setProductosFiltrados] = useState([]);
    
      // 4. Este "efecto" se ejecuta cada vez que 'categoria' cambia (o al cargar)
      useEffect(() => {
        let filtrados;
        
        if (categoria) {
          // Si hay una categoría en la URL, filtramos la lista
          filtrados = todosLosProductos.filter(
            // Comparamos ignorando mayúsculas/minúsculas por seguridad
            (prod) => prod.categoria.toLowerCase() === categoria.toLowerCase()
          );
        } else {
          // Si no hay categoría en la URL (ej: /productos), mostramos todo
          filtrados = todosLosProductos;
        }
        
        setProductosFiltrados(filtrados);
    
      }, [categoria]); // El 'useEffect' depende de la variable 'categoria'
    
      
      // 5. Renderizamos el resultado
      return (
        <div>
          {/* El título es dinámico: muestra la categoría o "Todos los productos" */}
          <h1>{categoria || 'Todos los Productos'}</h1>
    
          <div className="lista-productos">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((prod) => (
                <TarjetaProducto key={prod.id} producto={prod} />
              ))
            ) : (
              <p>No se encontraron productos para esta categoría.</p>
            )}
          </div>
        </div>
      );
    };
    
    export default PaginaProductos;
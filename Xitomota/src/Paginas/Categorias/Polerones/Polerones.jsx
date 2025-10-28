// --- 1. IMPORTACIONES ---
// Importamos 'useState' y 'useEffect' de React, y 'axios' para las llamadas API
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Tus importaciones de imágenes para la BARRA DE CATEGORÍAS (esto se queda igual)
import fotoPoleras from '../../../img/poleras.jpg';
import fotoCamisas from '../../../img/camisas.jpg';
import fotoPolerones from '../../../img/polerones.jpg';
import fotoPantalones from '../../../img/pantalones.jpg';
import fotoBuzos from '../../../img/buzos.jpg';
import fotoChaquetas from '../../../img/chaquetas.jpg';


// --- DATOS DE EJEMPLO (Solo para la barra de categorías) ---
// Por ahora, dejaremos esta lista fija.
const listaDeCategorias = [
  { id: 'poleras', nombre: 'Poleras', imagen: fotoPoleras },
  { id: 'camisas', nombre: 'Camisas', imagen: fotoCamisas },
  { id: 'polerones', nombre: 'Polerones', imagen: fotoPolerones },
  { id: 'pantalones', nombre: 'Pantalones', imagen: fotoPantalones },
  { id: 'buzos', nombre: 'Buzos', imagen: fotoBuzos },
  { id: 'chaquetas', nombre: 'Chaquetas', imagen: fotoChaquetas }
];

// --- 2. ELIMINAMOS 'listaDePolerones' ---
// Ya no necesitamos la listaDePolerones fija, porque la traeremos de la BD.


// Función para formatear el precio (se queda igual)
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
      currency: 'CLP'
  }).format(precio);
};


export default function Polerones() {
  
  // --- 3. CREAMOS EL ESTADO ---
  // Aquí guardaremos las poleras que lleguen desde el backend.
  const [polerones, setPolerones] = useState([]);

  // --- 4. HACEMOS LA LLAMADA A LA API ---
  useEffect(() => {
    // Definimos la función que busca los datos
    const fetchPolerones = async () => {
      try {
        // Usamos el endpoint que creamos para filtrar por categoría
        const response = await axios.get('http://localhost:8080/api/v1/productos/categoria/Polerones');
        // Guardamos los datos en nuestro estado
        setPolerones(response.data);
      } catch (error) {
        console.error("Error al obtener los polerones:", error);
      }
    };

    // Llamamos a la función
    fetchPolerones();
  }, []); // El array vacío [] asegura que se ejecute solo 1 vez


  // --- 5. RENDERIZADO (El JSX) ---
  return (
    <>
      <main className="categoria-main">
         
          {/* Barra de Categorías (se queda igual) */}
          <nav className="navegacion-categorias">
            {listaDeCategorias.map((cat) => (
              <Link key={cat.id} to={`/categorias/${cat.id}`} className="categoria-card-link">
                <div className="categoria-card-small">
                  {cat.imagen ? (
                    <img src={cat.imagen} alt={cat.nombre} className="categoria-img-small" />
                  ) : (
                    <div className="img-placeholder-small">
                      <span>100 x 100</span>
                    </div>
                  )}
                  <p>{cat.nombre}</p>
                </div>
              </Link>
            ))}
          </nav>
          {/* --- FIN: Barra de Categorías --- */}


          <h2>Polerones</h2>
        
          <div className="productos-lista">
            {/* --- 6. CAMBIO PRINCIPAL EN EL RENDER --- */}
          {/* Cambiamos 'listaDePolerones' por 'polerones' (nuestro estado) */}
            {polerones.map((poleron) => (
              <div key={poleron.id} className="producto-item">
              
              {/* Actualizamos la URL de la imagen para que apunte al backend */}
                <img 
                  src={`http://localhost:8080/images/${poleron.imagen}`} 
                  alt={poleron.nombre} 
                />
                
                <div className="producto-info">
                  <h3 className="producto-nombre">{poleron.nombre}</h3>
                  {/* ¡Ojo! El precio ya viene desde la BD */}
                  <p className="producto-precio">{formatearPrecio(poleron.precio)}</p>
                </div>
              
            </div>
            ))}
          </div>
      </main>
    </>
  );
}
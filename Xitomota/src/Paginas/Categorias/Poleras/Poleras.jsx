import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import fotoPoleras from '../../../img/poleras.jpg';

import fotoCamisas from '../../../img/camisas.jpg';
import fotoPolerones from '../../../img/polerones.jpg';
import fotoPantalones from '../../../img/pantalones.jpg';
import fotoBuzos from '../../../img/buzos.jpg';
import fotoChaquetas from '../../../img/chaquetas.jpg';


// --- DATOS DE EJEMPLO ---

// 1. Lista de categorías para la barra superior
const listaDeCategorias = [
  { id: 'poleras', nombre: 'Poleras', imagen: fotoPoleras },
  { id: 'camisas', nombre: 'Camisas', imagen: fotoCamisas },
  { id: 'polerones', nombre: 'Polerones', imagen: fotoPolerones },
  { id: 'pantalones', nombre: 'Pantalones', imagen: fotoPantalones },
  { id: 'buzos', nombre: 'Buzos', imagen: fotoBuzos },
  { id: 'chaquetas', nombre: 'Chaquetas', imagen: fotoChaquetas }
  // ... Agrega más categorías aquí
];

// 2. Lista de productos para la grilla principal
const listaDePoleras = [
  {
    id: 1,
    nombre: 'Polera Básica Algodón',
    precio: 12990,
    imagen: fotoPoleras,
  },
  {
    id: 2,
    nombre: 'Polera Estampado Gráfico',
    precio: 15990,
    imagen: fotoPoleras,
  },
  {
    id: 3,
    nombre: 'Polera Manga Larga',
    precio: 17990,
    imagen: fotoPoleras,
  },
  {
    id: 4,
    nombre: 'Polera Deportiva Transpirable',
    precio: 19990,
    imagen: fotoPoleras,
  },
];
// -------------------------

// Función para formatear el precio
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio);
};


export default function Poleras() {
  return (
    <>
        <main className="categoria-main">
            
            {/* --- INICIO: Barra de Categorías (Lo nuevo) --- */}
            <nav className="navegacion-categorias">
                {listaDeCategorias.map((cat) => (
                    <Link key={cat.id} to={`/categorias/${cat.id}`} /* Usamos el 'id' (ej: /productos/poleras) */ className="categoria-card-link">
                    <div className="categoria-card-small">
            {cat.imagen ? (
                  <img src={cat.imagen} alt={cat.nombre} className="categoria-img-small" />
                ) : (
                  // Si no hay imagen (otras categorías), mostramos el placeholder
                  <div className="img-placeholder-small">
                    <span>100 x 100</span>
                  </div>
                )}
                {/* --- FIN MODIFICACIÓN --- */}
                <p>{cat.nombre}</p>
              </div>
            </Link>
          ))}
        </nav>
        {/* --- FIN: Barra de Categorías --- */}


        {/* --- INICIO: Grilla de Productos (Lo que ya tenías) --- */}
        <h2>Poleras</h2>
        
        <div className="productos-lista">
          {listaDePoleras.map((polera) => (
            <div key={polera.id} className="producto-item">
              <img src={polera.imagen} alt={polera.nombre} />
              
              <div className="producto-info">
                <h3 className="producto-nombre">{polera.nombre}</h3>
                <p className="producto-precio">{formatearPrecio(polera.precio)}</p>
              </div>
              
            </div>
          ))}
        </div>
        {/* --- FIN: Grilla de Productos --- */}

      </main>
    </>
  );
}
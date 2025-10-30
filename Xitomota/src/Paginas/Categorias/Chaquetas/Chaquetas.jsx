import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TarjetaProducto from '../../Productos/TarjetaProducto';


import fotoPoleras from '../../../img/poleras.jpg';
import fotoCamisas from '../../../img/camisas.jpg';
import fotoPolerones from '../../../img/polerones.jpg';
import fotoPantalones from '../../../img/pantalones.jpg';
import fotoBuzos from '../../../img/buzos.jpg';
import fotoChaquetas from '../../../img/chaquetas.jpg';



const listaDeCategorias = [
 { id: 'poleras', nombre: 'Poleras', imagen: fotoPoleras },
 { id: 'camisas', nombre: 'Camisas', imagen: fotoCamisas },
 { id: 'polerones', nombre: 'Polerones', imagen: fotoPolerones },
 { id: 'pantalones', nombre: 'Pantalones', imagen: fotoPantalones },
 { id: 'buzos', nombre: 'Buzos', imagen: fotoBuzos },
 { id: 'chaquetas', nombre: 'Chaquetas', imagen: fotoChaquetas }
];

export default function Chaquetas() {
  
  const [chaquetas, setChaquetas] = useState([]);

  useEffect(() => {
    const fetchChaquetas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/productos/categoria/Chaquetas');
        setChaquetas(response.data);
      } catch (error) {
        console.error("Error al obtener las chaquetas:", error);
      }
    };

    fetchChaquetas();
  }, []); 


  return (
    <>
      <main className="categoria-main">
        {/* Barra de Categorías */}
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


          <h2>Chaquetas</h2>

          <div className="productos-lista">
            {chaquetas.map((chaqueta) => (
              <TarjetaProducto 
                key={chaqueta.id} 
                producto={chaqueta} 
                mostrarCategoria={false} 
            />
            ))}
          </div>
      </main>
    </>
  );
}
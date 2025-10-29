import React from "react";
import caso1 from '../../img/Caso1.jpg';

// (Opcional) Importa tu CSS aquí si no lo has hecho en App.js
// import './Blogs.css'; 

export default function Blogs() {

  const gif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHVsMGhwNGVydTZtaTh3dHRhMXg3bG12YXZsdDI2OHZsNnloYWsyNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DoCIC5Pxp57qg/giphy.gif";

  return (
    <>
      {/* Usamos 'blogs-main' para el fondo de color */}
      <main className="blogs-main">
        
        {/* Este contenedor centra todo (el 80% de tu .uno) */}
        <div className="blog-container">

          <div className="blog-title">
            <h1>Noticias importantes</h1>
          </div>

          {/* --- Artículo 1 --- */}
          <article className="blog-article">
            <div className="article-text">
              <h2>Caso Curioso</h2>
              <p>
                El año 2023 Xitomota logro cerrar un contrato con [Dunder Mifflin]. 
                El cual consta de exibhir los productos propios de Xitomota en un mercado 
                de retail que le da mayo visibilidad.
              </p>
            </div>
            <div className="article-image">
              {/* Le damos una clase consistente a la imagen */}
              <img 
                className="article-image-content" 
                src={caso1} 
                alt="Cerrando el trato con Dunder Mifflin" 
              />
            </div>
          </article>

          {/* --- Artículo 2 --- */}
          <article className="blog-article">
            <div className="article-text">
              <h2>Ropa de calidad</h2>
              <p>
                El año 2024 Xitomota Lanzo un a linea de ropa ejecutiva y junto a 
                [Dunder Mifflin], se puso a prueba en deportes extremos.
              </p>
            </div>
            <div className="article-image">
              {/* Le damos la MISMA clase al GIF */}
              <img 
                className="article-image-content" 
                src={gif} 
                alt="Michael Scott durmiendo en un sofá" 
              />
            </div>
          </article>

        </div>
      </main>
    </>
  );
}
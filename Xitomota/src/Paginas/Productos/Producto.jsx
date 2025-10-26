import React from "react"
// Migrado a `src/App.css` (reglas globales). Archivo original: src/Paginas/Productos/Producto.css
// import './Producto.css';
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
                            <Link to="/productos/2">
                                <img className="foto_prom2" src={foto_prom2} alt="foto" />
                            </Link>
                            <h4>Conjunto Deportivo</h4>
                            <p className="container_5">$200.00</p>
                        </div>
                        <div className="container_5a3">
                            <Link to="/productos/5">
                                <img className="foto_promocional" src={foto_prom5} alt="" />
                            </Link>
                            <h4>Gorra Vintage</h4>
                            <p className="container_5">$15.000</p>
                        </div>
                    </div>
                </div>     
                </main>
                {/* Nota: migrar la lógica de ../js/productos.js a React si es necesaria */}
        </>
    );
}
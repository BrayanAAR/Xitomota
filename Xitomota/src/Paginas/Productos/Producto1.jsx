import React from "react";
import fotoproducto1 from "../../img/Producto1.jpg";
import fotoproducto2 from "../../img/Producto2.jpg";
import fotoproducto3 from "../../img/Producto3.jpg";
import fotoproducto4 from "../../img/Producto4.jpg";
import fotoproducto5 from "../../img/Producto5.jpg";
import fotoproducto6 from "../../img/Producto6.jpg";
import fotoprincipal from "../../img/PrimerProducto.jpg";
import './DetalleProducto.css';

export default function Producto1() {
    return (
        <>
            <main>
                <div className="main_1">
                    <a href="/">Home</a>
                    <p>- Poleron</p>
                </div>
                    <div className="main_2">
                        <div className="main_2_1">
                            <div className="main_2_1_1">
                                <img src={fotoproducto1} alt="Producto 1"/>
                            </div>
                            <div className="main_2_1_2">
                                <img src={fotoproducto2} alt="Producto 2"/>
                                <img src={fotoproducto3} alt="Producto 3"/>
                                <img src={fotoprincipal} alt="Primer Producto"/>

                            </div>
                        </div>
                        <div className="main_2_2">
                            <div className="main_2_2_top"><h1>Poleron</h1><h1>$ 30000</h1></div>
                            <div className="main_2_2_mid"><p>Experimenta la máxima comodidad con nuestro polerón de 100% algodón con cierre completo. Su diseño moderno con bolsillos laterales lo hace práctico, y el cierre permite un ajuste versátil, perfecto para el gimnasio o una salida relajada con amigos</p></div>
                            <div className="main_2_2_down">
                                <label htmlFor="cantidad">Cantidad:</label>
                                <input type="number" id="cantidad" min="1" value="1"/>
                                <button className="btn btn-primary" id="agregar-carrito">Añadir al carrito</button>
                            </div>
                        </div>
                    </div>
                    <div className="main_3">
                        <img className="foto_promocional" src={fotoproducto2} alt=""/>
                        <img className="foto_promocional" src={fotoproducto3} alt=""/>
                        <img className="foto_promocional" src={fotoproducto4} alt=""/>
                        <img className="foto_promocional" src={fotoproducto5} alt=""/>
                        <img className="foto_promocional" src={fotoproducto6} alt=""/>
                    </div>
                </main>
                    {/* Nota: los scripts antiguos se han eliminado; migrar la lógica JS a React si es necesaria */}
        </>
    );
}
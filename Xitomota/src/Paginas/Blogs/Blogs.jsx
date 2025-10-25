import React from "react";
import './Blogs.css';
import caso1 from '../../img/Caso1.jpg';

export default function Blogs() {
    return (
        <>
            <main className="blogs-main">
                <div className="uno">
                    <div className="dos">
                        <h1>Noticias importantes</h1>
                    </div>
                    <div className="tres">
                        <div className="tres_1">
                            <h2>Caso Curioso</h2>
                            <p>El año 2023 Xitomota logro cerrar un contrato con [Dunder Mifflin]
                                El cual consta de exibhir los productos propios de Xitomota en un mercado
                                de retail que le da mayo visibilidad
                            </p>
                        </div>
                        <div className="tres_2">
                            <img className="Caso1" src={caso1} alt="Cerrando el trato" />
                        </div>
                    </div>
                </div>
                <br />
                <div className="tres">
                    <div className="tres_1">
                        <h2>Ropa de calidad</h2>
                        <p>El año 2024 Xitomota Lanzo un a linea de ropa ejecutiva y junto a 
                            [Dunder Mifflin], se puso a prueba en deportes extremos
                        </p>
                    </div>
                    {/*<div className="tres_2">
                        <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmNqeGkyYW41eW45eDNscXI2MW9kZmFqOHphc2w1aXd5azl0NWc5byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ewx4bjThJZkI0/giphy.gif" alt="">
                    </div>*/}
                </div>

            </main>
        </>
    );
}
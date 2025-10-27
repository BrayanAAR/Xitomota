import React from "react";
import logo from '../../img/Logo.jpg';
import { Link } from 'react-router-dom';

export default function IniciarSesion() {
    return (
        <>
            <main>
                <div className="container_iniciar">
                    <div className="container_iniciar_top">
                        <p>Iniciar Sesion</p>
                    </div>
                    <form id="IniciarSesion">

                        <label htmlFor="email">Email:</label>
                        <input className="forms" type="email" id="email" name="email" maxLength="100" required /><br /><br />

                        <label htmlFor="contraseña">Contraseña:</label>
                        <input className="forms" type="password" id="contraseña" name="contraseña" maxLength="100" required /><br /><br />

                        <div className="IniciarSesion_1">
                            <button type="submit" className="btn-ingresar" id="ingresarCuenta">Ingresar</button>
                        </div>
                    </form> 
                    <div className="container_registro">
                        <p>¿No tienes una cuenta? <Link to="/registro">Registrate</Link></p>
                    </div>
                </div>
            </main>

            {/* Nota: los scripts antiguos en src/js no se ejecutan aquí; mover la lógica a React si es necesario */}
        </>
    );
}
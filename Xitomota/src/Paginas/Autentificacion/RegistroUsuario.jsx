import React from "react";
import { Link } from 'react-router-dom';

export default function RegistroUsuario() {
    return (
        <>
        <main>
                <div className="registro">
                    <form id="miFormulario">
                        <label htmlFor="run">RUN:</label>
                        <input className="forms" type="text" id="run" name="run" required /><br /><br />

                        <label htmlFor="nombre">Nombre Completo:</label>
                        <input className="forms" type="text" id="nombre" name="nombre" maxLength="50" required /><br /><br />

                        <label htmlFor="email">Email:</label>
                        <input className="forms" type="email" id="email" name="email" maxLength="100" required /><br /><br />

                        <label htmlFor="contraseña">Contraseña:</label>
                        <input className="forms" type="password" id="contraseña" name="contraseña" maxLength="100" required /><br /><br />

                        <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
                        <input className="forms" type="password" id="confirmarContraseña" name="confirmarcontraseña" required /><br /><br />

                        <label htmlFor="tipoUsuario">Tipo de Usuario:</label>
                        <select id="tipoUsuario" name="tipoUsuario">
                            <option value="Administrador">Administrador</option>
                            <option value="Cliente">Cliente</option>
                            <option value="Vendedor">Vendedor</option>
                        </select><br /><br />

                        <label htmlFor="region">Región:</label>
                        <select id="region" name="region">
                            <option value="">-- Selecciona Región --</option>
                        </select><br /><br />

                        <label htmlFor="comuna">Comuna:</label>
                        <select id="comuna" name="comuna">
                            <option value="">-- Selecciona Comuna --</option>
                        </select><br /><br />

                        <label htmlFor="direccion">Dirección:</label>
                        <textarea id="direccion" name="direccion" maxLength="300" required></textarea><br /><br />

                        <label htmlFor="telefono">Telefono (opcional): </label>
                        <input className="forms" type="tel" id="telefono" name="telefono" /><br /><br />
                        <div className="registro_1">
                            <button type="submit" className="btn-registrar">Registrar</button>
                            {/* Navegar a login usando Link para SPA */}
                            <Link to="/login" className="btn-ingresar">Ingresar</Link>
                        </div>
                        
                    </form> 
                </div>

            
            </main>
            {/* Nota: la lógica antigua en ../js/RegistroUsuario.js debe migrarse a React si se requiere */}
        </>
    );
}  
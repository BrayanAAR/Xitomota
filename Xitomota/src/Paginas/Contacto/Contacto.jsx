import React from "react";
// Migrado a `src/App.css` (reglas globales). Archivo original: src/Paginas/Contacto/Contacto.css
// import './Contacto.css';
import Header from "../../componentes/Header";

export default function Contacto() {
	return (
        <>
            <Header />
            <main className="contacto-main">
                <div className="contacto">
                    <form id="formContacto">
                        <label for="nombre">Nombre Completo:</label>
                        <input className="contact-input" type="text" id="nombre" name="nombre" maxlength="100" required /><br />

                        <label for="correo">Correo:</label>
                        <input className="contact-input" type="email" id="correo" name="correo" maxlength="100" required /><br />

                        <label for="comentario">Comentario:</label>
                        <textarea className="contact-input" id="comentario" name="comentario" rows="4" maxlength="500" required></textarea><br />

                        <div className="contact-buttons">
                            <button type="submit" className="btn-enviar">Enviar</button>
                            <button type="reset" className="btn-limpiar">Limpiar</button>
                        </div>
                    </form>
                </div>
                <div id="mensajeExito" className="alerta-exito oculto">
                    ¡Formulario enviado correctamente!
                </div>
            </main>
        </>
    );
}

import React, { useState } from 'react';

export default function Contacto() {
    // Estados para los campos (necesarios para limpiar)
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [comentario, setComentario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar los datos (a la BD, email, etc.)
        alert('Mensaje enviado (simulación)');
        // Limpiar formulario después de enviar (opcional)
        setNombre('');
        setCorreo('');
        setComentario('');
    };

    const handleLimpiar = () => {
        setNombre('');
        setCorreo('');
        setComentario('');
    };

    return (
        // Contenedor principal para centrar y dar fondo
        <div className="contacto-container"> 
            <div className="contacto-form-card"> {/* La tarjeta contenedora */}
                <h2>Contáctanos</h2>
                <p>Envíanos tus dudas o comentarios.</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group-contacto"> {/* Grupo para label + input */}
                        <label htmlFor="nombreCompleto">Nombre Completo:</label>
                        <input 
                            type="text" 
                            id="nombreCompleto" 
                            name="nombreCompleto"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <div className="form-group-contacto">
                        <label htmlFor="correo">Correo:</label>
                        <input 
                            type="email" 
                            id="correo" 
                            name="correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="form-group-contacto">
                        <label htmlFor="comentario">Comentario:</label>
                        <textarea 
                            id="comentario" 
                            name="comentario" 
                            rows="5" // Más altura
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-actions-contacto"> {/* Contenedor para botones */}
                        <button type="submit" className="btn-enviar">Enviar</button>
                        {/* Usamos type="button" para que no envíe el form */}
                        <button type="button" onClick={handleLimpiar} className="btn-limpiar">Limpiar</button> 
                    </div>
                </form>
            </div>
        </div>
    );
}
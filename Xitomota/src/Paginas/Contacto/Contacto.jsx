import React, { useState } from 'react';

export default function Contacto() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [comentario, setComentario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mensaje enviado (simulación)');
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
        <div className="contacto-container"> 
            <div className="contacto-form-card">
                <h2>Contáctanos</h2>
                <p>Envíanos tus dudas o comentarios.</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group-contacto"> 
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
                            rows="5" 
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-actions-contacto"> 
                        <button type="submit" className="btn-enviar">Enviar</button>
                        <button type="button" onClick={handleLimpiar} className="btn-limpiar">Limpiar</button> 
                    </div>
                </form>
            </div>
        </div>
    );
}
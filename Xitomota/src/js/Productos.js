// Ejemplo: src/components/ListaObjetos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importamos axios

function ListaObjetos() {
    
    // 1. Creamos un "estado" para guardar la lista de objetos
    //    Inicialmente es un array vacío.
    const [objetos, setObjetos] = useState([]);
    
    // 2. useEffect se ejecuta una vez, cuando el componente se "monta" (carga)
    useEffect(() => {
        
        // 3. Definimos la función que hace la llamada a la API
        const fetchObjetos = async () => {
            try {
                // Hacemos la llamada GET a la URL de nuestro backend
                const response = await axios.get('http://localhost:8080/api/v1/objetos');
                
                // 4. Cuando los datos llegan, los guardamos en el estado
                setObjetos(response.data);
                
            } catch (error) {
                // Manejamos cualquier error que ocurra durante la llamada
                console.error("Error al obtener los objetos:", error);
            }
        };

        // 5. Llamamos a la función
        fetchObjetos();
        
    }, []); // El array vacío [] asegura que esto se ejecute solo una vez

    // 6. Renderizamos (dibujamos) la lista
    return (
        <div>
            <h2>Mi Lista de Objetos desde el Backend</h2>
            <ul>
                {/* 7. Mapeamos el array 'objetos' del estado para crear un <li> por cada uno */}
                {objetos.map(objeto => (
                    <li key={objeto.id}>
                        <strong>{objeto.nombre}</strong>: {objeto.descripcion}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaObjetos;
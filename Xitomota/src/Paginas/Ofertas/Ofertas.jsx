import React from 'react';
import axios from 'axios'; // Necesario para el botón "Agregar"

// --- 1. IMPORTA TUS IMÁGENES LOCALES ---
import fotoBuzo from '../../img/buzos.jpg'; // (Asegúrate que estas rutas sean correctas)
import fotoPolera from '../../img/poleras.jpg';
import fotoChaqueta from '../../img/chaquetas.jpg';

// --- 2. DATOS FIJOS (USANDO LAS IMÁGENES IMPORTADAS) ---
const productosEnOferta = [
    {
        id: 101, // Un ID (puede ser cualquiera, pero debe ser único)
        nombre: 'Buzo Básico (¡Oferta!)',
        categoria: 'Buzos',
        precio: 9990,
        imagen: fotoBuzo, // <-- ¡Usamos la variable importada!
    },
    {
        id: 102,
        nombre: 'Polera Estampada (¡Oferta!)',
        categoria: 'Poleras',
        precio: 7990,
        imagen: fotoPolera, // <-- ¡Usamos la variable importada!
    },
    {
        id: 103,
        nombre: 'Chaqueta Deportiva (¡Oferta!)',
        categoria: 'Chaquetas',
        precio: 15990,
        imagen: fotoChaqueta, // <-- ¡Usamos la variable importada!
    }
];
// ------------------------------------

// Función para formatear el precio
const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio || 0);
};

export default function Ofertas() {

    // --- 3. LÓGICA PARA "AGREGAR AL CARRITO" (Copiada) ---
    // La necesitamos aquí porque no usamos TarjetaProducto
    const handleAgregarAlCarrito = async (productoId) => { 
        const cartId = localStorage.getItem('cartId');

        if (!cartId) {
            alert("Error, no se pudo encontrar el carrito. Visita la página del carrito primero.");
        return;
        }

    try {
        // Aunque el producto es "falso", el ID (101, 102) no existe en tu BD.
        // PERO... tu API de "agregar" intenta buscar el 'productoId' en la tabla 'productos'.
        // Esto fallará con un 404 o 500.
        
        // --- SOLUCIÓN TEMPORAL (VISUAL) ---
        // Para la etapa 2, simulamos que funciona:
        alert("¡Producto agregado al carrito! (Simulación)");
        
        // --- CÓDIGO REAL (CUANDO LOS PRODUCTOS DE OFERTA ESTÉN EN LA BD) ---
        // await axios.post(`http://localhost:8080/api/v1/carrito/${cartId}/add/${productoId}`, null, {
        //   params: { cantidad: 1 } 
        // });
        // alert("¡Producto agregado al carrito!");

    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        alert("No se pudo agregar el producto.");
        }
    };


    return (
        <div className="ofertas-container" style={{ padding: '20px', textAlign: 'center' }}>
            <h2>🔥 ¡Ofertas Imperdibles! 🔥</h2>
            <p>¡Aprovecha estos descuentos solo por tiempo limitado!</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px'}}>
                
                {/* --- 4. RENDERIZADO "MANUAL" (Sin TarjetaProducto) --- */}
                {productosEnOferta.map(producto => (
                    <div 
                        key={producto.id}
                        className="producto-item" 
                        style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}
                    >
                        {/* Usamos la imagen local (producto.imagen) */}
                        <img 
                            src={producto.imagen} 
                            alt={producto.nombre} 
                            style={{ width: '100%' }} 
                        />
                        
                        <div className="producto-info">
                            <h3 className="producto-nombre">{producto.nombre}</h3>
                            <p>Categoría: {producto.categoria}</p>
                            <p className="producto-precio">{formatearPrecio(producto.precio)}</p>
                        </div>
                        
                        {/* Botón que llama a nuestra lógica local */}
                        <button 
                            onClick={() => handleAgregarAlCarrito(producto.id)} 
                            className="btn-agregar-carrito"
                        >
                            Agregar al Carrito
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
}
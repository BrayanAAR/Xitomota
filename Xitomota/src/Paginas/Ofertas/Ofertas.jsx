import React from 'react';
import axios from 'axios';

import fotoBuzo from '../../img/buzos.jpg';
import fotoPolera from '../../img/poleras.jpg';
import fotoChaqueta from '../../img/chaquetas.jpg';

const productosEnOferta = [
    {
        id: 101, 
        nombre: 'Buzo Básico (¡Oferta!)',
        categoria: 'Buzos',
        precio: 9990,
        imagen: fotoBuzo, 
    },
    {
        id: 102,
        nombre: 'Polera Estampada (¡Oferta!)',
        categoria: 'Poleras',
        precio: 7990,
        imagen: fotoPolera, 
    },
    {
        id: 103,
        nombre: 'Chaqueta Deportiva (¡Oferta!)',
        categoria: 'Chaquetas',
        precio: 15990,
        imagen: fotoChaqueta, 
    }
];

// Función para formatear el precio
const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio || 0);
};

export default function Ofertas() {
    const handleAgregarAlCarrito = async (productoId) => { 
        const cartId = localStorage.getItem('cartId');

        if (!cartId) {
            alert("Error, no se pudo encontrar el carrito. Visita la página del carrito primero.");
        return;
        }

    try {
        alert("¡Producto agregado al carrito! (Simulación)");

    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        alert("No se pudo agregar el producto.");
        }
    };


    return (
        <div className="ofertas-container" style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Ofertas Imperdibles</h2>
            <p>¡Aprovecha estos descuentos solo por tiempo limitado!</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px'}}>
                
                {productosEnOferta.map(producto => (
                    <div 
                        key={producto.id}
                        className="producto-item" 
                        style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}
                    >
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
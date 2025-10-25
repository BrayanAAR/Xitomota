import React, { useEffect, useState } from "react";

export default function Carrito() {
    const [carrito, setCarrito] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("carrito")) || [];
        } catch (e) {
            return [];
        }
    });

    // Actualiza localStorage y contador en el header (si existe)
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        const total = carrito.reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0);
        const countEl = document.getElementById("cart-count");
        if (countEl) countEl.textContent = total;
    }, [carrito]);

    function eliminarDelCarrito(index) {
        setCarrito(prev => {
            const next = [...prev];
            next.splice(index, 1);
            return next;
        });
    }

    const totalPrecio = carrito.reduce((acc, item) => acc + (Number(item.precio) || 0) * (Number(item.cantidad) || 0), 0);

    return (
        <main className="container mt-4">
            <h2>Detalle del Carrito</h2>

            {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <div>
                    {carrito.map((item, index) => (
                        <div key={index} className="card mb-3 p-3 d-flex flex-row justify-content-between align-items-center">
                            <div>
                                <h5>{item.nombre}</h5>
                                <p>Precio: ${Number(item.precio).toLocaleString()}</p>
                                <p>Cantidad: {item.cantidad}</p>
                                <p>Subtotal: ${(Number(item.precio) * Number(item.cantidad)).toLocaleString()}</p>
                            </div>
                            <button className="btn btn-danger" onClick={() => eliminarDelCarrito(index)}>Eliminar</button>
                        </div>
                    ))}

                    <h3>Total: ${totalPrecio.toLocaleString()}</h3>
                </div>
            )}
        </main>
    );
}
import React, { useEffect, useState } from "react";
import axios from "axios";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getOrCreateCart = async () => {
    try {
      let cartId = localStorage.getItem("cartId");
      if (!cartId) {
        cartId = "test-cart-id";
        localStorage.setItem("cartId", cartId);
      }
      const response = await axios.get(`/api/cart/${cartId}`);
      setCarrito(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error al cargar el carrito:", err);
      setError("No se pudo cargar el carrito.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrCreateCart();
  }, []);

  if (isLoading) return <p>Cargando carrito...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Mi Carrito</h2>
      {carrito.length === 0 ? (
        <p>Carrito vacío</p>
      ) : (
        <ul>
          {carrito.map((item) => (
            <li key={item.id || item.nombre}>
              {item.nombre} - ${item.precio.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Carrito;

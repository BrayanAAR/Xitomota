import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Objeto base para un producto vacío (previene nulls)
const productoVacio = {
    nombre: '',
    precio: 0,
    stock: 0,
    categoria: '',
    imagen: ''
};

export default function FormularioProducto() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [titulo, setTitulo] = useState('Nuevo Producto');
    
    // 1. Inicializa el estado en 'null' para manejar la carga
    const [producto, setProducto] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); // Estado de carga

    // 2. useEffect para cargar/preparar los datos
    useEffect(() => {
        setIsLoading(true); // Empezamos a cargar
        if (id) {
            // --- MODO EDITAR ---
            setTitulo('Editar Producto');
            const fetchProducto = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/v1/productos/${id}`);
                    const data = response.data;
                    
                    // 3. ¡LA SOLUCIÓN! Limpiamos los datos
                    // Reemplazamos cualquier 'null' por un string vacío
                    setProducto({
                        nombre: data.nombre || '',
                        precio: data.precio || 0,
                        stock: data.stock || 0,
                        categoria: data.categoria || '', // <-- Si es 'null', se vuelve ''
                        imagen: data.imagen || ''        // <-- Si es 'null', se vuelve ''
                    });
                    
                } catch (error) {
                    console.error("Error al cargar el producto:", error);
                    alert("No se pudo cargar el producto.");
                } finally {
                    setIsLoading(false); // Terminamos de cargar
                }
            };
            fetchProducto();
        } else {
            // --- MODO NUEVO ---
            setTitulo('Nuevo Producto');
            setProducto(productoVacio); // Usamos el objeto vacío (sin nulls)
            setIsLoading(false); // Listo para rellenar
        }
    }, [id]); // Se ejecuta si el 'id' de la URL cambia

    // 4. Función de cambios (sin cambios)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 5. Función de envío (sin cambios)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convertimos precio y stock a números antes de enviar
            const datosProducto = {
                ...producto,
                precio: parseInt(producto.precio, 10),
                stock: parseInt(producto.stock, 10)
            };

            if (id) {
                await axios.put(`http://localhost:8080/api/v1/productos/${id}`, datosProducto);
                alert("¡Producto actualizado exitosamente!");
            } else {
                await axios.post('http://localhost:8080/api/v1/productos', datosProducto);
                alert("¡Producto creado exitosamente!");
            }
            navigate('/admin/inventario');
        } catch (error) {
            console.error("Error al guardar el producto:", error);
            alert("Error al guardar el producto.");
        }
    };

    // 6. Mostramos "Cargando..." mientras se preparan los datos
    if (isLoading || !producto) {
        return (
            <main className="main admin-form-container">
                <h1>Cargando formulario...</h1>
            </main>
        );
    }

    // 7. El formulario (ahora es seguro renderizar)
    return (
        <main className="main admin-form-container">
            <h1>{titulo}</h1>
            <p>Completa todos los campos para guardar el producto.</p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre del Producto</label>
                    <input 
                        type="text" 
                        id="nombre"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleChange}
                        required 
                    />
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input 
                            type="number" 
                            id="precio"
                            name="precio"
                            value={producto.precio}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock</label>
                        <input 
                            type="number" 
                            id="stock"
                            name="stock"
                            value={producto.stock}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="categoria">Categoría</label>
                    <input 
                        type="text" 
                        id="categoria"
                        name="categoria"
                        value={producto.categoria}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imagen">Nombre de la Imagen</label>
                    <input 
                        type="text" 
                        id="imagen"
                        name="imagen"
                        value={producto.imagen}
                        onChange={handleChange}
                        placeholder="Ej: buzo_basico.jpg (debe estar en /static/images)"
                        required 
                    />
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="btn-header btn-nuevo">Guardar Producto</button>
                    <Link to="/admin/inventario" className="btn-cancelar">
                        Cancelar
                    </Link>
                </div>
            </form>
        </main>
    );
}
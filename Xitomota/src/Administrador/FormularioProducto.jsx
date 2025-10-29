import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Objeto base (igual)
const productoVacio = { nombre: '', precio: 0, stock: 0, categoria: null, imagen: '' };

export default function FormularioProducto() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    // --- 1. CAMBIO EN LA INICIALIZACIÓN DEL ESTADO ---
    // Determinamos el modo (Nuevo o Editar) ANTES de definir el estado
    const isEditMode = Boolean(id); 
    
    const [titulo, setTitulo] = useState(isEditMode ? 'Editar Producto' : 'Nuevo Producto');
    // Si es Nuevo, inicializa con 'productoVacio'. Si es Editar, empieza en 'null'.
    const [producto, setProducto] = useState(isEditMode ? null : productoVacio); 
    // Si es Nuevo, no está cargando. Si es Editar, sí empieza cargando.
    const [isLoading, setIsLoading] = useState(isEditMode); 
    
    const [categorias, setCategorias] = useState([]);

    // --- 2. USEEFFECT SIMPLIFICADO ---
    useEffect(() => {
        // Cargar categorías siempre
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/categorias');
                setCategorias(response.data);
            } catch (error) { console.error("Error al cargar categorías:", error); }
        };
        fetchCategorias();

        // Cargar producto SOLO si estamos en modo Editar
        if (isEditMode) {
            const fetchProducto = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/v1/productos/${id}`);
                    const data = response.data;
                    // Limpiamos nulls (igual que antes)
                    setProducto({
                        nombre: data.nombre || '',
                        precio: data.precio || 0,
                        stock: data.stock || 0,
                        categoria: data.categoria || null, 
                        imagen: data.imagen || ''
                    });
                } catch (error) { 
                    console.error("Error al cargar el producto:", error);
                    alert("No se pudo cargar el producto a editar.");
                } finally {
                    setIsLoading(false); // Terminamos de cargar SOLO en modo editar
                }
            };
            fetchProducto();
        }
        // No necesitamos hacer nada para el modo Nuevo aquí, ya está inicializado.
        
    // Dependemos solo de 'id' para saber si re-ejecutar
    }, [id, isEditMode]); // Agregamos isEditMode por claridad

    // ... (Tu handleChange y handleSubmit se quedan igual) ...
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'categoriaId') { // Este es el 'name' de tu <select>
            // Buscamos el objeto categoría completo por su ID
            const catSeleccionada = categorias.find(cat => cat.id.toString() === value);
            setProducto(prevState => ({
                ...prevState,
                // Guardamos el objeto categoría (o null si no se encuentra)
                categoria: catSeleccionada ? catSeleccionada : null 
            }));
        } else {
            // Para otros inputs (nombre, precio, stock, imagen)
            setProducto(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar que se seleccionó una categoría
        if (!producto.categoria || !producto.categoria.id) {
            alert("Por favor, selecciona una categoría.");
            return;
        }

        // Preparamos los datos para enviar
        const datosProducto = {
            ...producto, // Copia todos los datos del estado actual
            precio: parseInt(producto.precio, 10) || 0, // Convierte a número
            stock: parseInt(producto.stock, 10) || 0,   // Convierte a número
            // Asegúrate de enviar el objeto categoría completo o solo el ID si el backend lo prefiere
            // Si tu backend espera el objeto completo (como lo configuramos), esto está bien.
            categoria: producto.categoria 
        };
        
        // --- CONSOLE LOG PARA DEPURAR ---
        console.log("Enviando datos:", datosProducto); // <-- ¡REVISA ESTO EN LA CONSOLA!
        // ---------------------------------

        try {
            if (id) { // Modo Editar (PUT)
                await axios.put(`http://localhost:8080/api/v1/productos/${id}`, datosProducto);
                alert("¡Producto actualizado exitosamente!");
            } else { // Modo Nuevo (POST) - (esto debería funcionar bien)
                await axios.post('http://localhost:8080/api/v1/productos', datosProducto);
                alert("¡Producto creado exitosamente!");
            }
            navigate('/admin/inventario');

        } catch (error) {
            console.error("Error al guardar el producto:", error);
            alert("Error al guardar el producto.");
        }
    };

    

    // --- 3. CONDICIÓN DE CARGA (Ahora solo aplica a Editar) ---
    // Si es modo editar Y (está cargando O el producto es null), muestra Cargando...
    if (isEditMode && (isLoading || !producto)) {
        return (
            <main className="main admin-form-container">
                <h1>Cargando formulario...</h1>
            </main>
        );
    }
    
    // Si llegamos aquí, es seguro renderizar (o es modo Nuevo o ya cargó el de Editar)
    // También verificamos por si acaso producto es null (aunque no debería pasar)
    if (!producto) return null; 

    // --- 4. El JSX del Formulario (se queda igual) ---
    return (
        <main className="main admin-form-container">
           {/* ... (Tu h1, form, inputs, select, botones, etc.) ... */}
           <h1>{titulo}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value={producto.nombre} onChange={handleChange} required />
                 </div>
                 <div className="form-row">
                     <div className="form-group"><label>Precio</label><input type="number" name="precio" value={producto.precio} onChange={handleChange} required /></div>
                     <div className="form-group"><label>Stock</label><input type="number" name="stock" value={producto.stock} onChange={handleChange} required /></div>
                 </div>
                 <div className="form-group">
                    <label htmlFor="categoriaId">Categoría</label>
                    <select 
                        id="categoriaId" name="categoriaId"
                        value={producto.categoria ? producto.categoria.id : ''} 
                        onChange={handleChange} required >
                        <option value="" disabled>-- Selecciona --</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                    </select>
                </div>
                 <div className="form-group">
                    <label htmlFor="imagen">Imagen</label>
                    <input type="text" id="imagen" name="imagen" value={producto.imagen} onChange={handleChange} required placeholder="Ej: buzo_basico.jpg"/>
                 </div>
                <div className="form-actions">
                    <button type="submit" className="btn-header btn-nuevo">Guardar</button>
                    <Link to="/admin/inventario" className="btn-cancelar">Cancelar</Link>
                </div>
            </form>
        </main>
    );
}
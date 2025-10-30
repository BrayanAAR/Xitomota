import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const productoVacio = { nombre: '', precio: 0, stock: 0, categoria: null, imagen: '' };

export default function FormularioProducto() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const isEditMode = Boolean(id); 
    
    const [titulo, setTitulo] = useState(isEditMode ? 'Editar Producto' : 'Nuevo Producto');
    const [producto, setProducto] = useState(isEditMode ? null : productoVacio); 
    const [isLoading, setIsLoading] = useState(isEditMode); 
    
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/categorias');
                setCategorias(response.data);
            } catch (error) { console.error("Error al cargar categorías:", error); }
        };
        fetchCategorias();

        if (isEditMode) {
            const fetchProducto = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/v1/productos/${id}`);
                    const data = response.data;
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
                    setIsLoading(false);
                }
            };
            fetchProducto();
        }
        
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'categoriaId') {
            const catSeleccionada = categorias.find(cat => cat.id.toString() === value);
            setProducto(prevState => ({
                ...prevState,
                categoria: catSeleccionada ? catSeleccionada : null 
            }));
        } else {
            setProducto(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!producto.categoria || !producto.categoria.id) {
            alert("Por favor, selecciona una categoría.");
            return;
        }

        const datosProducto = {
            ...producto, 
            precio: parseInt(producto.precio, 10) || 0, 
            stock: parseInt(producto.stock, 10) || 0,  
            categoria: producto.categoria 
        };
        
        console.log("Enviando datos:", datosProducto);

        try {
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

    if (isEditMode && (isLoading || !producto)) {
        return (
            <main className="main admin-form-container">
                <h1>Cargando formulario...</h1>
            </main>
        );
    }
    
    if (!producto) return null; 

    return (
        <main className="main admin-form-container">
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
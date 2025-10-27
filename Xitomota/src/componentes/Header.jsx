import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const categorias = [
        'Poleras',
        'Camisas',
        'Polerones',
        'Chaquetas',
        'Pantalones',
        'Buzos'
    ];

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">XITOMOTA</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="menuPrincipal">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/productos">Productos</Link>
                        </li>
                        {/* Categorias dropdown */}
                        <li className="nav-item header-dropdown" ref={dropdownRef}>
                            <button
                                type="button"
                                className="nav-link header-dropdown-button"
                                aria-haspopup="true"
                                aria-expanded={open}
                                onClick={() => setOpen(o => !o)}
                                style={{ cursor: 'pointer' }}
                            >
                                Categorías
                            </button>
                            {open && (
                                <ul className="dropdown-menu-custom" role="menu">
                                    {categorias.map(cat => (
                                        <li key={cat}>
                                            <Link
                                                to={`/categorias/${encodeURIComponent(cat.toLowerCase().trim())}`}
                                                className="dropdown-item-custom"
                                                onClick={() => setOpen(false)}
                                            >
                                                {cat}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/nosotros">Nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/blogs">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/contacto">Contacto</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link active" to="/login">Iniciar Sesión</Link>
                        </li> */}
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/registro">Registrarse</Link>
                        </li> */}
                        {/* <li className="nav-item">
                            <Link className="nav-link active" to="/carrito">Carrito</Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Header;
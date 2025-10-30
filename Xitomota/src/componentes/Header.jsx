import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';

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
    
    const navigate = useNavigate();
    const [estaLogeado, setEstaLogeado] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const usuario = localStorage.getItem('usuarioLogueado');
        setEstaLogeado(!!usuario);

        const handleStorageChange = () => {
            setEstaLogeado(!!localStorage.getItem('usuarioLogueado'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => { window.removeEventListener('storage', handleStorageChange); };
    }, [location.pathname]);

    const handleCerrarSesion = () => {
        if (window.confirm("¿Estás seguro que deseas cerrar sesión?")) {
            localStorage.removeItem('usuarioLogueado');
            localStorage.removeItem('rolUsuario');
            setEstaLogeado(false);
            alert("✅ Has cerrado sesión exitosamente.");
            navigate('/login');
        }
    };

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
                
                {/*  LOGO  */}
                <Link className="navbar-brand" to="/">XITOMOTA</Link>
                
                {/*  BOTÓN MÓVIL  */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/*  CONTENEDOR PRINCIPAL */}
                <div className="collapse navbar-collapse" id="menuPrincipal">
                    
                    {/* GRUPO IZQUIERDA: LINKS */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ofertas">Ofertas</Link>
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
                            <Link className="nav-link" to="/nosotros">Nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blogs">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contacto">Contacto</Link>
                        </li>
                    </ul>

                    {/* GRUPO CENTRO: BÚSQUEDA */}
                    <div className="search-container mx-auto d-none d-lg-flex">
                        <input type="text" placeholder="Buscar" />
                        <button className="search-button">Buscar</button>
                    </div>

                    {/* GRUPO DERECHA: SESIÓN Y CARRITO */}
                    <div className="d-flex align-items-center">
                        <ul className="navbar-nav flex-row">
                            <li className="nav-item">
                                {estaLogeado ? (
                                    <button
                                        onClick={handleCerrarSesion}
                                        className="btn btn-outline-danger me-2"
                                    >
                                        Cerrar Sesión
                                    </button>
                                ) : (
                                    <Link to="/login" className="btn btn-outline-light me-2">
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/carrito">Carrito</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
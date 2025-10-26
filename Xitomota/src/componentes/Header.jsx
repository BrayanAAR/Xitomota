import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header() {

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
                            <Link className="nav-link active" to="/productos">Categorias</Link>
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
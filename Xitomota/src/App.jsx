import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Paginas/Home/Home.jsx'
import Nosotros from './Paginas/Nosotros/Nosotros.jsx'
import Blogs from './Paginas/Blogs/Blogs.jsx'
import Contacto from './Paginas/Contacto/Contacto.jsx'
import IniciarSesion from './Paginas/Autentificacion/IniciarSesion.jsx'
import RegistroUsuario from './Paginas/Autentificacion/RegistroUsuario.jsx'
import Carrito from './Paginas/Carrito/Carrito.jsx'
import Producto1 from './Paginas/Productos/Producto1.jsx'
import Header from './componentes/Header.jsx'
import Footer from './componentes/Footer.jsx'
import Producto from './Paginas/Productos/Producto.jsx'

function App() {
  return (
    <Router>
      <div className="app-root">
        {/* Header fuera de Routes para que permanezca visible */}
        <Header />

        {/* Main que crecerá y empujará el footer hacia abajo cuando el contenido sea corto */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/login" element={<IniciarSesion />} />
            <Route path="/registro" element={<RegistroUsuario />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/productos" element={<Producto />} />
            <Route path="/productos/1" element={<Producto1 />} />
            {/* Agrega más rutas aquí cuando los componentes estén disponibles */}
          </Routes>
        </main>

        {/* Footer fuera de Routes para que permanezca visible */}
        <Footer />
      </div>
    </Router>
  )
}

export default App

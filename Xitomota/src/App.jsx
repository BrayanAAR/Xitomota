import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './Paginas/Home/Home.jsx'
import Nosotros from './Paginas/Nosotros/Nosotros.jsx'
import Blogs from './Paginas/Blogs/Blogs.jsx'
import Contacto from './Paginas/Contacto/Contacto.jsx'

import IniciarSesion from './Paginas/Autentificacion/IniciarSesion.jsx'
import RegistroUsuario from './Paginas/Autentificacion/RegistroUsuario.jsx'

import HomeAdmin from './Administrador/HomeAdmin.jsx'
import Inventario from './Administrador/Inventario.jsx'
import ListadoOrdenes from './Administrador/ListadoOrdenes.jsx'
import DetalleOrden from './Administrador/DetalleOrden.jsx'

import AdminLayout from './Layouts/AdminLayout.jsx'
import TiendaLayout from './Layouts/TiendaLayout.jsx'

import Carrito from './Paginas/Carrito/Carrito.jsx'
import Checkout from './Paginas/Checkout/Checkout.jsx'
import PagoRealizado from './Paginas/Checkout/PagoRealizado.jsx'
import PagoFallido from './Paginas/Checkout/PagoFallido.jsx'

import DetalleProducto from './Paginas/Productos/DetalleProducto.jsx'
import PaginaProductos from './Paginas/Productos/Producto.jsx'
import Ofertas from './Paginas/Ofertas/Ofertas.jsx'

import Camisas from './Paginas/Categorias/Camisas/Camisas.jsx'
import Chaquetas from './Paginas/Categorias/Chaquetas/Chaquetas.jsx'
import Poleras from "./Paginas/Categorias/Poleras/Poleras.jsx"
import Polerones from './Paginas/Categorias/Polerones/Polerones.jsx'
import Pantalones from './Paginas/Categorias/Pantalones/Pantalones.jsx'
import Buzos from './Paginas/Categorias/Buzos/Buzos.jsx'

function App() {
  return (
    <Router>
      <div className="app-root">
        {/* Main que crecerá y empujará el footer hacia abajo cuando el contenido sea corto */}
        <main className="app-main">
          <Routes>
            <Route element={<TiendaLayout />}>
              {/* RUTAS PÚBLICAS TIENDA */}
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/login" element={<IniciarSesion />} />
              <Route path="/registro" element={<RegistroUsuario />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/pagorealizado/:ordenId" element={<PagoRealizado />} />
              <Route path="/pagofallido" element={<PagoFallido />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/productos" element={<PaginaProductos />} />
              <Route path="/productos/:id" element={<DetalleProducto />} />
              <Route path="/ofertas" element={<Ofertas />} />
              {/* RUTAS DE CATEGORIAS */}
              <Route path="/categorias/poleras" element={<Poleras />} />
              <Route path="/categorias/camisas" element={<Camisas />} />
              <Route path="/categorias/polerones" element={<Polerones />} />
              <Route path="/categorias/chaquetas" element={<Chaquetas />} />
              <Route path="/categorias/pantalones" element={<Pantalones />} />
              <Route path="/categorias/buzos" element={<Buzos />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />} >
              {/* RUTAS PRIVADAS ADMIN */}
              <Route index element={<HomeAdmin />} />
              <Route path="inventario" element={<Inventario />} />
              <Route path="ordenes" element={<ListadoOrdenes />} />
              <Route path="ordenes/:ordenId" element={<DetalleOrden />} />
            </Route>
            {/* Agrega más rutas aquí cuando los componentes estén disponibles */}
            
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

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
import FormularioProducto from './Administrador/FormularioProducto.jsx'
import Reportes from './Administrador/Reportes.jsx'
import StockCritico from './Administrador/StockCritico.jsx'
import ListadoUsuarios from './Administrador/ListadoUsuarios.jsx'
import FormularioUsuario from './Administrador/FormularioUsuario.jsx'
import HistorialCompras from './Administrador/HistorialCompras.jsx'
import Perfil from './Administrador/Perfil.jsx'
import ListadoCategorias from './Administrador/ListadoCategorias.jsx'
import FormularioCategoria from './Administrador/FormularioCategoria.jsx'

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

import ProtectedRoute from './componentes/ProtectedRoute.jsx'

import MisCompras from './componentes/MisCompras.jsx'
import Boleta from './componentes/Boleta.jsx'

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
              <Route path="/mis-compras" element={<MisCompras />} />
              <Route path="/boleta/:id" element={<Boleta />} />
              {/* RUTAS DE CATEGORIAS */}
              <Route path="/categorias/poleras" element={<Poleras />} />
              <Route path="/categorias/camisas" element={<Camisas />} />
              <Route path="/categorias/polerones" element={<Polerones />} />
              <Route path="/categorias/chaquetas" element={<Chaquetas />} />
              <Route path="/categorias/pantalones" element={<Pantalones />} />
              <Route path="/categorias/buzos" element={<Buzos />} />
            </Route>


            {/* RUTAS PROTEGIDAS ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={['Administrador']} />}>
              <Route path="/admin" element={<AdminLayout />} >
                {/* RUTAS PRIVADAS ADMIN */}
                <Route index element={<HomeAdmin />} />
                <Route path="inventario" element={<Inventario />} />
                <Route path="ordenes" element={<ListadoOrdenes />} />
                <Route path="ordenes/:ordenId" element={<DetalleOrden />} />
                <Route path="productos/nuevo" element={<FormularioProducto />} />
                <Route path="productos/:id" element={<FormularioProducto />} />
                <Route path="reportes" element={<Reportes />} />
                <Route path="stock-critico" element={<StockCritico />} />
                <Route path="usuarios" element={<ListadoUsuarios />} />
                <Route path="usuarios/nuevo" element={<FormularioUsuario />} />
                <Route path="usuarios/editar/:id" element={<FormularioUsuario />} />
                <Route path="usuarios/historial/:email" element={<HistorialCompras />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="categorias" element={<ListadoCategorias />} />
                <Route path="categorias/nuevo" element={<FormularioCategoria />} />
                <Route path="categorias/editar/:id" element={<FormularioCategoria />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

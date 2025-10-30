package com.xitomotabackend.xitomotabackend.controllers;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xitomotabackend.xitomotabackend.entities.Carrito;
import com.xitomotabackend.xitomotabackend.entities.CarritoItem;
import com.xitomotabackend.xitomotabackend.entities.Orden;
import com.xitomotabackend.xitomotabackend.entities.OrdenItem;
import com.xitomotabackend.xitomotabackend.entities.Producto;
import com.xitomotabackend.xitomotabackend.repositories.CarritoItemRepository;
import com.xitomotabackend.xitomotabackend.repositories.CarritoRepository;
import com.xitomotabackend.xitomotabackend.repositories.OrdenItemRepository;
import com.xitomotabackend.xitomotabackend.repositories.OrdenRepository;
import com.xitomotabackend.xitomotabackend.repositories.ProductoRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/v1/orden")
@CrossOrigin(origins = "http://localhost:5173")
public class OrdenController {

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private OrdenItemRepository ordenItemRepository;

    @Autowired
    private CarritoRepository carritoRepository;
    
    @Autowired
    private CarritoItemRepository carritoItemRepository; 

    @Autowired
    private ProductoRepository productoRepository;

    @Transactional
    @PostMapping("/crear/{cartId}")
    public ResponseEntity<?> crearOrden(@PathVariable Long cartId, @RequestBody Orden ordenInfo) {

        Carrito carrito = carritoRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        
        for (CarritoItem cartItem : carrito.getItems()) {
            Producto producto = productoRepository.findById(cartItem.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            if (producto.getStock() < cartItem.getCantidad()) {
                String mensajeError = "Stock insuficiente para el producto: " + producto.getNombre();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensajeError);
            }
        }
        Orden nuevaOrden = new Orden();
        nuevaOrden.setNombre(ordenInfo.getNombre());
        nuevaOrden.setApellidos(ordenInfo.getApellidos());
        nuevaOrden.setCorreo(ordenInfo.getCorreo());
        nuevaOrden.setCalle(ordenInfo.getCalle());
        nuevaOrden.setDepartamento(ordenInfo.getDepartamento());
        nuevaOrden.setRegion(ordenInfo.getRegion());
        nuevaOrden.setComuna(ordenInfo.getComuna());
        nuevaOrden.setIndicaciones(ordenInfo.getIndicaciones());

        int totalOrden = 0;
        List<OrdenItem> itemsDeLaOrden = new ArrayList<>();

        for (CarritoItem cartItem : carrito.getItems()) {
            Producto producto = cartItem.getProducto();
            int cantidadComprada = cartItem.getCantidad();
            producto.setStock(producto.getStock() - cantidadComprada);
            productoRepository.save(producto);

            OrdenItem ordenItem = new OrdenItem();
            ordenItem.setOrden(nuevaOrden);
            ordenItem.setProductoId(cartItem.getProducto().getId());
            ordenItem.setNombreProducto(cartItem.getProducto().getNombre());
            ordenItem.setCantidad(cartItem.getCantidad());
            ordenItem.setPrecioUnitario(cartItem.getProducto().getPrecio());
            ordenItem.setImagen(cartItem.getProducto().getImagen());
            
            itemsDeLaOrden.add(ordenItem);
            
            totalOrden += (producto.getPrecio() * cantidadComprada);
        }

        nuevaOrden.setTotal(totalOrden);
        nuevaOrden.setItems(itemsDeLaOrden);
        
        Orden ordenGuardada = ordenRepository.save(nuevaOrden);

        carritoItemRepository.deleteAll(carrito.getItems());

        return ResponseEntity.ok(ordenGuardada);
    }

    @GetMapping("/{id}")
    public Orden getOrdenPorId(@PathVariable Long id) {
        return ordenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con id: " + id));
    }

    @GetMapping
    public List<Orden> getAllOrdenes() {
        return ordenRepository.findAll();
    }

    @GetMapping("/reportes/top-productos")
    public List<Object[]> getTopProductos() {
        return ordenItemRepository.findTopProductosVendidos();
    }

    @GetMapping("/por-correo/{correo}")
    public List<Orden> getOrdenesPorCorreo(@PathVariable String correo) {
        return ordenRepository.findByCorreo(correo);
    }
}
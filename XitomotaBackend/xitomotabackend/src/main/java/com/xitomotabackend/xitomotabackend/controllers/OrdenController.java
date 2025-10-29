package com.xitomotabackend.xitomotabackend.controllers;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
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
import com.xitomotabackend.xitomotabackend.repositories.CarritoItemRepository;
import com.xitomotabackend.xitomotabackend.repositories.CarritoRepository;
import com.xitomotabackend.xitomotabackend.repositories.OrdenItemRepository;
import com.xitomotabackend.xitomotabackend.repositories.OrdenRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/v1/orden")
@CrossOrigin(origins = "http://localhost:5173") // O tu puerto de frontend
public class OrdenController {

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private OrdenItemRepository ordenItemRepository;

    @Autowired
    private CarritoRepository carritoRepository;
    
    // Lo usaremos para borrar el carrito después de la compra
    @Autowired
    private CarritoItemRepository carritoItemRepository; 

    /**
     * Endpoint principal para crear una orden (Checkout)
     * Recibirá los datos del formulario (la nueva Orden) y el ID del Carrito
     * URL: POST /api/v1/orden/crear/{cartId}
     */
    @Transactional
    @PostMapping("/crear/{cartId}")
    public Orden crearOrden(@PathVariable Long cartId, @RequestBody Orden ordenInfo) {

        // 1. Buscar el carrito
        Carrito carrito = carritoRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        
        // 2. Crear la nueva Orden y copiar la info del formulario
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

        // 3. Convertir CarritoItems en OrdenItems ("La Foto")
        for (CarritoItem cartItem : carrito.getItems()) {
            OrdenItem ordenItem = new OrdenItem();
            ordenItem.setOrden(nuevaOrden); // Asignar a la nueva orden
            ordenItem.setProductoId(cartItem.getProducto().getId());
            ordenItem.setNombreProducto(cartItem.getProducto().getNombre());
            ordenItem.setCantidad(cartItem.getCantidad());
            ordenItem.setPrecioUnitario(cartItem.getProducto().getPrecio());
            ordenItem.setImagen(cartItem.getProducto().getImagen());
            
            itemsDeLaOrden.add(ordenItem);
            
            totalOrden += (cartItem.getProducto().getPrecio() * cartItem.getCantidad());
        }

        // 4. Guardar el total y la lista de items
        nuevaOrden.setTotal(totalOrden);
        nuevaOrden.setItems(itemsDeLaOrden);
        
        // 5. Guardar la orden (y sus items, gracias a CascadeType.ALL)
        Orden ordenGuardada = ordenRepository.save(nuevaOrden);

        // 6. Limpiar el carrito (opcional pero recomendado)
        // Borramos todos los items, lo que vacía el carrito
        carritoItemRepository.deleteAll(carrito.getItems());

        return ordenGuardada;
    }

    @GetMapping("/{id}")
    public Orden getOrdenPorId(@PathVariable Long id) {
        // Busca la orden y la devuelve. 
        // Gracias a FetchType.EAGER en la entidad, vendrá con sus items.
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
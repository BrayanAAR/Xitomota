package com.xitomotabackend.xitomotabackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xitomotabackend.xitomotabackend.entities.Carrito;
import com.xitomotabackend.xitomotabackend.entities.CarritoItem;
import com.xitomotabackend.xitomotabackend.entities.Producto;
import com.xitomotabackend.xitomotabackend.repositories.CarritoItemRepository;
import com.xitomotabackend.xitomotabackend.repositories.CarritoRepository;
import com.xitomotabackend.xitomotabackend.repositories.ProductoRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/v1/carrito")
@CrossOrigin(origins = "http://localhost:5173") // O tu puerto de frontend
public class CarritoController {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private CarritoItemRepository carritoItemRepository;
    
    @Autowired
    private ProductoRepository productoRepository; // Para buscar productos

    // --- LÓGICA PARA OBTENER UN CARRITO ---
    @GetMapping("/{id}")
    public Carrito getCarrito(@PathVariable Long id) {
        // Busca un carrito por su ID, si no existe, lanza un error
        return carritoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
    }
    
    // --- LÓGICA PARA CREAR UN NUEVO CARRITO ---
    @PostMapping("/crear")
    public Carrito crearCarrito() {
        Carrito nuevoCarrito = new Carrito();
        return carritoRepository.save(nuevoCarrito);
    }

    // --- LÓGICA PARA AGREGAR UN ITEM ---
    // (Esta es la más compleja)
    // Necesitarás un DTO (Data Transfer Object) para recibir los datos
    // Pero un ejemplo simple sería:
    @Transactional // <-- ¡Añade esto!
    @PostMapping("/{cartId}/add/{productId}")
    public Carrito addItem(@PathVariable Long cartId, @PathVariable Long productId, @RequestParam int cantidad) {
        
        Carrito carrito = carritoRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
                
        Producto producto = productoRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Lógica para ver si el item YA existe en el carrito
        CarritoItem itemExistente = null;
        if (carrito.getItems() != null) {
            for (CarritoItem item : carrito.getItems()) {
                if (item.getProducto().getId().equals(productId)) {
                    itemExistente = item;
                    break;
                }
            }
        }

        if (itemExistente != null) {
            // --- SI EXISTE: Actualiza la cantidad ---
            int nuevaCantidad = itemExistente.getCantidad() + cantidad;
            itemExistente.setCantidad(nuevaCantidad);
            carritoItemRepository.save(itemExistente);
        } else {
            // --- SI NO EXISTE: Crea un item nuevo ---
            CarritoItem newItem = new CarritoItem();
            newItem.setCarrito(carrito);
            newItem.setProducto(producto);
            newItem.setCantidad(cantidad);
            carritoItemRepository.save(newItem);
        }

        // Devuelve el carrito actualizado (es importante volver a buscarlo)
        return carritoRepository.findById(cartId).get();
    }
    
    // --- LÓGICA PARA CAMBIAR CANTIDAD ---
    @PutMapping("/item/{itemId}")
    public CarritoItem cambiarCantidad(@PathVariable Long itemId, @RequestParam int cantidad) {
        CarritoItem item = carritoItemRepository.findById(itemId).orElseThrow();
        item.setCantidad(cantidad); // Aquí va tu lógica de Math.max(1, ...)
        return carritoItemRepository.save(item);
    }
    
    // --- LÓGICA PARA ELIMINAR ITEM ---
    @DeleteMapping("/item/{itemId}")
    public void eliminarItem(@PathVariable Long itemId) {
        carritoItemRepository.deleteById(itemId);
    }
}
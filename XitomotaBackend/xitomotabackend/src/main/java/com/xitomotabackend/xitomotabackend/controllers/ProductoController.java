package com.xitomotabackend.xitomotabackend.controllers;

import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xitomotabackend.xitomotabackend.entities.Producto;
import com.xitomotabackend.xitomotabackend.repositories.ProductoRepository;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
    
    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping("/productos")
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    @GetMapping("/productos/categoria/{categoria}")
    public List<Producto> getProductosByCategoria(@PathVariable String categoria) {
        return productoRepository.findByCategoria(categoria);
    }

    @GetMapping("/productos/{id}")
    public Producto getProductoPorId(@PathVariable Long id) {
        // .findById(id) ya te lo da JpaRepository.
        // .orElseThrow(...) es una buena práctica por si el ID no existe.
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }
    
    @GetMapping("/productos/criticos")
    public List<Producto> getProductosCriticos() {
        int nivelCritico = 5; // Definir el nivel crítico de stock
        return productoRepository.findByStockLessThanEqual(nivelCritico);
    }

    @PostMapping("/productos")
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto detallesProducto) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        producto.setNombre(detallesProducto.getNombre());
        producto.setDescripcion(detallesProducto.getDescripcion());
        producto.setPrecio(detallesProducto.getPrecio());
        producto.setImagen(detallesProducto.getImagen());
        producto.setCategoria(detallesProducto.getCategoria());
        producto.setStock(detallesProducto.getStock());

        final Producto productoActualizado = productoRepository.save(producto);
        return ResponseEntity.ok(productoActualizado);
    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        productoRepository.delete(producto);
        return ResponseEntity.ok().build();
    }
}
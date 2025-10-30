package com.xitomotabackend.xitomotabackend.controllers;

import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xitomotabackend.xitomotabackend.entities.Categoria;
import com.xitomotabackend.xitomotabackend.entities.Producto;
import com.xitomotabackend.xitomotabackend.repositories.CategoriaRepository;
import com.xitomotabackend.xitomotabackend.repositories.ProductoRepository;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
    
    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping("/productos")
    public Page<Producto> getAllProductos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,asc") String[] sort) {

        String sortField = sort[0];
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if (sort.length > 1 && sort[1].equalsIgnoreCase("desc")) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sortOrder = Sort.by(sortDirection, sortField);

        Pageable pageable = PageRequest.of(page, size, sortOrder);
        
        return productoRepository.findAll(pageable);
    }

    @GetMapping("/productos/categoria/{categoriaNombre}")
    public List<Producto> getProductosByCategoria(@PathVariable String categoriaNombre) {
        return productoRepository.findByCategoriaNombreIgnoreCase(categoriaNombre);
    }

    @GetMapping("/productos/{id}")
    public Producto getProductoPorId(@PathVariable Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }
    
    @GetMapping("/productos/criticos")
    public List<Producto> getProductosCriticos() {
        int nivelCritico = 5; 
        return productoRepository.findByStockLessThanEqual(nivelCritico);
    }

    @PostMapping("/productos")
    public Producto crearProducto(@RequestBody Producto productoRequest) {
        if (productoRequest.getCategoria() != null && productoRequest.getCategoria().getId() != null) {
            Categoria categoria = categoriaRepository.findById(productoRequest.getCategoria().getId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            productoRequest.setCategoria(categoria); // Asigna la entidad completa
        } else {
             throw new RuntimeException("ID de categoría es requerido");
        }
        
        return productoRepository.save(productoRequest);
    }

    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto productoDetalles) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        producto.setNombre(productoDetalles.getNombre());
        producto.setPrecio(productoDetalles.getPrecio());
        producto.setStock(productoDetalles.getStock());
        producto.setImagen(productoDetalles.getImagen());

        if (productoDetalles.getCategoria() != null && productoDetalles.getCategoria().getId() != null) {
            Categoria categoria = categoriaRepository.findById(productoDetalles.getCategoria().getId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            producto.setCategoria(categoria);
        } else {
             throw new RuntimeException("ID de categoría es requerido");
        }
        
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
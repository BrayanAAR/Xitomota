package com.xitomotabackend.xitomotabackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xitomotabackend.xitomotabackend.entities.Categoria;
import com.xitomotabackend.xitomotabackend.repositories.CategoriaRepository;

@RestController
@RequestMapping("/api/v1/categorias") // Ruta base para categorías
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // --- GET (Todas) ---
    @GetMapping
    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    // --- GET (Una por ID) ---
    @GetMapping("/{id}")
    public Categoria getCategoriaById(@PathVariable Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
    }

    // --- POST (Crear) ---
    @PostMapping
    public Categoria crearCategoria(@RequestBody Categoria categoria) {
        // Validaciones (ej: nombre no vacío) podrían ir aquí
        return categoriaRepository.save(categoria);
    }

    // --- PUT (Actualizar) ---
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Long id, @RequestBody Categoria detallesCategoria) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        
        categoria.setNombre(detallesCategoria.getNombre());
        
        final Categoria categoriaActualizada = categoriaRepository.save(categoria);
        return ResponseEntity.ok(categoriaActualizada);
    }

    // --- DELETE ---
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        
        // **Consideración:** ¿Qué pasa con los productos de esta categoría?
        // Aquí podrías agregar lógica para:
        // 1. Impedir borrar si hay productos asociados.
        // 2. Poner los productos asociados en "Sin Categoría".
        // Por ahora, simplemente la borramos.
        categoriaRepository.delete(categoria);
        
        return ResponseEntity.ok().build();
    }
}
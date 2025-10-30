package com.xitomotabackend.xitomotabackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xitomotabackend.xitomotabackend.repositories.OrdenRepository;
import com.xitomotabackend.xitomotabackend.repositories.ProductoRepository;
import com.xitomotabackend.xitomotabackend.repositories.UsuarioRepository;

@RestController
@RequestMapping("/api/v1/admin/stats")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository; // (Cuando lo tengas)

    class StatsResponse {
        public long totalCompras;
        public long totalProductos;
        public long totalUsuarios;
    }

    @GetMapping
    public StatsResponse getDashboardStats() {
        StatsResponse response = new StatsResponse();
        
        // Contamos cuántas órdenes hay
        response.totalCompras = ordenRepository.count(); 
        
        // Contamos cuántos productos hay
        response.totalProductos = productoRepository.count();
        
        // Contamos cuántos usuarios hay
        response.totalUsuarios = usuarioRepository.count(); 
        
        return response;
    }
}
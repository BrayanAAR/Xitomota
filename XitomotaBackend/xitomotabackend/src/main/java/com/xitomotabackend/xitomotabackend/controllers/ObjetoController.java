package com.xitomotabackend.xitomotabackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xitomotabackend.xitomotabackend.entities.Objeto;
import com.xitomotabackend.xitomotabackend.repositories.ObjetoRepository;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class ObjetoController {
    
    @Autowired
    private ObjetoRepository objetoRepository;

    @GetMapping("/productos")
    public List<Objeto> getAllObjetos() {
        return objetoRepository.findAll();
    }
}

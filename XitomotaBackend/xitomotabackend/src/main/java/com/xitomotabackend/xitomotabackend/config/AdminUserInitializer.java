package com.xitomotabackend.xitomotabackend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.xitomotabackend.xitomotabackend.entities.Usuario;
import com.xitomotabackend.xitomotabackend.repositories.UsuarioRepository;

@Component // Le dice a Spring que esta clase es un componente gestionado
public class AdminUserInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public void run(String... args) throws Exception {

        String adminEmail = "admin@admin.cl";
        String adminPassword = "admin"; 
        String adminNombre = "Admin";
        String adminApellidos = "Principal";
        String adminRol = "Administrador";

        // 2. Verifica si el admin ya existe
        if (usuarioRepository.findByEmail(adminEmail).isEmpty()) {
            Usuario adminUser = new Usuario();
            adminUser.setEmail(adminEmail);
            adminUser.setPassword(adminPassword); // Aquí iría la encriptación
            adminUser.setNombre(adminNombre);
            adminUser.setApellidos(adminApellidos);
            adminUser.setRol(adminRol);
            
            usuarioRepository.save(adminUser);
            System.out.println(">>> Usuario Administrador predeterminado creado.");
        } else {
            System.out.println(">>> Usuario Administrador ya existe.");
        }
    }
}
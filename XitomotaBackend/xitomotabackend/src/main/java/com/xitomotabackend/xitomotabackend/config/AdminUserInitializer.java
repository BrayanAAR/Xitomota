package com.xitomotabackend.xitomotabackend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.xitomotabackend.xitomotabackend.entities.Usuario;
import com.xitomotabackend.xitomotabackend.repositories.UsuarioRepository;

@Component // Le dice a Spring que esta clase es un componente gestionado
public class AdminUserInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        String adminEmail = "admin@admin.cl";
        String adminPassword = "admin"; 

        // 2. Verifica si el admin ya existe
        if (usuarioRepository.findByEmail(adminEmail).isEmpty()) {
            Usuario adminUser = new Usuario();
            adminUser.setEmail(adminEmail);
            adminUser.setPassword(passwordEncoder.encode(adminPassword)); // Aquí iría la encriptación
            adminUser.setNombre("Admin");
            adminUser.setApellidos("Principal");
            adminUser.setRol("Administrador");

            usuarioRepository.save(adminUser);
            System.out.println(">>> Usuario Administrador predeterminado creado.");
        } else {
            System.out.println(">>> Usuario Administrador ya existe.");
        }
    }
}
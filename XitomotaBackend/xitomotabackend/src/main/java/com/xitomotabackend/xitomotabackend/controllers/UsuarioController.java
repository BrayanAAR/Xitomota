package com.xitomotabackend.xitomotabackend.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.xitomotabackend.xitomotabackend.dto.LoginRequest;
import com.xitomotabackend.xitomotabackend.entities.Usuario;
import com.xitomotabackend.xitomotabackend.repositories.UsuarioRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // --- 1. GET (Todos) - Para "Mostrar Usuario" (la lista) ---
    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    // --- 2. GET (Uno) - Para "Editar Usuario" (cargar datos) ---
    @GetMapping("/usuarios/{id}")
    public Usuario getUsuarioById(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @GetMapping("/usuarios/por-email/{email}")
    public Usuario getUsuarioPorEmail(@PathVariable String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));
    }

    // --- 3. POST - Para "Nuevo Usuario" ---
    @PostMapping("/usuarios")
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        // (Aquí iría la lógica para encriptar la contraseña antes de guardar)
        // usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    @PostMapping("/auth/login") // Usamos un subpath /auth para login
    public ResponseEntity<?> loginUsuario(@RequestBody LoginRequest loginRequest) {
        
        // 1. Buscamos al usuario por email
        // Necesitamos agregar 'findByEmail' al repository
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(loginRequest.getEmail());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            // 2. Comparamos la contraseña (¡SIN ENCRIPTAR POR AHORA!)
            // ADVERTENCIA: En producción, NUNCA compares contraseñas así. Usa Spring Security.
            if (usuario.getPassword().equals(loginRequest.getPassword())) {
                
                // 3. ¡Éxito! Devolvemos los datos necesarios (ej: email y rol)
                // Creamos un objeto simple para la respuesta
                var response = new java.util.HashMap<String, String>();
                response.put("email", usuario.getEmail());
                response.put("rol", usuario.getRol());
                
                return ResponseEntity.ok(response);
            }
        }
        
        // 4. Si el usuario no existe o la contraseña es incorrecta
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }

    // --- 4. PUT - Para "Editar Usuario" (guardar cambios) ---
    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario detallesUsuario) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        usuario.setEmail(detallesUsuario.getEmail());
        usuario.setNombre(detallesUsuario.getNombre());
        usuario.setApellidos(detallesUsuario.getApellidos());
        usuario.setRol(detallesUsuario.getRol());
        
        // (Opcional: lógica para no sobreescribir la pass si viene vacía)
        if (detallesUsuario.getPassword() != null && !detallesUsuario.getPassword().isEmpty()) {
            usuario.setPassword(detallesUsuario.getPassword());
        }
        
        final Usuario usuarioActualizado = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioActualizado);
    }

    @PutMapping("/perfil/{email}")
    public ResponseEntity<Usuario> actualizarPerfil(
            @PathVariable String email, 
            @RequestBody Map<String, String> updates) {
            
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualizar campos básicos si vienen en el request
        if (updates.containsKey("nombre")) {
            usuario.setNombre(updates.get("nombre"));
        }
        if (updates.containsKey("apellidos")) {
            usuario.setApellidos(updates.get("apellidos"));
        }
        
        // Lógica para cambiar contraseña (si se proporcionan las contraseñas)
        String currentPassword = updates.get("currentPassword");
        String newPassword = updates.get("newPassword");

        if (currentPassword != null && newPassword != null && !newPassword.isEmpty()) {
            // VERIFICAR CONTRASEÑA ACTUAL (¡SIN ENCRIPTAR POR AHORA!)
            // ADVERTENCIA: En producción, NUNCA compares así. Usa Spring Security.
            if (!usuario.getPassword().equals(currentPassword)) {
                // Si la contraseña actual no coincide, devolvemos un error
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // O un mensaje de error
            }
            // Si coincide, actualizamos con la nueva (¡DEBERÍA ENCRIPTARSE!)
            usuario.setPassword(newPassword); 
        }

        final Usuario usuarioActualizado = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioActualizado);
    }

    // --- 5. DELETE - Para borrar un usuario ---
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        usuarioRepository.delete(usuario);
        return ResponseEntity.ok().build();
    }
}
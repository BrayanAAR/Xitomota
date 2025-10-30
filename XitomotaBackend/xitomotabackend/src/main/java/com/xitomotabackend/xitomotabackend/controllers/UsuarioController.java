package com.xitomotabackend.xitomotabackend.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

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

    @PostMapping("/usuarios")
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        String passHasheada = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passHasheada);

        return usuarioRepository.save(usuario);
    }

    @PostMapping("/auth/login") 
    public ResponseEntity<?> loginUsuario(@RequestBody LoginRequest loginRequest) {
        
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(loginRequest.getEmail());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            if (passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {

                var response = new java.util.HashMap<String, String>();
                response.put("email", usuario.getEmail());
                response.put("rol", usuario.getRol());
                
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario detallesUsuario) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        usuario.setEmail(detallesUsuario.getEmail());
        usuario.setNombre(detallesUsuario.getNombre());
        usuario.setApellidos(detallesUsuario.getApellidos());
        usuario.setRol(detallesUsuario.getRol());
        
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

        if (updates.containsKey("nombre")) {
            usuario.setNombre(updates.get("nombre"));
        }
        if (updates.containsKey("apellidos")) {
            usuario.setApellidos(updates.get("apellidos"));
        }
        
        String currentPassword = updates.get("currentPassword");
        String newPassword = updates.get("newPassword");

        if (currentPassword != null && newPassword != null && !newPassword.isEmpty()) {
            if (!usuario.getPassword().equals(currentPassword)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            usuario.setPassword(newPassword); 
        }

        final Usuario usuarioActualizado = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioActualizado);
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        usuarioRepository.delete(usuario);
        return ResponseEntity.ok().build();
    }
}
package com.xitomotabackend.xitomotabackend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Rutas Públicas
                .requestMatchers("/api/v1/auth/**", "/api/v1/productos/**", "/api/v1/categorias/**", "/images/**", "/api/v1/carrito/**", "/api/v1/orden/**").permitAll()
                
                // Rutas de Admin (Solo alguien con rol 'ADMIN' o 'Administrador')
                .requestMatchers("/api/v1/admin/**", "/api/v1/usuarios/**", "/api/v1/orden/reportes/**").hasAnyRole("Administrador", "ADMIN")

                // Rutas de Usuario (Cualquier usuario autenticado)
                .requestMatchers("/api/v1/orden/por-correo/**", "/api/v1/orden/{id}").authenticated()
                
                // El resto requiere autenticación
                .anyRequest().authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // ¡Sin sesiones!
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Filtro JWT primero

        return http.build();
    }
}
package com.xitomotabackend.xitomotabackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Define el "Encriptador" de contraseñas.
     * Usamos BCrypt, que es el estándar de la industria.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configura la cadena de filtros de seguridad.
     * ¡Importante! Sin esto, Spring Security bloqueará toda tu API.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Deshabilitar CSRF: Es necesario para APIs REST/stateless
            .csrf(csrf -> csrf.disable()) 

            // 2. Reglas de autorización
            .authorizeHttpRequests(auth -> auth
                // Por ahora, permitimos todas las peticiones (permitAll)
                // para no romper tu app. Más adelante, aquí puedes
                // proteger tus rutas de admin.
                .anyRequest().permitAll() 
            )
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
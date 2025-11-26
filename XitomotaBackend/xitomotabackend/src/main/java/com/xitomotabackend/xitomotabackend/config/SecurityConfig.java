package com.xitomotabackend.xitomotabackend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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
            // 1. AQUÍ ACTIVAMOS LA CONFIGURACIÓN DE CORS QUE DEFINIMOS ABAJO
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) 
            .csrf(csrf -> csrf.disable())
            
            .authorizeHttpRequests(auth -> auth
                // Rutas Públicas (Login, Productos, Imagenes, Carrito, Crear Orden)
                .requestMatchers("/api/v1/auth/**", "/api/v1/productos/**", "/api/v1/categorias/**", "/images/**", "/api/v1/carrito/**", "/api/v1/orden/**").permitAll()

                .requestMatchers(HttpMethod.POST, "/api/v1/usuarios").permitAll() // Permitir crear usuario
                
                // Rutas de Admin (Protegidas por Rol)
                .requestMatchers("/api/v1/admin/**", "/api/v1/usuarios/**", "/api/v1/orden/reportes/**").hasAnyAuthority("Administrador", "ADMIN")
                
                // El resto requiere estar logueado
                .anyRequest().authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 2. ESTE ES EL "CEREBRO" DE CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Permitimos que el Frontend (puerto 5173) se conecte
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); 
        
        // Permitimos todos los métodos (GET para ver, POST para login/crear, etc.)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Permitimos las cabeceras importantes (Authorization es vital para el Token)
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        
        // Permitimos enviar credenciales/cookies (opcional pero recomendado)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplicamos estas reglas a TODAS las rutas (/**)
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
package main.java.Service;

import com.sun.net.httpserver.Filter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtFilter extends OncePerRequestFilter {

    private String jwtSecret = "your-jwt-secret"; // Usar la misma clave secreta que en AuthenticationService

    @Override
    protected void doFilterInternal(HttpServletRequest request, javax.servlet.http.HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");
        
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Extraemos el token JWT

            try {
                String username = Jwts.parser()
                        .setSigningKey(jwtSecret)
                        .parseClaimsJws(token)
                        .getBody()
                        .getSubject();
                
                // Set usuario en el contexto de seguridad
                if (username != null) {
                    // Aquí podemos cargar el usuario de la base de datos y setearlo en el contexto de seguridad
                }
            } catch (SignatureException e) {
                // Error en la firma del JWT
                response.setStatus(401);
                return;
            }
        }
        
        filterChain.doFilter(request, response);
    }
}

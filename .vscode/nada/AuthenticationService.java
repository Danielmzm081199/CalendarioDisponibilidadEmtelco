

import BackendCaledario.Backend.Model.Usuario;
import BackendCaledario.Backend.Repository.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;


@Service
public class AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // Clave secreta para firmar el JWT
    @Value("${jwt.secret}")
    private String jwtSecret;

    public AuthenticationService(UsuarioRepository usuarioRepository, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Método para autenticar al usuario
    public String authenticate(String username, String password) {
        Usuario usuario = usuarioRepository.findByUsername(username);
        
        if (usuario == null || !passwordEncoder.matches(password, usuario.getContrasena())) {
            throw new RuntimeException("Invalid username or password");
        }
        
        return generateJwtToken(usuario);
    }

    // Generar JWT
    private String generateJwtToken(Usuario usuario) {
        return Jwts.builder()
                .setSubject(usuario.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 día
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }
}